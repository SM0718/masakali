import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight, QuoteUp, Star1 } from "iconsax-reactjs";
import * as React from "react";

import { Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";
import { TESTIMONIALS } from "@/lib/site";

export function Testimonials() {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const { scrollXProgress } = useScroll({ container: scrollerRef });
  const [progress, setProgress] = React.useState(0);

  useMotionValueEvent(scrollXProgress, "change", (v) => setProgress(v));

  function updateArrows(el: HTMLDivElement) {
    const maxScroll = el.scrollWidth - el.clientWidth - 4;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }

  function scrollBy(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, el.scrollWidth - el.clientWidth);
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  }

  return (
    <section id="client-diaries" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <span className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="eyebrow">Client Diaries</span>
            </span>
            <h2 className="max-w-xl text-4xl font-light leading-[1.08] tracking-tight md:text-5xl">
              Worn, loved,
              <em className="italic text-primary"> remembered.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={!canPrev}
                aria-label="Previous reviews"
                className="grid h-12 w-12 cursor-pointer place-items-center border border-line-strong text-foreground transition-all duration-500 hover:border-foreground disabled:cursor-default disabled:opacity-30"
              >
                <ArrowLeft size="17" variant="Linear" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={!canNext}
                aria-label="Next reviews"
                className="grid h-12 w-12 cursor-pointer place-items-center border border-line-strong text-foreground transition-all duration-500 hover:border-foreground disabled:cursor-default disabled:opacity-30"
              >
                <ArrowRight size="17" variant="Linear" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Scroller */}
        <div
          ref={scrollerRef}
          onScroll={(e) => updateArrows(e.currentTarget)}
          className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:-mx-10 md:px-10"
          style={{ scrollbarWidth: "none" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className="snap-start"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <figure className="flex h-full w-[min(86vw,26rem)] flex-col justify-between border border-line bg-surface p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <QuoteUp size="22" variant="Linear" className="text-muted-foreground/60" />
                    <div className="flex items-center gap-1 text-mustard dark:text-mustard-bright">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star1 key={s} size="12" variant="Bold" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-6 font-serif text-xl font-light italic leading-relaxed text-foreground md:text-[1.35rem]">
                    "{t.quote}"
                  </blockquote>
                </div>

                <figcaption className="mt-8 border-t border-line pt-6">
                  <div className="flex items-center gap-4">
                    <Img
                      src={t.avatar}
                      alt={`Portrait of ${t.name}`}
                      className="h-12 w-12 shrink-0 overflow-hidden rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="truncate text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                        {t.area}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-[0.66rem] uppercase tracking-[0.2em] text-primary">
                    Purchased · {t.purchase}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-8 h-px w-full max-w-40 bg-line">
          <motion.div
            className="h-px origin-left bg-primary"
            style={{ scaleX: scrollXProgress }}
          />
        </div>

        <p className="mt-4 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
          Hand-picked from Instagram reviews & after-sale WhatsApp chats
        </p>
      </div>
    </section>
  );
}