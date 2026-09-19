import { Clock, Instagram, Location, Whatsapp } from "iconsax-reactjs";
import * as React from "react";

import { Reveal } from "@/components/Reveal";
import { FestiveEyebrow } from "@/components/Alpona";
import { Button } from "@/components/ui/button";
import { BRAND, STUDIO_HOURS } from "@/lib/site";
import { waLink } from "@/lib/utils";

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=88.3536%2C22.5104%2C88.3768%2C22.5270&layer=mapnik&marker=22.5187%2C88.3652";

export function Visit() {
  return (
    <section id="visit" className="relative border-y border-line py-24 md:py-36">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <FestiveEyebrow className="mb-6">Visit Us</FestiveEyebrow>
              <h2 className="max-w-md text-4xl font-light leading-[1.1] tracking-tight md:text-5xl">
                The studio is open, <em className="italic text-primary">coffee included.</em>
              </h2>
            </Reveal>

            <div className="mt-12 space-y-10">
              <Reveal delay={0.08}>
                <div className="flex gap-5">
                  <Location size="22" variant="Linear" className="mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="eyebrow mb-3">The Address</p>
                    <p className="font-light leading-relaxed text-foreground">
                      {BRAND.addressLines[0]}
                      <br />
                      {BRAND.addressLines[1]}
                      <br />
                      <span className="text-muted-foreground">
                        Two minutes from Ballygunge Phari, beside the old Jodhpur Park gates.
                      </span>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="flex gap-5">
                  <Clock size="22" variant="Linear" className="mt-1 shrink-0 text-primary" />
                  <div className="w-full">
                    <p className="eyebrow mb-3">Studio Hours</p>
                    <dl className="divide-y divide-line border-t border-b border-line">
                      {STUDIO_HOURS.map((row) => (
                        <div
                          key={row.day}
                          className="flex items-baseline justify-between gap-6 py-3"
                        >
                          <dt className="text-sm font-light text-foreground">{row.day}</dt>
                          <dd className="text-sm font-light text-muted-foreground">{row.hours}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
                      Fittings are by appointment · give us a ring before dropping by
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="outline">
                    <a href={waLink(`Hi ${BRAND.name}! I'd like to book a studio appointment.`)}>
                      <Whatsapp size="16" variant="Linear" />
                      Book a fitting
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={BRAND.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram size="16" variant="Linear" />
                      @{BRAND.instagramHandle}
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Map */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="relative h-full min-h-[420px] w-full border border-line bg-surface lg:min-h-[560px]">
              <iframe
                title="Masakalli studio — Hindustan Park, Ballygunge, Kolkata"
                src={MAP_SRC}
                className="absolute inset-0 h-full w-full grayscale contrast-[1.06] invert-[0.06] dark:invert-[0.86] dark:hue-rotate-[335deg]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Hairline crosshairs for editorial feel */}
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-px -translate-y-1/2 bg-foreground/30" />
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 bg-foreground/30" />
              <div className="pointer-events-none absolute bottom-5 left-5 border border-line bg-background/90 px-5 py-4 backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-light text-foreground">
                  <Location size="15" variant="Linear" className="text-primary" />
                  {BRAND.addressLines[0]}
                </p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Ballygunge · Kolkata
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}