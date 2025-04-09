import React from "react";
import "../styles/SolutionPage.css";

const SolutionPage = () => {
  return (
    <div className="solution-container">
      {/* Our Solution Section with Background Image */}
      <div className="solution-hero">
        <div className="solution-text">
          <h2>OUR SOLUTION</h2>
          <p>
            Experience effortless sourcing and production with Loomiz.  
            From design to delivery—we make manufacturing simple, fast, and reliable.  
            Work with India’s top manufacturing network—trusted by global fashion brands.  
            <br />
            <br />
            <span>Let Loomiz power your production.</span>
          </p>
        </div>
      </div>

      {/* Solution Steps Section */}
      <div className="solution-steps">
        <div className="step reverse solution1">
          <img src="/OurSolutions2.svg" alt="Design Product" className="step-img" />
          <div className="step-text ">
            <h3>DESIGN YOUR PRODUCT</h3>
            <p>
            Kickstart your journey by submitting your unique designs or selecting from our curated collection of trend-driven templates. Each design is accompanied by a detailed tech pack and a physical sample, ensuring a seamless transition to production.​
            </p>
            <ul>
              <li> <strong>Explore Our Design Catalog:</strong> Access a wide array of ready-to-use designs tailored to current market trends.​
              </li>
              <li> <strong>AI-Powered Design Generation:</strong> Create stunning, trend-driven designs effortlessly using our AI tool. Get instant mockups and variations tailored to your brand’s style.</li>
              <li> <strong>Submit Your Design:</strong> Have a specific vision? Share your design and technical drawings, and we'll provide a comprehensive quote within 48 hours.</li>
            </ul>
          </div>
        </div>

        <div className="step solution2 ">
          <img src="/OurSolutions3.svg" alt="Receive Quotations" className="step-img" />
          <div className="step-text with-bg">
            <h3>RECEIVE TAILORED QUOTATIONS</h3>
            <p>
            Skip the hassle of vendor hunting. Just share your requirements—we’ll hand-pick the right manufacturing partners from our network, manage everything, and  also get you competitive quotes within 24 hours
            </p>
          </div>
        </div>

        <div className="step reverse solution3">
          <img src="/OurSolutions4.svg" alt="Develop Samples" className="step-img" />
          <div className="step-text">
            <h3>DEVELOP SAMPLES</h3>
            <p>Once your design is finalized, we move to the sampling phase to ensure every detail aligns with your vision before mass production.</p>
            <ul>
              <li> <strong>3D Virtual Prototyping:</strong> Visualize your designs in real-time using our 3D prototyping tool, reducing the need for multiple physical samples and speeding up decision-making.</li>
              <li> <strong>Physical Sample Development:</strong> Receive high-quality physical samples within a week for final approval before bulk production.</li>
              <li> <strong>Optimized Sampling Process:</strong> Collaborate closely with our team to streamline sampling, reduce costs, and accelerate production timelines.</li>
            </ul>
          </div>
        </div>

        <div className="step solution4">
          <img src="/OurSolutions5.svg" alt="Bulk Production" className="step-img" />
          <div className="step-text">
            <h3>INITIATE BULK PRODUCTION</h3>
            <p>With sample approval, we move to bulk production. Utilize our real-time production dashboard to monitor progress, communicate instantly, and ensure adherence to schedules and quality standards.​</p>
            <ul>
              <li> <strong>End-to-End Support:</strong> From fabric selection to packaging, our platform provides comprehensive assistance at every stage.​</li>
              <li><strong>Advantages Over Direct Factory Engagement:</strong> Benefit from our managed processes, quality assurance, and streamlined communication, reducing risks associated with direct dealings.​</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quality Control Section */}
      <div className="quality-section">
        <h2>QUALITY CONTROL & FINAL INSPECTION</h2>
        <p >We uphold stringent quality control measures to ensure your products meet the highest standards. Our real-time monitoring and inspection processes guarantee consistency across every order.</p>
        <div className="quality-content">
          <div className="quality-item">
            <img src="/AboutUs2.svg" alt="100% Compliance" className="quality-icon" />
            <h3>Real-Time Monitoring</h3>
            <p>Our platform provides live updates on production and quality checks, ensuring full transparency.</p>
          </div>
          <div className="quality-item">
            <img src="/manfacturenetrowklogo.svg" alt="Quality Testing" className="quality-icon" />
            <h3>Detailed Quality Control Reports</h3>
            <p>Each order comes with a comprehensive QC report, including high-resolution images and a fitting video, available upon request before shipment.</p>
          </div>
          <div className="quality-item">
            <img src="/SolutionsCallLogo.svg" alt="Brand Customization" className="quality-icon" />
            <h3>Customer Service & Revisions</h3>
            <p>Our team ensures that your feedback and revisions are well received and implemented to perfection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;
