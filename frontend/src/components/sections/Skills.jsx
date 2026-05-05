import React from "react";
import SectionHeader from "./SectionHeader";
import { skills } from "../../mock";
import { Code2, Layers, Palette, GitBranch } from "lucide-react";

const groupIcons = {
  Languages: Code2,
  "Frameworks & Libraries": Layers,
  Styling: Palette,
  "Tooling & Workflow": GitBranch
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          index="03"
          eyebrow="Skills"
          title="The toolkit I reach for."
          description="From low-level CSS systems to Web3 SDKs — a stack tuned for shipping fast, accessible, and maintainable interfaces."
        />

        <div className="mt-12 grid sm:grid-cols-2 gap-4 md:gap-5">
          {skills.map((group) => {
            const Icon = groupIcons[group.group] || Code2;
            return (
              <div
                key={group.group}
                className="hover-lift group relative rounded-xl border border-white/10 bg-zinc-950/40 p-6 hover:border-teal-300/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-teal-300 group-hover:bg-teal-300/10">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    {group.group}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-zinc-200 text-sm hover:border-teal-300/40 hover:text-teal-200 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
