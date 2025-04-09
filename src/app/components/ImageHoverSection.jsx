"use client";
import React, { useState, useEffect } from "react";
import "../styles/ImageHoverSection.css";

const ImageHoverSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const items = [
    { img: "/babywear.svg", video: "/Babywear.mp4", text: "KIDS & BABY WEAR" },
    { img: "/menswear.svg", video: "/Menswear.mp4", text: "MEN'S WEAR" },
    { img: "/womenswear.svg", video: "/Womenswear.mp4", text: "WOMEN'S WEAR" },
    { img: "/Athlesuire.png", video: "/Athlesuire.mp4", text: "Athleisure & Intimates" },
  ];

  return (
    <div className="image-hover-section">
      {isMobile ? (
        // Show only one video on mobile
        <video className="mobile-video" autoPlay loop muted>
          <source src="/MobileViewVideo.mp4" type="video/mp4" />
        </video>
      ) : (
        // Show hover effect on desktop
        items.map((item, index) => (
          <div
            key={index}
            className="image-container"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? (
              <video className="hover-video" autoPlay loop muted>
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <img src={item.img} alt="Display" className="static-image" />
            )}
            <div className="overlay">
              <p>{item.text}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageHoverSection;
