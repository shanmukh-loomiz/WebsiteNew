"use client";

import React, { useState } from "react";
import "../styles/VendorOnboarding.css";

const VendorOnboarding = () => {
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const [isVendorSaved, setIsVendorSaved] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isCompanySaved, setIsCompanySaved] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  const [vendorData, setVendorData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    alternatePhone: "",
    email: "",
    secondaryContact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const [companyData, setCompanyData] = useState({
    companyName: "",
    website: "",
    firmType: "",
    turnover: "",
    supplierType: "",
  });

  const toggleVendorDropdown = () => setIsVendorOpen(!isVendorOpen);
  const toggleCompanyDropdown = () => setIsCompanyOpen(!isCompanyOpen);

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecondaryChange = (field, value) => {
    setVendorData((prev) => ({
      ...prev,
      secondaryContact: { ...prev.secondaryContact, [field]: value },
    }));
  };

  const handleVendorSave = () => {
    setIsVendorSaved(true);
    setIsVendorOpen(false);
  };

  const handleCompanySave = () => {
    setIsCompanySaved(true);
    setIsCompanyOpen(false);
  };

  const handleAddSecondaryContact = () => {
    setShowSecondary(true);
  };

  const handleRemoveSecondaryContact = () => {
    setShowSecondary(false);
    setVendorData((prev) => ({
      ...prev,
      secondaryContact: { firstName: "", lastName: "", phoneNumber: "", email: "" },
    }));
  };

  return (
    <div className="vendor-onboarding">
      {/* VENDOR DETAILS */}
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleVendorDropdown}>
          <span>VENDOR DETAILS</span>
          <img src="/DropDownButton.svg" alt="Toggle Dropdown" className={`arrow-icon ${isVendorOpen ? "open" : ""}`} />
        </div>

        {isVendorOpen && !isVendorSaved && (
          <div className="dropdown-content">
            <h3>VENDOR DETAILS</h3>
            <div className="input-group">
              <div className="input-field">
                <label>First Name *</label>
                <input type="text" name="firstName" value={vendorData.firstName} onChange={handleVendorChange} placeholder="First Name" />
              </div>
              <div className="input-field">
                <label>Last Name *</label>
                <input type="text" name="lastName" value={vendorData.lastName} onChange={handleVendorChange} placeholder="Last Name" />
              </div>
              <div className="input-field">
                <label>Phone Number *</label>
                <input type="text" name="phoneNumber" value={vendorData.phoneNumber} onChange={handleVendorChange} placeholder="Phone No." />
              </div>
              <div className="input-field">
                <label>Alternate Phone Number</label>
                <input type="text" name="alternatePhone" value={vendorData.alternatePhone} onChange={handleVendorChange} placeholder="Alt. Phone No." />
              </div>
              <div className="input-field full-width">
                <label>Email Address *</label>
                <input type="email" name="email" value={vendorData.email} onChange={handleVendorChange} placeholder="Email Address" />
              </div>
            </div>

            <div className="secondary-header">
              <h4>SECONDARY CONTACT DETAILS</h4>
              {!showSecondary && <button className="add-btn" onClick={handleAddSecondaryContact}>ADD +</button>}
            </div>

            {showSecondary && (
              <>
                <div className="input-group">
                  <div className="input-field">
                    <label>First Name *</label>
                    <input type="text" value={vendorData.secondaryContact.firstName} onChange={(e) => handleSecondaryChange("firstName", e.target.value)} placeholder="First Name" />
                  </div>
                  <div className="input-field">
                    <label>Last Name *</label>
                    <input type="text" value={vendorData.secondaryContact.lastName} onChange={(e) => handleSecondaryChange("lastName", e.target.value)} placeholder="Last Name" />
                  </div>
                  <div className="input-field">
                    <label>Phone Number *</label>
                    <input type="text" value={vendorData.secondaryContact.phoneNumber} onChange={(e) => handleSecondaryChange("phoneNumber", e.target.value)} placeholder="Phone No." />
                  </div>
                  <div className="input-field">
                    <label>Email Address *</label>
                    <input type="email" value={vendorData.secondaryContact.email} onChange={(e) => handleSecondaryChange("email", e.target.value)} placeholder="Email Address" />
                  </div>
                </div>
                <button className="remove-btn" onClick={handleRemoveSecondaryContact}>REMOVE</button>
              </>
            )}

            <button className="save-btn" onClick={handleVendorSave}>SAVE</button>
          </div>
        )}

        {isVendorSaved && (
          <div className="success-message">
            <span>Vendor details saved successfully!</span>
            <img src="/successButton.svg" alt="Success" />
          </div>
        )}
      </div>

      {/* COMPANY DETAILS */}
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleCompanyDropdown}>
          <span>COMPANY DETAILS</span>
          <img src="/DropDownButton.svg" alt="Toggle Dropdown" className={`arrow-icon ${isCompanyOpen ? "open" : ""}`} />
        </div>

        {isCompanyOpen && !isCompanySaved && (
          <div className="dropdown-content">
            <h3>COMPANY DETAILS</h3>
            <div className="input-group">
              <div className="input-field">
                <label>Registered Company Name *</label>
                <input type="text" name="companyName" value={companyData.companyName} onChange={handleCompanyChange} placeholder="Company Name" />
              </div>
              <div className="input-field">
                <label>Company Website</label>
                <input type="text" name="website" value={companyData.website} onChange={handleCompanyChange} placeholder="Website" />
              </div>
              <div className="input-field">
                <label>Firm Type *</label>
                <input type="text" name="firmType" value={companyData.firmType} onChange={handleCompanyChange} placeholder="Firm Type" />
              </div>
              <div className="input-field">
                <label>Annual Turnover</label>
                <input type="text" name="turnover" value={companyData.turnover} onChange={handleCompanyChange} placeholder="Turnover" />
              </div>
            </div>
            <button className="save-btn" onClick={handleCompanySave}>SAVE</button>
          </div>
        )}

        {isCompanySaved && (
          <div className="success-message">
            <span>Company details saved successfully!</span>
            <img src="/successButton.svg" alt="Success" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOnboarding;
