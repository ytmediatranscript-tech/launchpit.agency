import React from "react";
import Link from "next/link";

const Idea = () => {
  const cards = [
    {
      title: "Multi-Industry Growth Expertise",
      desc: "We have helped brands across multiple industries scale through data-driven marketing strategies. Our diverse experience allows us to quickly understand your market, identify growth opportunities, and apply proven frameworks tailored to your business model.",
    },
    {
      title: "End-to-End Performance Solutions",
      desc: "From strategy and website development to SEO, paid ads, content, and video production, we manage your entire digital growth ecosystem. Every channel works together with precision to drive measurable results and long-term scalability.",
    },
    {
      title: "Strategic Thinking Backed by Performance",
      desc: "Our approach blends analytical insight with creative execution, ensuring every marketing initiative is aligned with long-term business objectives and measurable impact.",
    },
    {
      title: "Results That Drive Real Business Growth",
      desc: "We focus on metrics that matter — qualified leads, conversion rates, customer acquisition cost, and revenue impact. Every strategy is optimized to deliver measurable performance, not vanity metrics.",
    },
  ];

  return (
    <section className="idea-section section-padding">
      <div className="container-fluid">
        <div className="section-header text-center mb-5 reveal">
          <h2>Ready to Turn Your Marketing Into a Revenue Engine</h2>
          <p>
            Growth does not happen by chance. It is engineered through strategy, creativity, and performance optimization.{" "}
            <span className="d-lg-block">
              Let us build a marketing system designed to attract the right audience, convert effectively, and scale sustainably.
            </span>
          </p>
          <div className="btnwrapper d-flex justify-content-center">
            <Link href="#booking" className="button-body">
              <span className="button-text">Schedule a Consultation</span>
            </Link>
          </div>
        </div>
        <div className="row">
          {cards.map((card, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4 reveal">
              <div className="white-border-box h-100 hover:shadow-lg transition-shadow duration-300">
                <div className="box-content">
                  <h5 className="font-bold mb-3">{card.title}</h5>
                  <p className="text-zinc-600">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Idea;
