import Link from "next/link"
import { navLinks, site } from "@/lib/site"
import { Link000 } from "@/components/ui/skiper-ui/skiper40"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="font-display text-2xl tracking-tight">
            {site.name}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Footer">
            <div className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <Link000
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link000>
              ))}
              <Link000
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link000>
            </div>
          </nav>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-foreground/80 hover:text-primary"
          >
            {site.email}
          </a>
          <p className="text-xs text-muted-foreground/70">
            © {site.updatedAt.slice(0, 4)} {site.name}. Motion pieces from Skiper UI and Magic UI.
          </p>
        </div>
      </div>
    </footer>
  )
}
