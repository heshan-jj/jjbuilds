import { ImageResponse } from "next/og"
import { OgShell, ogSize } from "@/brand/og"
import { getProject, projects, site } from "@/lib/site"

export const size = ogSize
export const contentType = "image/png"
export const alt = `${site.name} work`

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export const dynamicParams = false

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  return new ImageResponse(
    (
      <OgShell
        kickerRight={project?.category ?? "Work"}
        title={project?.title ?? "Work"}
        subtitle={project?.blurb ?? site.tagline}
      />
    ),
    size
  )
}
