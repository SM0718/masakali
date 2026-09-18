import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown2, Whatsapp } from "iconsax-reactjs";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";
import { HERO_SLIDES } from "@/lib/site";
import { waLink } from "@/lib/utils";

const SLIDE_INTERVAL = 6000;

export function Hero() {
  const ref = React.useRef<HTMLElement | null>(null);
  const [index, setIndex] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  React.useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, []);

  const active = HERO_SLIDES[index];

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      {/* Parallax image stack */}
      <motion.div style={{ y: imageY }} className="absolute -inset-y-[16%] inset-x-0" aria-hidden>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: EASE },
              scale: { duration: 9, ease: "linear" },
            }}
          >
            <img
              src={active.id}
              alt={active.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Warm gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[96rem] flex-col justify-center px-5 md:px-10"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="eyebrow text-ivory/70">Kolkata · Handmade</span>
            <span className="h-px w-14 bg-ivory/30" />
            <span className="eyebrow text-ivory/70">Est. 2016</span>
          </motion.div>

          <h1 className="text-[clamp(2.75rem,7.5vw,6.75rem)] font-light leading-[1.02] tracking-tight text-ivory">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.72 }}
            >
              Every stitch
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.86 }}
            >
              carries a{" "}
              <em className="font-light italic text-mustard-bright">story.</em>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            className="mt-8 max-w-md text-[0.95rem] font-light leading-relaxed text-ivory/80 md:text-base"
          >
            Handwoven sarees, bridal lehengas and Indo-Western fusion —
            cut, draped and finished by hand in a small Ballygunge atelier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.22 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="group bg-ivory text-ink hover:bg-ivory/85"
            >
              <a href="#collection">
                Explore the collection
                <ArrowDown2
                  size="16"
                  variant="Linear"
                  className="transition-transform duration-500 group-hover:translate-y-0.5"
                />
              </a>
            </Button>
            <Button
              asChild
              variant="whatsapp"
              size="lg"
              className="border border-ivory/30 bg-transparent text-ivory backdrop-blur hover:border-ivory/60 hover:bg-ivory/10"
            >
              <a
                href={waLink(
                  "Hi Masakalli! I saw the collection and I would love pricing on a few pieces.",
                )}
              >
                <Whatsapp size="17" variant="Linear" />
                Get instant pricing
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <div className="mx-auto flex max-w-[96rem] items-center justify-between px-5 pb-6 md:px-10">
          <div className="hidden items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-ivory/60 sm:flex">
            <span className="h-px w-8 bg-ivory/40" />
            {active.caption}
          </div>

          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className="group cursor-pointer p-1"
              >
                <span
                  className={`block h-px w-8 transition-all duration-700 ${
                    i === index ? "bg-mustard-bright" : "bg-ivory/30 group-hover:bg-ivory/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="font-serif text-sm italic tracking-wide text-ivory/70">
            <span className="not-italic text-ivory">0{index + 1}</span>
            <span className="mx-1 text-ivory/40">/</span>
            {String(HERO_SLIDES.length).padStart(2, "0")}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-ivory/60">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-px bg-mustard-bright"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}