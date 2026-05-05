// Mock data for the portfolio. Edit these fields to personalize.

export const profile = {
  name: "Your Name",
  handle: "yourname.dev",
  role: "Senior Front-End Developer",
  tagline: "Crafting pixel-perfect, performant web experiences for fintech & Web3.",
  location: "Remote · GMT+3:30",
  email: "hello@example.com",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com", handle: "github.com/yourname" },
    { label: "LinkedIn", href: "https://linkedin.com", handle: "linkedin.com/in/yourname" },
    { label: "X / Twitter", href: "https://x.com", handle: "@yourname" }
  ],
  yearsExperience: 7,
  available: true
};

export const about = {
  intro:
    "A front-end developer with 7+ years of experience building responsive web apps in fintech, digital agencies, and startups. I focus on JavaScript, React, TypeScript and shipping pixel-perfect, efficient interfaces.",
  body:
    "From decentralized exchanges and cross-platform crypto wallets to architecture-search platforms — I've contributed across the lifecycle of products: conception, release, and growth. I care about performance, maintainability, and the small details that make software feel inevitable.",
  highlights: [
    { k: "7+", v: "Years building for the web" },
    { k: "8", v: "DeFi sub-apps shipped at Nito Labs" },
    { k: "40–90%", v: "Perf gains on Next.js 13 → 15 upgrade" },
    { k: "3", v: "Junior devs mentored" }
  ]
};

export const experiences = [
  {
    company: "Nito Labs",
    role: "Senior Front-End Developer",
    type: "Full-time · Remote",
    period: "Jan 2021 — Present",
    blurb:
      "Fintech startup specializing in Web3-native solutions and crypto-based digital products.",
    bullets: [
      "Built a decentralized exchange with Next.js spanning eight sub-apps: OBM, reward, lottery, NFT, AMM, auction, DAO, and bridge.",
      "Contributed to a cross-platform crypto wallet — browser extension, desktop app, and PWA — using Next.js.",
      "Implemented a cryptocurrency ledger explorer in React for searching and viewing ledgers, transactions, and related data.",
      "Developed a Web3 gaming platform from scratch, leveraging blockchain for decentralized logic, asset management, and auth.",
      "Integrated smart-contract ABIs with wagmi and established Web3 auth via ConnectKit for secure wallet connections.",
      "Upgraded Next.js 13 → 15, achieving 40–90% improvements across load time, build speed, and bundle size.",
      "Refactored legacy code and introduced TypeScript across teams, improving maintainability and developer productivity."
    ],
    stack: ["Next.js", "React", "TypeScript", "wagmi", "ConnectKit", "Tailwind"]
  },
  {
    company: "Nilasoft",
    role: "Front-End Developer",
    type: "Full-time · Rasht",
    period: "Aug 2019 — Sep 2020",
    blurb: "Digital agency focused on web and mobile application development.",
    bullets: [
      "Collaborated on two Angular + TypeScript projects for agency clients.",
      "Enhanced project performance through targeted data-loading optimizations.",
      "Implemented search and category filters for an architecture-services platform, improving accessibility.",
      "Trained three junior developers on the fundamentals of front-end development."
    ],
    stack: ["Angular", "TypeScript", "SCSS", "REST"]
  },
  {
    company: "Horoof Negar",
    role: "Junior Front-End Developer",
    type: "Full-time · Rasht",
    period: "Jun 2018 — Jun 2019",
    blurb:
      "Real-estate startup eliminating intermediaries between owners and buyers.",
    bullets: [
      "Built a responsive admin and user dashboard, integrating REST APIs to improve user interaction.",
      "Worked closely with UI/UX designers to translate design specs into seamless interfaces.",
      "Used Git for collaborative version control and code reviews.",
      "Practiced agile and pair programming within a cross-functional team."
    ],
    stack: ["JavaScript", "REST", "Git", "Agile"]
  }
];

export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "HTML5", "CSS3"]
  },
  {
    group: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Storybook", "wagmi"]
  },
  {
    group: "Styling",
    items: ["Tailwind", "SCSS", "Less", "Styled Components"]
  },
  {
    group: "Tooling & Workflow",
    items: ["Git", "GitLab", "Agile", "Kanban", "Teamwork"]
  }
];

export const projects = [
  {
    title: "Decentralized Exchange (DEX)",
    org: "Nito Labs",
    summary:
      "A multi-product DEX with eight integrated sub-apps for swapping, trading, governance, and collectibles.",
    tags: ["Next.js", "wagmi", "DeFi", "TypeScript"],
    bullets: ["OBM · AMM · Bridge", "DAO · Auction · Lottery", "NFT · Reward"]
  },
  {
    title: "Cross-Platform Crypto Wallet",
    org: "Nito Labs",
    summary:
      "Self-custody wallet shipped as browser extension, desktop app, and Progressive Web App from a shared Next.js codebase.",
    tags: ["Next.js", "Extension", "PWA", "Desktop"],
    bullets: ["Shared component system", "ConnectKit auth", "Encrypted storage"]
  },
  {
    title: "Ledger Explorer",
    org: "Nito Labs",
    summary:
      "React-based explorer for searching and inspecting ledgers, transactions, and on-chain data.",
    tags: ["React", "Indexing", "Search"],
    bullets: ["Fast search", "Tx inspection", "Responsive UI"]
  },
  {
    title: "Web3 Gaming Platform",
    org: "Nito Labs",
    summary:
      "Built from scratch with on-chain logic for assets, identity, and authentication.",
    tags: ["Web3", "Smart Contracts", "Auth"],
    bullets: ["On-chain assets", "Wallet auth", "Gameplay state"]
  }
];

export const education = [
  {
    school: "University of Guilan",
    degree: "Bachelor of Computer Science",
    period: "Sep 2014 — Jun 2018"
  }
];

export const languages = [
  { name: "English", level: "Proficient" },
  { name: "Persian", level: "Native" }
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];
