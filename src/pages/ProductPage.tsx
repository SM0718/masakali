import { ArrowRight2, Heart, Whatsapp } from "iconsax-reactjs";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { ShopCard } from "@/components/ShopCard";
import { Breadcrumbs } from "@/components/ui/page-intro";
import { Button } from "@/components/ui/button";
import { ACCENT_TEXT } from "@/components/ShopCard";
import { CATEGORY_SLUG, PRODUCTS, SHIPS_IN } from "@/lib/site";
import { cn, waLink } from "@/lib/utils";
import { useStore, findProduct } from "@/lib/store";
import NotFoundPage from "@/pages/NotFoundPage";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { isWishlisted, toggleWishlist, addToCart } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const product = id ? findProduct(id) : undefined;
  if (!product) {
    return <NotFoundPage />;
  }

  const wished = isWishlisted(product.id);
  const slug = CATEGORY_SLUG[product.category];
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  function startOrder() {
    if (!product) return;
    addToCart(product.id, qty);
    navigate("/checkout");
  }

  return (
    <main>
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Collections", to: "/shop" },
            { label: product.category, to: slug ? `/shop/${slug}` : "/shop" },
            { label: product.name },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 gap-12 pb-20 lg:grid-cols-12 lg:gap-16">
          {/* Imagery */}
          <div className="lg:col-span-7">
            <div className="relative border border-line bg-surface">
              {product.tag && (
                <span className="absolute left-4 top-4 z-10 border border-current bg-background/75 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-foreground backdrop-blur">
                  {product.tag}
                </span>
              )}
              <Img src={product.image} alt={product.alt} className="aspect-[3/4] w-full" eager />
            </div>
            <div className="mt-4 flex items-center justify-between border border-line bg-surface/50 px-5 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                № {product.id} · numbered batch
              </p>
              <p className="font-serif text-sm italic text-muted-foreground">
                One length, cut by hand
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            {slug && (
              <Link
                to={`/shop/${slug}`}
                className="group mb-5 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {product.category}
                <ArrowRight2
                  size="13"
                  variant="Linear"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            )}

            <h1 className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-sm font-light text-muted-foreground">{product.detail}</p>
            <p className={cn("mt-5 font-serif text-3xl font-normal", ACCENT_TEXT[product.accent])}>
              {product.price}
            </p>

            <p className="mt-6 text-[0.95rem] font-light leading-relaxed text-foreground">
              {product.story}
            </p>

            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
              <div className="flex justify-between gap-6 py-3.5">
                <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Fabric
                </dt>
                <dd className="text-right font-light text-foreground">{product.fabric}</dd>
              </div>
              <div className="flex justify-between gap-6 py-3.5">
                <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Care
                </dt>
                <dd className="text-right font-light text-foreground">{product.care}</dd>
              </div>
              <div className="flex justify-between gap-6 py-3.5">
                <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Dispatch
                </dt>
                <dd className="text-right font-light text-foreground">
                  Made to order · {SHIPS_IN}
                </dd>
              </div>
            </dl>

            {/* Qty + actions */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                Qty
              </span>
              <div className="flex items-center border border-line-strong">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-11 cursor-pointer place-items-center text-lg text-foreground transition-colors hover:bg-muted/60"
                >
                  −
                </button>
                <span className="w-10 text-center font-serif text-lg text-foreground">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  className="grid h-11 w-11 cursor-pointer place-items-center text-lg text-foreground transition-colors hover:bg-muted/60"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={startOrder} size="lg">
                Add to order · {product.price}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline">
                  <a
                    href={waLink(
                      `Hi Masakalli! Could you help me with "${product.name}" — ${product.detail}? It is listed at ${product.price}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Whatsapp size="16" variant="Linear" />
                    Enquire
                  </a>
                </Button>
                <Button variant="outline" onClick={() => toggleWishlist(product.id)} aria-pressed={wished}>
                  <Heart size="16" variant={wished ? "Bold" : "Linear"} />
                  {wished ? "Saved" : "Save"}
                </Button>
              </div>
            </div>

            <p className="mt-6 text-[0.66rem] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
              Tip: save your measurements once in{" "}
              <Link to="/account" className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary">
                your account
              </Link>{" "}
              — every future piece is cut from them.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface/40">
          <div className="mx-auto max-w-[96rem] px-5 py-16 md:px-10 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <span className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-primary" />
                  <span className="eyebrow">Keep looking</span>
                </span>
                <h2 className="font-serif text-3xl font-light tracking-tight md:text-4xl">
                  From the same <em className="italic text-primary">collection.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link
                  to={slug ? `/shop/${slug}` : "/shop"}
                  className="group flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-foreground transition-colors duration-300 hover:text-primary"
                >
                  View all {product.category}
                  <ArrowRight2
                    size="14"
                    variant="Linear"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ShopCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}