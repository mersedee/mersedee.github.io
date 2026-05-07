import { ArrowUpRight } from "lucide-react";

import { projects } from "@/mock";

import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          index="04"
          eyebrow="Selected Work"
          title="Things I've shipped recently."
          description="A snapshot of products and features I've contributed to — from DeFi platforms to multi-target wallets."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={80 + i * 120}>
              <article className="hover-lift group relative rounded-xl border border-white/10 bg-zinc-950/40 p-6 md:p-7 hover:border-teal-300/40 overflow-hidden h-full">
                <div className="absolute -top-24 -right-24 w-56 h-56 accent-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-teal-300">0{i + 1}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {p.org}
                    </span>
                  </div>
                    <a
                        href={p?.link || undefined}
                        target={p?.link ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        aria-disabled={!p?.link}
                        onClick={(e) => {
                            if (!p?.link) e.preventDefault();
                        }}
                        className={!p?.link ? "pointer-events-none opacity-50" : ""}
                    >
                        <ArrowUpRight className="h-5 w-5 text-zinc-500 group-hover:text-teal-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                    </a>
                  </div>

                <h4 className="mt-4 font-display text-2xl text-zinc-100 group-hover:text-teal-200 transition-colors duration-300">
                  {p.title}
                </h4>
                <p className="mt-3 text-zinc-400 text-sm md:text-base leading-relaxed">
                  {p.summary}
                </p>

                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-300 font-mono">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="chip px-2.5 py-1.5 rounded-md border border-white/5 bg-white/[0.02] group-hover:border-white/10"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="chip font-mono text-[11px] px-2 py-0.5 rounded border border-teal-300/20 text-teal-300/90 bg-teal-300/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
