import type { Metadata } from "next"
import { GlowButton } from "@/components/ui/glow-button"

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist on JJbuilds.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs tracking-[0.22em] text-primary uppercase">404</p>
      <h1 className="font-display mt-4 text-4xl tracking-tight">That page does not exist.</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        The page you were looking for has moved or was never here.
      </p>
      <div className="mt-8">
        <GlowButton href="/">Back home</GlowButton>
      </div>
    </div>
  )
}
