import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero } from "@/components/site/section"
import { WorkGallery } from "@/components/work/work-gallery"
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
        <div className="mx-auto max-w-6xl">
          <WorkGallery initialProjects={projects} />
        </div>
      </div>
    </>
  )
}
