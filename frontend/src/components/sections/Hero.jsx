import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/mock";

const Hero = () => {
  const orbRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const orb = orbRef.current;
      if (!orb) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      orb.style.setProperty("--mx", x.toFixed(2));
      orb.style.setProperty("--my", y.toFixed(2));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Each word/line gets a staggered entrance
  const step = (i) => ({ animationDelay: `${i * 90}ms` });

  return (
    <section id="top" className="relative pt-20 md:pt-28 pb-24 md:pb-32 bg-noise">
      <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div
        ref={orbRef}
        className="hero-orb absolute -top-20 right-[-10%] w-[520px] h-[520px] accent-glow float-slow pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-6 md:mb-8 hero-rise" style={step(0)}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300" />
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
            {profile.available ? "Available for new opportunities" : "Currently engaged"}
          </span>
        </div>

        <p className="font-mono text-sm text-teal-300 mb-4 hero-rise" style={step(1)}>$ whoami</p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-zinc-100 leading-[0.95] tracking-tight">
          <span className="word-mask" style={step(2)}>{profile.name}.</span>
        </h1>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-500 mt-3 leading-[1.05]">
          <span className="word-mask mr-[0.25em]" style={step(3)}>I build</span>
          <span className="word-mask mr-[0.25em] text-zinc-200" style={step(4)}>modern products</span>
          <span className="word-mask" style={step(5)}>for the web</span>
          <span className="cursor-blink" />
        </h2>

        <p className="mt-8 max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed hero-rise" style={step(6)}>
          {profile.tagline} {profile.yearsExperience}+ years shipping production interfaces with React, Next.js and TypeScript across fintech, Web3 and digital agencies.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3 hero-rise" style={step(7)}>
          <Button className="h-11 px-5 rounded-md bg-teal-300 text-[#0a0a0b] hover:bg-teal-200 font-medium">
            Download resume
          </Button>
          <Button
            onClick={() => scrollTo("contact")}
            variant="outline"
            className="h-11 px-5 rounded-md bg-transparent border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:text-teal-300 hover:border-zinc-600"
          >
            Contact me
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-[0.85fr_1fr_1fr_1.35fr] gap-x-6 gap-y-6 max-w-5xl border-t border-white/5 pt-8">
          <Stat label="Experience" value={`${profile.yearsExperience}+ yrs`} delay={8} step={step} />
          <Stat label="Focus" value="React · Next.js" delay={9} step={step} />
          <Stat label="Domain" value="Fintech · Web3" delay={10} step={step} />
          <Stat label="Location" value={profile.location} icon={<MapPin className="h-3 w-3" />} delay={11} step={step} />
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="mt-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-teal-300 hero-rise"
          style={step(12)}
        >
          Scroll <ArrowDown className="h-3 w-3 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

const Stat = ({ label, value, icon, delay, step }) => (
  <div className="hero-rise" style={step(delay)}>
    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</div>
    <div className="text-zinc-200 text-sm md:text-base flex items-center gap-1.5 whitespace-nowrap">
      {icon}
      <span>{value}</span>
    </div>
  </div>
);

export default Hero;
