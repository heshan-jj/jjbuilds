"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const DRAW = { duration: 0.26, ease: EASE } as const;
const INSTANT = { duration: 0 } as const;

export type CopyStatus = "idle" | "copied" | "error";

export type UseCopyToClipboardOptions = {
  timeout?: number;
  onCopy?: (value: string) => void;
  onError?: (reason: unknown) => void;
};

function writeFallback(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "0";
  area.style.opacity = "0";
  document.body.appendChild(area);

  const selection = document.getSelection();
  const previous =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(area);
  if (selection && previous) {
    selection.removeAllRanges();
    selection.addRange(previous);
  }
  return ok;
}

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
  onError,
}: UseCopyToClipboardOptions = {}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const [ticket, setTicket] = useState(0);

  const mounted = useRef(true);
  const copied = useRef(onCopy);
  const failed = useRef(onError);

  useEffect(() => {
    copied.current = onCopy;
    failed.current = onError;
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setTicket(0);
  }, []);

  const copy = useCallback(async (text: string) => {
    if (!text) return false;

    let ok = false;
    let reason: unknown = null;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        ok = writeFallback(text);
      }
    } catch (error) {
      reason = error;
      try {
        ok = writeFallback(text);
      } catch {
        ok = false;
      }
    }

    if (!mounted.current) return ok;

    setStatus(ok ? "copied" : "error");
    setTicket((t) => t + 1);

    if (ok) copied.current?.(text);
    else failed.current?.(reason);

    return ok;
  }, []);

  useEffect(() => {
    if (ticket === 0 || status === "idle") return;
    const id = setTimeout(() => setStatus("idle"), timeout);
    return () => clearTimeout(id);
  }, [ticket, status, timeout]);

  return { copy, reset, status, copied: status === "copied" };
}

export type CopyButtonProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
  errorLabel?: string;
  timeout?: number;
  onCopy?: (value: string) => void;
  onError?: (reason: unknown) => void;
  disabled?: boolean;
  className?: string;
  variant?: "pill" | "icon" | "minimal";
};

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  errorLabel = "Failed",
  timeout = 2000,
  onCopy,
  onError,
  disabled = false,
  className = "",
  variant = "pill",
}: CopyButtonProps) {
  const { copy, status } = useCopyToClipboard({ timeout, onCopy, onError });
  const reduced = useReducedMotion();

  const fade = reduced ? INSTANT : CROSSFADE;
  const draw = reduced ? INSTANT : DRAW;

  const labels: Array<[CopyStatus, string]> = [
    ["idle", label],
    ["copied", copiedLabel],
    ["error", errorLabel],
  ];

  const isCopied = status === "copied";
  const isError = status === "error";

  const isIcon = variant === "icon";

  return (
    <motion.button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={() => {
        void copy(value);
      }}
      whileTap={disabled || reduced ? undefined : { scale: 0.96 }}
      transition={CELL}
      className={cn(
        "group relative select-none items-center justify-center outline-none transition-[border-color,box-shadow,background-color,color] duration-300 ease-smooth disabled:opacity-50",
        variant === "pill" &&
          "inline-flex h-9 gap-2 rounded-full border px-3.5 text-xs font-medium shadow-[0_2px_8px_oklch(0_0_0/0.2)]",
        variant === "icon" &&
          "inline-flex size-9 rounded-full border shadow-[0_2px_8px_oklch(0_0_0/0.2)]",
        variant === "minimal" &&
          "inline-flex h-8 gap-1.5 rounded-lg px-2 text-xs font-medium hover:bg-white/5",
        // Color states tuned to JJbuilds palette
        !isCopied &&
          !isError &&
          "border-white/10 bg-card/80 text-muted-foreground backdrop-blur-md hover:border-white/20 hover:bg-white/8 hover:text-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40",
        isCopied &&
          "border-primary/50 bg-primary/10 text-primary shadow-[0_0_20px_oklch(0.9_0.2_126/0.25)] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/50",
        isError &&
          "border-destructive/40 bg-destructive/10 text-destructive focus-visible:ring-2 focus-visible:ring-destructive/50",
        className
      )}
    >
      <span className="grid size-3.5 shrink-0 place-items-center" aria-hidden="true">
        {/* Idle copy icon */}
        <motion.svg
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="col-start-1 row-start-1 size-3.5"
          initial={false}
          animate={{
            opacity: status === "idle" ? 1 : 0,
            scale: status === "idle" ? 1 : 0.85,
          }}
          transition={fade}
        >
          <path d="M9.6 5.1V3.7A1.7 1.7 0 0 0 7.9 2H3.7A1.7 1.7 0 0 0 2 3.7v4.2a1.7 1.7 0 0 0 1.7 1.7h1.4" />
          <rect x="5.1" y="5.1" width="6.9" height="6.9" rx="1.7" />
        </motion.svg>

        {/* Copied checkmark in neon lime */}
        <motion.svg
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="col-start-1 row-start-1 size-3.5 text-primary"
          initial={false}
          animate={{
            opacity: isCopied ? 1 : 0,
            scale: isCopied ? 1 : 0.85,
          }}
          transition={fade}
        >
          <motion.path
            d="M2.9 7.4 5.6 10.1 11.1 4"
            initial={false}
            animate={{ pathLength: isCopied ? 1 : 0 }}
            transition={draw}
          />
        </motion.svg>

        {/* Error cross mark */}
        <motion.svg
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="col-start-1 row-start-1 size-3.5 text-destructive"
          initial={false}
          animate={{
            opacity: isError ? 1 : 0,
            scale: isError ? 1 : 0.85,
          }}
          transition={fade}
        >
          <path d="M3.6 3.6 10.4 10.4" />
          <path d="M10.4 3.6 3.6 10.4" />
        </motion.svg>
      </span>

      {!isIcon && (
        <span aria-hidden="true" className="relative grid">
          {labels.map(([key, text]) => (
            <motion.span
              key={key}
              initial={false}
              animate={
                key === status
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 3, filter: "blur(3px)" }
              }
              transition={fade}
              className="col-start-1 row-start-1 whitespace-nowrap"
            >
              {text}
            </motion.span>
          ))}
        </span>
      )}

      <span role="status" aria-live="polite" className="sr-only">
        {isCopied ? copiedLabel : isError ? errorLabel : ""}
      </span>
    </motion.button>
  );
}
