import React from "react";

const Why = () => {
  const boxes = [
    {
      title: "The Pit",
      desc: "In Formula 1, the pit stop is where races are won. In milliseconds, the crew refuels, changes tyres, and sends the car back faster than before. That’s us. You come in, we work fast, you leave better.",
    },
    {
      title: "The Launch",
      desc: "Every brand has a moment — a campaign, a product, a rebrand — where it needs to burst forward. LaunchPit is built for that moment. We are the engine behind your most important moves.",
    },
    {
      title: "The Crew",
      desc: "We are not a single freelancer or a bloated agency. We are a tight, specialized crew — each person a master of their lane — working in sync to get you moving faster than your competition.",
    },
  ];

  return (
    <section className="why-section section-padding bg-silver-gray">
      <div className="container-fluid">
        <div className="section-header text-center mb-5 reveal">
          <div className="sub-text">The Story</div>
          <h2>Why LaunchPit</h2>
        </div>
        <div className="row">
          {boxes.map((box, index) => (
            <div key={index} className="col-md-4 reveal">
              <div className="boxwrap">
                <h4>{box.title}</h4>
                <p>{box.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
