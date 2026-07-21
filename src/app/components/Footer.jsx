"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="#" className="nav-logo">
              <img src="/img/logo.svg" alt="Teklyn Solutions LLP" />
            </Link>
            <p>We design, build and scale digital products that help businesses grow in a connected world.</p>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <Link href="#">Prism</Link>
            <Link href="#">Adroom</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Compliance</Link>
          </div>
          <div className="footer-col">
            <h4>Solutions</h4>
            <Link href="#">By team</Link>
            <Link href="#">By use case</Link>
            <Link href="#">By industry</Link>
          </div>
          <div className="footer-col">
            <h4>Knowledge Hub</h4>
            <Link href="#">Blog</Link>
            <Link href="#">Resources</Link>
            <Link href="#">Podcasts</Link>
            <Link href="#">Events</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="#">About</Link>
            <Link href="#">News & Press</Link>
            <Link href="#">Careers</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>&copy; 2026 Teklyn Solutions</span>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Fulfillment Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-watermark" aria-hidden="true">TEKLYN</div>
    </footer>
  );
}
