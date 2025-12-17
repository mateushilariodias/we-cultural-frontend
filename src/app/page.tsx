'use client';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Hero />
      <MaintenanceBanner />
      <Footer />
    </div>
  );
}
