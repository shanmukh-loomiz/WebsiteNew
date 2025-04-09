import React from "react";
import "../styles/RegisterSection.css";

const RegisterSection = () => {
  return (
    <section className="register-section">
      <div className="register-content">
        <h2>Grow Your Business with Loomiz</h2>
        <p>Expand your business effortlessly with our trusted supplier network.</p>
        <button>REGISTER NOW</button>
      </div>
      <div className="register-image">
        <img src="/registerSectionPic.svg" alt="Experience" />
      </div>
    </section>
  );
};

export default RegisterSection;
