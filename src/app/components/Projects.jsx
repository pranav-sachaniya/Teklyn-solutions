"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const initialProjects = [
  {
    title: "Fashion E-Commerce Dashboard",
    desc: "A high-conversion storefront and inventory management dashboard for a leading fashion retailer.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    tags: ["Web App", "UI/UX"]
  },
  {
    title: "Skincare Mobile App",
    desc: "An intuitive mobile shopping experience featuring personalized skincare routines and AI recommendations.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop",
    tags: ["Mobile App", "AI Integration"]
  },
  {
    title: "Manufacturing ERP System",
    desc: "A robust enterprise resource planning platform optimizing factory floor operations and supply chain logistics.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2370&auto=format&fit=crop",
    tags: ["Enterprise", "Custom Software"]
  },
  {
    title: "Construction & Logistics App",
    desc: "Real-time fleet tracking and material management software built for heavy industry contractors.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2370&auto=format&fit=crop",
    tags: ["Cloud Infrastructure", "SaaS"]
  }
];

const moreProjects = [
  {
    title: "AI Developer Community",
    desc: "A complete platform overhaul and rebrand for the world's largest AI+ML engineering community.",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2370&auto=format&fit=crop",
    tags: ["Branding", "UI/UX"]
  },
  {
    title: "FinTech Banking Portal",
    desc: "A secure, scalable web application for modern digital banking and automated investment management.",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2370&auto=format&fit=crop",
    tags: ["Web App", "Security"]
  }
];

export default function Projects() {
  const [showMore, setShowMore] = useState(false);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        
        <motion.div 
          className="projects-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="section-label">Featured Work</motion.span>
          <motion.h2 variants={itemVariants}>Products we've built</motion.h2>
          <motion.p variants={itemVariants}>Explore our recent case studies and see how we help businesses transform their digital presence through innovative engineering and design.</motion.p>
        </motion.div>

        <motion.div 
          className="projects-grid" 
          id="projectsGrid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {initialProjects.map((project, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Link href="#" className="project-card visible">
                <div className="project-image-wrapper">
                  <img src={project.img} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, tIndex) => (
                      <span className="tag" key={tIndex}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          <AnimatePresence>
            {showMore && moreProjects.map((project, index) => (
              <motion.div 
                key={`more-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="#" className="project-card visible">
                  <div className="project-image-wrapper">
                    <img src={project.img} alt={project.title} />
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, tIndex) => (
                        <span className="tag" key={tIndex}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!showMore && (
          <motion.div 
            className="projects-action"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button className="btn btn-secondary" onClick={() => setShowMore(true)}>
              View More Projects
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
