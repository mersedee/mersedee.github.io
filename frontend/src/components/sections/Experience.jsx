import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";
import { experiences } from "../../mock";
import { Badge } from "../ui/badge";

const Experience = () => {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section id="experience" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          index="02"
          eyebrow="Experience"
          title="Building products from conception to growth."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          <Reveal variant="left" delay={80} className="lg:col-span-4">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 lg:gap-0 border-b lg:border-b-0 lg:border-l border-white/10">
              {experiences.map((e, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={e.company}
                    onClick={() => setActive(i)}
                    className={`text-left whitespace-nowrap lg:whitespace-normal px-4 py-3 lg:py-4 font-mono text-sm border-b-2 lg:border-b-0 lg:border-l-2 -ml-px transition-all duration-300 ${
                      isActive
                        ? "text-teal-300 border-teal-300 bg-teal-300/5 translate-x-0"
                        : "text-zinc-500 border-transparent hover:text-zinc-200 hover:bg-white/5 hover:translate-x-0.5"
                    }`}
                  >
                    {e.company}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal variant="right" delay={160} className="lg:col-span-8">
            <div
              key={exp.company}
              className="rounded-xl border border-white/10 bg-zinc-950/40 p-6 md:p-8 hero-rise"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-xl md:text-2xl text-zinc-100">
                  {exp.role}{" "}
                  <span className="text-teal-300">@ {exp.company}</span>
                </h4>
                <span className="font-mono text-xs text-zinc-500">{exp.period}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-500">{exp.type}</p>
              <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">{exp.blurb}</p>

              <ul className="mt-6 space-y-3">
                {exp.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-zinc-300 text-sm md:text-base leading-relaxed hero-rise"
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-300 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {exp.stack.map((s, i) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="chip border-white/10 bg-white/5 text-zinc-300 font-mono text-[11px] hover:bg-teal-300/10 hover:text-teal-200 hover:border-teal-300/30 hero-rise"
                    style={{ animationDelay: `${220 + i * 50}ms` }}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Experience;
