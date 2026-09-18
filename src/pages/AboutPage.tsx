import { Instagram } from "iconsax-reactjs";
import { Link } from "react-router-dom";

import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, PageIntro } from "@/components/ui/page-intro";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/site";
import { unsplash } from "@/lib/utils";

const MILESTONES = [
  {
    year: "2016",
    title: "One handloom in Ballygunge",
    body: "Masakalli begins with a single loom, a fallen mulberry tree, and a rule the studio still keeps — no stitch is ever hurried.",
  },
  {
    year: "2018",
    title: "The first numbered batches",
    body: "Every batch starts carrying a number and its finisher's initials. A dress can be repeated; a number never is.",
  },
  {
    year: "2020",
    title: "Six yards from the lockdown",
    body: "Sarees that had been sitting unsold walked into Calcutta windowsills. The Instagram diaries begin — @masakalli_kolkata.",
  },
  {
    year: "2023",
    title: "The sangeet atelier",
    body: "Lehengas and Indo-Western sets join the archive, cut to shoulder and hem from measurements kept on file.",
  },
] as const;

const PROMISES = [
  {
    title: "Made to measure",
    body: "Cut to your shoulder-to-hem, never a rail size. Send measurements once — they are kept on file for every piece after.",
  },
  {
    title: "A jewel-tone palette",
    body: "Maroon, mustard, olive and old rose, hand-dyed in small vats — every length carries the light of the day it was steeped.",
  },
  {
    title: "Signed by the bench",
    body: "Each numbered batch carries its finisher's initials and bench number, so the hand behind your piece is never anonymous.",
  },
] as const;

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-[96rem] px-5 pt-24 md:px-10 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Our Story" },
          ]}
        />
      </section>

      <PageIntro
        eyebrow="Our Story"
        title={
          <>
            Founded on <em className="italic text-primary">a single handloom.</em>
          </>
        }
        lede="Slow clothes for unhurried evenings — made once, for the person it is meant for."
      />

      <section className="mx-auto max-w-[96rem] px-5 pb-10 pt-14 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-6 text-[0.95rem] font-light leading-relaxed text-foreground">
                <p>
                  Masakalli began at a single handloom in Ballygunge with a plain commitment —
                  that no stitch should ever be hurried. Every saree, lehenga and kurta set is
                  cut, embroidered and finished in small numbered batches, with karigars who
                  have worked with us for over a decade.
                </p>
                <p>
                  We work in jewel tones that flatter lamp-light — maroon, mustard, olive and old
                  rose — beside the quiet pastels of a Kolkata winter. No mass production, no
                  repeats at the drop: each piece is made once, for the person it is meant for.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line">
                {[
                  { value: "100%", label: "Handmade, start to finish" },
                  { value: "12", label: "Karigars across Bengal" },
                  { value: "2016", label: "The year it began" },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-6 first:pl-0 last:pr-0">
                    <p className="font-serif text-3xl font-normal text-primary md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[0.62rem] uppercase leading-relaxed tracking-[0.22em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <Img
                src={unsplash("photo-1524504388940-b1c1722653e1", 1100)}
                alt="Hand-embroidered detailing being finished at the Masakalli atelier."
                className="aspect-[3/4] w-full border border-line"
              />
            </Reveal>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <Reveal>
            <span className="mb-10 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="eyebrow">The road since</span>
            </span>
          </Reveal>
          <div className="border-l border-line pl-8 md:pl-14">
            {MILESTONES.map((m, i) => (
              <Reveal
                key={m.year}
                delay={i * 0.08}
                className="relative pb-12 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[33px] top-1.5 h-1.5 w-1.5 rounded-full bg-primary md:-left-[57px]"
                />
                <p className="font-serif text-sm italic text-primary">{m.year}</p>
                <h3 className="mt-2 font-serif text-2xl font-light text-foreground">{m.title}</h3>
                <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Promises */}
        <div className="mt-24 grid grid-cols-1 gap-8 border-y border-line py-12 md:grid-cols-3">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <p className="font-serif text-sm italic text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-3 font-serif text-2xl font-light text-foreground">{p.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-light text-foreground md:text-4xl">
              Come see the archive <em className="italic text-primary">in thread.</em>
            </h2>
            <p className="mt-3 max-w-xl text-sm font-light text-muted-foreground">
              New drops land on Instagram before anywhere else, and the full archive lives in the
              Ballygunge studio — coffee included.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Button asChild>
              <Link to="/shop">Browse the collections</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer">
                <Instagram size="16" variant="Linear" />
                @{BRAND.instagramHandle}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}