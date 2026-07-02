"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, capabilities } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="timeline" aria-label="Experience and Capabilities" ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
      <div>
        <h3 className="text-accent font-mono text-sm mb-12 tracking-widest uppercase">Experience</h3>
        
        <div className="relative pl-8 md:pl-12">
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
            <div ref={lineRef} className="absolute top-0 left-0 w-full h-full bg-accent origin-top" />
          </div>

          <div className="flex flex-col gap-16">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[37px] md:-left-[53px] top-2 w-3 h-3 rounded-full bg-background border-2 border-accent" />
                
                <div className="text-sm font-mono text-accent mb-2">{exp.period}</div>
                <h4 className="text-2xl font-bold mb-1">{exp.role}</h4>
                <div className="text-lg text-muted-foreground mb-4">{exp.company}</div>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-accent font-mono text-sm mb-12 tracking-widest uppercase">Capabilities</h3>
        <div className="flex flex-col gap-6">
          {capabilities.map((cap, index) => (
            <div key={cap} className="group flex items-center gap-4 border-b border-border pb-6">
              <span className="text-muted-foreground font-mono text-sm">0{index + 1}</span>
              <span className="text-2xl md:text-3xl font-medium group-hover:text-accent transition-colors">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
