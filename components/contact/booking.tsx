"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { site } from "@/lib/site"

const namespace = "intro"

const pageBg = "oklch(0.125 0.012 100)"
const pageFg = "oklch(0.96 0.012 95)"
const pageMuted = "oklch(0.72 0.02 95)"
const pageCard = "oklch(0.17 0.012 100)"
const pagePrimary = "oklch(0.9 0.2 126)"
const pagePrimaryFg = "oklch(0.16 0.03 126)"
const pageLine = "oklch(0.96 0.012 95 / 10%)"

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
