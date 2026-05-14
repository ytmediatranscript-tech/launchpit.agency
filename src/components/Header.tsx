"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <a className="skip-link screen-reader-text" href="#site-content">
        Skip to the content
      </a>

      {/* WordPress Responsive Menu Pro Trigger (Visual Match) */}
      <button
        type="button"
        id="rmp_menu_trigger-147"
        aria-label="Menu Trigger"
        className={`rmp_menu_trigger rmp-menu-trigger-boring ${isMenuOpen ? "is-active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="rmp-trigger-box">
          <span className="responsive-menu-pro-inner"></span>
        </span>
      </button>

      {/* Mobile Menu Container (from rmp-menu.css) */}
      <div id="rmp-container-147" className={`rmp-container rmp-slide-left ${isMenuOpen ? "rmp-menu-open" : ""}`}>
        <div id="rmp-menu-wrap-147" className="rmp-menu-wrap">
          <ul id="rmp-menu-147" className="rmp-menu" role="menubar" aria-label="Mobile Main Menu">
            <li className="rmp-menu-item">
              <Link href="#booking" className="rmp-menu-item-link" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li className="rmp-menu-item">
              <Link href="#booking" className="rmp-menu-item-link" onClick={() => setIsMenuOpen(false)}>
                Book Online
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <header id="site-header" className="header-footer-group">
        <div className="header-inner container">
          <div className="header-titles-wrapper">
            <button
              className="toggle search-toggle mobile-search-toggle"
              onClick={() => setIsSearchOpen(true)}
              aria-expanded={isSearchOpen}
            >
              <span className="toggle-inner">
                <span className="toggle-icon">
                  <svg
                    className="svg-icon"
                    aria-hidden="true"
                    role="img"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                  >
                    <path
                      d="M38.710696,48.0601792 L43,52.3494831 L41.3494831,54 L37.0601792,49.710696 C35.2632422,51.1481185 32.9839107,52.0076499 30.5038249,52.0076499 C24.7027226,52.0076499 20,47.3049272 20,41.5038249 C20,35.7027226 24.7027226,31 30.5038249,31 C36.3049272,31 41.0076499,35.7027226 41.0076499,41.5038249 C41.0076499,43.9839107 40.1481185,46.2632422 38.710696,48.0601792 Z M36.3875844,47.1716785 C37.8030221,45.7026647 38.6734666,43.7048964 38.6734666,41.5038249 C38.6734666,36.9918565 35.0157934,33.3341833 30.5038249,33.3341833 C25.9918565,33.3341833 22.3341833,36.9918565 22.3341833,41.5038249 C22.3341833,46.0157934 25.9918565,49.6734666 30.5038249,49.6734666 C32.7048964,49.6734666 34.7026647,48.8030221 36.1716785,47.3875844 C36.2023931,47.347638 36.2360451,47.3092237 36.2726343,47.2726343 C36.3092237,47.2360451 36.347638,47.2023931 36.3875844,47.1716785 Z"
                      transform="translate(-20 -31)"
                    ></path>
                  </svg>
                </span>
                <span className="toggle-text">Search</span>
              </span>
            </button>

            <div className="header-titles">
              <div className="site-logo faux-heading">
                <Link href="/" className="custom-logo-link" rel="home">
                  <Image
                    width={442}
                    height={100}
                    src="/images/2026/03/launchpit-logo.png"
                    className="custom-logo"
                    alt="LaunchPit Agency"
                    priority
                  />
                </Link>
                <span className="screen-reader-text">LaunchPit Agency</span>
              </div>
            </div>

            <button
              className="toggle nav-toggle mobile-nav-toggle"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
            >
              <span className="toggle-inner">
                <span className="toggle-icon">
                  <svg
                    className="svg-icon"
                    aria-hidden="true"
                    role="img"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="7"
                    viewBox="0 0 26 7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M332.5,45 C330.567003,45 329,43.4329966 329,41.5 C329,39.5670034 330.567003,38 332.5,38 C334.432997,38 336,39.5670034 336,41.5 C336,43.4329966 334.432997,45 332.5,45 Z M342,45 C340.067003,45 338.5,43.4329966 338.5,41.5 C338.5,39.5670034 340.067003,38 342,38 C343.932997,38 345.5,39.5670034 345.5,41.5 C345.5,43.4329966 343.932997,45 342,45 Z M351.5,45 C349.567003,45 348,43.4329966 348,41.5 C348,39.5670034 349.567003,38 351.5,38 C353.432997,38 355,39.5670034 355,41.5 C355,43.4329966 353.432997,45 351.5,45 Z"
                      transform="translate(-329 -38)"
                    ></path>
                  </svg>
                </span>
                <span className="toggle-text">Menu</span>
              </span>
            </button>
          </div>

          <div className="header-navigation-wrapper">
            <nav className="primary-menu-wrapper" aria-label="Horizontal">
              <ul className="primary-menu reset-list-style">
                <li id="menu-item-112" className="menu-item">
                  <Link href="#booking">Contact Us</Link>
                </li>
                <li id="menu-item-113" className="menu-item">
                  <Link href="#booking">Book Online</Link>
                </li>
              </ul>
            </nav>

            <div className="header-toggles hide-no-js">
              <div className="toggle-wrapper search-toggle-wrapper">
                <button
                  className="toggle search-toggle desktop-search-toggle"
                  onClick={() => setIsSearchOpen(true)}
                  aria-expanded={isSearchOpen}
                >
                  <span className="toggle-inner">
                    <svg
                      className="svg-icon"
                      aria-hidden="true"
                      role="img"
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                    >
                      <path
                        d="M38.710696,48.0601792 L43,52.3494831 L41.3494831,54 L37.0601792,49.710696 C35.2632422,51.1481185 32.9839107,52.0076499 30.5038249,52.0076499 C24.7027226,52.0076499 20,47.3049272 20,41.5038249 C20,35.7027226 24.7027226,31 30.5038249,31 C36.3049272,31 41.0076499,35.7027226 41.0076499,41.5038249 C41.0076499,43.9839107 40.1481185,46.2632422 38.710696,48.0601792 Z M36.3875844,47.1716785 C37.8030221,45.7026647 38.6734666,43.7048964 38.6734666,41.5038249 C38.6734666,36.9918565 35.0157934,33.3341833 30.5038249,33.3341833 C25.9918565,33.3341833 22.3341833,36.9918565 22.3341833,41.5038249 C22.3341833,46.0157934 25.9918565,49.6734666 30.5038249,49.6734666 C32.7048964,49.6734666 34.7026647,48.8030221 36.1716785,47.3875844 C36.2023931,47.347638 36.2360451,47.3092237 36.2726343,47.2726343 C36.3092237,47.2360451 36.347638,47.2023931 36.3875844,47.1716785 Z"
                        transform="translate(-20 -31)"
                      ></path>
                    </svg>
                    <span className="toggle-text">Search</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="search-modal cover-modal header-footer-group showing-search-modal active" role="dialog">
          <div className="search-modal-inner modal-inner">
            <div className="section-inner">
              <form role="search" className="search-form">
                <label>
                  <span className="screen-reader-text">Search for:</span>
                  <input type="search" className="search-field" placeholder="Search …" name="s" autoFocus />
                </label>
                <input type="submit" className="search-submit" value="Search" />
              </form>
              <button className="toggle search-untoggle close-search-toggle" onClick={() => setIsSearchOpen(false)}>
                <span className="screen-reader-text">Close search</span>
                <svg
                  className="svg-icon"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <polygon
                    fillRule="evenodd"
                    points="6.852 7.649 .399 1.195 1.445 .149 7.899 6.602 14.352 .149 15.399 1.195 8.945 7.649 15.399 14.102 14.352 15.149 7.899 8.695 1.445 15.149 .399 14.102"
                  ></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
