import { Bag2, Heart, Whatsapp } from "iconsax-reactjs";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PageIntro, Breadcrumbs } from "@/components/ui/page-intro";
import { Button } from "@/components/ui/button";
import { cn, formatINR, waLink } from "@/lib/utils";
import { findProduct, useStore } from "@/lib/store";

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-6 border-b border-line py-5 text-left last:border-b-0"
    >
      <span>
        <span className="block text-sm text-foreground">{label}</span>
        <span className="mt-1 block text-xs font-light text-muted-foreground">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 border transition-colors duration-300",
          checked ? "border-primary bg-primary" : "border-line-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-300",
            checked ? "left-[22px] bg-ivory" : "left-1 bg-muted-foreground",
          )}
        />
      </span>
    </button>
  );
}

const FIELD_CLS =
  "w-full border border-line-strong bg-transparent px-4 py-3.5 text-sm font-light text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground";

const STATUS_STYLE: Record<string, string> = {
  Delivered: "text-olive dark:text-olive-bright",
  "Cutting & stitching": "text-maroon dark:text-maroon-bright",
  "In weaving": "text-mustard dark:text-mustard-bright",
};

export default function AccountPage() {
  const { profile, setProfile, orders, cartCount, wishlist } = useStore();
  const [saved, setSaved] = useState(false);

  function save() {
    setProfile({
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
      bust: profile.bust,
      waist: profile.waist,
      hips: profile.hips,
      shoulder: profile.shoulder,
      height: profile.height,
      notes: profile.notes,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  }

  const shareMessage = `Hi Masakalli! My measurements on file are —\nBust: ${profile.bust || "—"} cm\nWaist: ${profile.waist || "—"} cm\nHips: ${profile.hips || "—"} cm\nShoulder: ${profile.shoulder || "—"} cm\nHeight: ${profile.height || "—"} cm\nNotes: ${profile.notes || "—"}\n\nPlease use these for a new order.`;

  return (
    <main>
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Account" },
          ]}
        />
      </section>

      <PageIntro
        eyebrow="Your Masakalli"
        title={
          <>
            Your fittings, <em className="italic text-primary">kept for you.</em>
          </>
        }
        lede="No passwords, no sign-ups — this page is a private, device-locked notebook for your measurements, orders and preferences. It stays in this browser, and only this browser."
      >
        <div className="mt-8 inline-flex items-center gap-2 border border-line bg-surface px-4 py-3 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-olive dark:bg-olive-bright" />
          Private · stored on this device only
        </div>
      </PageIntro>

      <section className="mx-auto max-w-[96rem] px-5 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Measurements locker */}
          <div className="lg:col-span-7">
            <div className="border border-line bg-surface">
              <div className="flex items-baseline justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
                <div>
                  <p className="font-serif text-2xl font-light text-foreground">Measurement locker</p>
                  <p className="mt-1 text-xs font-light text-muted-foreground">
                    Save once — every future order is cut from these.
                  </p>
                </div>
                <p className="hidden font-serif text-sm italic text-muted-foreground sm:block">in cm</p>
              </div>

              <div className="grid grid-cols-1 gap-4 px-6 py-7 sm:grid-cols-2 md:px-8">
                <label className="block">
                  <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">Bust</span>
                  <input
                    className={FIELD_CLS}
                    inputMode="numeric"
                    placeholder="96"
                    value={profile.bust}
                    onChange={(e) => setProfile({ bust: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">Waist</span>
                  <input
                    className={FIELD_CLS}
                    inputMode="numeric"
                    placeholder="74"
                    value={profile.waist}
                    onChange={(e) => setProfile({ waist: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">Hips</span>
                  <input
                    className={FIELD_CLS}
                    inputMode="numeric"
                    placeholder="102"
                    value={profile.hips}
                    onChange={(e) => setProfile({ hips: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">Shoulder to shoulder</span>
                  <input
                    className={FIELD_CLS}
                    inputMode="numeric"
                    placeholder="41"
                    value={profile.shoulder}
                    onChange={(e) => setProfile({ shoulder: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">Height</span>
                  <input
                    className={FIELD_CLS}
                    inputMode="numeric"
                    placeholder="165"
                    value={profile.height}
                    onChange={(e) => setProfile({ height: e.target.value })}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">Fitting notes</span>
                  <textarea
                    className={FIELD_CLS + " min-h-20"}
                    placeholder="Long torso, sitting length, right side shorter…"
                    value={profile.notes}
                    onChange={(e) => setProfile({ notes: e.target.value })}
                  />
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <Button onClick={save}>
                    {saved ? "Saved — locked to this device" : "Save measurements"}
                  </Button>
                  <Button asChild variant="outline">
                    <a href={waLink(shareMessage)} target="_blank" rel="noreferrer">
                      <Whatsapp size="16" variant="Linear" />
                      Share to the studio
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order history */}
          <div className="lg:col-span-5">
            <div className="border border-line bg-surface">
              <div className="border-b border-line px-6 py-5">
                <p className="font-serif text-2xl font-light text-foreground">Your orders</p>
                <p className="mt-1 text-xs font-light text-muted-foreground">
                  Every order here is confirmed on WhatsApp before any thread is cut.
                </p>
              </div>
              <ul className="divide-y divide-line">
                {orders.map((order) => (
                  <li key={order.id} className="px-6 py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-serif text-base text-foreground">{order.id}</p>
                      <p
                        className={cn(
                          "text-[0.6rem] uppercase tracking-[0.2em]",
                          STATUS_STYLE[order.status] ?? "text-muted-foreground",
                        )}
                      >
                        {order.status}
                      </p>
                    </div>
                    <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">
                      {order.items
                        .map((l) => {
                          const p = findProduct(l.productId);
                          return `${p?.name ?? `№ ${l.productId}`} × ${l.qty}`;
                        })
                        .join(" · ")}
                    </p>
                    <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3">
                      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                        {order.date}
                      </span>
                      <span className="font-serif italic text-foreground">
                        {formatINR(order.totalValue)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Preferences + quick links */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">Preferences</p>
            <div className="border-y border-line bg-surface px-6">
              <Toggle
                checked={profile.newsletter}
                onChange={(v) => setProfile({ newsletter: v })}
                label="Season mailers"
                hint="Two slow letters a year — new drops and studio diaries. No noise."
              />
              <Toggle
                checked={profile.whatsappUpdates}
                onChange={(v) => setProfile({ whatsappUpdates: v })}
                label="WhatsApp order updates"
                hint="Progress of your cut, stitch and dispatch — right where the studio talks."
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">Quick links</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                to="/wishlist"
                className="group flex items-center justify-between gap-4 border border-line-strong px-6 py-6 transition-colors duration-300 hover:border-foreground"
              >
                <span className="flex items-center gap-3 text-foreground">
                  <Heart size="18" variant="Linear" />
                  Wishlist
                </span>
                <span className="font-serif italic text-muted-foreground">{wishlist.length}</span>
              </Link>
              <Link
                to="/checkout"
                className="group flex items-center justify-between gap-4 border border-line-strong px-6 py-6 transition-colors duration-300 hover:border-foreground"
              >
                <span className="flex items-center gap-3 text-foreground">
                  <Bag2 size="18" variant="Linear" />
                  Open order
                </span>
                <span className="font-serif italic text-muted-foreground">{cartCount()}</span>
              </Link>
            </div>
            <p className="mt-6 text-xs font-light leading-relaxed text-muted-foreground">
              Need a fitting? <Link to="/visit" className="underline decoration-line-strong underline-offset-4 hover:text-primary">Book a studio visit</Link> — coffee is on us.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}