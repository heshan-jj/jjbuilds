import { BlurFade } from "@/components/ui/blur-fade"
import { GlowButton } from "@/components/ui/glow-button"
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-[-20%] left-1/2 h-[445px] w-[616px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px] animate-hero-orb" />
        <div className="absolute right-[-10%] bottom-0 size-[274px] rounded-full bg-primary/18 blur-[80px] animate-hero-orb-alt" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(0.96_0.012_95/0.06)_1px,transparent_0)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <ProgressiveBlur position="bottom" height="120px" backgroundColor="#1a1914" />
      </div>

      <div className="mx-auto max-w-6xl">
        <BlurFade delay={0.05} inView>
          <p className="mb-6 text-xs font-medium tracking-[0.24em] text-primary uppercase">
            Software studio
          </p>
        </BlurFade>

        <h1 className="font-display max-w-5xl text-5xl leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
          <BlurFade delay={0.12} inView>
            <span className="block">Websites, products,</span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <span className="block text-foreground/80">and software that ship.</span>
          </BlurFade>
        </h1>

        <BlurFade delay={0.3} inView>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GlowButton href="/contact">Start a project</GlowButton>
            <GlowButton href="/work" variant="ghost">
              See the work
            </GlowButton>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
