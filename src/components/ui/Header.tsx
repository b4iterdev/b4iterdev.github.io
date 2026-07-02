"use client";

import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center">
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#expertise" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">Expertise</a>
            <a href="#work" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">Work</a>
            <a href="#timeline" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">Timeline</a>
            <a href="#contact" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </header>
    </>
  );
}
