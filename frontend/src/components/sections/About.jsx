import React from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";
import { about } from "../../mock";

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader index="01" eyebrow="About" title="A craft-driven engineer focused on detail." />

        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-5 text-zinc-300 text-base md:text-lg leading-relaxed">
            <Reveal variant="up" delay={100}><p>{about.intro}</p></Reveal>
            <Reveal variant="up" delay={220}><p className="text-zinc-400">{about.body}</p></Reveal>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {about.highlights.map((h, i) => (
              <Reveal key={i} variant="up" delay={120 + i * 90}>
                <div className="hover-lift relative rounded-lg border border-white/10 bg-zinc-950/40 p-5 hover:border-teal-300/40 h-full">
                  <div className="font-display text-3xl md:text-4xl text-teal-300">{h.k}</div>
                  <div className="mt-2 text-zinc-400 text-sm leading-snug">{h.v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
