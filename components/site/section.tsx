import { cn } from "@/lib/utils"

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn("relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-medium tracking-[0.22em] text-primary uppercase">
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        "font-display max-w-3xl text-3xl leading-[1.1] tracking-tight text-balance sm:text-5xl",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-xs font-medium tracking-[0.22em] text-primary uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display max-w-4xl text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </header>
  )
}
