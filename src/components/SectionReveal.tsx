"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

const SectionReveal: React.FC<SectionRevealProps> = ({ 
  children, 
  className = "", 
  stagger = 0.08 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".reveal");

    gsap.fromTo(elements, 
      {
        opacity: 0,
        y: 100,
        filter: "blur(15px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
        stagger: stagger,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
        },
      }
    );
  }, [stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default SectionReveal;
