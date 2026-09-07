"use client"

import { useActionState } from "react"
import { submitInquiry, type InquiryState } from "@/lib/actions"
import { budgetRanges, projectTypes, site } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialState: InquiryState = { status: "idle" }

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState)

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/8 p-8">
        <p className="font-display text-2xl tracking-tight">You are in the queue.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" className="h-11" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11"
          />
        </Field>
      </div>

      <Field label="Company" htmlFor="company">
        <Input id="company" name="company" autoComplete="organization" className="h-11" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project type" htmlFor="projectType">
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30"
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-popover">
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget" htmlFor="budget">
          <select
            id="budget"
            name="budget"
            required
            defaultValue=""
            className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30"
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range} className="bg-popover">
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="What are you building?" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Timeline, audience, and anything already decided."
          className="min-h-32"
        />
      </Field>

      {state.status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full px-6 text-sm font-semibold"
        >
          {pending ? "Sending…" : "Send inquiry"}
        </Button>
        <a
          href={`mailto:${site.email}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          or email {site.email}
        </a>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}
