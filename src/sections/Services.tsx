"use client";

import React from "react";
import SectionReveal from "@/components/SectionReveal";

const Services = () => {
  const services = [
    { id: "service1", num: "01", title: "SEO", desc: "Dominate search rankings and bring in organic traffic that converts." },
    { id: "service2", num: "02", title: "Paid Ads", desc: "Google, Meta, YouTube — we run campaigns that spend smart and scale fast." },
    { id: "service3", num: "03", title: "Video Creation", desc: "High-impact video content for social, ads, and brand storytelling." },
    { id: "service4", num: "04", title: "Content Creation", desc: "Blogs, scripts, copy — every word crafted to engage and convert." },
    { id: "service5", num: "05", title: "Social Media", desc: "Strategy, creation, and management across every major platform." },
    { id: "service6", num: "06", title: "Website Design", desc: "Stunning, fast, conversion-optimized websites that work as hard as you do." },
    { id: "service7", num: "07", title: "AI Workflows", desc: "Automate your operations with custom AI systems built for your business." },
    { id: "service8", num: "08", title: "Brand Strategy", desc: "Positioning, identity, and messaging that makes you unforgettable." },
  ];

  return (
    <section className="service-section section-padding bg-white overflow-hidden">
      <div className="container-fluid">
        <div className="section-header text-center mb-5">
          <div className="sub-text mb-2">Services</div>
          <h2 className="reveal">What We Do</h2>
        </div>
        <SectionReveal className="row" stagger={0.1}>
          {services.map((service, index) => (
            <div key={index} id={service.id} className="col-md-4 col-lg-3 mb-4 reveal">
              <div className="darkbox-wrapper h-100 group cursor-pointer transition-all duration-500 hover:bg-zinc-900">
                <div className="boxnum">
                  <h2 className="transition-colors duration-500 group-hover:text-white/20">{service.num}</h2>
                </div>
                <div className="box-heading">
                  <h4 className="text-white mb-3 group-hover:translate-x-2 transition-transform duration-500">{service.title}</h4>
                </div>
                <div className="box-content">
                  <p className="text-white/70 group-hover:text-white transition-colors duration-500">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
};

export default Services;
