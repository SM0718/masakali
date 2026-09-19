import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CloseSquare, Play } from "iconsax-reactjs";
import * as React from "react";
import { Link } from "react-router-dom";

import { EASE } from "@/lib/motion";
import { findProduct } from "@/lib/store";

const SHOW_DELAY_MS = 1400;

const REEL = {
  productId: "amla-rose",
  video: "https://videos.pexels.com/video-files/7679422/7679422-sd_506_960_25fps.mp4",
};

export function ReelPopup() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
  }

  const product = findProduct(REEL.productId);

  return (
    <div className="pointer-events-none fixed inset-y-0 right-3 z-50 flex items-center md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Featured product reel"
            initial={{ x: 140, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 140, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="pointer-events-auto relative"
          >
            <button
              type="button"
              aria-label="Close reel"
              onClick={dismiss}
              className="absolute -right-2.5 -top-2.5 z-10 grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-line-strong bg-background text-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:rotate-90"
            >
              <CloseSquare size="16" variant="Bold" />
            </button>

            <Link
              to={`/product/${product?.id ?? REEL.productId}`}
              className="group relative block w-[6.5rem] overflow-hidden rounded-[1.1rem] border border-line-strong bg-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:w-[7.5rem] md:w-[9rem]"
            >
              <div className="aspect-[9/16] w-full">
                <video
                  src={REEL.video}
                  poster={product?.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35" />

                <div className="absolute left-1.5 top-1.5 flex items-center gap-1.5 rounded-full bg-background/80 px-2 py-1 backdrop-blur-sm sm:left-2 sm:top-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-maroon-bright opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-maroon-bright" />
                  </span>
                  <span className="text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-foreground">
                    Reel
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                  <p className="font-serif text-sm font-medium leading-tight text-ivory sm:text-base">
                    {product?.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[0.55rem] font-medium uppercase tracking-[0.16em] text-mustard-bright">
                    <Play size="10" variant="Bold" className="fill-current" />
                    Shop the look
                    <ArrowRight
                      size="10"
                      variant="Linear"
                      className="transition-transform duration-500 group-hover:translate-x-0.5"
                    />
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}