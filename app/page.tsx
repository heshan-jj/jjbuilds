import { ClosingCta } from "@/components/sections/cta"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Process } from "@/components/sections/process"
import { ServicesBento } from "@/components/sections/services"
import { SelectedWork } from "@/components/sections/work"

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <SelectedWork />
      <Process />
      <Faq />
      <ClosingCta />
    </>
  )
}
