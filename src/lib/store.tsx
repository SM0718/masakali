import * as React from "react";

import { PRODUCTS } from "@/lib/site";

export interface CartLine {
  productId: string;
  qty: number;
}

export interface Profile {
  name: string;
  phone: string;
  email: string;
  bust: string;
  waist: string;
  hips: string;
  height: string;
  shoulder: string;
  notes: string;
  newsletter: boolean;
  whatsappUpdates: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartLine[];
  totalValue: number;
  status: string;
}

const EMPTY_PROFILE: Profile = {
  name: "",
  phone: "",
  email: "",
  bust: "",
  waist: "",
  hips: "",
  height: "",
  shoulder: "",
  notes: "",
  newsletter: false,
  whatsappUpdates: true,
};

const KEY = {
  wishlist: "masakalli-wishlist",
  cart: "masakalli-cart",
  profile: "masakalli-profile",
  orders: "masakalli-orders",
} as const;

const SEED_ORDERS: Order[] = [
  {
    id: "MK-0977",
    date: "Aug 2026",
    items: [{ productId: "park-street-noon", qty: 1 }],
    totalValue: 11900,
    status: "Cutting & stitching",
  },
  {
    id: "MK-0902",
    date: "Jul 2026",
    items: [{ productId: "amla-rose", qty: 1 }],
    totalValue: 14800,
    status: "Delivered",
  },
  {
    id: "MK-0861",
    date: "May 2026",
    items: [
      { productId: "victoria-veranda", qty: 1 },
      { productId: "monsoon-mulberry", qty: 1 },
    ],
    totalValue: 14800,
    status: "Delivered",
  },
];

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function findProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

interface StoreValue {
  wishlist: string[];
  cart: CartLine[];
  profile: Profile;
  orders: Order[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setCartQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartTotal: () => number;
  setProfile: (patch: Partial<Profile>) => void;
  placeOrder: (items: CartLine[], totalValue: number) => Order;
}

const StoreContext = React.createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = React.useState<string[]>(() =>
    read(KEY.wishlist, []),
  );
  const [cart, setCart] = React.useState<CartLine[]>(() => read(KEY.cart, []));
  const [profile, setProfileState] = React.useState<Profile>(() =>
    read(KEY.profile, EMPTY_PROFILE),
  );
  const [orders, setOrders] = React.useState<Order[]>(() =>
    read(KEY.orders, SEED_ORDERS),
  );

  React.useEffect(() => {
    localStorage.setItem(KEY.wishlist, JSON.stringify(wishlist));
  }, [wishlist]);
  React.useEffect(() => {
    localStorage.setItem(KEY.cart, JSON.stringify(cart));
  }, [cart]);
  React.useEffect(() => {
    localStorage.setItem(KEY.profile, JSON.stringify(profile));
  }, [profile]);
  React.useEffect(() => {
    localStorage.setItem(KEY.orders, JSON.stringify(orders));
  }, [orders]);

  const value = React.useMemo<StoreValue>(
    () => ({
      wishlist,
      cart,
      profile,
      orders,
      toggleWishlist(id) {
        setWishlist((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
      },
      isWishlisted(id) {
        return wishlist.includes(id);
      },
      addToCart(id, qty = 1) {
        setCart((prev) => {
          const line = prev.find((l) => l.productId === id);
          if (line) {
            return prev.map((l) =>
              l.productId === id ? { ...l, qty: Math.min(l.qty + qty, 9) } : l,
            );
          }
          return [...prev, { productId: id, qty }];
        });
      },
      removeFromCart(id) {
        setCart((prev) => prev.filter((l) => l.productId !== id));
      },
      setCartQty(id, qty) {
        setCart((prev) =>
          qty <= 0
            ? prev.filter((l) => l.productId !== id)
            : prev.map((l) =>
                l.productId === id ? { ...l, qty: Math.min(qty, 9) } : l,
              ),
        );
      },
      clearCart() {
        setCart([]);
      },
      cartCount() {
        return cart.reduce((sum, l) => sum + l.qty, 0);
      },
      cartTotal() {
        return cart.reduce((sum, l) => {
          const p = findProduct(l.productId);
          return sum + (p ? p.priceValue * l.qty : 0);
        }, 0);
      },
      setProfile(patch) {
        setProfileState((prev) => ({ ...prev, ...patch }));
      },
      placeOrder(items, totalValue) {
        const order: Order = {
          id: `MK-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          }),
          items,
          totalValue,
          status: "Cutting & stitching",
        };
        setOrders((prev) => [order, ...prev]);
        return order;
      },
    }),
    [wishlist, cart, profile, orders],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}