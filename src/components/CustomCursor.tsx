"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Use quickSetter for better performance
    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetFollower = gsap.quickSetter(follower, "x", "px");
    const ySetFollower = gsap.quickSetter(follower, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      xSetCursor(e.clientX);
      ySetCursor(e.clientY);
      
      // Follower follows with a slight delay using GSAP's built-in interpolation
      gsap.to({}, {
        duration: 0.5,
        onUpdate: () => {
          xSetFollower(e.clientX);
          ySetFollower(e.clientY);
        }
      });
    };

    // Alternative smoother approach for follower
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      
      xSetCursor(mouse.x);
      ySetCursor(mouse.y);
      xSetFollower(pos.x);
      ySetFollower(pos.y);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1 h-1 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference translate-x-[-50%] translate-y-[-50%]"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-16 h-16 border border-black/10 rounded-full pointer-events-none z-[9998] backdrop-blur-[6px] flex items-center justify-center text-black opacity-0 scale-0 will-change-transform translate-x-[-50%] translate-y-[-50%]"
        id="cursor-follower"
      >
        <div className="hidden flex flex-col items-center justify-center pointer-events-none" id="cursor-text">
          <ArrowUpRight className="w-5 h-5 mb-0.5 text-black" strokeWidth={1.5} />
          <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-black">Explore</span>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
