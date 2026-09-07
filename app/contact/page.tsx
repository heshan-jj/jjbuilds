import type { Metadata } from "next"
import { InquiryForm } from "@/components/contact/inquiry-form"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero } from "@/components/site/section"
import { breadcrumbJsonLd, contactJsonLd, pageMetadata } from "@/lib/seo"
import { pages, site } from "@/lib/site"

export const metadata: Metadata = pageMetadata(pages.contact)

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          contactJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us what needs to ship."
        description="A short brief is enough. If the fit is wrong, we will say so. If it is right, we will propose a first slice."
      />

      <div className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.7fr]">
          <InquiryForm />
          <aside className="space-y-6 text-sm text-muted-foreground">
            <div>
              <p className="text-xs tracking-[0.18em] text-primary uppercase">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-foreground hover:text-primary"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] text-primary uppercase">Expect</p>
              <p className="mt-2 leading-relaxed">
                A reply within two business days with either a no, a clarifying question, or a proposed discovery week.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
