import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GlowButton } from "@/components/ui/glow-button"
import { ProjectVisual } from "@/components/work/project-visual"
import { getProject, projects } from "@/lib/site"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Work" }
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <article className="px-5 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
          {project.category} · {project.year}
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-4xl tracking-tight sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>

        <ProjectVisual
          accent={project.accent}
          title={project.title}
          className="mt-12 aspect-[21/9] rounded-2xl border border-white/8"
        />

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          <section>
            <h2 className="text-xs tracking-[0.18em] text-primary uppercase">Challenge</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </section>
          <section>
            <h2 className="text-xs tracking-[0.18em] text-primary uppercase">Approach</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.approach}
            </p>
          </section>
          <section>
            <h2 className="text-xs tracking-[0.18em] text-primary uppercase">Result</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.result}
            </p>
          </section>
        </div>

        <ul className="mt-12 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Want this level of craft on a real brief?
          </p>
          <div className="flex gap-3">
            <GlowButton href="/contact">Start a project</GlowButton>
            <Link
              href="/work"
              className="inline-flex h-12 items-center text-sm text-muted-foreground hover:text-foreground"
            >
              Back to work
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
