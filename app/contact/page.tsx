import type { Metadata } from "next"
import { BookingCalendar } from "@/components/contact/booking"
import { JsonLd } from "@/components/seo/json-ld"
import { BlurFade } from "@/components/ui/blur-fade"
import { GlowButton } from "@/components/ui/glow-button"
import { PageHero } from "@/components/site/section"
import { breadcrumbJsonLd, contactJsonLd, pageMetadata } from "@/lib/seo"
import { pages, site } from "@/lib/site"

export const metadata: Metadata = pageMetadata(pages.contact)

function SocialGlyph({ name }: { name: (typeof site.socials)[number]["name"] }) {
  const className = "size-4"

  if (name === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
      </svg>
    )
  }

  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function inquiryMailto() {
  const subject = "Project inquiry"
  const body = ["What I'm building:", "", "Timeline:", "", "Budget (optional):", ""].join("\n")
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactPage() {
  const mailto = inquiryMailto()

  return (
    <>
      <JsonLd
        data={[
          contactJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us what needs to ship."
        description="Book a 15-minute intro. If you would rather write, email works too."
      />

      <div className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(20rem,30rem)_minmax(0,1fr)] lg:gap-16">
          <BlurFade inView>
            <BookingCalendar />
          </BlurFade>

          <BlurFade inView delay={0.08} className="lg:sticky lg:top-28">
            <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
              Prefer email
            </p>
            <a
              href={mailto}
              className="font-display mt-4 block text-2xl tracking-tight break-all transition-colors duration-500 ease-smooth hover:text-primary sm:text-3xl"
            >
              {site.email}
            </a>
            <div className="mt-5 flex items-center gap-2">
              {site.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/4 text-muted-foreground transition-[background-color,border-color,color,transform] duration-500 ease-smooth hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <SocialGlyph name={social.name} />
                </a>
              ))}
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Three lines are enough: what you are building, when you need it, and a budget if you
              have one.
            </p>
            <div className="mt-8">
              <GlowButton href={mailto}>Open email</GlowButton>
            </div>
          </BlurFade>
        </div>
      </div>
    </>
  )
}
