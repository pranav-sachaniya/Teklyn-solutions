"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId;

    function resize() {
      width = canvas.width = window.innerWidth;
      const heroSection = canvas.closest('.hero');
      height = canvas.height = heroSection ? heroSection.offsetHeight : window.innerHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const spacing = 45;
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          particles.push({
            x: x + (Math.random() * 20 - 10),
            y: y + (Math.random() * 20 - 10),
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.5 + 1.0
          });
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.vx -= (dx / dist) * force * 1.5;
          p.vy -= (dy / dist) * force * 1.5;
        }

        p.vx += (p.originX - p.x) * 0.02;
        p.vy += (p.originY - p.y) * 0.02;

        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (dist < maxDist) {
          const hoverIntensity = (maxDist - dist) / maxDist;
          const alpha = 0.4 + (hoverIntensity * 0.5);
          ctx.fillStyle = `rgba(140, 150, 165, ${alpha})`;
        } else {
          ctx.fillStyle = 'rgba(191, 194, 198, 0.6)';
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    const heroSection = canvas.closest('.hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="hero">
      <canvas ref={canvasRef} id="heroCanvas" className="hero-canvas"></canvas>
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hero-tag">
          Digital agency - Design, build, scale
        </motion.div>
        
        <motion.h1 variants={itemVariants} id="heroHeading">
          We Design, Build And <span className="accent-word">Scale</span> Digital Tools
        </motion.h1>
        
        <motion.p variants={itemVariants} id="heroSubtitle" className="hero-subtitle">
          We combine product strategy, engineering, and execution to help startups and enterprises
          transform ideas into scalable, high-performance software — delivered faster with reduced complexity.
        </motion.p>
        
        <motion.div variants={itemVariants} id="heroCta" className="hero-cta">
          <button className="btn btn-primary btn-consult" id="openConsultModal">
            Request a Consultation <span>→</span>
          </button>
        </motion.div>

        <motion.div variants={itemVariants} id="heroTechStack" className="hero-tech-stack">
          <p>Technologies We Use</p>
          <div className="tech-logos">
            <img src="https://cdn.simpleicons.org/react" alt="React" title="React" />
            <img src="https://cdn.simpleicons.org/nextdotjs" alt="Next.js" title="Next.js" />
            <img src="https://cdn.simpleicons.org/nodedotjs" alt="Node.js" title="Node.js" />
            <img src="https://cdn.simpleicons.org/amazonaws" alt="AWS" title="AWS" />
            <img src="https://cdn.simpleicons.org/figma" alt="Figma" title="Figma" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
