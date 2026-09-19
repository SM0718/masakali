import * as React from "react";

import { cn } from "@/lib/utils";

/** Subtle alpona-inspired emblem — line diamonds + dot clusters, stroke-based. */
export function AlponaMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 40"
      aria-hidden
      className={cn("h-7 w-20 text-sharodiya-gold", className)}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="0.9">
        <path d="M64 5 L80 20 L64 35 L48 20 Z" />
        <path d="M64 12 L73 20 L64 28 L55 20 Z" />
        <path d="M26 20 L33 25 L26 30 L19 25 Z" />
        <path d="M102 20 L109 25 L102 30 L95 25 Z" />
      </g>
      <g fill="currentColor">
        <circle cx="64" cy="20" r="1.7" />
        <circle cx="26" cy="25" r="1.1" opacity="0.7" />
        <circle cx="102" cy="25" r="1.1" opacity="0.7" />
        <circle cx="64" cy="5" r="1.2" opacity="0.4" />
        <circle cx="64" cy="35" r="1.2" opacity="0.4" />
        <circle cx="10" cy="7" r="1.2" opacity="0.5" />
        <circle cx="10" cy="33" r="1.2" opacity="0.5" />
        <circle cx="118" cy="7" r="1.2" opacity="0.5" />
        <circle cx="118" cy="33" r="1.2" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Elegant festive rule — hairline, emblem, hairline — for section breaks. */
export function FestiveDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center gap-4", className)}
    >
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-sharodiya-gold/70 sm:w-24" />
      <AlponaMotif />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-sharodiya-gold/70 sm:w-24" />
    </div>
  );
}

/** Section eyebrow with the existing hairline + a trailing alpona emblem. */
export function FestiveEyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-10 bg-primary" />
      <span className="eyebrow">{children}</span>
      <AlponaMotif className="h-5 w-12 shrink-0 text-sharodiya-gold/80" />
    </span>
  );
}