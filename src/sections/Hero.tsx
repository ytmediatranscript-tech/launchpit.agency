"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wheelRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".wheel__card");
    const wheel = wheelRef.current;

    const setup = () => {
      let radius = wheel.offsetWidth / 2 || 1000; // Fallback radius
      let center = radius;
      let slice = 360 / cards.length;
      let DEG2RAD = Math.PI / 180;

      gsap.set(cards, {
        x: (i) => center + radius * Math.sin(i * slice * DEG2RAD),
        y: (i) => center - radius * Math.cos(i * slice * DEG2RAD),
        rotation: (i) => i * slice,
        xPercent: -50,
        yPercent: -50,
      });
    };

    setup();
    window.addEventListener("resize", setup);

    // Auto rotate the wheel
    gsap.to(wheel, {
      rotation: "+=360",
      duration: 100,
      ease: "none",
      repeat: -1,
    });

    // Rotate the chakra icon
    gsap.to(".rotate-image-wrapper img", {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Heading reveal
    const title = new SplitType("h1", { types: "chars,words" });
    gsap.from(title.chars, {
      y: 120,
      opacity: 0,
      rotateX: -100,
      transformOrigin: "top center",
      stagger: 0.04,
      duration: 2,
      ease: "expo.out",
      delay: 0.8
    });
    
    gsap.from(".m-4, .btnwrapper", {
      opacity: 0,
      y: 30,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      delay: 1.5
    });

    return () => {
      window.removeEventListener("resize", setup);
      title.revert();
    };
  }, { scope: containerRef });

  const wheelCards = [
    { src: "/images/2026/03/seo-image.jpg", title: "SEO" },
    { src: "/images/2026/03/paid-ads-image.jpg", title: "Paid Ads" },
    { src: "/images/2026/03/web-development.jpg", title: "Website Development" },
    { src: "/images/2026/03/content-writing-image.jpg", title: "Content Creation" },
    { src: "/images/2026/03/video-production-image.jpg", title: "Video Editing" },
    { src: "/images/2026/03/social-media-image.jpg", title: "Social Media Management" },
    { src: "/images/2026/03/ai-image.png", title: "AI" },
    { src: "/images/2026/03/seo-image.jpg", title: "SEO" },
    { src: "/images/2026/03/paid-ads-image.jpg", title: "Paid Ads" },
    { src: "/images/2026/03/web-development.jpg", title: "Website Development" },
    { src: "/images/2026/03/content-writing-image.jpg", title: "Content Creation" },
  ];

  return (
    <section ref={containerRef} className="hero-section section-padding overflow-hidden">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-10 text-center">
            <h1>Growth Marketing That Actually Scales Your Business</h1>
            <div className="slider-section">
              <div ref={wheelRef} className="wheel">
                {wheelCards.map((card, index) => (
                  <div key={index} className="wheel__card">
                    <div className="card-image">
                      <Image src={card.src} alt={card.title} width={300} height={200} priority />
                    </div>
                    <div className="card-content">
                      <h5>{card.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="imgwrapper rotate-image-wrapper w-80">
              <Image src="/images/2026/02/chakra-icon.svg" alt="" width={100} height={100} />
            </div>
            <div className="m-4">
              From Google/Meta Ads and SEO to social media management and video production,{" "}
              <span className="d-lg-block">
                we create cohesive digital strategies to generate consistent leads and sales
              </span>
            </div>
            <div className="btnwrapper d-flex justify-content-center">
              <Link href="#booking" className="button-body">
                <span className="button-text">Get Your Proposal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
