import React from "react";
import Link from "next/link";

const Rank = () => {
  const services = [
    { name: "SEO", href: "/#service1" },
    { name: "ADS", href: "/#service2" },
    { name: "VIDEO", href: "/#service3" },
    { name: "CONTENT", href: "/#service4" },
    { name: "SOCIAL", href: "/#service5" },
    { name: "WEB DEVELOPMENT", href: "/#service6" },
    { name: "AI", href: "/#service7" },
  ];

  return (
    <section className="rank-section section-padding">
      <div className="container-fluid">
        <div className="section-header text-center mb-5 reveal">
          <h2 className="big-text">
            We Rank. <span className="d-block">You Shine.</span>
          </h2>
          <p>
            LaunchPit is not your average digital agency. We are the pit crew your brand never had —{" "}
            <span className="d-block">fast, precise, and built for performance. From SEO and paid ads to video production and AI</span> workflows, we plug in and launch you forward.
          </p>
        </div>
        <div className="service-list d-flex flex-wrap gap-3 align-items-center justify-content-center reveal">
          {services.map((service, index) => (
            <h2 key={index} className="pe-3 position-relative">
              <Link className="text-black" href={service.href}>
                {service.name}
              </Link>
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rank;
