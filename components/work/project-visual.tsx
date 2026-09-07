import { cn } from "@/lib/utils"

const accents = {
  lime: "from-primary/80 via-primary/20 to-transparent",
  warm: "from-amber-300/80 via-orange-500/20 to-transparent",
  steel: "from-sky-200/80 via-slate-500/20 to-transparent",
} as const

export function ProjectVisual({
  accent,
  title,
  className,
}: {
  accent: keyof typeof accents
  title: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[#101010]",
        className
      )}
      aria-hidden
    >
      <div className={cn("absolute -top-16 -right-10 h-56 w-56 rounded-full bg-linear-to-br blur-2xl", accents[accent])} />
      <div className="absolute inset-6 rounded-xl border border-white/10 bg-white/3" />
      <div className="absolute inset-x-10 top-12 h-3 rounded-full bg-white/8" />
      <div className="absolute inset-x-10 top-20 grid grid-cols-3 gap-3">
        <div className="h-24 rounded-lg bg-white/6" />
        <div className="h-24 rounded-lg bg-white/10" />
        <div className="h-24 rounded-lg bg-white/6" />
      </div>
      <div className="absolute inset-x-10 bottom-10 h-16 rounded-lg bg-white/5" />
      <span className="absolute right-8 bottom-8 font-display text-sm tracking-tight text-white/40">
        {title}
      </span>
    </div>
  )
}
