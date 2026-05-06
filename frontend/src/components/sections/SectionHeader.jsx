import React from "react";
import Reveal from "../Reveal";

const SectionHeader = ({ index, eyebrow, title, description }) => {
  return (
    <div className="max-w-3xl">
      <Reveal variant="left">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-teal-300">{index}.</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">{eyebrow}</span>
          <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
      </Reveal>
      <Reveal variant="up" delay={80}>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-zinc-100 leading-tight tracking-tight">
          {title}
        </h3>
      </Reveal>
      {description && (
        <Reveal variant="up" delay={160}>
          <p className="mt-4 text-zinc-400 text-base md:text-lg leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeader;
