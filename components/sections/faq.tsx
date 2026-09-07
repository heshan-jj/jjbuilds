import { BlurFade } from "@/components/ui/blur-fade"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/section"
import { faqs } from "@/lib/site"

export function Faq() {
  return (
    <Section>
      <BlurFade inView>
        <SectionEyebrow>Questions</SectionEyebrow>
        <SectionTitle>Straight answers before you write.</SectionTitle>
      </BlurFade>

      <BlurFade inView delay={0.08}>
        <Accordion className="mt-10 border-t border-white/8">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-white/8">
              <AccordionTrigger className="py-5 text-left text-base hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </BlurFade>
    </Section>
  )
}
