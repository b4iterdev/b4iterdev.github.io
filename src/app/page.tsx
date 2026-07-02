import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="w-full">
        <Hero />
        <About />
        <FeaturedWork />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
