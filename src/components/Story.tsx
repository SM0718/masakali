import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

import { Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";
import { EASE } from "@/lib/motion";
import { unsplash } from "@/lib/utils";

const STATS = [
  { value: "100%", label: "Handmade, start to finish" },
  { value: "12", label: "Karigars across Bengal" },
  { value: "2016", label: "The year it began" },
] as const;

export function Story() {
  const ref = React.useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} id="story" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="order-2 lg:order-1 lg:col-span-6 lg:pr-14">
            <Reveal>
              <span className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                <span className="eyebrow">Our Story</span>
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="max-w-md text-4xl font-light leading-[1.12] tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
                Slow clothes for
                <em className="italic text-primary"> unhurried </em>
                evenings.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 max-w-lg space-y-6 text-[0.95rem] font-light leading-relaxed text-muted-foreground">
                <p>
                  Masakalli began at a single handloom in Ballygunge with a plain commitment —
                  that no stitch should ever be hurried. Every saree, lehenga and kurta set is
                  cut, embroidered and finished in small numbered batches with karigars who have
                  worked with us for over a decade.
                </p>
                <p>
                  We work in jewel tones that flatter lamp-light — maroon, mustard, olive and old
                  rose — beside the quiet pastels of a Kolkata winter. No mass production, no
                  repeats at the drop: each piece is made once, for the person it is meant for.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line">
                {STATS.map((stat) => (
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

            <Reveal delay={0.3}>
              <p className="mt-10 font-serif text-lg italic text-foreground">
                — The Masakalli studio, Kolkata
              </p>
            </Reveal>
          </div>

          {/* Imagery */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative lg:pl-14">
              <motion.div
                style={{ y: imageY }}
                className="relative w-full overflow-hidden will-change-transform"
              >
                <Img
                  src={unsplash("photo-1524504388940-b1c1722653e1", 1100)}
                  alt="Hand-embroidered detailing being finished at the Masakalli atelier."
                  className="aspect-[3/4] max-h-[720px]"
                  eager
                />
              </motion.div>

              {/* Offset caption block */}
              <motion.div
                style={{ y: badgeY }}
                className="absolute -bottom-8 left-0 z-10 hidden w-56 border border-line bg-background p-5 sm:block lg:-left-2"
              >
                <p className="eyebrow mb-3 text-primary">The Atelier</p>
                <p className="font-serif text-lg font-light italic leading-snug text-foreground">
                  "We cut one length at a time, by hand, from the bolt."
                </p>
              </motion.div>

              {/* Vertical hairline accent */}
              <span
                aria-hidden
                className="absolute right-[-24px] top-16 hidden h-2/3 w-px bg-mustard lg:block"
              />

              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                className="absolute bottom-0 right-0 hidden h-px w-24 origin-left bg-mustard lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}