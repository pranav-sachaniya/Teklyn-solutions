"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Blog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="blog" id="blog">
      <div className="container">
        
        <motion.div 
          className="blog-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="section-label">Insights</span>
            <h2>What we're thinking</h2>
          </div>
          <Link href="#" className="btn-blog">
            <span>Visit the Blog</span>
            <div className="btn-icon">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </Link>
        </motion.div>

        <motion.div 
          className="blog-layout"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Featured Post */}
          <motion.a variants={itemVariants} href="#" className="blog-card featured visible">
            <div className="blog-image-wrapper">
              <div className="blog-placeholder blp-1 blog-card-img"></div>
              <div className="blog-meta-glass">
                <span className="blog-tag">Search Strategy</span>
                <span className="blog-read-time"><i className="fa-regular fa-clock"></i> 8 min read</span>
              </div>
            </div>
            <div className="blog-card-body">
              <h3>SEO, GEO, and AEO: What They Are, How They Differ, and Why Your Search Strategy Needs All Three</h3>
              <p className="blog-excerpt">Discover how integrating Search, Generative Engine, and Answer Engine Optimization can dramatically increase your organic visibility and drive higher-quality traffic in the AI era.</p>
              <div className="blog-card-author">
                <img src="https://ui-avatars.com/api/?name=Swetha+Venkiteswaran&background=0F172A&color=fff" alt="Swetha Venkiteswaran" className="author-avatar" />
                <div className="blog-card-author-info">
                  <span className="author-name">Swetha Venkiteswaran</span>
                  <span className="author-role">Content Writer</span>
                </div>
              </div>
            </div>
          </motion.a>
          
          {/* Side Posts */}
          <div className="blog-side-posts">
            <motion.a variants={itemVariants} href="#" className="blog-card compact visible">
              <div className="blog-image-wrapper">
                <div className="blog-placeholder blp-2 blog-card-img"></div>
                <div className="blog-meta-glass">
                  <span className="blog-tag">Ad Platforms</span>
                  <span className="blog-read-time"><i className="fa-regular fa-clock"></i> 5 min read</span>
                </div>
              </div>
              <div className="blog-card-body">
                <h3>The Age of the Agentic Marketing Stack: When Ad Platforms Become Autonomous</h3>
                <div className="blog-card-author">
                  <img src="https://ui-avatars.com/api/?name=Kristen+Pecka&background=0284C7&color=fff" alt="Kristen Pecka" className="author-avatar" />
                  <div className="blog-card-author-info">
                    <span className="author-name">Kristen Pecka</span>
                    <span className="author-role">Head of Marketing</span>
                  </div>
                </div>
              </div>
            </motion.a>

            <motion.a variants={itemVariants} href="#" className="blog-card compact visible">
              <div className="blog-image-wrapper">
                <div className="blog-placeholder blp-3 blog-card-img"></div>
                <div className="blog-meta-glass">
                  <span className="blog-tag">AI Marketing</span>
                  <span className="blog-read-time"><i className="fa-regular fa-clock"></i> 12 min read</span>
                </div>
              </div>
              <div className="blog-card-body">
                <h3>$0 to $3M in Four Months. This Is What AI Marketing Actually Looks Like.</h3>
                <div className="blog-card-author">
                  <img src="https://ui-avatars.com/api/?name=Shubham+Mishra&background=4F46E5&color=fff" alt="Shubham Mishra" className="author-avatar" />
                  <div className="blog-card-author-info">
                    <span className="author-name">Shubham Mishra</span>
                    <span className="author-role">CEO & Co-Founder</span>
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
