"use client";

import { motion } from "framer-motion";

export default function MidCTA() {
  return (
    <section className="cta-section">
      <motion.div 
        className="cta-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Ready to transform your business?</h2>
        <a href="#" className="btn-demo" id="openConsultModalMidCta">
          Book a Free consultation call <span className="arrow">→</span>
        </a>
      </motion.div>
    </section>
  );
}
