"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current.querySelector("img"), {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="section-cta section-padding bg-black overflow-hidden">
      <div className="container-fluid">
        <div className="row items-center">
          <div className="col-md-6 mb-5 mb-md-0 reveal">
            <h2 className="text-white">A Strategic and Performance-Driven Process Designed for Long-Term Scalable Growth</h2>
            <p className="text-white my-4 opacity-70">
              We follow a structured growth framework that aligns strategy, creative execution, and performance analytics.
              Each phase is designed to attract the right audience, convert them effectively, and continuously improve results over time.
            </p>
            <div className="btnwrapper d-flex justify-content-start">
              <Link href="#booking" className="button-body button-body-white bg-white">
                <span className="button-text text-black">Explore our Approach</span>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div ref={imageRef} className="img-wrapper rounded-3 overflow-hidden aspect-[4/3] relative">
              <Image
                className="rounded-3 absolute inset-0"
                src="/images/2026/02/portfolio-image-two.jpg"
                alt="Strategy"
                fill
                style={{ objectFit: "cover", transform: "scale(1.2)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
