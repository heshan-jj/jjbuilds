import type { Metadata } from "next"
import { faqs, projects, services, site } from "@/lib/site"

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return site.url
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string
  description: string
  path: string
  type?: "website" | "article"
}): Metadata {
  const url = absoluteUrl(path)
  const socialTitle = title.includes(site.name) ? title : `${title} — ${site.name}`

  return {
    title,
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  }
}

export function organizationJsonLd() {
  const orgId = `${site.url}/#organization`
  const websiteId = `${site.url}/#website`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.description,
        slogan: site.tagline,
        logo: absoluteUrl("/icon"),
        image: absoluteUrl("/opengraph-image"),
        contactPoint: {
          "@type": "ContactPoint",
          email: site.email,
          contactType: "sales",
          availableLanguage: "English",
        },
        areaServed: "Worldwide",
        knowsAbout: [
          "Website design",
          "Web application development",
          "Custom software",
          "SaaS product design",
          "Next.js",
        ],
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            url: `${site.url}/services#${service.slug}`,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
    ],
  }
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} services`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${site.url}/services#${service.slug}`,
        provider: { "@id": `${site.url}/#organization` },
      },
    })),
  }
}

export function workIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} work`,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/work/${project.slug}`,
      name: project.title,
    })),
  }
}

export function projectJsonLd(slug: string) {
  const project = projects.find((item) => item.slug === slug)
  if (!project) return null

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/work/${project.slug}`,
    genre: project.category,
    keywords: project.stack.join(", "),
    creator: { "@id": `${site.url}/#organization` },
  }
}

export function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    mainEntity: { "@id": `${site.url}/#organization` },
  }
}

export function aboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.name}`,
    url: `${site.url}/about`,
    mainEntity: { "@id": `${site.url}/#organization` },
  }
}
