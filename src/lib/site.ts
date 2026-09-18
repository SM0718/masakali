import { unsplash } from "./utils";

export const BRAND = {
  name: "Masakalli",
  tagline: "Every stitch carries a story.",
  position: "Ethnic wear, redefined",
  instagram: "https://instagram.com/masakalli_kolkata",
  instagramHandle: "masakalli_kolkata",
  phoneDisplay: "+91 98300 01122",
  email: "hello@masakalli.in",
  addressLines: ["12B Hindustan Park", "Ballygunge, Kolkata 700 029"],
  city: "Kolkata",
};

export const NAV_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Our Story", href: "#story" },
  { label: "Reviews", href: "#client-diaries" },
  { label: "Visit Us", href: "#visit" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO_SLIDES = [
  {
    id: unsplash("photo-1778148046511-27141f5f01ae", 2000),
    alt: "Masakalli handwoven saree in emerald and ochre worn against colonial heritage architecture.",
    caption: "Shot at Victoria Memorial, Kolkata",
  },
  {
    id: unsplash("photo-1515886657613-9f3515b0c78f", 2000),
    alt: "Editorial Indo-western look in warm saffron tones from the Masakalli archive.",
    caption: "Autumn in the garden, Alipore",
  },
  {
    id: unsplash("photo-1490481651871-ab68de25d43d", 2000),
    alt: "Ivory silk drape in soft studio light.",
    caption: "Studio diary · Ivory silk",
  },
] as const;

export interface Product {
  id: string;
  name: string;
  detail: string;
  price: string;
  category: "Sarees" | "Lehengas & Sets" | "Indo-Western" | "Kaftans" | "Details";
  image: string;
  alt: string;
  ratio: "portrait" | "landscape" | "tall";
  accent: "maroon" | "mustard" | "olive";
  tag?: string;
}

export const PRODUCT_CATEGORIES = [
  "All",
  "Sarees",
  "Lehengas & Sets",
  "Indo-Western",
  "Kaftans",
  "Details",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRODUCTS: Product[] = [
  {
    id: "amla-rose",
    name: "Amla Rose",
    detail: "Handwoven Banarasi lehenga · zardozi blouse",
    price: "₹14,800",
    category: "Lehengas & Sets",
    image: unsplash("photo-1583391733956-3750e0ff4e8b", 1000),
    alt: "Deep maroon Banarasi lehenga with hand zardozi embroidery.",
    ratio: "portrait",
    accent: "maroon",
    tag: "Bestseller",
  },
  {
    id: "victoria-veranda",
    name: "Victoria Veranda",
    detail: "Ivory silk saree · gold zari pallu",
    price: "₹9,600",
    category: "Sarees",
    image: unsplash("photo-1490481651871-ab68de25d43d", 1000),
    alt: "Ivory silk saree with a soft gold-bordered zari pallu.",
    ratio: "portrait",
    accent: "mustard",
  },
  {
    id: "ballygunge-blues",
    name: "Ballygunge Blues",
    detail: "Dusty-blue georgette kurta set",
    price: "₹6,400",
    category: "Lehengas & Sets",
    image: unsplash("photo-1509631179647-0177331693ae", 1000),
    alt: "Dusty blue georgette kurta set with tonal block printing.",
    ratio: "landscape",
    accent: "olive",
  },
  {
    id: "monsoon-mulberry",
    name: "Monsoon Mulberry",
    detail: "Olive muslin kaftan · hand-embroidered yoke",
    price: "₹5,200",
    category: "Kaftans",
    image: unsplash("photo-1551488831-00ddcb6c6bd3", 1000),
    alt: "Olive muslin kaftan with delicate threadwork on the yoke.",
    ratio: "portrait",
    accent: "olive",
  },
  {
    id: "park-street-noon",
    name: "Park Street Noon",
    detail: "Mustard Indo-Western blazer set",
    price: "₹11,900",
    category: "Indo-Western",
    image: unsplash("photo-1595950653106-6c9ebd614d3a", 1000),
    alt: "Mustard jacquard blazer set with slim palazzo trouser.",
    ratio: "tall",
    accent: "mustard",
    tag: "New",
  },
  {
    id: "chowringhee-rouge",
    name: "Chowringhee Rouge",
    detail: "Deep-red layered saree · antique organza",
    price: "₹10,200",
    category: "Sarees",
    image: unsplash("photo-1610030469983-98e550d6193c", 1000),
    alt: "Deep-chromed red saree layered over antique organza.",
    ratio: "portrait",
    accent: "maroon",
  },
  {
    id: "maidshanth-ivory",
    name: "Maidān Morning",
    detail: "Cream organza saree · scallop border",
    price: "₹8,900",
    category: "Sarees",
    image: unsplash("photo-1469334031218-e382a71b716b", 1000),
    alt: "Cream organza saree with a hand-rolled scalloped border.",
    ratio: "landscape",
    accent: "mustard",
  },
  {
    id: "charcoal-garden",
    name: "Charcoal Garden",
    detail: "Black & gold printed palazzo set",
    price: "₹7,400",
    category: "Lehengas & Sets",
    image: unsplash("photo-1539109136881-3be0616acf4b", 1000),
    alt: "Black palazzo set with hand-printed gold botanical motifs.",
    ratio: "tall",
    accent: "maroon",
  },
  {
    id: "kantha-stitch",
    name: "Kantha Stitch",
    detail: "Hand-embroidery study · running stitch on silk",
    price: "From ₹850 / runner",
    category: "Details",
    image: unsplash("photo-1509316975850-ff9c5deb0cd9", 1000),
    alt: "Close-up of dense hand-stitched kantha work on silk.",
    ratio: "portrait",
    accent: "olive",
  },
  {
    id: "colonial-ivory",
    name: "Colonial Ivory",
    detail: "Beige silk blazer set · single button",
    price: "₹12,600",
    category: "Indo-Western",
    image: unsplash("photo-1529139574466-a303027c1d8b", 1000),
    alt: "Beige silk blazer set with clean single-button tailoring.",
    ratio: "portrait",
    accent: "olive",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  area: string;
  avatar: string;
  purchase: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I stopped a stranger at the Maidan to ask where her saree was from. The fall on this fabric is unreal — it moves like water.",
    name: "Ananya Sengupta",
    area: "Ballygunge, Kolkata",
    avatar: unsplash("photo-1534528741775-53994a69daeb", 300),
    purchase: "Victoria Veranda · Ivory Silk",
  },
  {
    quote:
      "The fitting is genuinely bespoke. They took every measurement over WhatsApp and the blazer settled like it was made for a museum.",
    name: "Ritika Agarwal",
    area: "Salt Lake, Kolkata",
    avatar: unsplash("photo-1544005313-94ddf0286df2", 300),
    purchase: "Park Street Noon · Mustard",
  },
  {
    quote:
      "Ordered my sister's haldi lehenga on WhatsApp on a Monday, it reached Patna air-cushioned like a jewel box by Thursday. Seamless.",
    name: "Ishaan Roy",
    area: "Park Circus, Kolkata",
    avatar: unsplash("photo-1506629082955-511b1aa562c8", 300),
    purchase: "Amla Rose · Haldi Edit",
  },
  {
    quote:
      "One kaftan carried me through an entire wedding season — coffee mornings to sangeet nights. It is the most flattering thing I own.",
    name: "Mehak Kothari",
    area: "New Town, Kolkata",
    avatar: unsplash("photo-1517841905240-472988babdf9", 300),
    purchase: "Monsoon Mulberry · Olive",
  },
];

export const STUDIO_HOURS = [
  { day: "Tuesday – Sunday", hours: "11:00 — 19:00" },
  { day: "Monday", hours: "By appointment" },
] as const;

export const WHATSAPP_INTRO_MESSAGE =
  "Hi Masakalli! I found you through the collection and I would love to know more about your designs.";