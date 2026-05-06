import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverStartTime = Date.now();

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function viteHealthPlugin() {
  const status = {
    state: "idle",
    errors: [],
    warnings: [],
    lastCompileTime: null,
    lastSuccessTime: null,
    compileDuration: 0,
    totalCompiles: 0,
    firstCompileTime: null,
  };

  const startCompile = () => {
    const now = Date.now();
    status.state = "compiling";
    status.lastCompileTime = now;
    if (!status.firstCompileTime) status.firstCompileTime = now;
  };

  const finishCompile = () => {
    status.state = "success";
    status.lastSuccessTime = Date.now();
    status.compileDuration = status.lastCompileTime
      ? Date.now() - status.lastCompileTime
      : 0;
    status.totalCompiles += 1;
    status.errors = [];
  };

  const failCompile = (error) => {
    status.state = "failed";
    status.compileDuration = status.lastCompileTime
      ? Date.now() - status.lastCompileTime
      : 0;
    status.errors = [{ message: error.message, stack: error.stack }];
  };

  const getStatus = () => ({
    ...status,
    isHealthy: status.state === "success",
    errorCount: status.errors.length,
    warningCount: status.warnings.length,
    hasCompiled: status.totalCompiles > 0,
  });

  return {
    name: "vite-health-check",
    buildStart: startCompile,
    buildEnd(error) {
      if (error) failCompile(error);
      else finishCompile();
    },
    configureServer(server) {
      server.watcher.on("change", startCompile);
      server.watcher.on("add", startCompile);
      server.watcher.on("unlink", startCompile);
      server.watcher.on("ready", finishCompile);
      server.watcher.on("error", failCompile);

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (!url?.startsWith("/health")) return next();

        const healthStatus = getStatus();
        const uptime = Date.now() - serverStartTime;
        const memUsage = process.memoryUsage();

        if (url === "/health/simple") {
          if (healthStatus.state === "success") return res.end("OK");
          if (healthStatus.state === "compiling") return res.end("COMPILING");
          if (healthStatus.state === "idle") return res.end("IDLE");
          res.statusCode = 503;
          return res.end("ERROR");
        }

        if (url === "/health/ready") {
          return sendJson(res, healthStatus.isHealthy ? 200 : 503, {
            ready: healthStatus.isHealthy,
            state: healthStatus.state,
            ...(!healthStatus.isHealthy && {
              reason:
                healthStatus.state === "compiling"
                  ? "Compilation in progress"
                  : "Compilation failed",
            }),
          });
        }

        if (url === "/health/live") {
          return sendJson(res, 200, {
            alive: true,
            timestamp: new Date().toISOString(),
          });
        }

        if (url === "/health/errors") {
          return sendJson(res, 200, {
            errorCount: healthStatus.errorCount,
            warningCount: healthStatus.warningCount,
            errors: healthStatus.errors,
            warnings: healthStatus.warnings,
            state: healthStatus.state,
          });
        }

        if (url === "/health/stats") {
          return sendJson(res, 200, {
            totalCompiles: healthStatus.totalCompiles,
            averageCompileTime:
              healthStatus.totalCompiles > 0
                ? `${Math.round(uptime / healthStatus.totalCompiles)}ms`
                : null,
            lastCompileDuration: healthStatus.compileDuration
              ? `${healthStatus.compileDuration}ms`
              : null,
            firstCompileTime: healthStatus.firstCompileTime
              ? new Date(healthStatus.firstCompileTime).toISOString()
              : null,
            serverUptime: formatDuration(uptime),
          });
        }

        if (url === "/health") {
          return sendJson(res, healthStatus.isHealthy ? 200 : 503, {
            status: healthStatus.isHealthy ? "healthy" : "unhealthy",
            timestamp: new Date().toISOString(),
            uptime: {
              seconds: Math.floor(uptime / 1000),
              formatted: formatDuration(uptime),
            },
            vite: {
              state: healthStatus.state,
              isHealthy: healthStatus.isHealthy,
              hasCompiled: healthStatus.hasCompiled,
              errors: healthStatus.errorCount,
              warnings: healthStatus.warningCount,
              lastCompileTime: healthStatus.lastCompileTime
                ? new Date(healthStatus.lastCompileTime).toISOString()
                : null,
              lastSuccessTime: healthStatus.lastSuccessTime
                ? new Date(healthStatus.lastSuccessTime).toISOString()
                : null,
              compileDuration: healthStatus.compileDuration
                ? `${healthStatus.compileDuration}ms`
                : null,
              totalCompiles: healthStatus.totalCompiles,
              firstCompileTime: healthStatus.firstCompileTime
                ? new Date(healthStatus.firstCompileTime).toISOString()
                : null,
            },
            server: {
              nodeVersion: process.version,
              platform: os.platform(),
              arch: os.arch(),
              cpus: os.cpus().length,
              memory: {
                heapUsed: formatBytes(memUsage.heapUsed),
                heapTotal: formatBytes(memUsage.heapTotal),
                rss: formatBytes(memUsage.rss),
                external: formatBytes(memUsage.external),
              },
              systemMemory: {
                total: formatBytes(os.totalmem()),
                free: formatBytes(os.freemem()),
                used: formatBytes(os.totalmem() - os.freemem()),
              },
            },
            environment: process.env.NODE_ENV || "development",
          });
        }

        return next();
      });
    },
  };
}

