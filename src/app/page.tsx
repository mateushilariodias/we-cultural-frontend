'use client';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Cta from "@/components/Cta";
import Newsletter from "@/components/Newsletter";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Header />
      <Hero />
      <About />
      <Categories />
      <Cta />
      {/* <Newsletter /> */}
      {/* <Blog /> */}
      <Footer />
    </div>
  );
}
