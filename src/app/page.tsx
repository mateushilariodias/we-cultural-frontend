'use client';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
