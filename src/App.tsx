import { Collection } from "@/components/Collection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Story } from "@/components/Story";
import { Testimonials } from "@/components/Testimonials";
import { Visit } from "@/components/Visit";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { ThemeProvider } from "@/lib/theme";

export default function App() {
  return (
    <ThemeProvider>
      <div className="grain relative min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <Story />
          <Collection />
          <Testimonials />
          <Visit />
          <WhatsAppCTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}