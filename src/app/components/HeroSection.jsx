import Image from "next/image";
import Link from "next/link";
import "../styles/HeroSection.css"; // Import CSS file

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-text">
          <h1 className="hero-title">Design to Delivery, <br /> Apparel Manufacturing</h1>
          <p className="hero-description">
            Loomiz is an all-in-one platform designed for your brand, 
            offering tools to support, visualize, create, and expand your 
            collections while automating your supply chain.
          </p>

          {/* Buttons Box */}
          <div className="hero-buttons-box">
            <div className="button-container">
              <span className="button-label">FOR VENDORS</span>
              <button className="btn-primary">
  <Link href="/Onboarding">Register Now</Link>
</button>
            </div>

            <div className="divider"></div> {/* Vertical Line */}

            <div className="button-container">
              <span className="button-label">FOR BRANDS</span>
              <button className="btn-secondary">Get Quote</button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image">
          <Image src="/HeroSectionPic.svg" alt="Manufacturing Process" width={586} height={586} className="img-fluid" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
