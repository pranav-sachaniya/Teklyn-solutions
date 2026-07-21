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
        </motion.div>

        <motion.div 
          className="blog-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Post 1 */}
          <motion.a variants={itemVariants} href="/blog/seo-geo-aeo" className="blog-card">
            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80" alt="SEO Strategy" className="blog-card-img" />
              <div className="blog-meta-glass">
                <span className="blog-tag">Search Strategy</span>
                <span className="blog-read-time"><i className="fa-regular fa-clock"></i> 8 min read</span>
              </div>
            </div>
            <div className="blog-card-body">
              <h3>SEO, GEO, and AEO: What They Are, How They Differ, and Why Your Search Strategy Needs All Three</h3>
            </div>
          </motion.a>
          
          {/* Post 2 */}
          <motion.a variants={itemVariants} href="/blog/agentic-marketing-stack" className="blog-card">
            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Ad Platforms" className="blog-card-img" />
              <div className="blog-meta-glass">
                <span className="blog-tag">Ad Platforms</span>
                <span className="blog-read-time"><i className="fa-regular fa-clock"></i> 5 min read</span>
              </div>
            </div>
            <div className="blog-card-body">
              <h3>The Age of the Agentic Marketing Stack: When Ad Platforms Become Autonomous</h3>
            </div>
          </motion.a>

          {/* Post 3 */}
          <motion.a variants={itemVariants} href="/blog/ai-marketing-scale" className="blog-card">
            <div className="blog-image-wrapper">
              <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" alt="AI Marketing" className="blog-card-img" />
              <div className="blog-meta-glass">
                <span className="blog-tag">AI Marketing</span>
                <span className="blog-read-time"><i className="fa-regular fa-clock"></i> 12 min read</span>
              </div>
            </div>
            <div className="blog-card-body">
              <h3>$0 to $3M in Four Months. This Is What AI Marketing Actually Looks Like.</h3>
            </div>
          </motion.a>
        </motion.div>

        {/* View More Button */}
        <motion.div 
          className="blog-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/blog" className="btn-demo">
            View more blogs <span className="arrow">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
