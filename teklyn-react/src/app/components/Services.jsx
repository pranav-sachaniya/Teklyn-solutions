"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const services = [
  {
    title: "Custom Software Development",
    desc: "Tailor-made solutions built to scale with your growth and drive measurable outcomes.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
  },
  {
    title: "Web & Mobile App Development",
    desc: "High-performance native and web experiences engineered for speed and reliability.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
  },
  {
    title: "Product Engineering & MVP",
    desc: "From concept validation to market-ready MVP, helping you launch faster.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
  },
  {
    title: "UI/UX Design & Prototyping",
    desc: "Research-driven interfaces that transform complex ideas into intuitive digital experiences.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
  },
  {
    title: "AI Integration & Automation",
    desc: "Embed intelligent machine learning models and AI workflows to unlock efficiency.",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop"
  },
  {
    title: "Digital Marketing & SEO",
    desc: "Data-driven strategies and technical SEO designed to accelerate organic growth.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    title: "Technology Consulting",
    desc: "Strategic advisory to align your digital infrastructure with long-term business goals.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
  },
  {
    title: "Maintenance & Support",
    desc: "Proactive monitoring, bug resolution, and continuous technical support.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
  },
  {
    title: "Quality Assurance & Testing",
    desc: "Comprehensive manual and automated testing to ensure the highest quality standards.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
  }
];

export default function Services() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Measure the track width to calculate how far to scroll
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1024) {
        setIsDesktop(true);
        if (trackRef.current) {
          const trackWidth = trackRef.current.scrollWidth;
          // scrollRange is the track width minus the viewport width plus some padding
          setScrollRange(trackWidth - windowWidth + 40);
        }
      } else {
        setIsDesktop(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Framer Motion useScroll tied to the height of targetRef
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll slightly
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  // Map progress to pixel translation
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  return (
    <section 
      className="services" 
      id="services"
      ref={targetRef}
      style={{ height: isDesktop ? "300vh" : "auto" }} // The container gets tall so we can scroll through it
    >
      <div 
        className={isDesktop ? "services-pin-wrapper" : ""}
        style={{ 
          position: isDesktop ? "sticky" : "relative", 
          top: 0,
          height: isDesktop ? "100vh" : "auto",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div className="services-header fade-up visible">
          <div className="container">
            <span className="section-label">What We Do</span>
            <h2>Services that drive digital transformation</h2>
            <p>From strategy to execution — our experts cover every layer of the modern digital stack.</p>
          </div>
        </div>

        <div className="services-track-container" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <motion.div 
            ref={trackRef}
            className="services-horizontal-track"
            style={{ x: isDesktop ? x : 0 }}
          >
            {services.map((service, index) => (
              <div className="service-card" data-service={service.title} key={index}>
                <img src={service.img} className="service-card-bg" alt={service.title} />
                <div className="service-card-overlay"></div>
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
