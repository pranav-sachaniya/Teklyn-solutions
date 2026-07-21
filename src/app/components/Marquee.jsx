"use client";

import React from "react";

const marqueeItems = [
  { icon: "fa-code", text: "Custom Software Development" },
  { icon: "fa-mobile-screen-button", text: "Web & Mobile App Development" },
  { icon: "fa-layer-group", text: "Product Engineering & MVP Development" },
  { icon: "fa-pen-nib", text: "UI/UX Design & Prototyping" },
  { icon: "fa-cloud", text: "Cloud & DevOps Solutions" },
  { icon: "fa-robot", text: "AI Integration & Automation" },
  { icon: "fa-chart-line", text: "Digital Marketing & SEO" },
  { icon: "fa-lightbulb", text: "Technology Consulting & Enterprise Modernization" },
  { icon: "fa-headset", text: "Software Maintenance & Technical Support" },
  { icon: "fa-check-double", text: "Quality Assurance & Testing" }
];

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {marqueeItems.map((item, index) => (
          <span className="marquee-item" key={`orig-${index}`}>
            <i className={`fa-solid ${item.icon}`}></i> {item.text} <span className="star">✕</span>
          </span>
        ))}
        {/* Repeat once to ensure continuous smooth infinite loop */}
        {marqueeItems.map((item, index) => (
          <span className="marquee-item" key={`dup-${index}`}>
            <i className={`fa-solid ${item.icon}`}></i> {item.text} <span className="star">✕</span>
          </span>
        ))}
      </div>
    </div>
  );
}
