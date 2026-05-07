import { GraduationCap, Languages } from "lucide-react";

import { education, languages } from "@/mock";

import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";

const Education = () => {
  return (
    <section id="education" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader index="05" eyebrow="Education & Languages" title="Foundations." />

        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          <Reveal variant="up" delay={100}>
            <div className="hover-lift rounded-xl border border-white/10 bg-zinc-950/40 p-6 md:p-7 hover:border-teal-300/30 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-teal-300">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400">Education</h4>
              </div>
              {education.map((e) => (
                <div key={e.school} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="font-display text-xl text-zinc-100">{e.degree}</div>
                    <div className="text-zinc-400 text-sm mt-1">{e.school}</div>
                  </div>
                  <span className="font-mono text-xs text-zinc-500">{e.period}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="up" delay={220}>
            <div className="hover-lift rounded-xl border border-white/10 bg-zinc-950/40 p-6 md:p-7 hover:border-teal-300/30 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-teal-300">
                  <Languages className="h-4 w-4" />
                </div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400">Languages</h4>
              </div>
              <div className="space-y-3">
                {languages.map((l) => (
                  <div key={l.name} className="flex items-center justify-between">
                    <span className="text-zinc-200">{l.name}</span>
                    <span className="font-mono text-xs text-zinc-500">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Education;
