"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { navLinks, site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Link000 } from "@/components/ui/skiper-ui/skiper40"
import { GlowButton } from "@/components/ui/glow-button"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [fade, setFade] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setFade(open ? 0 : Math.min(1, Math.max(0, y / 240)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border px-4 sm:px-5",
          fade < 0.85 ? "pointer-events-auto" : "pointer-events-none",
          scrolled
            ? "border-white/12 bg-ink/80 shadow-[0_12px_40px_oklch(0_0_0/0.4)] backdrop-blur-xl"
            : "border-white/10 bg-ink/50 shadow-[0_8px_24px_oklch(0_0_0/0.2)] backdrop-blur-md"
        )}
        style={{
          opacity: 1 - fade,
          transform: `translateY(${fade * -10}px)`,
        }}
      >
        <Link href="/" className="flex items-baseline gap-1 tracking-tight">
          <span className="font-display text-lg font-semibold">{site.shortName}</span>
          <span className="text-sm text-muted-foreground">builds</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link000
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname.startsWith(link.href) && "text-foreground"
              )}
            >
              {link.label}
            </Link000>
          ))}
        </nav>

        <div className="hidden md:block">
          <GlowButton href="/contact" className="h-10 px-5 text-xs">
            Start a project
          </GlowButton>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="bg-ink/95 backdrop-blur-xl">
            <SheetHeader>
              <SheetTitle className="font-display text-left">
                {site.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-lg text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Start a project
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
