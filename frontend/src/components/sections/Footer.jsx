import { profile } from "@/mock";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 bg-[#070708]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-zinc-500">
            <span className="text-teal-300">~/</span>{profile.handle}
          </div>
          <p className="mt-2 text-zinc-400 text-sm">
            Designed & built with care · © {year} {profile.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-zinc-400 hover:text-teal-300 link-underline"
            >
              {s.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs text-zinc-400 hover:text-teal-300 link-underline"
          >
            Email
          </a>
        </div>
      </div>
      <div className="shimmer-divider" />
    </footer>
  );
};

export default Footer;
