import { Link } from "react-router-dom";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2.5">
            {i > 0 && <span aria-hidden>⁄</span>}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="transition-colors duration-300 hover:text-primary"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground/80">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-line", className)}>
      <div className="mx-auto max-w-[96rem] px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-12">
        <Reveal>
          <span className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="eyebrow">{eyebrow}</span>
          </span>
          <h1 className="font-serif text-4xl font-light leading-[1.06] tracking-tight md:text-6xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-[0.95rem] font-light leading-relaxed text-muted-foreground">
              {lede}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </div>
  );
}