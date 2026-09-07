import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
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
          <BlurFade key={service.slug} inView delay={index * 0.08} className="h-full">
            <Link
              href={`/services#${service.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-primary/35 sm:p-7"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -right-16 size-52 rounded-full bg-primary/18 blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(0.96_0.012_95/0.07)_1px,transparent_0)] bg-size-[18px_18px] mask-[radial-gradient(ellipse_at_top_right,black,transparent_72%)]" />
              </div>

              <div className="relative flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-primary">{service.number}</span>
                <span className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  {service.eyebrow}
                </span>
              </div>

              <ServiceMark slug={service.slug} />

              <h3 className="font-display relative mt-6 text-3xl tracking-tight">
                {service.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.summary}
              </p>

              <div className="relative mt-8 flex items-center justify-between gap-3 border-t border-white/8 pt-5">
                <span className="text-xs text-muted-foreground">{service.timeline}</span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground">
                  Explore
                  <span className="flex size-8 items-center justify-center rounded-full border border-white/12 bg-white/4 transition-[background-color,border-color,color,transform] duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </span>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}

function ServiceMark({ slug }: { slug: string }) {
  return (
    <div
      aria-hidden
      className="relative mt-6 h-[4.5rem] overflow-hidden rounded-xl border border-white/8 bg-[#101010]"
    >
      <div className="absolute -top-8 -right-6 size-24 rounded-full bg-primary/25 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      {slug === "websites" && (
        <>
          <div className="absolute inset-x-3 top-2.5 flex gap-1">
            <span className="size-1.5 rounded-full bg-primary/80" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
          <div className="absolute inset-x-3 top-6 h-px bg-white/8" />
          <div className="absolute inset-x-4 top-9 h-2 rounded-full bg-white/10" />
          <div className="absolute inset-x-4 bottom-3 grid grid-cols-3 gap-1.5">
            <span className="h-5 rounded-md bg-white/6" />
            <span className="h-5 rounded-md bg-primary/20" />
            <span className="h-5 rounded-md bg-white/6" />
          </div>
        </>
      )}
      {slug === "web-apps" && (
        <>
          <div className="absolute top-2.5 left-2.5 h-[calc(100%-1.25rem)] w-6 rounded-md bg-white/6" />
          <div className="absolute top-3 left-11 h-2 w-16 rounded-full bg-white/12" />
          <div className="absolute right-3 bottom-3 left-11 grid grid-cols-2 gap-1.5">
            <span className="h-8 rounded-md bg-white/7" />
            <span className="h-8 rounded-md bg-primary/18" />
          </div>
        </>
      )}
      {slug === "custom-software" && (
        <>
          <span className="absolute top-4 left-5 size-3.5 rounded-full border border-primary/70 bg-primary/20" />
          <span className="absolute top-5 left-[2.85rem] h-px w-10 bg-white/20" />
          <span className="absolute top-4 left-[6.4rem] size-3.5 rounded-full border border-white/25 bg-white/8" />
          <span className="absolute top-8 left-[1.625rem] h-6 w-px bg-white/16" />
          <span className="absolute bottom-3.5 left-5 size-3.5 rounded-full border border-white/25 bg-white/8" />
          <span className="absolute right-8 bottom-3.5 left-[2.85rem] h-px bg-white/16" />
          <span className="absolute right-6 bottom-3.5 size-3.5 rounded-full border border-primary/50 bg-primary/15" />
        </>
      )}
    </div>
  )
}
