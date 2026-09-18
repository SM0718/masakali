import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Whatsapp } from "iconsax-reactjs";
import * as React from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { BRAND, NAV_LINKS } from "@/lib/site";
import { waLink } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 32);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-700 ${
        scrolled
          ? "border-b border-line bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[96rem] items-center justify-between gap-6 px-5 transition-[padding] duration-700 md:px-10 ${
          scrolled ? "py-3.5" : "py-5"
        }`}
      >
        {/* Wordmark */}
        <a href="#top" className="group flex items-baseline gap-2" aria-label="Masakalli - home">
          <span
            className={`font-serif text-2xl font-medium tracking-wide transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-ivory"
            }`}
          >
            Masakalli
          </span>
          <span
            className={`hidden font-serif text-sm italic opacity-70 sm:inline ${
              scrolled ? "text-muted-foreground" : "text-ivory/70"
            }`}
          >
            Kolkata
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`link-line text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                  scrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <span
            className={`transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-ivory"
            }`}
          >
            <ThemeToggle />
          </span>

          <Button asChild variant="whatsapp" size="sm" className="hidden sm:inline-flex">
            <a
              href={waLink(
                `Hi ${BRAND.name}! I was browsing the collection and would love to enquire.`,
              )}
            >
              <Whatsapp size="16" variant="Linear" />
              <span className="hidden md:inline">Enquire on WhatsApp</span>
              <span className="md:hidden">Enquire</span>
            </a>
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full lg:hidden ${
                  scrolled ? "text-foreground" : "text-ivory"
                }`}
              >
                <Menu size="22" variant="Linear" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetHeader title={BRAND.name} />
              <SheetBody className="flex flex-col justify-between">
                <ul className="flex flex-col divide-y divide-line">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline justify-between py-5 text-foreground transition-colors duration-300 hover:text-primary"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-serif text-sm italic text-muted-foreground">
                            0{i + 1}
                          </span>
                          <span className="font-serif text-3xl font-normal">{link.label}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-line pt-6">
                  <Button asChild variant="whatsapp" className="w-full">
                    <a
                      href={waLink(
                        `Hi ${BRAND.name}! I was browsing the collection and would love to enquire.`,
                      )}
                    >
                      <Whatsapp size="16" variant="Linear" />
                      Enquire on WhatsApp
                    </a>
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    {BRAND.instagramHandle} · {BRAND.city}
                  </p>
                </div>
              </SheetBody>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}