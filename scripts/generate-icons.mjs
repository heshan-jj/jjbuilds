import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createElement } from "react"
import { ImageResponse } from "next/og.js"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const appDir = join(root, "app")
const publicDir = join(root, "public")

async function renderPng(size, fontSize) {
  const response = new ImageResponse(
    createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171614",
          color: "#c8f53c",
          fontSize,
          fontWeight: 700,
          letterSpacing: size >= 48 ? -2 : 0,
        },
      },
      "JJ"
    ),
    { width: size, height: size }
  )

  return Buffer.from(await response.arrayBuffer())
}

function pngToIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + 16 * images.length
  const directories = []

  for (const image of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(image.width >= 256 ? 0 : image.width, 0)
    entry.writeUInt8(image.height >= 256 ? 0 : image.height, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(image.data.length, 8)
    entry.writeUInt32LE(offset, 12)
    directories.push(entry)
    offset += image.data.length
  }

  return Buffer.concat([header, ...directories, ...images.map((image) => image.data)])
}

const png48 = await renderPng(48, 22)
const png180 = await renderPng(180, 84)
const png192 = await renderPng(192, 90)

const favicon = pngToIco([
  { width: 48, height: 48, data: png48 },
  { width: 192, height: 192, data: png192 },
])

writeFileSync(join(appDir, "favicon.ico"), favicon)
writeFileSync(join(publicDir, "favicon.ico"), favicon)
writeFileSync(join(publicDir, "icon.png"), png192)
writeFileSync(join(publicDir, "apple-icon.png"), png180)

console.log("Wrote app/favicon.ico, public/favicon.ico, public/icon.png, public/apple-icon.png")
