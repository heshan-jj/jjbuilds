"use client"

import { useState } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/section"
import { TaskSteps } from "@/components/interior/task-steps"
import { processSteps } from "@/lib/site"
import { cn } from "@/lib/utils"

const taskStepItems = [
  { id: "01", label: "01 Discover: Scope & definitions", meta: "Days 1–2" },
  { id: "02", label: "02 Design: System, type & motion", meta: "Week 1" },
  { id: "03", label: "03 Build: Clickable slices in Next.js", meta: "Weeks 2–3" },
  { id: "04", label: "04 Launch: QA, handoff & quiet go-live", meta: "Day 14" },
]

export function Process() {
  const [activeStep, setActiveStep] = useState(2) // Defaults to "Build" phase

  return (
    <Section id="process">
      <BlurFade inView>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>How we work</SectionEyebrow>
            <SectionTitle>A short path from brief to something you can click.</SectionTitle>
          </div>
          <div className="w-full max-w-sm rounded-2xl border border-white/8 bg-card/60 p-4 backdrop-blur-md">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <span className="text-[11px] font-medium tracking-[0.16em] text-primary uppercase">
                Sprint pipeline
              </span>
              <span className="font-mono text-[10.5px] text-muted-foreground">
                Step {activeStep + 1} of {taskStepItems.length}
              </span>
            </div>
            <TaskSteps
              steps={taskStepItems}
              current={activeStep}
              onStepSelect={(idx) => setActiveStep(idx)}
              label="Development stages"
            />
          </div>
        </div>
      </BlurFade>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => {
          const isSelected = activeStep === index
          return (
            <BlurFade key={step.number} inView delay={index * 0.06}>
              <li
                onClick={() => setActiveStep(index)}
                className={cn(
                  "group relative h-full cursor-pointer p-6 transition-[background-color,border-color,box-shadow] duration-500 ease-smooth sm:p-7",
                  isSelected
                    ? "bg-card shadow-[inset_0_0_0_1px_oklch(0.9_0.2_126/0.4)]"
                    : "bg-background hover:bg-card/70"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{step.number}</span>
                  {isSelected && (
                    <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_oklch(0.9_0.2_126)]" />
                  )}
                </div>
                <h3 className="font-display mt-5 text-2xl tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            </BlurFade>
          )
        })}
      </ol>
    </Section>
  )
}
