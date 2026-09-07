import { Plus } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GlowButton } from "@/components/ui/glow-button"
import { Section } from "@/components/site/section"
import { faqs } from "@/lib/site"

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <BlurFade inView className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-primary uppercase">
            FAQ
          </p>
          <h2 className="font-display max-w-md text-3xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Ask the awkward stuff first.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            A new studio should be easy to interrogate. If an answer is missing, write anyway.
          </p>
          <div className="mt-8 hidden lg:block">
            <GlowButton href="/contact">Start a project</GlowButton>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.08}>
          <Accordion className="flex flex-col gap-3">
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                className="overflow-hidden rounded-2xl border border-white/8 bg-card not-last:border-b-0 transition-colors data-open:border-primary/35 data-open:bg-primary/4"
              >
                <AccordionTrigger className="items-center gap-4 px-5 py-5 text-left text-base font-medium hover:no-underline sm:px-6 [&_[data-slot=accordion-trigger-icon]]:hidden">
                  <span className="font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display flex-1 text-lg tracking-tight sm:text-xl">
                    {item.q}
                  </span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-background/40">
                    <Plus className="size-3.5 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pl-[4.25rem] sm:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 lg:hidden">
            <GlowButton href="/contact">Start a project</GlowButton>
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}
