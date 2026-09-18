import { ArrowRight, Whatsapp } from "iconsax-reactjs";
import * as React from "react";

import { Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";
import { TiltCard } from "@/components/TiltCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseLink,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/utils";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
} from "@/lib/site";

const ASPECT: Record<Product["ratio"], string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[2/3]",
  landscape: "aspect-[3/2]",
};

const ACCENT_TEXT: Record<Product["accent"], string> = {
  maroon: "text-maroon dark:text-maroon-bright",
  mustard: "text-mustard dark:text-mustard-bright",
  olive: "text-olive dark:text-olive-bright",
};

const ACCENT_LINE: Record<Product["accent"], string> = {
  maroon: "bg-maroon dark:bg-maroon-bright",
  mustard: "bg-mustard dark:bg-mustard-bright",
  olive: "bg-olive dark:bg-olive-bright",
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const message = `Hi Masakalli! Could you share pricing and availability for "${product.name}" — ${product.detail}?`;

  return (
    <Dialog>
      <Reveal delay={Math.min((index % 3) * 0.09, 0.27)} className="mb-6 break-inside-avoid">
        <DialogTrigger asChild>
          <button
            type="button"
            className="group block w-full cursor-pointer text-left focus-visible:outline-none"
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

              {/* Hover label */}
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

            {/* Static label (visible without hover, below image) */}
            <div className="flex items-baseline justify-between gap-4 border-x border-b border-line px-1 pb-1 pt-4">
              <div>
                <p className="font-serif text-xl font-normal text-foreground">{product.name}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {product.detail}
                </p>
              </div>
              <p className={cn("whitespace-nowrap font-serif text-lg italic", ACCENT_TEXT[product.accent])}>
                {product.price}
              </p>
            </div>
          </button>
        </DialogTrigger>
      </Reveal>

      {/* Lightbox */}
      <DialogContent className="max-w-2xl overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative h-64 sm:h-full sm:min-h-[440px]">
            <Img src={product.image} alt={product.alt} className="h-full" eager />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <span className="mb-4 flex items-center gap-3">
              <span className={cn("h-px w-8", ACCENT_LINE[product.accent])} />
              <span className="eyebrow">{product.category}</span>
            </span>
            <h3 className="font-serif text-3xl font-light text-foreground">{product.name}</h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
              {product.detail}
            </p>
            <p className={cn("mt-5 font-serif text-2xl font-normal", ACCENT_TEXT[product.accent])}>
              {product.price}
            </p>

            <div className="my-6 h-px bg-line" />

            <p className="mb-4 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              Made to order · Ships pan-India
            </p>

            <Button asChild variant="whatsapp" className="w-full">
              <a href={waLink(message)} target="_blank" rel="noreferrer">
                <Whatsapp size="16" variant="Linear" />
                Enquire on WhatsApp
              </a>
            </Button>

            <div className="mt-6 text-center">
              <DialogCloseLink href="#collection">Browse the full archive</DialogCloseLink>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Collection() {
  const [category, setCategory] = React.useState<ProductCategory>("All");

  const visible =
    category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <section id="collection" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <span className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="eyebrow">Signature Collection</span>
            </span>
            <h2 className="max-w-xl text-4xl font-light leading-[1.08] tracking-tight md:text-5xl lg:text-[3.6rem]">
              Made once, for the person{" "}
              <em className="italic text-primary">it is meant for.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="max-w-sm text-[0.95rem] font-light leading-relaxed text-muted-foreground md:ml-auto">
              A study in deep maroons, old mustards and quiet ivories. Tap a piece
              to see it closer — every work is numbered and made to order.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.12} className="mt-14">
          <Tabs value={category} onValueChange={(v) => setCategory(v as ProductCategory)}>
            <TabsList>
              {PRODUCT_CATEGORIES.map((c) => (
                <TabsTrigger key={c} value={c}>
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={category} className="mt-0">
              <div className="columns-1 gap-6 pt-12 sm:columns-2 xl:columns-3">
                {visible.map((product, i) => (
                  <ProductCard key={`${category}-${product.id}`} product={product} index={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Reveal>

        {/* Archive CTA */}
        <Reveal delay={0.1} className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 md:flex-row md:items-center">
            <div>
              <p className="font-serif text-2xl font-light text-foreground md:text-3xl">
                The full archive lives in the studio.
              </p>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                New drops land on Instagram before anywhere else. @masakalli_kolkata
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="group shrink-0">
              <a href="https://instagram.com/masakalli_kolkata" target="_blank" rel="noreferrer">
                Follow the archive
                <ArrowRight
                  size="15"
                  variant="Linear"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}