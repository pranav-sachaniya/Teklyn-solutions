"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="cta-section">
      <motion.div 
        className="cta-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="cta-tag">Have a cool project?</div>
        <h2>Ready to build something<br/>exceptional together?</h2>
        <a href="#" className="btn-demo" id="openConsultModalCta">
          Get in Touch <span className="arrow">→</span>
        </a>
      </motion.div>
    </section>
  );
}
