import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/section"
import { ProjectVisual } from "@/components/work/project-visual"
import { projects } from "@/lib/site"

export function SelectedWork() {
  return (
    <Section id="work">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <BlurFade inView>
          <SectionEyebrow>Selected work</SectionEyebrow>
          <SectionTitle>Capability studies — how we think, before the first client logo.</SectionTitle>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-500 ease-smooth hover:text-foreground"
          >
            All work
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </BlurFade>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {projects.map((project, index) => (
          <BlurFade key={project.slug} inView delay={index * 0.08}>
            <Link
              href={`/work/${project.slug}`}
              className="hover-lift group block overflow-hidden rounded-2xl border border-white/8 bg-card"
            >
              <ProjectVisual
                accent={project.accent}
                title={project.title}
                className="aspect-[4/3] transition-transform duration-700 ease-smooth group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              />
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display mt-3 text-xl tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.blurb}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
