import { Bag2, TickCircle, Whatsapp } from "iconsax-reactjs";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Img } from "@/components/Img";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageIntro } from "@/components/ui/page-intro";
import { BRAND, SHIPS_IN } from "@/lib/site";
import { findProduct, useStore, type Order } from "@/lib/store";
import { formatINR, waLink } from "@/lib/utils";

const LINK_CLS =
  "w-full border border-line-strong bg-transparent px-4 py-3.5 text-sm font-light text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground";

export default function CheckoutPage() {
  const { cart, profile, setCartQty, removeFromCart, cartTotal, clearCart, setProfile, placeOrder } =
    useStore();
  const [placed, setPlaced] = useState<Order | null>(null);

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [note, setNote] = useState("");
  const [mode, setMode] = useState<"courier" | "pickup">("courier");
  const [error, setError] = useState<string | null>(null);

  const total = cartTotal();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      setError("Please fill your name, phone, address and pincode so the studio can reach you.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("That phone number looks short — please check it once.");
      return;
    }
    const order = placeOrder(cart, total);
    clearCart();
    setProfile({ name, phone, email });
    setPlaced(order);
  }

  const confirmMessage = placed
    ? `Hi ${BRAND.name}! I just placed order ${placed.id} on your website.\n\n${placed.items
        .map((l) => {
          const p = findProduct(l.productId);
          return `${p?.name ?? l.productId} × ${l.qty} — ${p?.price ?? ""}`;
        })
        .join("\n")}\n\nTotal: ${formatINR(placed.totalValue)}\nDelivery: ${
        mode === "courier" ? "Pan-India courier" : "Studio pickup, Kolkata"
      }\n\n${name.trim()}\n${phone.trim()}\n${address.trim()}, ${city.trim()} ${pincode.trim()}\n\nPlease confirm availability.`
    : "";

  if (placed) {
    return (
      <main>
        <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Checkout" },
              { label: placed.id },
            ]}
          />
        </section>
        <section className="mx-auto max-w-2xl px-5 py-16 text-center md:px-10 md:py-24">
          <span className="mx-auto grid h-16 w-16 place-items-center border border-line-strong text-primary">
            <TickCircle size="30" variant="Bold" />
          </span>
          <p className="eyebrow mt-8">Order placed</p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight md:text-5xl">
            {placed.id} is <em className="italic text-primary">cutting.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            Thank you — the studio will confirm availability and your dispatch within
            one working day. To speed things along, ping us on WhatsApp with the summary.
          </p>

          <dl className="mt-10 divide-y divide-line border-y border-line text-left text-sm">
            {placed.items.map((l) => {
              const p = findProduct(l.productId);
              return (
                <div key={l.productId} className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="font-light text-foreground">
                    {p?.name ?? l.productId} <span className="text-muted-foreground">× {l.qty}</span>
                  </dt>
                  <dd className="font-serif italic text-foreground">{p?.price}</dd>
                </div>
              );
            })}
            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                Total
              </dt>
              <dd className="font-serif text-xl text-primary">{formatINR(placed.totalValue)}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={waLink(confirmMessage)} target="_blank" rel="noreferrer">
                <Whatsapp size="16" variant="Linear" />
                Confirm on WhatsApp
              </a>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/account">Track it from your account</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Checkout" },
          ]}
        />
      </section>

      <PageIntro
        eyebrow="Checkout"
        title={
          <>
            Let's get it <em className="italic text-primary">cut.</em>
          </>
        }
        lede="No payments are taken here — after you place the order, the studio confirms availability and exact costing on WhatsApp within a working day."
      />

      {cart.length === 0 ? (
        <section className="mx-auto max-w-[96rem] px-5 py-16 md:px-10 md:py-24">
          <div className="flex flex-col items-center border border-line bg-surface px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center border border-line-strong text-muted-foreground">
              <Bag2 size="26" variant="Linear" />
            </span>
            <h2 className="mt-6 font-serif text-2xl font-light text-foreground">
              Your order list is empty.
            </h2>
            <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              Add a piece from the collections, or walk straight in for a fitting.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link to="/shop">Browse the collections</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/visit">Visit the studio</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[96rem] px-5 py-14 md:px-10 md:py-20">
          <form onSubmit={submit} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Details */}
            <div className="space-y-10 lg:col-span-7">
              <fieldset>
                <legend className="eyebrow mb-5">Contact</legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    className={LINK_CLS}
                    placeholder="Full name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className={LINK_CLS}
                    placeholder="Phone — WhatsApp reachable *"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    className={LINK_CLS + " sm:col-span-2"}
                    placeholder="Email (optional)"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-5">Delivery</legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <textarea
                    className={LINK_CLS + " min-h-28 sm:col-span-3"}
                    placeholder="Address — house, street, landmark *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    className={LINK_CLS}
                    placeholder="City / town *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    className={LINK_CLS}
                    placeholder="Pincode *"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/[^\d]/g, ""))}
                  />
                  <input
                    className={LINK_CLS}
                    placeholder="Fitting notes (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-5">How will you receive it?</legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === "courier"}
                    onClick={() => setMode("courier")}
                    className={`border px-5 py-5 text-left transition-colors duration-300 ${
                      mode === "courier"
                        ? "border-foreground bg-surface"
                        : "border-line-strong hover:border-foreground"
                    }`}
                  >
                    <p className="font-serif text-lg text-foreground">Pan-India courier</p>
                    <p className="mt-1 text-xs font-light text-muted-foreground">
                      Air-cushioned muslin box · {SHIPS_IN}
                    </p>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === "pickup"}
                    onClick={() => setMode("pickup")}
                    className={`border px-5 py-5 text-left transition-colors duration-300 ${
                      mode === "pickup"
                        ? "border-foreground bg-surface"
                        : "border-line-strong hover:border-foreground"
                    }`}
                  >
                    <p className="font-serif text-lg text-foreground">Studio pickup</p>
                    <p className="mt-1 text-xs font-light text-muted-foreground">
                      {BRAND.addressLines[0]} · Ballygunge
                    </p>
                  </button>
                </div>
              </fieldset>

              <p className="text-[0.66rem] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
                Don't have measurements handy? Save them once in{" "}
                <Link to="/account" className="underline decoration-line-strong underline-offset-4 hover:text-primary">
                  your account
                </Link>{" "}
                and every order is cut from them.
              </p>
            </div>

            {/* Summary */}
            <aside className="lg:col-span-5">
              <div className="border border-line bg-surface">
                <div className="flex items-center justify-between border-b border-line px-6 py-5">
                  <p className="font-serif text-xl text-foreground">Your order</p>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {cart.reduce((s, l) => s + l.qty, 0)} pieces
                  </p>
                </div>

                <ul className="divide-y divide-line">
                  {cart.map((line) => {
                    const p = findProduct(line.productId);
                    if (!p) return null;
                    return (
                      <li key={line.productId} className="flex gap-4 px-6 py-5">
                        <Link to={`/product/${p.id}`} className="block w-20 shrink-0 border border-line">
                          <Img src={p.image} alt={p.alt} className="aspect-square w-full" />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="truncate font-serif text-base text-foreground">{p.name}</p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(p.id)}
                              aria-label={`Remove ${p.name}`}
                              className="text-muted-foreground transition-colors hover:text-primary"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="mt-0.5 truncate text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                            {p.detail}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center border border-line-strong">
                              <button
                                type="button"
                                aria-label="Decrease"
                                onClick={() => setCartQty(p.id, line.qty - 1)}
                                className="grid h-8 w-8 place-items-center text-foreground transition-colors hover:bg-muted/60"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-serif text-sm text-foreground">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase"
                                onClick={() => setCartQty(p.id, line.qty + 1)}
                                className="grid h-8 w-8 place-items-center text-foreground transition-colors hover:bg-muted/60"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-serif text-sm italic text-foreground">
                              {formatINR(p.priceValue * line.qty)}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="space-y-2.5 border-t border-line px-6 py-6 text-sm">
                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span className="font-light">Subtotal</span>
                    <span className="font-serif italic">{formatINR(total)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span className="font-light">Dispatch</span>
                    <span className="font-serif italic">Confirmed on WhatsApp</span>
                  </div>
                  <div className="flex justify-between gap-4 pt-3 text-foreground">
                    <span className="text-[0.62rem] uppercase tracking-[0.22em]">Total</span>
                    <span className="font-serif text-2xl text-primary">{formatINR(total)}</span>
                  </div>
                </div>
              </div>

              {error && <p className="mt-5 text-sm font-light text-primary">{error}</p>}

              <Button type="submit" size="lg" className="mt-6 w-full">
                Place order · {formatINR(total)}
              </Button>
              <p className="mt-4 text-center text-xs font-light leading-relaxed text-muted-foreground">
                We never take payments online. The studio confirms every order personally on
                WhatsApp before any piece is cut.
              </p>
            </aside>
          </form>
        </section>
      )}
    </main>
  );
}