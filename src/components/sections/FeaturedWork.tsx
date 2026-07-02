"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { featuredWork } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - windowWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="work" aria-label="Featured Work" ref={containerRef} className="py-24 md:py-0 md:h-screen flex flex-col justify-center overflow-hidden bg-muted/10">
      <div className="px-6 md:px-12 mb-12 md:mb-20">
        <h3 className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">Selected Projects</h3>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Featured Work</h2>
      </div>

      <div 
        ref={scrollRef} 
        className="flex flex-col md:flex-row gap-8 px-6 md:px-12 md:w-max"
      >
        {featuredWork.map((work, index) => (
          <motion.a 
            key={work.id} 
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${work.title} project`}
            className="group relative flex-shrink-0 w-full md:w-[500px] lg:w-[600px] rounded-2xl border border-border bg-background p-8 block"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] border border-accent/50 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <span className="text-muted-foreground font-mono text-sm">0{index + 1}</span>
              <ArrowUpRight className="text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            
            <div className="mb-8 h-48 w-full rounded-xl bg-muted/30 flex items-center justify-center overflow-hidden border border-border/50 relative z-10">
              <span className="text-muted-foreground/50 font-mono text-xs">Project Visual Placeholder</span>
            </div>

            <h4 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">{work.title}</h4>
            <p className="text-muted-foreground mb-8 relative z-10">{work.description}</p>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              {work.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
