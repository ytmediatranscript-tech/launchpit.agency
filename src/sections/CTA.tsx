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

    gsap.fromTo(imageRef.current,
      {
        y: 20,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
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
              <a href="#booking" className="button-body button-body-white bg-white">
                <span className="button-text text-black">Book A Consultation</span>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div ref={imageRef} className="img-wrapper rounded-3 overflow-hidden">
              <Image
                className="rounded-3 w-full h-auto"
                src="/images/2026/02/simg.png"
                alt="Strategy"
                width={800}
                height={800}
                priority
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
