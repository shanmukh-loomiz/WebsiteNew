import React from "react";
import "../styles/ComplianceSection.css";

const ComplianceSection = () => {
  return (
    <section className="compliance-section">
      <div className="partners-section">
        <h2>COMPLIANCE & CERTIFICATIONS</h2>
        <p>
          Sustainability is core to Loomiz. We ensure our partners follow
          eco-friendly practices and provide safe & ethical workplaces.
        </p>
        <div className="scroll-container">
  <div className="partners-logos">
    <img src="/complianceLogo1.svg" alt="Logo 1" />
    <img src="/complianceLogo2.svg" alt="Logo 2" />
    <img src="/complianceLogo3.svg" alt="Logo 3" />
    <img src="/complianceLogo4.svg" alt="Logo 4" />
    <img src="/complianceLogo5.svg" alt="Logo 5" />
    <img src="/complianceLogo6.svg" alt="Logo 6" />
    
    {/* Duplicate Logos for Infinite Scroll Effect */}
    <img src="/complianceLogo1.svg" alt="Logo 1" />
    <img src="/complianceLogo2.svg" alt="Logo 2" />
    <img src="/complianceLogo3.svg" alt="Logo 3" />
    <img src="/complianceLogo4.svg" alt="Logo 4" />
    <img src="/complianceLogo5.svg" alt="Logo 5" />
    <img src="/complianceLogo6.svg" alt="Logo 6" />
  </div>
</div>

      </div>
    </section>
  );
};

export default ComplianceSection;
