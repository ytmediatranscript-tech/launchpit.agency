import React from "react";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import FeaturedWork from "@/sections/FeaturedWork";
import About from "@/sections/About";
import Rank from "@/sections/Rank";
import Services from "@/sections/Services";
import Why from "@/sections/Why";
import CTA from "@/sections/CTA";
import Idea from "@/sections/Idea";
import Booking from "@/sections/Booking";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  return (
    <main className="bg-white text-black selection:bg-black selection:text-white">
      <Header />
      
      {/* SECTION 1: Original Hero with Animations */}
      <Hero />

      {/* SECTION 2: About / Story */}
      <SectionReveal className="py-20">
        <About />
      </SectionReveal>

      {/* SECTION 3: Featured Projects with Hover Blur + Custom Cursor */}
      <SectionReveal>
        <FeaturedWork />
      </SectionReveal>

      {/* Additional Original Sections Enhanced with Reveal */}
      <SectionReveal className="py-20">
        <Rank />
      </SectionReveal>

      <SectionReveal className="py-20">
        <Services />
      </SectionReveal>

      <SectionReveal className="py-20">
        <Why />
      </SectionReveal>

      <SectionReveal>
        <CTA />
      </SectionReveal>

      <SectionReveal className="py-20">
        <Idea />
      </SectionReveal>

      <SectionReveal className="pb-32">
        <Booking />
      </SectionReveal>

      <SectionReveal>
        <Footer />
      </SectionReveal>
    </main>
  );
}
