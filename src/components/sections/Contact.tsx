"use client";

import { useRef, useEffect } from "react";
import { siteConfig } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseEnter = () => {
      container.style.setProperty("--hover-opacity", "1");
    };

    const handleMouseLeave = () => {
      container.style.setProperty("--hover-opacity", "0");
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section 
      id="contact"
      aria-label="Contact"
      ref={containerRef} 
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden border-t border-border bg-background"
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
        "--hover-opacity": "0",
      } as React.CSSProperties}
    >
      {/* Pointer tracking glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: "var(--hover-opacity)",
          background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.1), transparent 40%)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h3 className="text-accent font-mono text-sm mb-8 tracking-widest uppercase">What&apos;s Next?</h3>
        
        <a 
          href={`mailto:${siteConfig.email}`}
          className="group flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 text-foreground group-hover:text-accent transition-colors duration-500">
            Let&apos;s Work<br />Together
          </h2>
          
          <div className="flex items-center gap-2 text-xl md:text-2xl text-muted-foreground group-hover:text-foreground transition-colors">
            <span>{siteConfig.email}</span>
            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </a>
      </div>

      <div className="relative z-10 mt-32 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-muted-foreground">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
        </div>
      </div>
    </section>
  );
}
