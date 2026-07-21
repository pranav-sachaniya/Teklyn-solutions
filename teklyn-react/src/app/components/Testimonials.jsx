"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "\"Tek Lyn Solutions transformed our vision into a scalable, high-performance platform. Their engineering depth and product strategy were exactly what we needed to accelerate our growth.\"",
    name: "Rahul Sharma",
    role: "CEO, Nexus Technologies"
  },
  {
    quote: "\"The level of craftsmanship they bring is unparalleled. Not only did Tek Lyn deliver ahead of schedule, but the user experience they designed for our mobile app was absolutely flawless.\"",
    name: "Sarah Jenkins",
    role: "Founder, Elevate Finance"
  },
  {
    quote: "\"Partnering with Tek Lyn Solutions was the best decision we made. They don't just write code or design screens; they actively solve complex business problems. A truly world-class technical partner.\"",
    name: "Priya Desai",
    role: "VP of Product, HealthSync"
  },
  {
    quote: "\"Their UI/UX team fundamentally redefined our brand identity. The web platform Tek Lyn designed is incredibly intuitive and perfectly aligned with our core demographic, instantly boosting our conversions.\"",
    name: "Marcus O'Neill",
    role: "CMO, RetailStream"
  },
  {
    quote: "\"When we needed to scale our infrastructure and improve our SEO rankings, Tek Lyn Solutions stepped in and optimized everything. Our organic traffic and system performance have never been better.\"",
    name: "Amit Patel",
    role: "CTO, CloudScale Inc."
  },
  {
    quote: "\"Tek Lyn brings a founder's mentality to product development. Every feature their development team built generated measurable ROI and directly impacted our bottom line.\"",
    name: "Elena Rodriguez",
    role: "Director of Growth, OmniLogistics"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);
  const dots = Array.from({ length: maxIndex + 1 });

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        
        <motion.div 
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="testimonials-title">What our clients say</h2>
          <p className="testimonials-subtitle">Hear from the founders and leaders who have partnered with us to build and scale their digital products.</p>
        </motion.div>

        <motion.div 
          className="testimonials-carousel-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="testimonials-track" 
            id="testimonialsTrack"
            animate={{ x: `calc(-${activeIndex * (100 / itemsPerView)}% - ${activeIndex * (24 / itemsPerView)}px)` }} // 24px is the gap
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                className="testimonial-card" 
                key={index}
              >
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="testimonials-indicators" 
          id="testimonialsIndicators"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {dots.map((_, index) => (
            <div 
              key={index} 
              className={`testimonial-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
