import React from "react";
import "../styles/Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Side: Logo, Email, and Phone */}
        <div className="footer-logo">
            <img src="/whiteLoomizLogo.svg" alt="Loomiz Logo" className="logo" />
          <div className="footer-contact">
            <img src="/emailLogo.svg" alt="Email" className="icon" />
            <p>HELLO@LOOMIZ.IN</p>
          </div>
          <div className="footer-contact">
            <img src="/phoneLogo.svg" alt="Phone" className="icon" />
            <p>+919650113905</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>GET STARTED</h3>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
            <a href="#">Log In</a>
          </div>
          <div className="footer-column">
            <h3>SUPPORT</h3>
            <a href="">Help</a>
            <a href="">FAQ's</a>
            <a href="/privacypolicy">Privacy Policy</a>
            <a href="/termsconditions">Terms of Use</a>
          </div>
        </div>

        {/* Right Side: Location and Socials */}
        <div className="footer-location">
          <h3>LOCATION</h3>
          <p>The Statement, Gurugram</p>
          <p>Haryana, India</p>
          <p>Pin Code - 122022</p>
          <h3>SOCIALS</h3>
          <div className="social-icons">
            <img src="linkedinLogo.svg" alt="LinkedIn" className="icon" />
            <img src="instagramLogo.svg" alt="Instagram" className="icon" />
            <img src="twitterLogo.svg" alt="Close" className="icon" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="footer-bottom">
        <p>Copyright © 2025 Loomiz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
