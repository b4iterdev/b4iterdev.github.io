"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(textRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
      }, {
        scale: 0.8,
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
      }, 0);

      tl.fromTo(mockupRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 100,
        rotationX: 20,
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        rotationX: 0,
        ease: "power2.out",
      }, 0);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="home" aria-label="Home" ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background pt-20">
      <div 
        ref={textRef} 
        className="z-10 flex flex-col items-center text-center px-4 max-w-5xl"
      >
        <h2 className="text-accent font-mono text-sm md:text-base mb-4 tracking-widest uppercase">
          {siteConfig.name}
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 text-foreground">
          Creative<br />Technologist
        </h1>
        <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl font-light">
          {siteConfig.description}
        </p>
      </div>

      <div 
        ref={mockupRef} 
        className="absolute bottom-0 w-full max-w-6xl h-[40vh] md:h-[60vh] translate-y-1/4 rounded-t-3xl border border-border bg-muted/30 backdrop-blur-md shadow-2xl shadow-accent/10 overflow-hidden flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="w-full h-full bg-gradient-to-b from-border/50 to-transparent flex items-center justify-center">
          <span className="text-muted-foreground/50 font-mono text-sm">Abstract Project Mockup</span>
        </div>
      </div>
    </section>
  );
}
