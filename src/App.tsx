import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ScrollManager } from "@/components/ScrollManager";
import { ThemeProvider } from "@/lib/theme";
import { StoreProvider } from "@/lib/store";
import HomePage from "@/pages/HomePage";

const ShopPage = lazy(() => import("@/pages/ShopPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const WishlistPage = lazy(() => import("@/pages/WishlistPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const VisitPage = lazy(() => import("@/pages/VisitPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function PageLoader() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <p className="font-serif text-lg italic text-muted-foreground">Unrolling the bolt…</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <StoreProvider>
          <ScrollManager />
          <div className="grain relative min-h-screen bg-background text-foreground">
            <Nav />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:slug" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/visit" element={<VisitPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </StoreProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}