function createExpressLikeResponse(res) {
  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };
  res.json = (payload) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(payload));
  };
  res.send = (payload) => {
    res.end(payload);
  };
  return res;
}

function runHandlers(handlers, req, res, next) {
  let index = 0;
  const runNext = () => {
    const handler = handlers[index++];
    if (!handler) return next();
    return handler(req, res, runNext);
  };
  return runNext();
}

function visualEditsDevPlugin(enabled) {
  if (!enabled) return null;

  let setupDevServer;
  let overlayPath;
  try {
    setupDevServer = require("@emergentbase/visual-edits/server").default;
    overlayPath = require.resolve("@emergentbase/visual-edits/visual-edit-overlay");
  } catch (error) {
    if (
      error.code === "MODULE_NOT_FOUND" &&
      error.message.includes("@emergentbase/visual-edits")
    ) {
      console.warn(
        "[visual-edits] @emergentbase/visual-edits not installed - visual editing disabled.",
      );
      return null;
    }
    throw error;
  }

  return {
    name: "vite-visual-edits-dev",
    transformIndexHtml(html) {
      const snippet = `<script>
if(window.self!==window.top){
  var s=document.createElement("script");s.src="/visual-edit-overlay.js";document.head.appendChild(s);
  window.tailwind=window.tailwind||{};tailwind.config={corePlugins:{preflight:false}};var t=document.createElement("script");t.src="https://cdn.tailwindcss.com";document.head.appendChild(t);
}
</script>`;
      return html.replace("</head>", `${snippet}\n</head>`);
    },
    configureServer(server) {
      const app = {
        use(handler) {
          server.middlewares.use(handler);
        },
        get(route, ...handlers) {
          server.middlewares.use(route, (req, res, next) => {
            if (req.method !== "GET") return next();
            return runHandlers(handlers, req, createExpressLikeResponse(res), next);
          });
        },
        post(route, ...handlers) {
          server.middlewares.use(route, (req, res, next) => {
            if (req.method !== "POST") return next();
            return runHandlers(handlers, req, createExpressLikeResponse(res), next);
          });
        },
        options(route, ...handlers) {
          server.middlewares.use(route, (req, res, next) => {
            if (req.method !== "OPTIONS") return next();
            return runHandlers(handlers, req, createExpressLikeResponse(res), next);
          });
        },
      };

      setupDevServer({}).setupMiddlewares([], { app });

      server.middlewares.use("/visual-edit-overlay.js", (_req, res) => {
        res.setHeader("Content-Type", "application/javascript");
        fs.createReadStream(overlayPath).pipe(res);
      });
    },
  };
}

function getVisualEditsBabelPlugin(enabled) {
  if (!enabled) return [];

  try {
    return [require("@emergentbase/visual-edits/babel-plugin").default];
  } catch (error) {
    if (
      error.code === "MODULE_NOT_FOUND" &&
      error.message.includes("@emergentbase/visual-edits/babel-plugin")
    ) {
      console.warn(
        "[visual-edits] @emergentbase/visual-edits not installed - visual editing disabled.",
      );
      return [];
    }
    throw error;
  }
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const enableHealthCheck = env.ENABLE_HEALTH_CHECK === "true";
  const enableVisualEdits = command === "serve";

  return {
    plugins: [
      react({
        babel: {
          plugins: getVisualEditsBabelPlugin(enableVisualEdits),
        },
      }),
      enableHealthCheck && viteHealthPlugin(),
      visualEditsDevPlugin(enableVisualEdits),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: "0.0.0.0",
      watch: {
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/build/**",
          "**/dist/**",
          "**/coverage/**",
          "**/public/**",
        ],
      },
    },
  };
});
