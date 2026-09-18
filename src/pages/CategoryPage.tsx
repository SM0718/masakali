import { ArrowRight2 } from "iconsax-reactjs";
import { Link, useParams } from "react-router-dom";

import { Img } from "@/components/Img";
import { ShopCard } from "@/components/ShopCard";
import { Breadcrumbs } from "@/components/ui/page-intro";
import { CATEGORIES, CATEGORY_LABEL, PRODUCTS } from "@/lib/site";
import NotFoundPage from "@/pages/NotFoundPage";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const meta = CATEGORIES.find((c) => c.slug === slug);

  if (!meta) {
    return <NotFoundPage />;
  }

  const items = PRODUCTS.filter((p) => p.category === meta.label);
  const others = CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <main>
      {/* Category hero */}
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Collections", to: "/shop" },
            { label: meta.label },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 gap-10 pb-16 md:pb-20 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-center lg:col-span-6">
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="eyebrow">Collection · {String(items.length).padStart(2, "0")}</span>
            </span>
            <h1 className="mt-6 font-serif text-4xl font-light leading-[1.06] tracking-tight md:text-6xl">
              {meta.label}
              <em className="mt-3 block text-xl italic text-primary md:text-2xl">
                {meta.tagline}.
              </em>
            </h1>
            <p className="mt-6 max-w-lg text-[0.95rem] font-light leading-relaxed text-muted-foreground">
              {meta.blurb}
            </p>
          </div>
          <div className="lg:col-span-6">
            <Img
              src={meta.image}
              alt={meta.alt}
              className="aspect-[4/3] w-full border border-line"
              eager
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-[96rem] px-5 py-16 md:px-10 md:py-20">
          <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
            {items.map((product) => (
              <ShopCard key={product.id} product={product} className="mb-6 break-inside-avoid" />
            ))}
          </div>

          <p className="mt-6 text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
            Every piece is made to order from a numbered batch · dispatch in 8–12 working days
          </p>
        </div>
      </section>

      {/* Other collections */}
      <section className="mx-auto max-w-[96rem] px-5 py-14 md:px-10 md:py-20">
        <p className="eyebrow mb-6">Keep walking</p>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {others.map((c) => (
            <Link
              key={c.slug}
              to={`/shop/${c.slug}`}
              className="group flex items-center gap-2.5 font-serif text-xl font-light text-foreground transition-colors duration-300 hover:text-primary"
            >
              {c.label}
              <ArrowRight2
                size="16"
                variant="Linear"
                className="text-muted-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}