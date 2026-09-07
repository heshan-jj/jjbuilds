import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/section"
import { services } from "@/lib/site"

export function ServicesBento() {
  return (
    <Section id="services">
      <BlurFade inView>
        <SectionEyebrow>What we build</SectionEyebrow>
        <SectionTitle>Three offers. One studio that stays on the work.</SectionTitle>
      </BlurFade>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {services.map((service, index) => (
          <BlurFade key={service.slug} inView delay={index * 0.08}>
            <Link
              href={`/services#${service.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card p-6 transition-colors hover:border-primary/30 sm:p-8"
            >
              {index === 0 && (
                <BorderBeam
                  size={90}
                  duration={8}
                  colorFrom="oklch(0.9 0.2 126)"
                  colorTo="transparent"
                />
              )}
              <span className="font-mono text-xs text-primary">{service.number}</span>
              <h3 className="font-display mt-6 text-2xl tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.summary}
              </p>
              <span className="mt-8 inline-flex items-center gap-1 text-sm text-foreground">
                Explore
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
