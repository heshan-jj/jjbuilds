import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Section } from "@/components/site/section"
import { stats } from "@/lib/site"

export function Stats() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="grid gap-8 border-y border-white/8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.label} inView delay={index * 0.06}>
            <div>
              <p className="font-display text-5xl tracking-tight">
                <NumberTicker
                  value={stat.value}
                  className="text-foreground"
                />
                {stat.suffix}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
