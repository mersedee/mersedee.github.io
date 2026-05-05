import React from "react";
import { Button } from "../ui/button";
import { profile } from "../../mock";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative pt-20 md:pt-28 pb-24 md:pb-32 bg-noise">
      <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-20 right-[-10%] w-[520px] h-[520px] accent-glow float-slow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300"></span>
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
            {profile.available ? "Available for new opportunities" : "Currently engaged"}
          </span>
        </div>

        <p className="font-mono text-sm text-teal-300 mb-4">$ whoami</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-zinc-100 leading-[0.95] tracking-tight">
          {profile.name}.
        </h1>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-500 mt-3 leading-[1.05]">
          I build for the <span className="text-zinc-200">decentralized</span> web<span className="cursor-blink"></span>
        </h2>

        <p className="mt-8 max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed">
          {profile.tagline} {profile.yearsExperience}+ years shipping production interfaces with React, Next.js and TypeScript across fintech, Web3 and digital agencies.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            onClick={() => scrollTo("projects")}
            className="h-11 px-5 rounded-md bg-teal-300 text-[#0a0a0b] hover:bg-teal-200 font-medium"
          >
            View selected work <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button
            onClick={() => scrollTo("contact")}
            variant="outline"
            className="h-11 px-5 rounded-md bg-transparent border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:text-teal-300 hover:border-zinc-600"
          >
            Contact me
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 max-w-3xl border-t border-white/5 pt-8">
          <Stat label="Experience" value={`${profile.yearsExperience}+ yrs`} />
          <Stat label="Focus" value="React · Next.js" />
          <Stat label="Domain" value="Fintech · Web3" />
          <Stat label="Location" value={profile.location} icon={<MapPin className="h-3 w-3" />} />
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="mt-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-teal-300 transition-colors"
        >
          Scroll <ArrowDown className="h-3 w-3 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

const Stat = ({ label, value, icon }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</div>
    <div className="text-zinc-200 text-sm md:text-base flex items-center gap-1.5">
      {icon}
      <span>{value}</span>
    </div>
  </div>
);

export default Hero;
