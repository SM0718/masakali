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
  pincode: "700029",
};

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

/* ------------------------------- Categories ------------------------------- */

export interface CategoryMeta {
  slug: string;
  label: string;
  tagline: string;
  blurb: string;
  image: string;
  alt: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "sarees",
    label: "Sarees",
    tagline: "Drapes that move like water",
    blurb:
      "Handloom sarees in bandhani, kora silk and organza — jacquard borders, tissue pallus and six yards cut for the modern drape.",
    image: unsplash("photo-1490481651871-ab68de25d43d", 1400),
    alt: "Ivory silk saree draped in soft studio light.",
  },
  {
    slug: "lehengas-and-sets",
    label: "Lehengas & Sets",
    tagline: "For the evening that remembers",
    blurb:
      "Banarasi lehengas, anarkali sets and sangeet edits — zardozi, gota and hand-beaded blouses, tailored to your bust, waist and hem.",
    image: unsplash("photo-1583391733956-3750e0ff4e8b", 1400),
    alt: "Deep maroon Banarasi lehenga with hand zardozi embroidery.",
  },
  {
    slug: "indo-western",
    label: "Indo-Western",
    tagline: "Kolkata tailoring, reimagined",
    blurb:
      "Bandhani blazers, jacquard dusters and palazzo sets — heritage fabric, single-button tailoring, made to measure from shoulder to hem.",
    image: unsplash("photo-1595950653106-6c9ebd614d3a", 1400),
    alt: "Mustard jacquard blazer set with slim palazzo trouser.",
  },
  {
    slug: "kurta-sets",
    label: "Kurta Sets",
    tagline: "Every day, quietly beautiful",
    blurb:
      "Cotton, georgette and muslin kurta-and-palazzo sets with tonal block prints — easy morning-to-evening dressing in one seam.",
    image: unsplash("photo-1509631179647-0177331693ae", 1400),
    alt: "Dusty blue georgette kurta set with tonal block printing.",
  },
  {
    slug: "kaftans",
    label: "Kaftans",
    tagline: "One length, endlessly flattering",
    blurb:
      "Muslin and kora kaftans with hand-embroidered yokes and shell buttons — the piece that carries you from coffee to sangeet.",
    image: unsplash("photo-1551488831-00ddcb6c6bd3", 1400),
    alt: "Olive muslin kaftan with delicate threadwork on the yoke.",
  },
  {
    slug: "details",
    label: "Details",
    tagline: "The hand behind the garment",
    blurb:
      "Kantha studies, zardozi dupattas and embroidered runners — small works that show why Masakalli cuts nothing in a hurry.",
    image: unsplash("photo-1509316975850-ff9c5deb0cd9", 1400),
    alt: "Close-up of dense hand-stitched kantha work on silk.",
  },
] as const;

export const CATEGORY_SLUG: Record<string, string> = {
  Sarees: "sarees",
  "Lehengas & Sets": "lehengas-and-sets",
  "Indo-Western": "indo-western",
  "Kurta Sets": "kurta-sets",
  Kaftans: "kaftans",
  Details: "details",
};

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label]),
);

export const PRODUCT_CATEGORIES = ["All", ...CATEGORIES.map((c) => c.label)] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/* -------------------------------- Products -------------------------------- */

export interface Product {
  id: string;
  name: string;
  detail: string;
  price: string;
  priceValue: number;
  category: string;
  image: string;
  alt: string;
  ratio: "portrait" | "landscape" | "tall";
  accent: "maroon" | "mustard" | "olive";
  tag?: string;
  fabric: string;
  story: string;
  care: string;
}

const P = (
  id: string,
  name: string,
  detail: string,
  price: string,
  priceValue: number,
  category: string,
  image: string,
  alt: string,
  accent: "maroon" | "mustard" | "olive",
  fabric: string,
  story: string,
  care: string,
  ratio: "portrait" | "landscape" | "tall" = "portrait",
  tag?: string,
): Product => ({
  id,
  name,
  detail,
  price,
  priceValue,
  category,
  image,
  alt,
  ratio,
  accent,
  tag,
  fabric,
  story,
  care,
});

