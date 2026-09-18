import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowDown2, Bag2, Heart, Menu, Profile, Whatsapp } from "iconsax-reactjs";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { CATEGORIES, BRAND } from "@/lib/site";
import { useStore } from "@/lib/store";
import { cn, waLink } from "@/lib/utils";

export function Nav() {
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [shopOpen, setShopOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const { cartCount, wishlist } = useStore();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 32);
  });

  const onHome = location.pathname === "/";
  const solid = scrolled || !onHome;
  const bagCount = cartCount();
  const heartCount = wishlist.length;

  const glyph = cn(
    "transition-colors duration-500",
    solid ? "text-foreground" : "text-ivory",
  );
  const linkCls = cn(
    "link-line text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500",
    solid
      ? "text-foreground/80 hover:text-foreground"
      : "text-ivory/85 hover:text-ivory",
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-700 ${
        solid
          ? "border-b border-line bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[96rem] items-center justify-between gap-6 px-5 transition-[padding] duration-700 md:px-10 ${
          solid ? "py-3" : "py-5"
        }`}
      >
        {/* Wordmark */}
        <Link
          to="/"
          className="group z-50 flex items-baseline gap-2"
          aria-label="Masakalli - home"
        >
          <span
            className={cn(
              "font-serif text-2xl font-medium tracking-wide transition-colors duration-500",
              solid ? "text-foreground" : "text-ivory",
            )}
          >
            Masakalli
          </span>
          <span
            className={cn(
              "hidden font-serif text-sm italic opacity-70 transition-colors duration-500 sm:inline",
              solid ? "text-muted-foreground" : "text-ivory/70",
            )}
          >
            Kolkata
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          <li
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              aria-expanded={shopOpen}
              aria-haspopup="menu"
              className={cn(linkCls, "flex cursor-pointer items-center gap-1.5")}
            >
              Collections
              <ArrowDown2
                size="12"
                variant="Linear"
                className={cn(
                  "transition-transform duration-300",
                  solid ? "" : "text-ivory/70",
                  shopOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  role="menu"
                  className="absolute left-1/2 top-full z-50 w-[26rem] -translate-x-1/2 border border-line bg-background/95 px-3 py-7 backdrop-blur-xl"
                >
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 px-3">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/shop/${c.slug}`}
                        onClick={() => setShopOpen(false)}
                        role="menuitem"
                        className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors duration-300 hover:text-primary"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/shop"
                    onClick={() => setShopOpen(false)}
                    role="menuitem"
                    className="mt-5 block border-t border-line px-3 pt-5 text-[0.62rem] uppercase tracking-[0.26em] text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    View the whole archive
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link
              to="/about"
              className={cn(linkCls, location.pathname === "/about" && "text-primary")}
            >
              Our Story
            </Link>
          </li>
          <li>
            <Link
              to="/visit"
              className={cn(linkCls, location.pathname === "/visit" && "text-primary")}
            >
              Visit Us
            </Link>
          </li>
          <li>
            <Link
              to="/#client-diaries"
              className={cn(linkCls, location.hash === "#client-diaries" && "text-primary")}
            >
              Diaries
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className={glyph}>
            <ThemeToggle />
          </span>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${heartCount} saved`}
            className={cn(
              "relative grid h-10 w-10 place-items-center transition-colors duration-500",
              glyph,
              location.pathname === "/wishlist" && "text-primary",
            )}
          >
            <Heart size="19" variant="Linear" />
            {heartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.55rem] font-semibold text-primary-foreground">
                {heartCount}
              </span>
            )}
          </Link>

          {/* Bag / order */}
          <Link
            to="/checkout"
            aria-label={`Open order, ${bagCount} piece${bagCount === 1 ? "" : "s"}`}
            className={cn(
              "relative grid h-10 w-10 place-items-center transition-colors duration-500",
              glyph,
              location.pathname === "/checkout" && "text-primary",
            )}
          >
            <Bag2 size="19" variant="Linear" />
            {bagCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.55rem] font-semibold text-primary-foreground">
                {bagCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            to="/account"
            aria-label="Your account"
            className={cn(
              "grid h-10 w-10 place-items-center transition-colors duration-500",
              glyph,
              location.pathname === "/account" && "text-primary",
            )}
          >
            <Profile size="19" variant="Linear" />
          </Link>

          <Button asChild variant="whatsapp" size="sm" className="hidden xl:inline-flex">
            <a
              href={waLink(
                `Hi ${BRAND.name}! I was browsing the collection and would love to enquire.`,
              )}
            >
              <Whatsapp size="16" variant="Linear" />
              <span className="hidden md:inline">Enquire on WhatsApp</span>
            </a>
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "grid h-10 w-10 cursor-pointer place-items-center rounded-full lg:hidden",
                  glyph,
                )}
              >
                <Menu size="22" variant="Linear" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetHeader title={BRAND.name} />
              <SheetBody className="flex flex-col justify-between">
                <nav>
                  <ul className="divide-y divide-line">
                    <li>
                      <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-baseline justify-between py-5 text-foreground transition-colors duration-300 hover:text-primary"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-serif text-sm italic text-muted-foreground">00</span>
                          <span className="font-serif text-3xl font-normal">Home</span>
                        </span>
                      </Link>
                    </li>
                    {CATEGORIES.map((c, i) => (
                      <li key={c.slug}>
                        <Link
                          to={`/shop/${c.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-baseline justify-between py-5 text-foreground transition-colors duration-300 hover:text-primary"
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="font-serif text-sm italic text-muted-foreground">
                              0{i + 1}
                            </span>
                            <span className="font-serif text-3xl font-normal">{c.label}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/about"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-baseline justify-between py-5 text-foreground transition-colors duration-300 hover:text-primary"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-serif text-sm italic text-muted-foreground">
                            0{CATEGORIES.length + 1}
                          </span>
                          <span className="font-serif text-3xl font-normal">Our Story</span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/visit"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-baseline justify-between py-5 text-foreground transition-colors duration-300 hover:text-primary"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-serif text-sm italic text-muted-foreground">
                            0{CATEGORIES.length + 2}
                          </span>
                          <span className="font-serif text-3xl font-normal">Visit Us</span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="mt-8 space-y-3 border-t border-line pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border border-line-strong px-4 py-4 text-sm text-foreground transition-colors duration-300 hover:border-foreground"
                    >
                      <span className="flex items-center gap-2.5">
                        <Heart size="16" variant="Linear" />
                        Wishlist
                      </span>
                      <span className="font-serif italic text-muted-foreground">{heartCount}</span>
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border border-line-strong px-4 py-4 text-sm text-foreground transition-colors duration-300 hover:border-foreground"
                    >
                      <span className="flex items-center gap-2.5">
                        <Bag2 size="16" variant="Linear" />
                        Order
                      </span>
                      <span className="font-serif italic text-muted-foreground">{bagCount}</span>
                    </Link>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2 py-1 text-sm text-foreground transition-colors duration-300 hover:text-primary"
                  >
                    <Profile size="16" variant="Linear" />
                    Your account — measurements kept here
                  </Link>
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
                  <p className="text-center text-xs text-muted-foreground">
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