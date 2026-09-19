import { motion } from "framer-motion";
import { Whatsapp } from "iconsax-reactjs";
import * as React from "react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/site";
import { waLink } from "@/lib/utils";

const MARQUEE_WORDS = [
  "Sarees",
  "Lehengas",
  "Kaftans",
  "Blazer Sets",
  "Kurta Sets",
  "Palazzo Sets",
  "Indo-Western",
  "Bridal",
  "Puja Edit",
];

export function WhatsAppCTA() {
  return (
    <section id="contact" className="relative">
      <div className="relative overflow-hidden border-y border-line bg-ink text-ivory">
        {/* Local grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Alpona season layer */}
        <div
          aria-hidden
          className="alpona-dots absolute inset-0 opacity-[0.05] mix-blend-screen"
        />
        {/* Warm glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-maroon-bright/25 blur-[120px]"
        />

        <div className="relative mx-auto max-w-[96rem] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow text-ivory/70">Instant Enquiry</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-7 text-4xl font-light leading-[1.06] tracking-tight md:text-6xl">
                Loved something?
                <br />
                <em className="italic text-mustard-bright">Get pricing instantly.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-8 max-w-xl text-[0.97rem] font-light leading-relaxed text-ivory/75">
                One message on WhatsApp is all it takes — pricing, availability, dispatch dates
                and a video call for fittings.{" "}
                <span className="text-ivory">
                  No e-commerce carts. No waiting on price-please DMs.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-11 flex flex-col items-center gap-5">
                <Button
                  asChild
                  variant="whatsapp"
                  size="lg"
                  className="h-16 w-full max-w-md bg-mustard-bright text-ink text-base normal-case tracking-normal hover:bg-mustard-bright/90"
                >
                  <a
                    href={waLink(
                      `Hi ${BRAND.name}! I loved what I saw in your collection — could you share pricing and availability?`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Whatsapp size="22" variant="Linear" />
                    Chat on WhatsApp now
                  </a>
                </Button>
                <p className="flex flex-wrap items-center justify-center gap-x-2 text-[0.66rem] uppercase tracking-[0.2em] text-ivory/60">
                  <span>Takes ~20 seconds</span>
                  <span className="text-ivory/30">·</span>
                  <span>Replies within studio hours</span>
                  <span className="text-ivory/30">·</span>
                  <span>Pan-India delivery</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Marquee */}
          <div className="relative mt-20 overflow-hidden border-t border-ivory/15 pt-8">
            <div className="flex w-max animate-marquee gap-0">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  aria-hidden={dup === 1}
                  className="flex shrink-0 items-center"
                >
                  {MARQUEE_WORDS.map((word) => (
                    <span key={`${dup}-${word}`} className="flex items-center">
                      <span className="px-7 font-serif text-2xl font-light italic text-ivory/35">
                        {word}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-mustard-bright/60" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center font-serif text-lg italic leading-relaxed text-ivory/60">
            শুভ শারদীয়া — this autumn, dressed in vermilion and gold.
          </p>
        </div>
      </div>
    </section>
  );
}