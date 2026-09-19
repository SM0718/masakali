import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CloseSquare } from "iconsax-reactjs";
import { Link } from "react-router-dom";

import { PujaCountdown } from "@/components/PujaCountdown";
import { EASE } from "@/lib/motion";

export function SeasonalBanner({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-x-0 top-0 z-[60]"
        >
          <div className="relative overflow-hidden border-b border-line bg-background/95 backdrop-blur-xl">
            <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-vermilion via-sharodiya-gold-bright to-vermilion" />
            <div aria-hidden className="alpona-dots absolute inset-0 opacity-[0.04]" />

            <div className="relative mx-auto flex h-10 max-w-[96rem] items-center justify-center gap-x-3 px-14">
              <span className="relative hidden h-1.5 w-1.5 shrink-0 sm:flex">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vermilion" />
              </span>

              <PujaCountdown className="shrink-0 text-sharodiya-gold dark:text-sharodiya-gold-bright" />

              <p className="min-w-0 truncate text-[0.64rem] font-medium uppercase tracking-[0.2em] text-foreground/70">
                <span>to Shashti</span>
                <span className="hidden md:inline">&nbsp;· The Puja Edit is in the studio</span>
              </p>

              <Link
                to="/shop"
                className="group hidden shrink-0 items-center gap-1.5 font-serif text-sm italic text-vermilion transition-opacity duration-300 hover:opacity-75 dark:text-vermilion-bright md:inline-flex"
              >
                Shop the edit
                <ArrowRight
                  size="13"
                  variant="Linear"
                  className="transition-transform duration-500 group-hover:translate-x-0.5"
                />
              </Link>

              <button
                type="button"
                aria-label="Dismiss puja banner"
                onClick={onClose}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
              >
                <CloseSquare size="15" variant="Linear" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}