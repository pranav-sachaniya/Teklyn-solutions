"use client";

import { motion } from "framer-motion";

export default function Mission() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="mission" id="mission">
      <div className="container">
        <motion.div 
          className="mission-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Your Trusted Partner</span>
          <h2 className="mission-title">Why you should work with Tek Lyn Solutions</h2>
        </motion.div>
        
        <motion.div 
          className="mission-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Discover Vision */}
          <motion.div variants={itemVariants} className="mission-card">
            <div className="mission-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div className="mission-card-body">
              <h3>Discover Vision</h3>
              <p>We understand your business, audience, goals, and opportunities to build smarter digital growth strategies.</p>
            </div>
          </motion.div>

          {/* Smart Planning */}
          <motion.div variants={itemVariants} className="mission-card">
            <div className="mission-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <div className="mission-card-body">
              <h3>Smart Planning</h3>
              <p>We create scalable branding design, marketing, and performance strategies aligned with modern business growth.</p>
            </div>
          </motion.div>

          {/* Creative Execution */}
          <motion.div variants={itemVariants} className="mission-card">
            <div className="mission-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path></svg>
            </div>
            <div className="mission-card-body">
              <h3>Creative Execution</h3>
              <p>We develop websites, campaigns, branding, and digital experiences designed to improve engagement and visibility.</p>
            </div>
          </motion.div>

          {/* Growth Optimization */}
          <motion.div variants={itemVariants} className="mission-card">
            <div className="mission-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <div className="mission-card-body">
              <h3>Growth Optimization</h3>
              <p>We optimize performance using analytics, insights, automation, and continuous improvements for sustainable digital business growth.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
