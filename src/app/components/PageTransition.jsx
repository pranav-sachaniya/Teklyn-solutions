"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide transition after a short delay, matching the vanilla JS logic
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 100); // Trigger fade out
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="page-transition"
          className="page-transition"
          initial={{ opacity: 1, backgroundColor: "#0B0F17" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none" // allow clicking through while fading
          }}
        />
      )}
    </AnimatePresence>
  );
}
