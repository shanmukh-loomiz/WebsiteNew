import React from "react";
import "../styles/TimelineSection.css";
// import desktopImage from "./assets/timeline-desktop.png"; // Replace with your actual image
// import mobileImage from "./assets/timeline-mobile.png";   // Replace with your actual image

const TimelineSection = () => {
  return (
    <div className="timeline-section">
      <h2 className="main-heading">One Platform, End-to-End  <br />Apparel Solutions.</h2>
      
      {/* Desktop Image */}
      <img src="/TimelineDesktop.svg" alt="Timeline Desktop" className="timeline-image desktop-view" />

      {/* Mobile Image */}
      <img src="TimelineMobile.svg" alt="Timeline Mobile" className="timeline-image mobile-view" />
    </div>
  );
};

export default TimelineSection;
