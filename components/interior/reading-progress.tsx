"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const FILL = { type: "spring", stiffness: 210, damping: 34, mass: 0.9 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;
const DRAW = { duration: 0.3, ease: EASE, delay: 0.08 } as const;
const INSTANT = { duration: 0 } as const;

export type ScrollRef = { readonly current: HTMLElement | null };

export type UseReadingProgressOptions = {
  target?: ScrollRef;
  scroller?: ScrollRef;
  steps?: number;
  words?: number;
  wordsPerMinute?: number;
};

export type ReadingProgressState = {
  step: number;
  steps: number;
  progress: number;
  percent: number;
  minutesLeft: number;
  totalMinutes: number;
  complete: boolean;
};

function clamp01(n: number) {
  if (!Number.isFinite(n) || n < 0) return 0;
  return n > 1 ? 1 : n;
}

export function useReadingProgress({
  target,
  scroller,
  steps = 24,
  words = 0,
  wordsPerMinute = 220,
}: UseReadingProgressOptions = {}): ReadingProgressState {
  const [step, setStep] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const scrollEl = scroller?.current ?? null;
    const targetEl = target?.current ?? null;
    const source: EventTarget = scrollEl ?? window;

    const read = () => {
      const viewport = scrollEl ? scrollEl.clientHeight : window.innerHeight;

      let ratio: number;
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const base = scrollEl ? scrollEl.getBoundingClientRect().top : 0;
        const travel = rect.height - viewport;
        ratio = travel <= 0 ? 1 : (base - rect.top) / travel;
      } else if (scrollEl) {
        const travel = scrollEl.scrollHeight - scrollEl.clientHeight;
        ratio = travel <= 0 ? 1 : scrollEl.scrollTop / travel;
      } else {
        const doc = document.documentElement;
        const travel = doc.scrollHeight - viewport;
        ratio = travel <= 0 ? 1 : window.scrollY / travel;
      }

      const next = Math.round(clamp01(ratio) * steps);
      setStep((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        read();
      });
    };

    source.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    if (observer) {
      if (targetEl) observer.observe(targetEl);
      if (scrollEl) observer.observe(scrollEl);
      if (!targetEl && !scrollEl) observer.observe(document.documentElement);
    }

    schedule();

    return () => {
      source.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [scroller, target, steps]);

  const progress = steps > 0 ? step / steps : 1;
  const totalMinutes = words > 0 ? Math.max(1, Math.ceil(words / wordsPerMinute)) : 0;
  const minutesLeft =
    words > 0 ? Math.ceil(((1 - progress) * words) / wordsPerMinute) : 0;

  return {
    step,
    steps,
    progress,
    percent: Math.round(progress * 100),
    minutesLeft,
    totalMinutes,
    complete: step >= steps,
  };
}

export type ReadingProgressProps = UseReadingProgressOptions & {
  label?: string;
  doneLabel?: string;
  className?: string;
};

export function ReadingProgress({
  target,
  scroller,
  steps = 24,
  words = 0,
  wordsPerMinute = 220,
  label = "Reading progress",
  doneLabel = "Finished",
  className = "",
}: ReadingProgressProps) {
  const { step, percent, minutesLeft, totalMinutes, complete } =
    useReadingProgress({ target, scroller, steps, words, wordsPerMinute });

  const reduced = useReducedMotion();
  const fillTransition = reduced ? INSTANT : FILL;
  const fadeTransition = reduced ? INSTANT : CROSSFADE;

  const estimate = words > 0;
  const readout = `${minutesLeft} min left`;
  const finish = `${doneLabel} · ${totalMinutes} min`;
  const valueText = estimate
    ? `${percent}% read, ${readout}`
    : `${percent}% read`;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-white/10 bg-card/85 px-4 py-2 shadow-[0_8px_24px_oklch(0_0_0/0.4)] backdrop-blur-xl",
        className
      )}
    >
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={steps}
        aria-valuenow={step}
        aria-valuetext={valueText}
        className="relative h-1 min-w-[70px] flex-1 overflow-hidden rounded-full bg-white/10 sm:min-w-[120px]"
      >
        <motion.div
          className="h-full origin-left rounded-full bg-primary shadow-[0_0_12px_oklch(0.9_0.2_126/0.7)]"
          style={{ width: "100%" }}
          initial={false}
          animate={{ scaleX: step / Math.max(1, steps) }}
          transition={fillTransition}
        />
      </div>

      <div className="grid shrink-0 justify-items-end font-mono text-[11px] tabular-nums">
        {estimate ? (
          <>
            <span
              aria-hidden
              className="invisible col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="size-3 shrink-0" />
              {finish}
            </span>
            <motion.span
              aria-hidden
              className="col-start-1 row-start-1 whitespace-nowrap text-muted-foreground"
              initial={false}
              animate={{ opacity: complete ? 0 : 1 }}
              transition={fadeTransition}
            >
              {readout}
            </motion.span>
            <motion.span
              aria-hidden
              className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap font-medium text-primary"
              initial={false}
              animate={{ opacity: complete ? 1 : 0 }}
              transition={fadeTransition}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 256 256"
                fill="none"
                aria-hidden="true"
              >
                <motion.polyline
                  points="216 72 104 184 48 128"
                  stroke="currentColor"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ pathLength: complete ? 1 : 0 }}
                  transition={reduced ? INSTANT : DRAW}
                />
              </svg>
              <motion.span
                initial={false}
                animate={{ x: complete ? 0 : 4 }}
                transition={fadeTransition}
              >
                {finish}
              </motion.span>
            </motion.span>
          </>
        ) : (
          <span className="text-muted-foreground">{percent}%</span>
        )}
      </div>
    </div>
  );
}
