import { Link } from "react-router-dom";

import { Img } from "@/components/Img";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageIntro } from "@/components/ui/page-intro";
import { CATEGORIES, PRODUCTS } from "@/lib/site";

export default function ShopPage() {
  const featured = PRODUCTS.find((p) => p.id === "amla-rose") ?? PRODUCTS[0];

  return (
    <main>
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Collections" },
          ]}
        />
      </section>

      <PageIntro
        eyebrow="The Collections"
        title={
          <>
            Browse the <em className="italic text-primary">archive.</em>
          </>
        }
        lede="Six families of work, cut and finished in small numbered batches at the Ballygunge studio. Everything ships to your door anywhere in India, air-cushioned in muslin."
      />

      <section className="mx-auto max-w-[96rem] px-5 pb-10 pt-14 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.label).length;
            return (
              <Link
                key={c.slug}
                to={`/shop/${c.slug}`}
                className="group relative block overflow-hidden border border-line bg-surface focus-visible:outline-none"
                aria-label={`${c.label} — ${c.tagline}`}
              >
                <div className="overflow-hidden">
                  <Img
                    src={c.image}
                    alt={c.alt}
                    className="aspect-[4/5] w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 pt-20">
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="font-serif text-2xl font-light text-ivory">{c.label}</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ivory/70">
                      {count} pieces
                    </span>
                  </p>
                  <p className="mt-1.5 font-serif text-sm italic text-ivory/85">{c.tagline}</p>
                  <p className="mt-3 text-[0.62rem] uppercase tracking-[0.22em] text-ivory/85 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Explore collection
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured piece */}
        <div className="mt-20 grid grid-cols-1 border border-line lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Img
              src={featured.image}
              alt={featured.alt}
              className="h-full min-h-[340px] w-full"
              eager
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12 lg:col-span-7">
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="eyebrow">The piece we light candles for</span>
            </span>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl font-light leading-tight text-foreground md:text-5xl">
              {featured.name} —{" "}
              <em className="italic text-primary">{featured.detail}.</em>
            </h2>
            <p className="mt-5 max-w-2xl text-[0.95rem] font-light leading-relaxed text-muted-foreground">
              {featured.story}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild>
                <Link to={`/product/${featured.id}`}>See {featured.name}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/about">Meet the atelier</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}