import type { Metadata } from "next"
import { BlurFade } from "@/components/ui/blur-fade"
import { GlowButton } from "@/components/ui/glow-button"
import { PageHero } from "@/components/site/section"
import { services } from "@/lib/site"

export const metadata: Metadata = {
  title: "Services",
  description:
    "JJbuilds designs and builds websites, web apps, and custom software — with a timeline and a clear include list.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Pick the surface. We stay through launch."
        description="Websites, product interfaces, and custom systems. Same studio, same standard: it has to ship and it has to look like you meant it."
      />

      <div className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-6">
          {services.map((service, index) => (
            <BlurFade key={service.slug} inView delay={index * 0.06}>
              <article className="grid gap-8 rounded-2xl border border-white/8 bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="font-mono text-xs text-primary">{service.number}</p>
                  <h2 className="font-display mt-3 text-3xl tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    {service.eyebrow}
                  </p>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Typical timeline · {service.timeline}
                  </p>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-foreground/90">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Best for: {service.for}
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl text-center">
          <GlowButton href="/contact">Start a project</GlowButton>
        </div>
      </div>
    </>
  )
}
