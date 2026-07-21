"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-inner">
          <Link href="#" className="nav-logo">
            <img src="/img/logo.svg" alt="Teklyn Solutions LLP" />
          </Link>
          <div className="nav-links">
            <Link href="#services">Services</Link>
            <Link href="#process">Process</Link>
            <Link href="#industries">Industries</Link>
            <Link href="#mission">About us</Link>
          </div>
          <div className="nav-right">
            <a href="#" className="btn-demo" id="openConsultModalNav">
              Let's Talk <span className="arrow">→</span>
            </a>
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
              id="mobileMenuBtn"
              aria-label="Menu"
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`} id="mobileMenu">
        <Link href="#services" onClick={closeMobileMenu}>Services</Link>
        <Link href="#process" onClick={closeMobileMenu}>Process</Link>
        <Link href="#industries" onClick={closeMobileMenu}>Industries</Link>
        <Link href="#mission" onClick={closeMobileMenu}>About us</Link>
        <a 
          href="#" 
          className="btn-demo" 
          id="openConsultModalMobile" 
          style={{ display: "inline-flex", marginTop: "24px" }}
          onClick={closeMobileMenu}
        >
          Let's Talk <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
}
