"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const POP = { type: "spring", stiffness: 640, damping: 22, mass: 0.7 } as const;
const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const STILL = { duration: 0 } as const;

export type TaskStep = {
  id: string;
  label: string;
  meta?: string;
  description?: string;
};

export type TaskStepStatus = "pending" | "active" | "done" | "error";

export type UseTaskStepsOptions = {
  steps: TaskStep[];
  current: number;
  failed?: boolean;
};

export function useTaskSteps({ steps, current, failed = false }: UseTaskStepsOptions) {
  const complete = !failed && current >= steps.length;

  const rows = steps.map((step, i) => ({
    ...step,
    status: (i < current
      ? "done"
      : i === current && failed
        ? "error"
        : i === current && !complete
          ? "active"
          : "pending") as TaskStepStatus,
  }));

  const active = rows.find((r) => r.status === "active");
  const sentence = failed
    ? `Failed at ${steps[Math.min(current, steps.length - 1)]?.label ?? "step"}`
    : complete
      ? `All ${steps.length} steps complete`
      : active
        ? `${active.label}, step ${current + 1} of ${steps.length}`
        : "";

  return { rows, complete, failed, sentence };
}

const Tick = (
  <svg viewBox="0 0 256 256" width="10" height="10" fill="none" aria-hidden="true">
    <polyline
      points="216 72 104 184 48 128"
      stroke="currentColor"
      strokeWidth="28"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Cross = (
  <svg viewBox="0 0 256 256" width="10" height="10" fill="none" aria-hidden="true">
    <path
      d="M200 56 56 200 M56 56l144 144"
      stroke="currentColor"
      strokeWidth="28"
      strokeLinecap="round"
    />
  </svg>
);

const Arc = ({ spin }: { spin: boolean }) => (
  <motion.svg
    viewBox="0 0 16 16"
    className="size-3.5 text-primary"
    aria-hidden="true"
    animate={spin ? { rotate: 360 } : { rotate: 0 }}
    transition={spin ? { duration: 0.85, ease: "linear", repeat: Infinity } : STILL}
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.2"
      strokeWidth="2"
    />
    <path
      d="M8 2 a6 6 0 0 1 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export type TaskStepsProps = UseTaskStepsOptions & {
  label?: string;
  className?: string;
  onStepSelect?: (index: number) => void;
};

export function TaskSteps({
  steps,
  current,
  failed = false,
  label = "Task progress",
  className = "",
  onStepSelect,
}: TaskStepsProps) {
  const { rows, complete, sentence } = useTaskSteps({ steps, current, failed });
  const reduced = useReducedMotion() === true;

  const [spoken, setSpoken] = useState("");
  useEffect(() => {
    if (!sentence) return;
    const t = setTimeout(() => setSpoken(sentence), 500);
    return () => clearTimeout(t);
  }, [sentence]);

  return (
    <div className={cn("w-full", className)}>
      <ol aria-label={label} className="space-y-1.5">
        {rows.map((row, i) => {
          const isCurrent = row.status === "active";
          const isDone = row.status === "done";
          const isPending = row.status === "pending";

          return (
            <li
              key={row.id}
              aria-current={isCurrent ? "step" : undefined}
              onClick={() => onStepSelect?.(i)}
              className={cn(
                "group flex min-h-10 items-center gap-3 rounded-xl border border-white/6 px-3.5 py-2 transition-[background-color,border-color,box-shadow] duration-300 ease-smooth",
                isCurrent &&
                  "border-primary/35 bg-primary/6 shadow-[0_0_24px_oklch(0.9_0.2_126/0.1)]",
                isDone && "bg-white/2 hover:border-white/12 hover:bg-white/4",
                isPending && "bg-transparent opacity-60 hover:opacity-90",
                onStepSelect && "cursor-pointer"
              )}
            >
              <span className="relative grid size-5 shrink-0 place-items-center">
                <AnimatePresence initial={false}>
                  {row.status === "done" ? (
                    <motion.span
                      key="done"
                      className="col-start-1 row-start-1 grid size-5 place-items-center rounded-md border border-primary/40 bg-primary/15 text-primary shadow-[0_0_12px_oklch(0.9_0.2_126/0.25)]"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={reduced ? STILL : POP}
                    >
                      {Tick}
                    </motion.span>
                  ) : row.status === "error" ? (
                    <motion.span
                      key="error"
                      className="col-start-1 row-start-1 grid size-5 place-items-center rounded-md border border-destructive/40 bg-destructive/15 text-destructive"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={reduced ? STILL : POP}
                    >
                      {Cross}
                    </motion.span>
                  ) : row.status === "active" ? (
                    <motion.span
                      key="active"
                      className="col-start-1 row-start-1 grid size-5 place-items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={reduced ? STILL : CELL}
                    >
                      <Arc spin />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="pending"
                      className="col-start-1 row-start-1 size-2 rounded-full bg-white/20 transition-colors group-hover:bg-white/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={STILL}
                    />
                  )}
                </AnimatePresence>
              </span>

              {isCurrent && !reduced ? (
                <motion.span
                  className="min-w-0 flex-1 truncate bg-[linear-gradient(90deg,oklch(0.72_0.02_95)_30%,oklch(0.9_0.2_126)_50%,oklch(0.72_0.02_95)_70%)] bg-clip-text text-sm font-semibold text-transparent [background-size:220%_100%]"
                  animate={{ backgroundPosition: ["120% 0", "-120% 0"] }}
                  transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
                >
                  {row.label}
                </motion.span>
              ) : (
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-sm transition-colors duration-200",
                    isDone && "font-medium text-foreground/90",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {row.label}
                </span>
              )}

              {row.meta ? (
                <span
                  className={cn(
                    "shrink-0 font-mono text-[11px] tabular-nums transition-opacity duration-200",
                    isCurrent && "rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary",
                    isDone && "text-muted-foreground/80",
                    isPending && "text-muted-foreground/40"
                  )}
                >
                  {row.meta}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <span role="status" className="sr-only">
        {spoken}
      </span>
      <span className="sr-only" aria-live={complete || failed ? "polite" : "off"}>
        {complete ? "Run complete" : failed ? "Run failed" : ""}
      </span>
    </div>
  );
}
