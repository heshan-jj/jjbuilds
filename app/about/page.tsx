import type { Metadata } from "next"
import { ClosingCta } from "@/components/sections/cta"
import { JsonLd } from "@/components/seo/json-ld"
import { BlurFade } from "@/components/ui/blur-fade"
import { GlowButton } from "@/components/ui/glow-button"
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/section"
import { aboutJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { pages, site } from "@/lib/site"

export const metadata: Metadata = pageMetadata(pages.about)

const facts = [
  { label: "Founded", value: "2026" },
  { label: "Model", value: "Direct studio" },
  { label: "Stack", value: "Next.js" },
  { label: "Ownership", value: "You keep the repo" },
  { label: "Reply", value: "Two business days" },
]

const advantages = [
  {
    number: "01",
    title: "Direct access",
    body: "You talk to the people who design and write the code. Feedback does not get translated twice.",
  },
  {
    number: "02",
    title: "Speed without slop",
    body: "A new shop has no leftover process. We keep the loop short and the bar high.",
  },
  {
    number: "03",
    title: "You keep the work",
    body: "The repo, the design system, and the hosting path stay yours. We are not a lock-in.",
  },
]

const fit = {
  good: [
    "Founders launching a first website or product",
    "Operators replacing a spreadsheet with something they can actually run",
    "Teams who want the people writing the code on the call",
  ],
  skip: [
    "Spec work, contests, or free pitch decks",
    "Programs that need a twelve-person bench",
    "Redesign-by-committee with no single owner",
  ],
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <Section className="pt-32 sm:pt-40">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <BlurFade inView>
            <p className="mb-5 text-xs font-medium tracking-[0.22em] text-primary uppercase">
              About
            </p>
            <h1 className="font-display max-w-4xl text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
              A studio small enough to stay on the brief.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.name} builds websites, web apps, and custom software for businesses and
              founders. You work with the people writing the code. This site is the first case
              study — no invented testimonials, no borrowed logos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GlowButton href="/contact">Start a project</GlowButton>
              <GlowButton href="/work" variant="ghost">
                See the work
              </GlowButton>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            <aside className="relative overflow-hidden rounded-3xl border border-white/8 bg-card p-6 sm:p-8">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -right-16 size-56 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(0.96_0.012_95/0.06)_1px,transparent_0)] bg-size-[18px_18px] mask-[radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
              </div>
              <p
                aria-hidden
                className="font-display pointer-events-none absolute -right-1 -bottom-6 text-[7.5rem] leading-none text-white/5 select-none"
              >
                {site.shortName}
              </p>
              <p className="relative text-xs font-medium tracking-[0.22em] text-primary uppercase">
                Studio card
              </p>
              <p className="font-display relative mt-3 text-3xl tracking-tight">{site.name}</p>
              <p className="relative mt-2 text-sm text-muted-foreground">
                Software studio · websites, web apps, custom software
              </p>
              <dl className="relative mt-8 divide-y divide-white/8 border-t border-white/8">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-sm text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </BlurFade>
        </div>
      </Section>

      <Section>
        <BlurFade inView>
          <SectionEyebrow>Why this studio</SectionEyebrow>
          <SectionTitle>Three reasons to hire a small shop.</SectionTitle>
        </BlurFade>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {advantages.map((item, index) => (
            <BlurFade key={item.title} inView delay={index * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/35 sm:p-7">
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-24 -right-16 size-52 rounded-full bg-primary/16 blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-90" />
                </div>
                <span className="font-mono relative text-xs text-primary">{item.number}</span>
                <h3 className="font-display relative mt-6 text-2xl tracking-tight sm:text-3xl">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            </BlurFade>
          ))}
        </div>
      </Section>

      <Section>
        <BlurFade inView>
          <SectionEyebrow>Fit</SectionEyebrow>
          <SectionTitle>We are specific about who we take on.</SectionTitle>
        </BlurFade>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <BlurFade inView className="h-full">
            <div className="h-full rounded-3xl border border-white/8 bg-card p-6 sm:p-8">
              <h3 className="font-display text-2xl tracking-tight">Good fit</h3>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {fit.good.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/6 bg-background/40 px-3 py-3"
                  >
                    <span className="text-primary">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.08} className="h-full">
            <div className="h-full rounded-3xl border border-white/8 bg-card p-6 sm:p-8">
              <h3 className="font-display text-2xl tracking-tight">Not a fit</h3>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {fit.skip.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/6 bg-background/40 px-3 py-3"
                  >
                    <span className="text-muted-foreground/50">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
        </div>
      </Section>

      <ClosingCta />
    </>
  )
}
