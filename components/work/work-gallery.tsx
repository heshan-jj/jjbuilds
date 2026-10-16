"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { SegmentedControl } from "@/components/interior/segmented-control"
import { ProjectVisual } from "@/components/work/project-visual"
import type { projects } from "@/lib/site"

type Project = (typeof projects)[number]

const FILTER_OPTIONS = [
  { value: "all", label: "All studies" },
  { value: "Website", label: "Websites" },
  { value: "SaaS", label: "SaaS" },
  { value: "Ops tool", label: "Ops tools" },
]

export function WorkGallery({ initialProjects }: { initialProjects: readonly Project[] }) {
  const [filter, setFilter] = useState("all")

  const filtered = initialProjects.filter(
    (p) => filter === "all" || p.category.toLowerCase() === filter.toLowerCase()
  )

  return (
    <div className="space-y-10">
      <div className="flex justify-center sm:justify-start">
        <SegmentedControl
          label="Filter capability studies"
          options={FILTER_OPTIONS}
          value={filter}
          onValueChange={setFilter}
        />
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => {
            const isWide = filter === "all" && index === 0
            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={isWide ? "md:col-span-2" : ""}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="hover-lift group block overflow-hidden rounded-2xl border border-white/8 bg-card"
                >
                  <ProjectVisual
                    accent={project.accent}
                    title={project.title}
                    className={
                      isWide
                        ? "aspect-[4/3] transition-transform duration-700 ease-smooth group-hover:scale-[1.03] motion-reduce:group-hover:scale-100 md:aspect-[21/9]"
                        : "aspect-[16/10] transition-transform duration-700 ease-smooth group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    }
                  />
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex gap-3">
                        <span className="font-medium text-primary">{project.category}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>
                      <span className="font-mono text-[11px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View case study →
                      </span>
                    </div>
                    <h2 className="font-display mt-3 text-3xl tracking-tight">
                      {project.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
