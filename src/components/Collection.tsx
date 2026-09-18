import { ArrowRight } from "iconsax-reactjs";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Reveal } from "@/components/Reveal";
import { ShopCard } from "@/components/ShopCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/site";

const PROMISES = [
  {
    title: "Made to measure",
    body: "Cut to your shoulder-to-hem, never a rail size. Send your measurements once — we keep them on file for every piece after.",
  },
  {
    title: "A jewel-tone palette",
    body: "Maroon, mustard, olive and old rose, hand-dyed in small vats — every length carries the particular light of the day it was steeped.",
  },
  {
    title: "Signed by the bench",
    body: "Each numbered batch carries its finisher's initials and their bench number, so the hand behind your piece is never anonymous.",
  },
] as const;

export function Collection() {
  const [category, setCategory] = useState<ProductCategory>("All");

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
            <Link
              to="/shop"
              className="group mt-1 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 hover:text-primary md:ml-auto md:mt-8"
            >
              The whole archive
              <ArrowRight
                size="14"
                variant="Linear"
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
            <p className="mt-3 max-w-sm text-[0.95rem] font-light leading-relaxed text-muted-foreground md:ml-auto">
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
                  <div key={`${category}-${product.id}`} className="mb-6 break-inside-avoid">
                    <ShopCard product={product} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Reveal>

        {/* Archive CTA */}
        <Reveal delay={0.1} className="mt-20">
          <div className="border-y border-line">
            <div className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
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

            <div className="grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {PROMISES.map((promise, i) => (
                <div key={promise.title} className="py-7 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <p className="font-serif text-sm italic text-muted-foreground">0{i + 1}</p>
                  <h3 className="mt-3 font-serif text-2xl font-light text-foreground">
                    {promise.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-[0.85rem] font-light leading-relaxed text-muted-foreground">
                    {promise.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="border-t border-line py-4 text-center text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground md:text-left">
              Made to order · Ships pan-India · Small numbered runs · Your measurements kept on
              file
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}