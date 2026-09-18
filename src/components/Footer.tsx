import { Call, Clock, Instagram, Location, Whatsapp } from "iconsax-reactjs";
import { Link } from "react-router-dom";

import { BRAND, CATEGORIES, STUDIO_HOURS } from "@/lib/site";
import { waLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer id="footer" className="relative">
      <div className="mx-auto max-w-[96rem] px-5 pb-10 pt-16 md:px-10 md:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <p className="font-serif text-3xl font-medium tracking-wide text-foreground">
              Masakalli
            </p>
            <p className="mt-1 font-serif text-sm italic text-muted-foreground">
              {BRAND.tagline}
            </p>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              Handmade ethnic and Indo-Western wear, tailored in small numbered batches from a
              Ballygunge atelier in Kolkata.
            </p>

            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              <span className="grid h-10 w-10 place-items-center border border-line-strong transition-colors duration-500 group-hover:border-primary">
                <Instagram size="16" variant="Linear" />
              </span>
              {BRAND.instagramHandle}
            </a>
          </div>

          {/* Shop */}
          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Shop</p>
            <ul className="space-y-3.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/shop/${c.slug}`}
                    className="text-sm font-light text-foreground/80 transition-colors duration-300 hover:text-primary"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About / account */}
          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Masakalli</p>
            <ul className="space-y-3.5 text-sm font-light text-foreground/80">
              <li>
                <Link to="/about" className="transition-colors duration-300 hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/visit" className="transition-colors duration-300 hover:text-primary">
                  Visit the studio
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors duration-300 hover:text-primary">
                  Full collections
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="transition-colors duration-300 hover:text-primary">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="transition-colors duration-300 hover:text-primary">
                  Your order
                </Link>
              </li>
              <li>
                <Link to="/account" className="transition-colors duration-300 hover:text-primary">
                  Measurements & account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2">
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3.5 text-sm font-light text-foreground/80">
              <li>
                <a
                  href={waLink(`Hi ${BRAND.name}!`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                >
                  <Whatsapp size="15" variant="Linear" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phoneDisplay.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                >
                  <Call size="15" variant="Linear" />
                  Call the studio
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                >
                  <Location size="15" variant="Linear" />
                  {BRAND.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 space-y-3">
              {STUDIO_HOURS.map((row) => (
                <span key={row.day} className="flex items-start gap-2 text-sm font-light text-foreground/80">
                  <Clock size="15" variant="Linear" className="mt-0.5 shrink-0" />
                  <span>
                    {row.day}
                    <br />
                    <span className="text-muted-foreground">{row.hours}</span>
                  </span>
                </span>
              ))}
              <p className="text-sm font-light text-muted-foreground">
                {BRAND.addressLines[0]}
                <br />
                {BRAND.addressLines[1]}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} Masakalli · Handmade in Kolkata
          </p>
          <p className="font-serif text-sm italic text-muted-foreground">
            Ethnic wear, redefined — saree to sangeet.
          </p>
        </div>
      </div>
    </footer>
  );
}