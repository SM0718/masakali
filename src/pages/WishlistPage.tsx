import { Heart } from "iconsax-reactjs";
import { Link, useNavigate } from "react-router-dom";

import { Reveal } from "@/components/Reveal";
import { ShopCard } from "@/components/ShopCard";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageIntro } from "@/components/ui/page-intro";
import { findProduct, useStore } from "@/lib/store";
import type { Product } from "@/lib/site";

export default function WishlistPage() {
  const { wishlist, addToCart } = useStore();
  const navigate = useNavigate();

  const items = wishlist
    .map((id) => findProduct(id))
    .filter((p): p is Product => Boolean(p));

  function orderAll() {
    items.forEach((p) => addToCart(p.id, 1));
    navigate("/checkout");
  }

  return (
    <main>
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Wishlist" },
          ]}
        />
      </section>

      <PageIntro
        eyebrow="Your Wishlist"
        title={
          <>
            Saved, <em className="italic text-primary">for later.</em>
          </>
        }
        lede={
          items.length
            ? `${items.length} ${items.length === 1 ? "piece is" : "pieces are"} waiting in your ark. Your list lives quietly in this browser — no account needed.`
            : "Everything you save on the collections gathers here. It stays quietly in this browser — no account needed."
        }
      />

      <section className="mx-auto max-w-[96rem] px-5 py-14 md:px-10 md:py-20">
        {items.length === 0 ? (
          <Reveal className="flex flex-col items-center border border-line bg-surface px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center border border-line-strong text-muted-foreground">
              <Heart size="26" variant="Linear" />
            </span>
            <h2 className="mt-6 font-serif text-2xl font-light text-foreground">
              Nothing saved — yet.
            </h2>
            <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              Tap the heart on any piece in the collections and it will wait for
              you here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link to="/shop">Browse the collections</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Start at home</Link>
              </Button>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                {items.length} saved {items.length === 1 ? "piece" : "pieces"}
              </p>
              <Button onClick={orderAll}>Add all to order</Button>
            </div>
            <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
              {items.map((item) => (
                <ShopCard key={item.id} product={item} className="mb-6 break-inside-avoid" />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}