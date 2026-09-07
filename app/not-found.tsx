import { GlowButton } from "@/components/ui/glow-button"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs tracking-[0.22em] text-primary uppercase">404</p>
      <h1 className="font-display mt-4 text-4xl tracking-tight">That page does not exist.</h1>
      <div className="mt-8">
        <GlowButton href="/">Back home</GlowButton>
      </div>
    </div>
  )
}
