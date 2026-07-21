"use client";

import { motion } from "framer-motion";

const industries = [
  { name: "Healthcare", img: "/assets/images/industries/industry_healthcare.png" },
  { name: "Retail", img: "/assets/images/industries/industry_retail.png" },
  { name: "Finance", img: "/assets/images/industries/industry_finance.png" },
  { name: "Education", img: "/assets/images/industries/industry_education.png" },
  { name: "Real Estate", img: "/assets/images/industries/industry_realestate.png" },
  { name: "Manufacturing", img: "/assets/images/industries/industry_manufacturing.png" },
  { name: "Transportation", img: "/assets/images/industries/industry_transportation.png" },
  { name: "Entertainment", img: "/assets/images/industries/industry_entertainment.png" },
  { name: "Hospitality", img: "/assets/images/industries/industry_hospitality.png" },
  { name: "Travel", img: "/assets/images/industries/industry_travel.png" },
  { name: "Legal", img: "/assets/images/industries/industry_legal.png" },
  { name: "Construction", img: "/assets/images/industries/industry_construction.png" }
];

export default function Industries() {
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
    <section className="industries" id="industries">
      <div className="container">
        <motion.div 
          className="industries-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="section-label">Industries</motion.span>
          <motion.h2 variants={itemVariants} className="industries-title">Industries We Serve</motion.h2>
          <motion.p variants={itemVariants} className="industries-subtitle">
            Whether you're in healthcare, retail, or any other sector, we create solutions tailored to your unique business challenges and requirements.
          </motion.p>
        </motion.div>
      </div>
      <div className="industries-carousel">
        <div className="industries-track" id="industriesTrack">
          {industries.map((industry, index) => (
            <div className="industry-card" key={`orig-${index}`}>
              <img src={industry.img} alt={industry.name} className="industry-card-img" />
              <div className="industry-card-overlay"></div>
              <span className="industry-card-name">{industry.name}</span>
            </div>
          ))}
          {/* Duplicate cards for infinite scroll */}
          {industries.map((industry, index) => (
            <div className="industry-card" key={`dup-${index}`}>
              <img src={industry.img} alt={industry.name} className="industry-card-img" />
              <div className="industry-card-overlay"></div>
              <span className="industry-card-name">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
