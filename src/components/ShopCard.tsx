import { Heart } from "iconsax-reactjs";
import { Link } from "react-router-dom";

import { Img } from "@/components/Img";
import { TiltCard } from "@/components/TiltCard";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/site";

export const ACCENT_TEXT: Record<Product["accent"], string> = {
  maroon: "text-maroon dark:text-maroon-bright",
  mustard: "text-mustard dark:text-mustard-bright",
  olive: "text-olive dark:text-olive-bright",
};

export const ACCENT_LINE: Record<Product["accent"], string> = {
  maroon: "bg-maroon dark:bg-maroon-bright",
  mustard: "bg-mustard dark:bg-mustard-bright",
  olive: "bg-olive dark:bg-olive-bright",
};

export const ASPECT: Record<Product["ratio"], string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[2/3]",
  landscape: "aspect-[3/2]",
};

export function ShopCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { isWishlisted, toggleWishlist } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <article className={cn("relative", className)}>
      <Link
        to={`/product/${product.id}`}
        className="group block text-left focus-visible:outline-none"
        aria-label={`${product.name} — ${product.detail}, ${product.price}`}
      >
        <TiltCard className="relative overflow-hidden border border-line bg-surface">
          {product.tag && (
            <span className="absolute left-3 top-3 z-20 border border-current bg-background/70 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-foreground backdrop-blur">
              {product.tag}
            </span>
          )}

          <Img
            src={product.image}
            alt={product.alt}
            className={cn("w-full", ASPECT[product.ratio])}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-5 pt-16 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <p className="font-serif text-2xl font-light text-ivory">{product.name}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70">
                {product.detail}
              </p>
              <p className={cn("font-serif text-base italic", ACCENT_TEXT[product.accent])}>
                {product.price}
              </p>
            </div>
          </div>
        </TiltCard>

        <div className="flex items-baseline justify-between gap-4 border-x border-b border-line px-1 pb-1 pt-4">
          <div className="min-w-0">
            <p className="truncate font-serif text-xl font-normal text-foreground">
              {product.name}
            </p>
            <p className="mt-1 truncate text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
              {product.detail}
            </p>
          </div>
          <p className={cn("whitespace-nowrap font-serif text-lg italic", ACCENT_TEXT[product.accent])}>
            {product.price}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={wished}
        className={cn(
          "absolute right-3 top-3 z-30 grid h-10 w-10 cursor-pointer place-items-center border transition-all duration-500",
          wished
            ? "border-primary bg-primary/90 text-ivory"
            : "border-line bg-background/60 text-foreground backdrop-blur hover:border-foreground",
        )}
      >
        <Heart size="16" variant={wished ? "Bold" : "Linear"} />
      </button>
    </article>
  );
}