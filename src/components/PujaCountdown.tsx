import * as React from "react";

import { cn } from "@/lib/utils";

/** Maha Shasthi 2026 (IST) — the day Durga arrives in Kolkata. */
const PUJA_BEGIN = new Date("2026-10-16T00:00:00+05:30").getTime();

function parts(diff: number) {
  const total = Math.max(0, diff);
  return {
    d: Math.floor(total / 86_400_000),
    h: Math.floor(total / 3_600_000) % 24,
    m: Math.floor(total / 60_000) % 60,
    s: Math.floor(total / 1_000) % 60,
  };
}

export function PujaCountdown({
  className,
  showSeconds = false,
}: {
  className?: string;
  showSeconds?: boolean;
}) {
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const remaining = PUJA_BEGIN - now;
  if (remaining <= 0) {
    return <span className={cn("font-serif italic", className)}>শুভ শারদীয়া</span>;
  }

  const { d, h, m, s } = parts(remaining);
  const cells = [
    { v: d, l: "d" },
    { v: h, l: "h" },
    { v: m, l: "m" },
  ];
  if (showSeconds) cells.push({ v: s, l: "s" });

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 font-semibold tabular-nums tracking-[0.02em]",
        className,
      )}
    >
      {cells.map((cell, i) => (
        <React.Fragment key={cell.l}>
          {i > 0 && (
            <span aria-hidden className="opacity-45">
              :
            </span>
          )}
          <span className="inline-flex items-baseline gap-0.5">
            <span>{String(cell.v).padStart(2, "0")}</span>
            <span className="text-[0.58em] font-medium normal-case opacity-60">{cell.l}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}