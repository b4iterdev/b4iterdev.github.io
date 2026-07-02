"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const text =
  "Everything. I bridge the gap between design and engineering, building high-performance utilities, broadcast tools, and cinematic web experiences. My work focuses on low-latency systems, DevOps and many things related to games,... as long as I'm interested in.";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      if (!textRef.current) return;

      // Split text into words for animation
      const words = textRef.current.innerText.split(" ");
      textRef.current.innerHTML = "";

      words.forEach((word) => {
        const span = document.createElement("span");
        span.innerText = word + " ";
        span.className = "opacity-20 transition-opacity duration-300";
        textRef.current?.appendChild(span);
      });

      const spans = textRef.current.querySelectorAll("span");

      gsap.to(spans, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.5,
        },
        opacity: 1,
        stagger: 0.1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="expertise"
      aria-label="What I Do"
      ref={containerRef}
      className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[70vh]"
    >
      <h3 className="text-accent font-mono text-sm mb-8 tracking-widest uppercase">
        What I Do
      </h3>
      <p
        ref={textRef}
        className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground"
      >
        {text}
      </p>
    </section>
  );
}
