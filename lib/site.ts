export const site = {
  name: "JJbuilds",
  shortName: "JJ",
  tagline: "Websites, products, and software that ship.",
  description:
    "JJbuilds is a product studio that designs and builds custom websites, web apps, and software for founders who need a product — not a brochure.",
  email: "hello@jjbuilds.dev",
  url: "https://jjbuilds.dev",
  locale: "en_US",
  keywords: [
    "product studio",
    "website design",
    "web app development",
    "custom software",
    "SaaS design",
    "Next.js studio",
  ],
  updatedAt: "2026-09-07",
} as const

export const pages = {
  home: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: "/",
  },
  work: {
    title: "Work & capability studies",
    description:
      "See how JJbuilds approaches marketing websites, SaaS products, and custom ops software — capability studies before the first client logo.",
    path: "/work",
  },
  services: {
    title: "Websites, web apps & custom software",
    description:
      "Website design, web app development, and custom software from JJbuilds. Clear timelines, Next.js builds, and a studio that stays through launch.",
    path: "/services",
  },
  about: {
    title: "About the studio",
    description:
      "JJbuilds is a product studio for founders and operators who want websites, web apps, and custom software built with direct access — no account-manager layer.",
    path: "/about",
  },
  contact: {
    title: "Start a project",
    description:
      "Start a website, web app, or custom software project with JJbuilds. Share a short brief and get a reply within two business days.",
    path: "/contact",
  },
} as const

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const

export const services = [
  {
    slug: "websites",
    number: "01",
    title: "Websites",
    eyebrow: "Marketing & brand",
    summary:
      "Cinematic marketing sites that make the offer obvious and the next step easy.",
    description:
      "We design and ship marketing sites that feel like the product — tight type, motion with purpose, and a path to inquiry. Built in Next.js so you own the code.",
    for: "Studios, founders, and teams launching or repositioning.",
    includes: [
      "Positioning and sitemap",
      "Custom design system",
      "High-craft marketing pages",
      "CMS-ready or static content",
      "SEO, analytics, and handoff",
    ],
    timeline: "3–6 weeks",
  },
  {
    slug: "web-apps",
    number: "02",
    title: "Web apps",
    eyebrow: "Product surfaces",
    summary:
      "Internal tools and customer apps with the same polish as the marketing site.",
    description:
      "Dashboards, portals, and product UIs that people actually enjoy using. We design the flows, then build the interface and the wiring behind it.",
    for: "Teams replacing spreadsheets or standing up a first product.",
    includes: [
      "UX flows and information architecture",
      "Interface design and components",
      "Auth, roles, and data views",
      "API and database integration",
      "Launch support and iteration",
    ],
    timeline: "6–12 weeks",
  },
  {
    slug: "custom-software",
    number: "03",
    title: "Custom software",
    eyebrow: "SaaS & systems",
    summary:
      "Bespoke software when off-the-shelf tools start slowing the business down.",
    description:
      "From an MVP SaaS to an ops system that only your team could invent. We stay close to the problem and ship in slices you can use.",
    for: "Operators with a clear workflow and no patience for generic tools.",
    includes: [
      "Discovery and product brief",
      "Architecture and stack choice",
      "MVP through v1",
      "Integrations and automations",
      "Handoff or ongoing build",
    ],
    timeline: "8–16 weeks",
  },
] as const

export const projects = [
  {
    slug: "northline",
    title: "Northline",
    category: "Website",
    year: "Concept",
    blurb: "A climate studio site that sells the work before the deck.",
    summary:
      "A long-scroll marketing site for a climate consultancy — editorial type, case-led proof, and a single inquiry path.",
    challenge:
      "Technical firms often look interchangeable. Northline needed a site that felt like a point of view, not a services directory.",
    approach:
      "We led with outcomes and field photography, then built a restrained motion system so the research still reads as serious. One CTA. No fake logos.",
    result:
      "A launch-ready site pattern we reuse for expert studios: clear offer, proof, process, and a form that captures real project context.",
    stack: ["Next.js", "Tailwind", "Motion"],
    accent: "lime",
  },
  {
    slug: "ledgerly",
    title: "Ledgerly",
    category: "SaaS",
    year: "Concept",
    blurb: "A freelance finance dashboard that makes cash feel obvious.",
    summary:
      "A product UI for invoicing, runway, and tax-ready exports — designed as a real SaaS, not a mock.",
    challenge:
      "Freelancers bounce between three tools to answer one question: can I take this project?",
    approach:
      "We designed a single home view around runway and incoming cash, then built the invoice and export flows as the first vertical slice.",
    result:
      "A dashboard pattern we bring to SaaS work: one primary number, secondary context, and actions that stay in reach.",
    stack: ["Next.js", "Postgres", "shadcn/ui"],
    accent: "warm",
  },
  {
    slug: "harbor",
    title: "Harbor",
    category: "Custom software",
    year: "Concept",
    blurb: "A field-ops console that replaces the group chat and the spreadsheet.",
    summary:
      "An internal system for dispatch, status, and handoff — built for people who work with their phones, not their laptops.",
    challenge:
      "The team already had a process. The tools just weren’t holding it.",
    approach:
      "We mapped the real morning ritual, then shipped a mobile-first console: jobs, notes, and a status that everyone trusts.",
    result:
      "A custom-software pattern: start with the ritual, ship a thin vertical, then expand only what operators ask for next.",
    stack: ["Next.js", "Auth", "Realtime"],
    accent: "steel",
  },
] as const

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "We get specific about the buyer, the offer, and what “done” looks like. No 40-page decks.",
  },
  {
    number: "02",
    title: "Design",
    body: "Interface, type, and motion in one system. You see the product before we write production code.",
  },
  {
    number: "03",
    title: "Build",
    body: "We ship in slices you can click. Next.js, real data, and a codebase you can keep.",
  },
  {
    number: "04",
    title: "Launch",
    body: "QA, analytics, handoff, and the first week of live support so the launch is quiet on purpose.",
  },
] as const

export const faqs = [
  {
    q: "You're new. Why hire you over a known shop?",
    a: "You work with the people who design and write the code. No account layer, no leftover process, no junior handoff after the pitch. A new studio is a feature if you want speed and a high bar.",
  },
  {
    q: "Where is the client work?",
    a: "This site is the first proof. The three capability studies show how we approach a marketing site, a SaaS, and an ops tool. If the fit is right, we start with a paid discovery week — not a speculative deck.",
  },
  {
    q: "What does a typical engagement cost?",
    a: "Marketing sites usually start in the mid four figures. Apps and custom software are scoped after discovery. We price the first useful slice, not a twelve-month fantasy. If we are the wrong fit, we say so in the first reply.",
  },
  {
    q: "How long until something is live?",
    a: "Most marketing sites see a first useful slice in about four weeks. Product work ships in verticals you can click — not a big-bang reveal at the end.",
  },
  {
    q: "Can you join an existing codebase?",
    a: "Yes, if the goal is clear and the stack is something we can stand behind. We will recommend a rewrite only when keeping the old one would cost you more.",
  },
] as const

export const projectTypes = [
  "Website",
  "Web app",
  "SaaS / product",
  "Custom software",
  "Not sure yet",
] as const

export const budgetRanges = [
  "Under $8k",
  "$8k – $20k",
  "$20k – $50k",
  "$50k+",
  "Let’s talk",
] as const

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
