import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createElement as h } from "react"
import { ImageResponse } from "next/og.js"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const outDir = join(root, "public", "brand")

const ink = "#171614"
const lime = "#c8f53c"
const cream = "#f4f1ea"
const muted = "#b8b3a6"

const width = 2400
const height = 400

const response = new ImageResponse(
  h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 160px",
        background: ink,
        color: cream,
        position: "relative",
        overflow: "hidden",
      },
    },
    h("div", {
      style: {
        position: "absolute",
        top: -120,
        left: 80,
        width: 420,
        height: 420,
        borderRadius: 999,
        background: "rgba(200, 245, 60, 0.16)",
      },
    }),
    h("div", {
      style: {
        position: "absolute",
        right: 40,
        bottom: -160,
        width: 380,
        height: 380,
        borderRadius: 999,
        background: "rgba(200, 245, 60, 0.1)",
      },
    }),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 14,
        },
      },
      h(
        "div",
        {
          style: {
            fontSize: 28,
            letterSpacing: 10,
            fontWeight: 700,
            color: lime,
            textTransform: "uppercase",
          },
        },
        "JJBUILDS"
      ),
      h(
        "div",
        {
          style: {
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1,
            maxWidth: 1280,
          },
        },
        "Websites, products, and software that ship."
      )
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 24,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: muted,
        },
      },
      "Product studio"
    )
  ),
  { width, height }
)

mkdirSync(outDir, { recursive: true })
const file = join(outDir, "linkedin-cover.png")
writeFileSync(file, Buffer.from(await response.arrayBuffer()))
console.log(`Wrote ${file} (${width}x${height})`)
