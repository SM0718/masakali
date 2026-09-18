import { Collection } from "@/components/Collection";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Testimonials } from "@/components/Testimonials";
import { Visit } from "@/components/Visit";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Story />
      <Collection />
      <Testimonials />
      <Visit />
      <WhatsAppCTA />
    </main>
  );
}