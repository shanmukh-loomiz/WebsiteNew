"use client"; // Ensure Next.js recognizes this as a client component

import React, { useState, useEffect } from "react";
import "../styles/Testimonials.css";

const testimonials = [
  {
    name: "LAXMAN",
    role: "Founder",
    feedback:
      "Loomiz helped us transform our vision into reality. The support and execution were top-notch from start to finish.",
  },
  {
    name: "REKHA",
    role: "Founder",
    feedback:
      "The team at Loomiz made everything feel easy and efficient. I appreciated their professionalism and quick turnarounds.",
  },
  {
    name: "ALEX",
    role: "CEO",
    feedback:
      "An exceptional experience! The attention to detail and commitment to quality were outstanding. I highly recommend Loomiz.",
  },
  {
    name: "PRIYA",
    role: "Manager",
    feedback:
      "Loomiz made everything seamless. Communication was great, and the final product exceeded expectations. Would definitely work again!",
  },
];


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-switch testimonials on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Change every 2 seconds
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <section className="testimonials">
      <div className="testimonials-section">
        <h2>TESTIMONIALS</h2>
        <div className="testimonials-wrapper">
          {!isMobile ? (
            <div className="testimonials-slider">
              <div className="slider-track">
                {[...testimonials, ...testimonials].map((item, index) => (
                  <div key={index} className="testimonial-card">
                    <h3>{item.name}</h3>
                    <p className="role">{item.role}</p>
                    <p className="feedback">{item.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mobile-testimonial">
              <div className="testimonial-card active">
                <h3>{testimonials[currentIndex].name}</h3>
                <p className="role">{testimonials[currentIndex].role}</p>
                <p className="feedback">{testimonials[currentIndex].feedback}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
