"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { GlowButton } from "@/components/ui/glow-button"
import { HoldToConfirm } from "@/components/interior/hold-to-confirm"
import { Section } from "@/components/site/section"

export function ClosingCta() {
  const copyTemplate = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(
        "Hi Heshan,\n\nI have a project in mind:\n- What we are building:\n- Desired timeline:\n- Estimated budget:\n\nLooking forward to speaking!"
      )
    }
  }

  return (
    <Section id="next-step">
      <BlurFade inView>
        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
          <BorderBeam
            size={140}
            duration={10}
            colorFrom="oklch(0.9 0.2 126)"
            colorTo="oklch(0.9 0.2 126 / 0)"
          />
          <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
            Next step
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl tracking-tight text-balance sm:text-5xl">
            Have a product that needs to exist?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tell us what you are building. If we are the wrong studio, we will say so in the first reply.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton href="/contact">Start a project</GlowButton>
            <HoldToConfirm
              onConfirm={copyTemplate}
              confirmLabel="Brief template copied!"
              duration={1400}
            >
              Hold to copy brief template
            </HoldToConfirm>
          </div>
        </div>
      </BlurFade>
    </Section>
  )
}
