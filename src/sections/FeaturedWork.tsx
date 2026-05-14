"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "AHS Properties",
      href: "https://ahs-properties.com/",
      image: "/images/2026/03/ahs-image.jpg",
      tags: ["SEO", "Social Media Management"],
      colClass: "col-sm-6 col-md-8 mb-5",
    },
    {
      title: "Estudypal",
      href: "https://www.instagram.com/estudypal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      image: "/images/2026/03/estudypal-image.jpg",
      tags: ["SEO", "Social Media Management"],
      colClass: "col-sm-6 col-md-4 mb-5",
    },
    {
      title: "SP Legal",
      href: "https://splegal.ae/",
      image: "/images/2026/03/sp-legal-image.jpg",
      tags: ["Video Editing", "Content Creation"],
      colClass: "col-sm-6 col-md-4 mb-5 mb-sm-0",
    },
    {
      title: "Juriszone",
      href: "https://juriszone.com/",
      image: "/images/2026/03/juriszone-image.jpg",
      tags: ["Video Editing", "Content Creation"],
      colClass: "col-sm-6 col-md-8 mb-5 mb-sm-0",
    },
  ];

  const onMouseEnter = (e: React.MouseEvent) => {
    const follower = document.querySelector("#cursor-follower");
    const text = document.querySelector("#cursor-text");
    const target = e.currentTarget;
    const img = target.querySelector("img");

    if (follower && text) {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" });
      text.classList.remove("hidden");
      text.classList.add("flex");
    }

    if (img) {
      gsap.to(img, { scale: 1.1, filter: "blur(4px)", duration: 0.8, ease: "power3.out" });
    }
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    const follower = document.querySelector("#cursor-follower");
    const text = document.querySelector("#cursor-text");
    const target = e.currentTarget;
    const img = target.querySelector("img");

    if (follower && text) {
      gsap.to(follower, { scale: 0, opacity: 0, duration: 0.5, ease: "power4.out" });
      text.classList.add("hidden");
      text.classList.remove("flex");
    }

    if (img) {
      gsap.to(img, { scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power3.out" });
    }
  };

  return (
    <section ref={containerRef} className="featured-section section-padding bg-silver-gray overflow-hidden">
      <div className="container-fluid">
        <div className="section-header text-center mb-5 reveal">
          <h2 className="big-text">Featured work</h2>
          <div className="grey-vertline mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-4 text-black/60">
            Explore how we turn strategy into measurable growth. Each project reflects our ability to generate leads,
            increase sales, and build scalable marketing systems.
          </p>
        </div>
        <div className="row">
          {projects.map((project, index) => (
            <div key={index} className={`${project.colClass} reveal`}>
              <div
                className="portwrapper group relative"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="portlink block no-underline text-black">
                  <div className="portimage mb-4 rounded-[20px] overflow-hidden relative bg-zinc-200">
                    <div className="will-change-transform h-full w-full">
                      <Image
                        className="rounded-[20px]"
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={800}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <div className="portwrapper-content d-flex align-items-center justify-content-between px-2">
                    <div className="procontent">
                      <h4 className="font-bold text-2xl mb-2">{project.title}</h4>
                      <div className="smbtn d-flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag, i) => (
                          <div key={i} className="bordersm-btn">
                            <div className="sub-text border border-black/10 px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider bg-white/50 backdrop-blur-sm">
                              {tag}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="porlinknbtn rounded-full bg-black w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                      <Image src="/images/2026/02/white-arrow.svg" alt="Arrow" width={18} height={18} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
