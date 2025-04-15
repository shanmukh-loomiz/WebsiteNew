"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset(); // Clear the form fields
    setIsSubmitted(true);
  };
  
  const closePopup = () => {
    setIsSubmitted(false);
  };
  

  return (
    <div className="contact-container">
      <h2 className="contact-title">CONTACT US</h2>
      <p className="contact-subtitle">
        Have questions or need assistance? We're here to help! Fill out the form below or contact us via email or phone—we’d love to hear from you!
      </p>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-box">
            <label>Contact Person *</label>
            <input type="text" required placeholder="Contact Person" />
          </div>
          <div className="input-box">
            <label>Company Name</label>
            <input type="text" placeholder="Company Name" />
          </div>
        </div>

        <div className="form-group">
          <div className="input-box">
            <label>Phone Number *</label>
            <input type="text" required placeholder="Phone Number" />
          </div>
          <div className="input-box">
            <label>Email *</label>
            <input type="email" required placeholder="Email" />
          </div>
        </div>

        <div className="form-group">
          <div className="input-box">
            <label>User Type *</label>
            <input type="text" required placeholder="User Type" />
          </div>
          <div className="input-box">
            <label>Website</label>
            <input type="text" placeholder="Website" />
          </div>
        </div>

        <div className="input-box">
          <label>Subject *</label>
          <input type="text" required placeholder="Subject" />
        </div>

        <div className="input-box">
          <label>Message *</label>
          <textarea required placeholder="Message"></textarea>
        </div>

        <button className="send-button" type="submit">SEND</button>
      </form>

      {/* Popup Modal */}
      {isSubmitted && (
        <div className="popup-overlay">
          <div className="popup-box">
            <Image src="/ThankYouPic.svg" alt="Thank You" width={500} height={500} />
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

<div className="contact-info">
        <div className="info-box">
          <Image src="/emailLogoBlack.svg" alt="" width={20} height={20} className="logo"
                      />
          <h4>PHONE NO.</h4>
          <p>For more information call us at +91 9560113905</p>
        </div>
        <div className="info-box" >
          <Image src="/phoneLogoBlack.svg" alt="" width={20} height={20} className="logo" />
          <h4>HELLO@LOOMIZ.IN</h4>
          <p>For more details, feel free to email us at the address above.</p>
        </div>
        <div className="info-box">
          <Image src="/homeLogoBlack.svg" alt="" width={20} height={20} className="logo"/>
          <h4>HEADQUARTERS</h4>
          <p>
            Golf Course Road, 310, The Statement, Sector 43, Gurugram, Haryana
            IN
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-container">
        <iframe
          title="Loomiz Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7006.732110315646!2d77.0815509!3d28.4594971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19b8eecf7b2d%3A0x28fbc1a6ef8d20f!2sGolf%20Course%20Road%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1644848484848!5m2!1sen!2sin"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
