import React from "react";
import "../styles/SolutionsSection.css";

const SolutionsSection = () => {
  return (
    <section className="solutions-section">
      <div className="solutions-image-container">
        <img src="/SolutionsSectionPic.svg" alt="Experience" />
      </div>
      <div className="solutions-content">
        <h2>Sustainable & Ethical Sourcing Solutions</h2>
        <p>
          Access real-time data and transparent supply chains for ethical and sustainable sourcing.
        </p>
        <button>LEARN MORE</button>
      </div>
    </section>
  );
};

export default SolutionsSection;
