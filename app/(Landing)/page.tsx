import Benefits from "@/components/landing/Benefits";
import ContactForm from "@/components/landing/ContactForm";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Modal from "@/components/Elements/General/Modal";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full scroll-smooth">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <FAQ />
      <Pricing />
      <ContactForm />
      <Footer />
      <Modal />
    </main>
  );
}
