import type { Metadata } from "next"
import { BlurFade } from "@/components/ui/blur-fade"
import { GlowButton } from "@/components/ui/glow-button"
import { PageHero } from "@/components/site/section"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "JJbuilds is a new product studio. Direct access, short loops, and no account-manager layer.",
}

const advantages = [
  {
    title: "Direct access",
    body: "You talk to the people who design and write the code. Feedback does not get translated twice.",
  },
  {
    title: "Speed without slop",
    body: "A new shop has no leftover process. We keep the loop short and the bar high.",
  },
  {
    title: "You keep the work",
    body: "The repo, the design system, and the hosting path stay yours. We are not a lock-in.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio small enough to stay on the brief."
        description={`${site.name} is a product studio for founders and operators who need a website, a web app, or custom software — and want to work with the people actually building it.`}
      />

      <div className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                We started {site.name} because most agency work gets slower the more people sit between the client and the build. We would rather stay small, ship in public, and let the work speak first.
              </p>
              <p>
                That means no invented testimonials and no borrowed logos. The site you are on is the first case study. The three capability studies show how we think about marketing, SaaS, and internal software.
              </p>
            </div>
          </BlurFade>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {advantages.map((item, index) => (
              <BlurFade key={item.title} inView delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-white/8 bg-card p-6">
                  <h2 className="font-display text-xl tracking-tight">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              </BlurFade>
            ))}
          </div>

          <BlurFade inView className="mt-16">
            <GlowButton href="/contact">Start a project</GlowButton>
          </BlurFade>
        </div>
      </div>
    </>
  )
}
