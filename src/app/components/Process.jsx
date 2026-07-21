"use client";

import { motion } from "framer-motion";

export default function Process() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="process" id="process">
      <div className="container">
        <motion.div 
          className="process-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="section-label">Our Achievements</motion.span>
          <motion.h2 variants={itemVariants} className="process-title">Driven by strong teams, impactful projects</motion.h2>
        </motion.div>
        
        <motion.div 
          className="process-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Stat 1 */}
          <motion.div variants={itemVariants} className="process-card" data-step="1">
            <div className="stat-number">45+</div>
            <h3 className="process-card-title">Projects Delivered</h3>
            <p className="process-card-desc">We've successfully delivered projects across design, marketing, and AI automation solutions.</p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div variants={itemVariants} className="process-card" data-step="2">
            <div className="stat-number">20+</div>
            <h3 className="process-card-title">Clients Satisfied</h3>
            <p className="process-card-desc">We've executed projects solving real problems, ensuring client satisfaction and measurable results.</p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div variants={itemVariants} className="process-card" data-step="3">
            <div className="stat-number">25+</div>
            <h3 className="process-card-title">Industries Covered</h3>
            <p className="process-card-desc">From tech and e-commerce to education and services, we adapt strategies quickly for every market.</p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div variants={itemVariants} className="process-card" data-step="4">
            <div className="stat-number">04+</div>
            <h3 className="process-card-title">Years of Experience</h3>
            <p className="process-card-desc">Years of hands-on experience in digital and AI marketing, helping brands grow and scale efficiently.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
