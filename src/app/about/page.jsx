import React from "react";
import Image from "next/image";
import "../styles/AboutUs.css";
import ComplianceSection from "../components/ComplianceSection";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* ABOUT US Section */}
      <div className="about-us">
        <h2>ABOUT US</h2>
        <p>
          A comprehensive fashion platform that seamlessly integrates design,
          development, production, and logistics into a single digital
          ecosystem. By streamlining each stage of the fashion lifecycle, we
          enable brands, designers, and manufacturers to collaborate
          efficiently, reduce lead times, and enhance overall productivity. Our
          platform ensures a smooth transition from concept to final product,
          providing end-to-end visibility, optimized workflows, and data-driven
          insights for smarter decision-making
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="vision-mission">
        <div className="vision-card">
          <h3>OUR VISION</h3>
          <p>
            To redefine the global fashion industry landscape by enabling
            seamless integration of technology and creativity, fostering a
            sustainable, efficient, and collaborative environment for brands and
            manufacturers worldwide
          </p>
        </div>
        <div className="mission-card">
          <h3>OUR MISSION</h3>
          <p>
            To empower brands and manufacturers with cutting -edge tools that
            streamline design, production, and distribution processes, enhance
            decision-making with data-driven insights, and drive growth through
            collaborative and innovative solutions.
          </p>
        </div>
      </div>

      <div className="more-about">
        <div className="more-about-header">
          {/* LEFT SIDE: Title and Logo */}
          <div className="title-logo">
            <h3>MORE ABOUT</h3>
            {/* <img src="/BlueLoomizName.svg" alt="Loomiz Logo" className="loomiz-logo" /> */}
            <Image
              src="/BlueLoomizName.svg"
              alt="Loomiz Logo"
              className="loomiz-logo"
              width={250}
              height={500}
            ></Image>
          </div>

          {/* RIGHT SIDE: Text */}
          <p className="more-about-text">
            We didn’t stop there. Our functionality continues to grow and
            evolve, with AI-built cutting-edge features built specially for
            Global Fashion Brands. We offer a faster way to design fashion
            products. Use your own inspiration images, sketches, or AI power to
            create your designs or select from our thousands of ready styles –
            Outerwear, dresses, denims, sweaters, swimwear, and more.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features">
          <div className="feature-box">
            <Image
              src="/AboutUs1.svg"
              width={40}
              height={40}
              alt="Order History"
            />
            <h4>ORDER HISTORY</h4>
            <p>
              Ditch the manual files or Excel sheets and keep track of your
              order history automatically.
            </p>
          </div>
          <div className="feature-box">
            <Image
              src="/AboutUs2.svg"
              width={40}
              height={40}
              alt="Shipment Tracking"
            />
            <h4>SHIPMENT TRACKING</h4>
            <p>
              With our Real-time order tracking, stay updated on the whereabouts
              of all your shipments.
            </p>
          </div>
          <div className="feature-box">
            <Image
              src="/AboutUs3.svg"
              width={40}
              height={40}
              alt="Sample Requests"
            />
            <h4>SAMPLE REQUESTS</h4>
            <p>
              Getting Samples quickly is always a nightmare. Not with Loomiz we
              support you with all your sample needs.
            </p>
          </div>
          <div className="feature-box">
            <Image
              src="/AboutUs4.svg"
              width={40}
              height={40}
              alt="In-Chat Features"
            />
            <h4>IN-CHAT FEATURES</h4>
            <p>
              Say goodbye to endless email chains with real-time communications
              and collaboration via our Teams.
            </p>
          </div>
          <div className="feature-box">
            <Image
              src="/AboutUs5.svg"
              width={40}
              height={40}
              alt="Templates & Catalogs"
            />
            <h4>TEMPLATES & CATALOGS</h4>
            <p>
              Harness real-time data and predictive analytics to stay ahead of
              fashion trends.
            </p>
          </div>
          <div className="feature-box">
            <Image
              src="/AboutUs6.svg"
              width={40}
              height={40}
              alt="3D & Pattern Support"
            />
            <h4>3D & PATTERN SUPPORT</h4>
            <p>
              Upload, preview, and interact with all major 3D & Pattern file
              types – No 3rd party software.
            </p>
          </div>
        </div>
      </div>

      {/* Building Sustainable Ecosystem Section */}
      <div className="sustainable-ecosystem">
        <div className="ecosystem-content">
          <h3>BUILDING SUSTAINABLE ECOSYSTEM</h3>
          <p>
            We’re working to reshape the apparel industry with a heavy
            environmental footprint by connecting global brands with Indian
            manufacturers who follow eco-friendly practices. We promote the use
            of organic and natural materials and ensure all our partners meet
            strict sustainability and ethical standards—from design to delivery.
            <br />
            <br />
            Our AI-powered platform helps reduce waste and improve efficiency at
            every step of production. We also share insights and best practices
            to help brands make informed, responsible choices.We're committed to
            protecting the planet while ensuring safe, fair working conditions
            for everyone involved.
          </p>
        </div>
        <Image
          src="/SastainableEcosystem.svg"
          width={350}
          height={250}
          alt="Sustainable Ecosystem"
        />
      </div>

      <ComplianceSection />
    </div>
  );
};

export default AboutUs;