export const PRODUCTS: Product[] = [
  P(
    "amla-rose",
    "Amla Rose",
    "Handwoven Banarasi lehenga · zardozi blouse",
    "₹14,800",
    14800,
    "Lehengas & Sets",
    unsplash("photo-1583391733956-3750e0ff4e8b", 1000),
    "Deep maroon Banarasi lehenga with hand zardozi embroidery.",
    "maroon",
    "Banarasi silk · zardozi-worked georgette blouse",
    "Woven on a Banarasi pit loom and finished with a jaal of hand zardozi, Amla Rose is our most-requested wedding lehenga. The maroon deepens toward midnight under lamp-light, and the tissue dupatta holds its fall without a single press.",
    "Dry clean only · store in muslin",
    "portrait",
    "Bestseller",
  ),
  P(
    "victoria-veranda",
    "Victoria Veranda",
    "Ivory silk saree · gold zari pallu",
    "₹9,600",
    9600,
    "Sarees",
    unsplash("photo-1490481651871-ab68de25d43d", 1000),
    "Ivory silk saree with a soft gold-bordered zari pallu.",
    "mustard",
    "Ivory South-silk · gold zari pallu",
    "Named for the long afternoon light of Victoria Memorial, this ivory silk carries a hand-rolled pallu in soft gold zari. The body weight is kept light so the saree falls in folds rather than gathering at the waist.",
    "Dry clean · iron on reverse",
    "portrait",
  ),
  P(
    "ballygunge-blues",
    "Ballygunge Blues",
    "Dusty-blue georgette kurta set",
    "₹6,400",
    6400,
    "Kurta Sets",
    unsplash("photo-1509631179647-0177331693ae", 1000),
    "Dusty blue georgette kurta set with tonal block printing.",
    "olive",
    "Georgette · tonal block print",
    "A dusty blue that reads barely-blue — cut on the bias so the kurta moves with you. Tonal block-printed florals keep it whispering instead of shouting.",
    "Hand wash cold · dry in shade",
    "landscape",
  ),
  P(
    "monsoon-mulberry",
    "Monsoon Mulberry",
    "Olive muslin kaftan · hand-embroidered yoke",
    "₹5,200",
    5200,
    "Kaftans",
    unsplash("photo-1551488831-00ddcb6c6bd3", 1000),
    "Olive muslin kaftan with delicate threadwork on the yoke.",
    "olive",
    "Handloom muslin · thread-embroidered yoke",
    "The kaftan that carries an entire wedding season. Olive muslin goes sheer at the sleeves, and the yoke carries a quiet field of aari threadwork — made once, in numbered batches of eight.",
    "Hand wash · dry in shade",
    "portrait",
  ),
  P(
    "park-street-noon",
    "Park Street Noon",
    "Mustard Indo-Western blazer set",
    "₹11,900",
    11900,
    "Indo-Western",
    unsplash("photo-1595950653106-6c9ebd614d3a", 1000),
    "Mustard jacquard blazer set with slim palazzo trouser.",
    "mustard",
    "Mustard jacquard · bandhani-lined palazzo",
    "A sharp-shouldered blazer in mustard jacquard over a bandhani-lined palazzo. Cut to your shoulder and waist — the one piece that makes a sangeet floor look like a runway.",
    "Dry clean · press with steam",
    "tall",
    "New",
  ),
  P(
    "chowringhee-rouge",
    "Chowringhee Rouge",
    "Deep-red layered saree · antique organza",
    "₹10,200",
    10200,
    "Sarees",
    unsplash("photo-1610030469983-98e550d6193c", 1000),
    "Deep-chromed red saree layered over antique organza.",
    "maroon",
    "Antique organza · deep-red layered drape",
    "A red that belongs to lit rooms and late dinners. Layered over antique organza, the rouge catches light in the pleats rather than flattening out.",
    "Dry clean only",
    "portrait",
  ),
  P(
    "maidan-morning",
    "Maidān Morning",
    "Cream organza saree · scallop border",
    "₹8,900",
    8900,
    "Sarees",
    unsplash("photo-1469334031218-e382a71b716b", 1000),
    "Cream organza saree with a hand-rolled scalloped border.",
    "mustard",
    "Cream organza · hand-rolled scallop border",
    "Built for the Maidan before the sun sharpens — a feather-light cream organza with a scalloped border rolled by hand, fold by fold.",
    "Dry clean · store flat",
    "landscape",
  ),
  P(
    "charcoal-garden",
    "Charcoal Garden",
    "Black & gold printed palazzo set",
    "₹7,400",
    7400,
    "Kurta Sets",
    unsplash("photo-1539109136881-3be0616acf4b", 1000),
    "Black palazzo set with hand-printed gold botanical motifs.",
    "maroon",
    "Black georgette · hand-printed gold botanicals",
    "A midnight-black set hand-printed with gold botanicals from our own blocks. The palazzo is cut wide enough to stride in, narrow enough to clean at the ankle.",
    "Hand wash cold · iron reverse",
    "tall",
  ),
  P(
    "kantha-stitch",
    "Kantha Stitch",
    "Hand-embroidery study · running stitch on silk",
    "From ₹850 / runner",
    850,
    "Details",
    unsplash("photo-1509316975850-ff9c5deb0cd9", 1000),
    "Close-up of dense hand-stitched kantha work on silk.",
    "olive",
    "Silk base · kantha running stitch",
    "Our signature kantha study — dense running stitch worked row after row to build a landscape in thread. Shown as runners, cushions and framing panels.",
    "Hand wash · dry in shade",
    "portrait",
  ),
  P(
    "colonial-ivory",
    "Colonial Ivory",
    "Beige silk blazer set · single button",
    "₹12,600",
    12600,
    "Indo-Western",
    unsplash("photo-1529139574466-a303027c1d8b", 1000),
    "Beige silk blazer set with clean single-button tailoring.",
    "olive",
    "Beige silk · single-button tailoring",
    "Clean lines, one button, no noise. Colonial Ivory is tailored like a museum piece — fully canvassed, cut to your shoulder, and finished with our hand-rolled buttonhole.",
    "Dry clean only",
    "portrait",
  ),
  P(
    "tuscan-morning",
    "Tuscan Morning",
    "Rose-print kora silk saree · hand-rolled hem",
    "₹8,200",
    8200,
    "Sarees",
    unsplash("photo-1517841905240-472988babdf9", 1000),
    "Rose-print kora silk saree in soft daylight.",
    "mustard",
    "Kora silk · hand-printed roses",
    "A garden printed on kora silk — small roses in old rose and mustard, scattered like morning light. Sheer enough to float, sturdy enough to wear every day.",
    "Hand wash cold · dry in shade",
    "portrait",
  ),
  P(
    "lal-bazaar",
    "Lal Bazaar",
    "Vermillion organza anarkali set · gota trim",
    "₹9,400",
    9400,
    "Lehengas & Sets",
    unsplash("photo-1483985988355-763728e1935b", 1000),
    "Vermillion organza anarkali with hand gota trim.",
    "maroon",
    "Vermillion organza · hand gota trim",
    "A wedding-season red that does not apologise. The anarkali flares late, and every hem is finished with gota pressed in by hand.",
    "Dry clean only",
    "portrait",
    "New",
  ),
  P(
    "golpark-garden",
    "Golpark Garden",
    "Chintz-print cotton kurta set",
    "₹5,800",
    5800,
    "Kurta Sets",
    unsplash("photo-1506629082955-511b1aa562c8", 1000),
    "Chintz-print cotton kurta set worn open in the garden.",
    "olive",
    "Washed cotton · chintz block print",
    "Washed cotton that lives in binder-dry Indian light. Chintz florals keep the mood light; the set is cut relaxed with a narrow palazzo.",
    "Machine wash — gentle · line dry",
    "portrait",
  ),
  P(
    "rajpur-rajah",
    "Rajpur Rajah",
    "Indigo duster coat set · bandhani lining",
    "₹9,900",
    9900,
    "Indo-Western",
    unsplash("photo-1778148046511-27141f5f01ae", 1000),
    "Indigo duster coat set against heritage architecture.",
    "maroon",
    "Indigo linen duster · bandhani lining",
    "A long indigo duster with a surprise of bandhani inside. Worn open over everything — sarees, sets, a plain white shirt.",
    "Dry clean · steam press",
    "portrait",
    "New",
  ),
  P(
    "dhakuria-dawn",
    "Dhakuria Dawn",
    "Blush organza saree · silver tissue border",
    "₹8,600",
    8600,
    "Sarees",
    unsplash("photo-1534528741775-53994a69daeb", 1000),
    "Blush organza saree with a silver tissue border.",
    "olive",
    "Blush organza · silver tissue border",
    "The colour of the sky over Dhakuria at half-past six. A blush where the wearer catches light, finished with a whisper of silver tissue.",
    "Dry clean · store flat",
    "portrait",
  ),
  P(
    "new-market-noir",
    "New Market Noir",
    "Black bandhani linen blazer set",
    "₹10,800",
    10800,
    "Indo-Western",
    unsplash("photo-1544005313-94ddf0286df2", 1000),
    "Black bandhani linen blazer set with clean tailoring.",
    "mustard",
    "Black linen · bandhani jacquard trim",
    "Midnight tailoring from the New Market end of town — black linen, bandhani jacquard at the cuff and lapel, and a shoulder that holds its own line.",
    "Dry clean only",
    "tall",
  ),
  P(
    "kora-breeze",
    "Kora Breeze",
    "Kora muslin kaftan · shell buttons",
    "₹4,900",
    4900,
    "Kaftans",
    unsplash("photo-1515886657613-9f3515b0c78f", 1000),
    "Kora muslin kaftan with shell buttons in an autumn garden.",
    "olive",
    "Kora muslin · mother-of-pearl shell buttons",
    "The lightest thing we cut — kora muslin that breathes in Calcutta humidity, closed with mother-of-pearl buttons and finished at the hem with a rolled thread edge.",
    "Hand wash · dry in shade",
    "tall",
  ),
  P(
    "zardozi-runner",
    "Zardozi Runner",
    "Hand-zardozi dupatta · table & drape",
    "From ₹1,200",
    1200,
    "Details",
    unsplash("photo-1524504388940-b1c1722653e1", 1000),
    "Close-up of hand-zardozi work on a silk dupatta runner.",
    "maroon",
    "Silk base · hand zardozi work",
    "Our zardozi bench's small works — dupattas that turn into table runners when the event changes. Every motif is set by hand over a paper tracing.",
    "Dry clean · store flat",
    "landscape",
  ),
];

/* ------------------------------- Testimonials ------------------------------ */

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

/* ------------------------------- Studio misc ------------------------------- */

export const STUDIO_HOURS = [
  { day: "Tuesday – Sunday", hours: "11:00 — 19:00" },
  { day: "Monday", hours: "By appointment" },
] as const;

export const SHIPS_IN = "8–12 working days";

export const WHATSAPP_INTRO_MESSAGE =
  "Hi Masakalli! I found you through the collection and I would love to know more about your designs.";