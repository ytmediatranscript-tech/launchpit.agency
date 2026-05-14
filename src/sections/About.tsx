"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "words" });

    gsap.from(split.words, {
      opacity: 0.1,
      y: 20,
      stagger: 0.05,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      },
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="about-section section-padding bg-silver-gray">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="sub-text mb-4 inline-block border-b border-black pb-1">About Us</div>
            <h2 ref={textRef} className="mt-0 leading-tight">
              We are a performance-driven digital marketing agency focused on delivering measurable results. From SEO and
              paid advertising to content creation, social media management, and video production, we design integrated
              marketing systems that attract qualified traffic and turn it into revenue
            </h2>
          </div>
          <div className="col-md-4 d-none d-md-block flex items-center justify-end">
            <div className="imgwrapper rotate-image-wrapper text-end">
              <Image 
                src="/images/2026/02/about_icon.png" 
                alt="" 
                width={180} 
                height={180} 
                className="animate-spin-slow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
