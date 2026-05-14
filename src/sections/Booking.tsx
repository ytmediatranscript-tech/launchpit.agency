import React from "react";

const Booking = () => {
  return (
    <section id="booking" className="booking-section section-padding bg-silver-gray">
      <div className="container-fluid">
        <div className="section-header text-center mb-5 reveal">
          <div className="sub-text">Booking</div>
          <h2>Reserve Your Spot Today</h2>
          <p>Schedule a call with our experts to discuss your growth strategy.</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 text-center reveal">
            <div className="booking-card p-5 border rounded bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="mb-4">Schedule a Strategy Session</h4>
              <p className="mb-5">
                Pick a time that works for you and let's discuss how we can launch your brand to the next level.
              </p>
              <div className="btnwrapper d-flex justify-content-center">
                <a 
                  href="https://cal.com/launchpit" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button-body"
                >
                  <span className="button-text">Book on Cal.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
