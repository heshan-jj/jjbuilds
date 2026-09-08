import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

export function Wordmark({
  className,
  markClassName,
  restClassName,
}: {
  className?: string
  markClassName?: string
  restClassName?: string
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-1 tracking-tight", className)}>
      <span className={cn("font-display font-semibold", markClassName)}>
        {site.shortName}
      </span>
      <span className={cn("text-muted-foreground", restClassName)}>builds</span>
    </span>
  )
}

export function WordmarkName({ className }: { className?: string }) {
  return <span className={cn("font-display tracking-tight", className)}>{site.name}</span>
}
