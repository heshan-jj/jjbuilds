import { BlurFade } from "@/components/ui/blur-fade"
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/section"
import { processSteps } from "@/lib/site"

export function Process() {
  return (
    <Section>
      <BlurFade inView>
        <SectionEyebrow>How we work</SectionEyebrow>
        <SectionTitle>A short path from brief to something you can click.</SectionTitle>
      </BlurFade>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <BlurFade key={step.number} inView delay={index * 0.06}>
            <li className="h-full bg-background p-6 sm:p-7">
              <span className="font-mono text-xs text-primary">{step.number}</span>
              <h3 className="font-display mt-5 text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          </BlurFade>
        ))}
      </ol>
    </Section>
  )
}
