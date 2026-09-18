import { Clock, Instagram, Location, Whatsapp } from "iconsax-reactjs";
import { Link } from "react-router-dom";

import { Breadcrumbs, PageIntro } from "@/components/ui/page-intro";
import { Button } from "@/components/ui/button";
import { BRAND, STUDIO_HOURS } from "@/lib/site";
import { waLink } from "@/lib/utils";

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=88.3536%2C22.5104%2C88.3768%2C22.5270&layer=mapnik&marker=22.5187%2C88.3652";

export default function VisitPage() {
  return (
    <main>
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Visit Us" },
          ]}
        />
      </section>

      <PageIntro
        eyebrow="Visit Us"
        title={
          <>
            The studio is open, <em className="italic text-primary">coffee included.</em>
          </>
        }
        lede="Fittings are by appointment, walk-ins are welcome with a ring on the way. The archive lives here in thread and bolt — bring nothing but time."
      />

      <section className="mx-auto max-w-[96rem] px-5 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-10">
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
                  <p className="mt-4 text-sm font-light text-muted-foreground">
                    Getting here — the 12/30 buses stop outside Jodhpur Park; the Ballygunge
                    Phari metro is a ten-minute stroll. Auto-wallahs know the shoe shop on the
                    corner.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock size="22" variant="Linear" className="mt-1 shrink-0 text-primary" />
                <div className="w-full">
                  <p className="eyebrow mb-3">Studio Hours</p>
                  <dl className="divide-y divide-line border-y border-line">
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

              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <a href={waLink(`Hi ${BRAND.name}! I'd like to book a studio appointment.`)} target="_blank" rel="noreferrer">
                    <Whatsapp size="16" variant="Linear" />
                    Book a fitting
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={BRAND.instagram} target="_blank" rel="noreferrer">
                    <Instagram size="16" variant="Linear" />
                    @{BRAND.instagramHandle}
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/shop">Browse first</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative min-h-[420px] w-full border border-line bg-surface lg:min-h-[560px]">
              <iframe
                title="Masakalli studio — Hindustan Park, Ballygunge, Kolkata"
                src={MAP_SRC}
                className="absolute inset-0 h-full w-full grayscale contrast-[1.06] invert-[0.06] dark:invert-[0.86] dark:hue-rotate-[335deg]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
          </div>
        </div>
      </section>
    </main>
  );
}