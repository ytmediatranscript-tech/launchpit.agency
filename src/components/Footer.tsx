import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer id="site-footer" className="header-footer-group">
      <div className="footer-nav-widgets-wrapper header-footer-group">
        <div className="footer-inner container">
          <aside className="footer-widgets-outer-wrapper">
            <div className="footer-widgets-wrapper">
              <div className="footer-widgets column-one grid-item">
                <div className="widget_text widget widget_custom_html">
                  <div className="widget_text widget-content">
                    <div className="textwidget custom-html-widget">
                      <div className="footer-innerwrap">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="logowrapper mb-3">
                                <Link href="/" className="heading-two text-white">
                                  LaunchPit
                                </Link>
                              </div>
                              <p className="text-white">
                                Growth Marketing and Design agency creating digital experiences that convert.
                              </p>
                              <div className="sociallist mt-5">
                                <ul className="d-flex gap-3 list-unstyled p-0">
                                  <li>
                                    <Link href="#" target="_blank">
                                      <Image
                                        src="/images/2026/03/twitter-icon.png"
                                        alt="Twitter"
                                        width={30}
                                        height={30}
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#" target="_blank">
                                      <Image
                                        src="/images/2026/03/linkedin-icon.png"
                                        alt="Linkedin"
                                        width={30}
                                        height={30}
                                      />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-6 offset-md-2">
                              <h4 className="text-white">Services</h4>
                              <div className="menulist">
                                <ul className="list-unstyled p-0">
                                  <li>
                                    <Link className="text-white" href="#service1">
                                      SEO
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="text-white" href="#service2">
                                      Paid Services
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="text-white" href="#service6">
                                      Web Design
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="text-white" href="#service4">
                                      Content Creation
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="text-white" href="#service5">
                                      Social Media Management
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="text-white" href="#service3">
                                      Video Production & Editing
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="text-white" href="#service7">
                                      AI automation
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="text-white" href="#booking">
                                      Contact
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="copyright-section">
        <div className="container">
          <div className="footer-credits text-center">
            <p className="footer-copyright font-14 text-white">
              <Link href="/">LaunchPit Agency</Link> © 2026. All rights reserved
            </p>
          </div>

          <Link className="to-the-top1" href="#site-header">
            <span className="to-the-top-long"></span>
            <span className="to-the-top-short"></span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
