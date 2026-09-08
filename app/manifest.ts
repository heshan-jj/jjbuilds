import type { MetadataRoute } from "next"
import { brand } from "@/brand/tokens"
import { site } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: brand.hex.ink,
    theme_color: brand.hex.ink,
    lang: "en",
    categories: ["business", "design", "developer"],
    icons: [
      {
        src: brand.assets.favicon,
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: brand.assets.icon,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brand.assets.appleIcon,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
