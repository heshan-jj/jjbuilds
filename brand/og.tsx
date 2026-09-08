import type { ReactNode } from "react"
import { site } from "@/lib/site"
import { brand } from "@/brand/tokens"

export const ogSize = { width: 1200, height: 630 }

export function OgShell({
  kicker,
  kickerRight,
  title,
  subtitle,
}: {
  kicker?: ReactNode
  kickerRight?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: brand.hex.ink,
        color: brand.hex.cream,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: kickerRight ? 24 : 28,
          letterSpacing: kickerRight ? 4 : 6,
          textTransform: "uppercase",
          color: brand.hex.lime,
        }}
      >
        <span>{kicker ?? site.name}</span>
        {kickerRight ? (
          <span style={{ color: brand.hex.muted }}>{kickerRight}</span>
        ) : null}
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
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 28, color: brand.hex.muted, maxWidth: 880 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  )
}
