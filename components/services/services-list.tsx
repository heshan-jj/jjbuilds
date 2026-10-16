"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { SegmentedControl } from "@/components/interior/segmented-control"
import { GlowButton } from "@/components/ui/glow-button"
import type { services } from "@/lib/site"

type Service = (typeof services)[number]

const FILTER_OPTIONS = [
  { value: "all", label: "All services" },
  { value: "websites", label: "Websites" },
  { value: "web-apps", label: "Web apps" },
  { value: "custom-software", label: "Custom software" },
]

export function ServicesList({ items }: { items: readonly Service[] }) {
  const [filter, setFilter] = useState("all")

  const filtered = items.filter((s) => filter === "all" || s.slug === filter)

  return (
    <div className="space-y-8">
      <div className="flex justify-center sm:justify-start">
        <SegmentedControl
          label="Filter services by capability"
          options={FILTER_OPTIONS}
          value={filter}
          onValueChange={setFilter}
        />
      </div>

      <motion.div layout className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((service) => (
            <motion.article
              key={service.slug}
              id={service.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="hover-lift relative grid scroll-mt-28 gap-8 overflow-hidden rounded-3xl border border-white/8 bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-primary/12 blur-3xl"
              />
              <div>
                <p className="font-mono text-xs text-primary">{service.number}</p>
                <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  {service.eyebrow}
                </p>
                <p className="mt-6 inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-muted-foreground">
                  Typical timeline · {service.timeline}
                </p>
              </div>
              <div>
                <p className="text-base leading-relaxed text-foreground/90">
                  {service.description}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Best for: {service.for}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-white/6 bg-background/40 px-3 py-2 transition-[border-color,background-color] duration-500 ease-smooth hover:border-primary/25 hover:bg-primary/5"
                    >
                      <span className="text-primary">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="pt-8 text-center">
        <GlowButton href="/contact">Start a project</GlowButton>
      </div>
    </div>
  )
}
