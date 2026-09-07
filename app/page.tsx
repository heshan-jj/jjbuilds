import type { Metadata } from "next"
import { ClosingCta } from "@/components/sections/cta"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Process } from "@/components/sections/process"
import { ServicesBento } from "@/components/sections/services"
import { SelectedWork } from "@/components/sections/work"
import { JsonLd } from "@/components/seo/json-ld"
import { faqJsonLd, pageMetadata } from "@/lib/seo"
import { pages } from "@/lib/site"

export const metadata: Metadata = {
  ...pageMetadata({
    title: pages.home.title,
    description: pages.home.description,
    path: pages.home.path,
  }),
  title: { absolute: pages.home.title },
}

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Hero />
      <ServicesBento />
      <SelectedWork />
      <Process />
      <Faq />
      <ClosingCta />
    </>
  )
}
