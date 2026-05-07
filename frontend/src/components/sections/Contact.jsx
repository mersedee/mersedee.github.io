import { useState } from "react";
import { toast } from "sonner";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";

import { profile } from "@/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    // Frontend-only mock: simulate send + open mailto
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      toast.success("Opening your email client…");
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy. Long-press to select.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          index="06"
          eyebrow="Contact"
          title="Let's build something."
          description="Have a role, a project, or just want to chat about React, Web3, or performance? My inbox is open."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-stretch">
          <Reveal variant="left" delay={100} className="lg:col-span-5 flex flex-col gap-6 lg:h-full">
            <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-6 hover-lift hover:border-teal-300/30">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-4 w-4 text-teal-300" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  Direct
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-display text-lg md:text-xl text-zinc-100 hover:text-teal-300 link-underline truncate"
                >
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="shrink-0 h-9 w-9 rounded-md border border-white/10 bg-white/5 hover:bg-teal-300/10 hover:border-teal-300/30 text-zinc-300 hover:text-teal-300 flex items-center justify-center transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-6 hover-lift hover:border-teal-300/30 lg:flex-1">
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">
                Elsewhere
              </div>
              <ul className="space-y-3">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 py-2 border-b border-white/5 hover:border-teal-300/30 transition-colors"
                    >
                      <span className="text-zinc-200 group-hover:text-teal-300 transition-colors">{s.label}</span>
                      <span className="flex items-center gap-2 font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        {s.handle}
                        <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="right" delay={180} className="lg:col-span-7 lg:h-full">
          <form
            onSubmit={onSubmit}
            className="h-full rounded-xl border border-white/10 bg-zinc-950/40 p-6 md:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Ada Lovelace"
                  className="mt-2 bg-black/40 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-teal-300/50 focus-visible:border-teal-300/40"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@company.com"
                  className="mt-2 bg-black/40 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-teal-300/50 focus-visible:border-teal-300/40"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                placeholder="Tell me about your project, role, or idea…"
                className="mt-2 bg-black/40 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-teal-300/50 focus-visible:border-teal-300/40 resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-zinc-500 font-mono">
                {/* mocked: opens default mail client */}
                $ no tracking — just an email.
              </p>
              <Button
                type="submit"
                disabled={submitting}
                className="h-11 px-5 bg-teal-300 text-[#0a0a0b] hover:bg-teal-200 font-medium"
              >
                {submitting ? "Sending…" : "Send message"}
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
