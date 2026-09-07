import type { Metadata } from "next"
import Link from "next/link"
import { BlurFade } from "@/components/ui/blur-fade"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero } from "@/components/site/section"
import { ProjectVisual } from "@/components/work/project-visual"
import { breadcrumbJsonLd, pageMetadata, workIndexJsonLd } from "@/lib/seo"
import { pages, projects } from "@/lib/site"

export const metadata: Metadata = pageMetadata(pages.work)

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={[
          workIndexJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Work"
        title="Capability studies, not invented clients."
        description="Until the first logos arrive, these three builds show how we approach a marketing site, a SaaS, and a custom ops tool."
      />

      <div className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <BlurFade key={project.slug} inView delay={index * 0.08}>
              <Link
                href={`/work/${project.slug}`}
                className={`group block overflow-hidden rounded-2xl border border-white/8 bg-card ${index === 0 ? "md:col-span-2" : ""}`}
              >
                <ProjectVisual
                  accent={project.accent}
                  title={project.title}
                  className={index === 0 ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[16/10]"}
                />
                <div className="p-6 sm:p-8">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h2 className="font-display mt-3 text-3xl tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </>
  )
}
