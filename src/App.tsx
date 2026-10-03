import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MenuSection from "./components/MenuSection";
import About from "./components/About";
import Reservation from "./components/Reservation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-espresso">
      <a
        href="#beranda"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:border-2 focus:border-espresso focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-espresso"
      >
        Lewati ke konten utama
      </a>

      <Navbar />

      <main className="flex-1">
        <Hero />
        <Features />
        <MenuSection />
        <About />
        <Reservation />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
