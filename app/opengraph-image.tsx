import { ImageResponse } from "next/og"
import { OgShell, ogSize } from "@/brand/og"
import { site } from "@/lib/site"

export const alt = `${site.name} — ${site.tagline}`
export const size = ogSize
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <OgShell
        title={site.tagline}
        subtitle="Product studio · Web · Apps · Software"
      />
    ),
    size
  )
}
