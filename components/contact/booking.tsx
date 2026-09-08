"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { brand } from "@/brand/tokens"
import { site } from "@/lib/site"

const namespace = "intro"

const pageBg = brand.oklch.ink
const pageFg = brand.oklch.cream
const pageMuted = brand.oklch.muted
const pageCard = brand.oklch.card
const pagePrimary = brand.oklch.lime
const pagePrimaryFg = brand.oklch.primaryForeground
const pageLine = brand.oklch.line

const calCssVars = {
  "cal-brand": pagePrimary,
  "cal-brand-emphasis": pagePrimary,
  "cal-brand-text": pagePrimaryFg,
  "cal-brand-subtle": pagePrimary,
  "cal-brand-accent": pagePrimaryFg,
  "cal-text": pageFg,
  "cal-text-emphasis": pageFg,
  "cal-text-subtle": pageMuted,
  "cal-text-muted": pageMuted,
  "cal-text-inverted": pageBg,
  "cal-bg": pageCard,
  "cal-bg-emphasis": "oklch(0.22 0.012 100)",
  "cal-bg-subtle": "oklch(0.2 0.012 100)",
  "cal-bg-muted": pageCard,
  "cal-bg-inverted": pageFg,
  "cal-border": pageLine,
  "cal-border-emphasis": pageLine,
  "cal-border-subtle": pageLine,
  "cal-border-muted": "transparent",
  "cal-border-booker": "transparent",
  "cal-border-booker-width": "0px",
  radius: "0.75rem",
}

export function BookingCalendar() {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({ namespace })
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: true,
        styles: {
          body: { background: pageCard },
          branding: { brandColor: pagePrimary },
        },
        cssVarsPerTheme: {
          light: calCssVars,
          dark: calCssVars,
        },
      })
    })()
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-card shadow-[0_0_48px_oklch(0.9_0.2_126/0.08)] [&_iframe]:block [&_iframe]:w-full [&_iframe]:bg-card">
      <Cal
        namespace={namespace}
        calLink={site.calLink}
        className="relative w-full"
        style={{ width: "100%", background: pageCard }}
        config={{
          layout: "month_view",
          theme: "dark",
          useSlotsViewOnSmallScreen: "true",
          iframeAttrs: {
            title: `Book an intro with ${site.name}`,
          },
        }}
      />
    </div>
  )
}
