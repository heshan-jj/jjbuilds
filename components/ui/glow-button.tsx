import Link from "next/link"
import { cn } from "@/lib/utils"

type GlowButtonProps = {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "primary" | "ghost"
}

function isNativeHref(href: string) {
  return (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  )
}

export function GlowButton({
  href,
  children,
  className,
  variant = "primary",
}: GlowButtonProps) {
  const classes =
    variant === "ghost"
      ? cn(
          "inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/5",
          className
        )
      : cn(
          "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_0_0_oklch(0.9_0.2_126/0)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_oklch(0.9_0.2_126/0.45)] active:translate-y-0",
          className
        )

  const content =
    variant === "ghost" ? (
      children
    ) : (
      <>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shine group-hover:opacity-100"
        />
        <span className="relative">{children}</span>
      </>
    )

  if (isNativeHref(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
