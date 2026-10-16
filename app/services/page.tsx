import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero } from "@/components/site/section"
import { ServicesList } from "@/components/services/services-list"
import { breadcrumbJsonLd, pageMetadata, servicesJsonLd } from "@/lib/seo"
import { pages, services } from "@/lib/site"

export const metadata: Metadata = pageMetadata(pages.services)

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          servicesJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Pick the surface. We stay through launch."
        description="Websites, product interfaces, and custom systems. Same studio, same standard: it has to ship and it has to look like you meant it."
      />

      <div className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <ServicesList items={services} />
        </div>
      </div>
    </>
  )
}
