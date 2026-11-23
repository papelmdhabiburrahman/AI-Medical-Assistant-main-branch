import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Technology from "../components/home/Technology";
import Research from "../components/home/Research";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <Hero />
        <Features />
        <Technology />
        <Research />
      </main>

      <Footer />
    </div>
  );
}