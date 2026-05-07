import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navItems, profile } from "@/mock";

const Header = ({ activeId }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0a0a0b]/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => go("top")}
          className="font-mono text-sm tracking-tight text-zinc-200 hover:text-teal-300 transition-colors"
        >
          <span className="text-teal-300">~/</span>
          {profile.handle}
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative px-3 py-2 text-sm font-mono transition-colors ${
                  active ? "text-teal-300" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                <span className="text-zinc-600 mr-1">0{navItems.indexOf(item) + 1}.</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            className="text-xs font-mono text-zinc-400 hover:text-teal-300 link-underline"
          >
            résumé.pdf
          </a>
          <Button
            onClick={() => go("contact")}
            className="h-9 rounded-md bg-teal-300 text-[#0a0a0b] hover:bg-teal-200 font-medium"
          >
            Contact me
          </Button>
        </div>

        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden p-2 text-zinc-300 hover:text-teal-300"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0b]/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-left px-2 py-3 font-mono text-sm text-zinc-300 hover:text-teal-300 border-b border-white/5"
              >
                <span className="text-zinc-600 mr-2">0{i + 1}.</span>
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => go("contact")}
              className="mt-3 bg-teal-300 text-[#0a0a0b] hover:bg-teal-200"
            >
              Get in touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
