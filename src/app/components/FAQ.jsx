"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "Why is Teklyn Solutions the Best Digital Agency?",
    answer: "We combine AI-powered strategies, creative execution, and performance marketing to deliver measurable growth, strong branding, and consistent lead generation."
  },
  {
    question: "What services does Teklyn Solutions provide?",
    answer: "We provide a comprehensive suite of digital services including SEO, AI Automation, Web Design, Performance Marketing (Meta & Google Ads), and Social Media Management."
  },
  {
    question: "How do you create a digital marketing strategy for my business?",
    answer: "We start with a deep dive into your business goals, target audience, and current market standing. From there, we build a tailored, multi-channel strategy designed strictly for ROI and scalable growth."
  },
  {
    question: "Can Teklyn Solutions help small businesses and startups?",
    answer: "Absolutely. We offer scalable packages specifically designed to help ambitious startups establish a strong digital footprint and grow efficiently without wasting ad spend."
  },
  {
    question: "How do you ensure better ROI from marketing campaigns?",
    answer: "We leverage advanced AI analytics, continuous A/B testing, and constant campaign optimization to ensure every dollar spent works harder to acquire high-quality leads."
  },
  {
    question: "Do you provide SEO and long-term organic growth services?",
    answer: "Yes, our SEO experts use proven on-page, off-page, and technical SEO strategies to increase your organic visibility and drive sustainable, high-intent traffic over time."
  },
  {
    question: "How can I get started with Teklyn Solutions?",
    answer: "Simply click the 'Book a Free Strategy Call' button! We'll schedule a quick consultation to understand your needs and show you exactly how we can accelerate your growth."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-layout">
          
          {/* Left Column */}
          <div className="faq-left">
            <h2 className="faq-title">
              Got Questions?<br/>
              We’ve Got Answers
            </h2>
            <p className="faq-subtitle">
              However, we recommend reaching out to us if you have any questions.
            </p>
            <Link href="#contact" className="btn-solid-dark">
              Book a Free Strategy Call
            </Link>
          </div>

          {/* Right Column (Accordion) */}
          <div className="faq-right">
            <div className="faq-accordion">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`faq-item ${isOpen ? "open" : ""}`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="faq-question">
                      <h3>{faq.question}</h3>
                      <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="faq-answer-wrapper"
                        >
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
