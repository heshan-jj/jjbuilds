import Link from "next/link"
import { WordmarkName } from "@/brand/wordmark"
import { navLinks, site } from "@/lib/site"
import { UnderlineLink } from "@/components/ui/underline-link"
import { CopyButton } from "@/components/interior/copy-button"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="transition-colors duration-500 ease-smooth hover:text-primary">
            <WordmarkName className="text-2xl" />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Footer">
            <div className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <UnderlineLink
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors duration-500 ease-smooth hover:text-foreground"
                >
                  {link.label}
                </UnderlineLink>
              ))}
              <UnderlineLink
                href="/contact"
                className="text-sm text-muted-foreground transition-colors duration-500 ease-smooth hover:text-foreground"
              >
                Contact
              </UnderlineLink>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-foreground/80 transition-colors duration-500 ease-smooth hover:text-primary"
            >
              {site.email}
            </a>
            <CopyButton
              value={site.email}
              label="Copy"
              copiedLabel="Copied"
              variant="minimal"
              className="h-7 px-2 text-[11px]"
            />
          </div>
          <p className="text-xs text-muted-foreground/70">
            © {site.updatedAt.slice(0, 4)} {site.name}. Micro-interactions from interior.dev.
          </p>
        </div>
      </div>
    </footer>
  )
}
