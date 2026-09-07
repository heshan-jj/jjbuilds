import { ImageResponse } from "next/og"
import { getProject, projects, site } from "@/lib/site"

export const size = { width: 1200, height: 630 }
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
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#171614",
          color: "#f4f1ea",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c8f53c",
          }}
        >
          <span>{site.name}</span>
          <span style={{ color: "#b8b3a6" }}>{project?.category ?? "Work"}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            {project?.title ?? "Work"}
          </div>
          <div style={{ fontSize: 28, color: "#b8b3a6", maxWidth: 880 }}>
            {project?.blurb ?? site.tagline}
          </div>
        </div>
      </div>
    ),
    size
  )
}
