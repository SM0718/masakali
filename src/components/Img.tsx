import * as React from "react";

import { cn } from "@/lib/utils";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  eager?: boolean;
  sizesAttr?: string;
}

/**
 * Image with a shimmer skeleton placeholder + soft blur-up reveal.
 * Prevents layout shift: the wrapper enforces the aspect ratio.
 */
export const Img = React.forwardRef<HTMLImageElement, ImgProps>(
  ({ className, src, alt, eager = false, sizesAttr, ...props }, ref) => {
    const [loaded, setLoaded] = React.useState(false);

    return (
      <div className={cn("relative overflow-hidden bg-muted", className)}>
        {!loaded && (
          <div
            aria-hidden
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-y-0 left-0 w-1/2 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          sizes={sizesAttr}
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-[opacity,transform,filter] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            loaded ? "opacity-100 blur-0" : "scale-[1.045] opacity-0 blur-md",
          )}
          {...props}
        />
      </div>
    );
  },
);
Img.displayName = "Img";