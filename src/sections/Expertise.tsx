"use client";

import React from "react";
import Image from "next/image";
import SectionReveal from "@/components/SectionReveal";

const Expertise = () => {
  const expertises = [
    {
      title: "SEO",
      desc: "We build long-term organic visibility that drives consistent, high-intent traffic to your website. Through technical SEO, keyword strategy, on-page optimization, and authoritative link building, we position your brand where customers are actively searching",
      icon: "/images/2026/03/seo-icon.png",
    },
    {
      title: "Paid Advertising",
      desc: "We design and manage performance-driven Google and Meta ad campaigns that generate measurable ROI. From audience targeting and conversion tracking to creative testing and budget optimization, every campaign is built to scale profitably.",
      icon: "/images/2026/03/ads-icon.png",
    },
    {
      title: "Website Development",
      desc: "We design and develop fast, responsive, conversion-focused websites that turn visitors into customers. From corporate websites to high-performing ecommerce stores, we build scalable platforms optimized for user experience, SEO, and measurable growth",
      icon: "/images/2026/03/code-icon.png",
    },
    {
      title: "Content Creation",
      desc: "We create strategic website and social media content that educates, builds trust, and converts. Every piece is aligned with your brand voice and optimized for engagement and search visibility",
      icon: "/images/2026/03/writer-icon.png",
    },
    {
      title: "Social Media Management",
      desc: "We manage your social presence with strategy, consistency, and performance tracking. From content calendars and community engagement to analytics reporting, we turn your social platforms into growth channels",
      icon: "/images/2026/03/social-media-management-icon.png",
    },
    {
      title: "Video Production & Editing",
      desc: "We produce high-impact videos designed for ads, social media, and brand storytelling. From short-form reels to conversion-focused ad creatives, we create content that captures attention and drives action",
      icon: "/images/2026/03/video-camera-icon.png",
    },
  ];

  return (
    <section className="section-expertise section-padding bg-silver-gray overflow-hidden">
      <div className="container-fluid">
        <div className="section-header text-center mb-5">
          <div className="sub-text mb-2">Our Expertise</div>
          <h2 className="reveal">
            Strategic Marketing Built for <span className="d-md-block">Measurable Growth</span>
          </h2>
        </div>
        <SectionReveal className="row">
          {expertises.map((exp, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4 reveal">
              <div className="white-border-box h-100 hover-box transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="iconbox mb-4">
                  <Image src={exp.icon} alt="icon" width={60} height={60} className="bg-zinc-100 p-2 rounded-full" />
                </div>
                <div className="box-content">
                  <h4 className="mb-3">{exp.title}</h4>
                  <p className="text-zinc-600 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
};

export default Expertise;
