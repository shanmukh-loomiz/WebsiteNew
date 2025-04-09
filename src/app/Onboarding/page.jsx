"use client";
import React, { useState } from "react";
import "../styles/onboarding.css";
import Image from "next/image";
import Link from "next/link";

const Onboarding = () => {
  const [isExpanded1, setIsExpanded1] = useState(false);
  const toggleSection1 = () => {
    setIsExpanded1(!isExpanded1);
  };
  const [isExpanded2, setIsExpanded2] = useState(false);
  const toggleSection2 = () => {
    setIsExpanded2(!isExpanded2);
  };
  const [isExpanded3, setIsExpanded3] = useState(false);
  const toggleSection3 = () => {
    setIsExpanded3(!isExpanded3);
  };
  const [isExpanded4, setIsExpanded4] = useState(false);
  const toggleSection4 = () => {
    setIsExpanded4(!isExpanded4);
  };
  const [isExpanded5, setIsExpanded5] = useState(false);
  const toggleSection5 = () => {
    setIsExpanded5(!isExpanded5);
  };

  const [showSecondaryContact, setShowSecondaryContact] = useState(false);
  const handleAddSecondaryContact = () => {
    setShowSecondaryContact(true);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Function to trigger file input when clicking "UPLOAD" button
  const handleUploadClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
      // You can update state here if needed
    }
  };

  const [selectedGSTFile, setSelectedGSTFile] = useState(null);
  const [selectedPANFile, setSelectedPANFile] = useState(null);
  const [selectedMSMEFile, setSelectedMSMEFile] = useState(null);

  const handleGSTFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedGSTFile(file);
  };

  const handlePANFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedPANFile(file);
  };

  const handleMSMEFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedMSMEFile(file);
  };

  const [isSaved1, setIsSaved1] = useState(false);
  const [isSaved2, setIsSaved2] = useState(false);
  const [isSaved3, setIsSaved3] = useState(false);
  const [isSaved4, setIsSaved4] = useState(false);
  const [isSaved5, setIsSaved5] = useState(false);


  return (
    <div className="vendoronboarding">
      <div>
        <div className="mopdbanner">
          <h1 className="mopdtitle">Vendor Onboarding</h1>
        </div>


        <p className="onboarding-para">
          *Click on the save button to securely record your progress
        </p>
        <div className="moform">
          {/* Vendor Details */}
          <div className={`mocollapsible ${isExpanded1 ? "expanded" : ""}`}>
  <div className="mocollapsiblebar" onClick={toggleSection1}>
    <div className="mocollapsibleheader">
      <span className="mocollapsibletitle">VENDOR DETAILS</span>

      {/* Icon Section */}
      {!isSaved1 ? (
        <span className={`mocollapsibleicon ${isExpanded1 ? "rotate" : ""}`}>
          <Image src="/DropDownButton.svg" alt="dropdown" width={40} height={40} />
        </span>
      ) : (
        <div className="status-icons">
          <Image src="/successButton.svg" alt="Success" width={22} height={22} />
          <button
            type="button"
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation(); // prevent collapsing when clicking edit
              setIsSaved1(false);
              setIsExpanded1(true);
            }}
          >
            <Image src="/editbutton.svg" alt="Edit" width={22} height={22} />
          </button>
        </div>
      )}
    </div>
  </div>

  {/* Form Content */}
  {isExpanded1 && !isSaved1 && (
    <div className="movocollapsiblecontent">
      <form className="movoform">
        {/* Primary Contact Fields */}
        <div className="movoformrow">
          <div className="movoformgroup">
            <label className="movolabel">First Name*</label>
            <input type="text" className="movoinput" placeholder="First Name" required />
          </div>
          <div className="movoformgroup">
            <label className="movolabel">Last Name*</label>
            <input type="text" className="movoinput" placeholder="Last Name" required />
          </div>
          <div className="movoformgroup">
            <label className="movolabel">Phone Number*</label>
            <input type="text" className="movoinput" placeholder="Phone No." required />
          </div>
        </div>

        <div className="movoformrow">
          <div className="movoformgroup">
            <label className="movolabel">Alternative Phone Number.</label>
            <input type="text" className="movoinput" placeholder="Alt. Phone No." />
          </div>
          <div className="movoformgroup">
            <label className="movolabel">Email Address*</label>
            <input type="email" className="movoinput" placeholder="Email Address" required />
          </div>
        </div>

        {/* Secondary Contact Section */}
        <div className="movosecondary">
          <label className="movosecondarylabel">Secondary Contact Details</label>
          {!showSecondaryContact && (
            <button
              type="button"
              className="movoaddbtn"
              onClick={() => setShowSecondaryContact(true)}
            >
              ADD +
            </button>
          )}
        </div>

        {/* Secondary Contact Form */}
        {showSecondaryContact && (
          <div className="movosecondaryform">
            <div className="movoformrow">
              <div className="movoformgroup">
                <label className="movolabel">First Name*</label>
                <input type="text" className="movoinput" placeholder="First Name" required />
              </div>
              <div className="movoformgroup">
                <label className="movolabel">Last Name*</label>
                <input type="text" className="movoinput" placeholder="Last Name" required />
              </div>
              <div className="movoformgroup">
                <label className="movolabel">Phone No.*</label>
                <input type="text" className="movoinput" placeholder="Phone No." required />
              </div>
            </div>

            <div className="movoformrow">
              <div className="movoformgroup">
                <label className="movolabel">Email Address*</label>
                <input type="email" className="movoinput" placeholder="Email Address" required />
              </div>
            </div>

            <button
              type="button"
              className="movoremovebtn"
              onClick={() => setShowSecondaryContact(false)}
            >
              Remove
            </button>
          </div>
        )}

        {/* Save Button */}
        <div className="save-container">
          <button
            type="button"
            className="save-btn"
            onClick={() => {
              setIsSaved1(true);
              setIsExpanded1(false);
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )}
</div>


          {/* Company Details */}
          <div className={`mocollapsible ${isExpanded ? "expanded" : ""}`}>
            <div className="mocollapsiblebar" onClick={toggleSection}>
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">COMPANY DETAILS</span>
                <span
                  className={`mocollapsibleicon ${isExpanded ? "rotate" : ""}`}
                >
                  <Image
                    src="/DropDownButton.svg"
                    alt="dropdown"
                    width={40}
                    height={40}
                  />
                </span>
              </div>
            </div>

            {isExpanded && (
              <div className="movocollapsiblecontent">
                <form className="movoform">
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Registered Company Name*
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Registered Company Name"
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Company Website</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Company Website"
                      />
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Firm Type*</label>
                      <select className="movoinput mocaDropdown">
                        <option>Firm Type</option>
                      </select>
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel ">
                        Previous Year Turnover (in INR Crores)*
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Previous Year Turnover"
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Utilization Capacity based on last*
                      </label>
                      <select className="movoinput option">
                        <option>Utilization Capacity</option>
                      </select>
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Supplier Type*</label>
                      <select className="movoinput mocaDropdown">
                        <option>Supplier Type</option>
                      </select>
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Number of Machines*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="No. of Machines"
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Product Specifications*
                      </label>
                      <select className="movoinput option">
                        <option>
                          Product Specifications (Knit/Woven/Others)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="movoformrow">
                    {/* Worker Type */}
                    <div className="movoformgroup">
                      <label className="movolabel">Worker Type*</label>
                      <select className="movoinput mocaDropdown">
                        <option value="">Worker Type</option>
                      </select>
                    </div>

                    {/* No. of Workers */}
                    <div className="movoformgroup">
                      <label className="movolabel">No. of Workers*</label>
                      <input
                        type="number"
                        className="movoinput"
                        placeholder="Enter Number of Workers"
                      />
                    </div>

                    {/* Prominent Brands */}
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Prominent Brands (3 or more)*
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="List at least 3 Prominent Brands"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="save-container">
                    <button type="submit" className="save-btn">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className={`mocollapsible ${isExpanded3 ? "expanded" : ""}`}>
            {/* Collapsible Header */}
            <div className="mocollapsiblebar" onClick={toggleSection3}>
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">COMPANY ADDRESS</span>
                <span
                  className={`mocollapsibleicon ${isExpanded3 ? "rotate" : ""}`}
                >
                  <Image
                    src="/DropDownButton.svg"
                    alt="dropdown"
                    width={40}
                    height={40}
                  />
                </span>
              </div>
            </div>

            {/* Collapsible Content */}
            {isExpanded3 && (
              <div className="movocollapsiblecontent">
                <form className="movoform">
                  {/* First Row */}
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Address Proof Type*</label>
                      <select className="movoinput mocaDropdown">
                        <option>Address Proof Type</option>
                      </select>
                    </div>

                    <div className="movoformgroup">
                      <label className="movolabel">
                        Address Proof Document*
                      </label>
                      <div className="upload-input-container">
                        {/* Input field displaying file name */}
                        <input
                          type="text"
                          className="movoinput upload-input"
                          placeholder="Upload Document"
                          value={selectedFile ? selectedFile.name : ""}
                          readOnly
                        />
                        {/* Upload button */}
                        <button
                          type="button"
                          className="upload-btn"
                          onClick={handleUploadClick}
                        >
                          UPLOAD
                        </button>
                        {/* Hidden file input */}
                        <input
                          type="file"
                          id="hiddenFileInput"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.png" // Specify allowed file types
                        />
                      </div>
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="movoformrow">
                    <div className="movoformgroup full-width">
                      <label className="movolabel">Company Address*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Apartment No/Street Address"
                      />
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Town/City*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Town/City"
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">State/Country*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="State/Country"
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Pincode/Zip*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Pincode/Zip"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="save-container">
                    <button type="submit" className="save-btn">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/*------------------------------------------------ */}
          <div className={`mocollapsible ${isExpanded4 ? "expanded" : ""}`}>
            {/* Collapsible Header */}
            <div className="mocollapsiblebar" onClick={toggleSection4}>
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">
                  DOCUMENT VERIFICATION
                </span>
                <span
                  className={`mocollapsibleicon ${isExpanded4 ? "rotate" : ""}`}
                >
                  <Image
                    src="/DropDownButton.svg"
                    alt="dropdown"
                    width={40}
                    height={40}
                  />
                </span>
              </div>
            </div>

            {/* Collapsible Content */}
            {isExpanded4 && (
              <div className="movocollapsiblecontent">
                <form className="movoform">
                  {/* First Row */}
                  {/* First Row */}
                  <div className="movoformrow">
                    {/* GST Upload */}
                    <div className="movoformgroup">
                      <label className="movolabel">GST No.*</label>
                      <div className="upload-input-container">
                        <input
                          type="text"
                          className="movoinput upload-input"
                          placeholder="GST No."
                          value={selectedGSTFile ? selectedGSTFile.name : ""}
                          readOnly
                        />
                        <button
                          type="button"
                          className="upload-btn"
                          onClick={() =>
                            document.getElementById("gstFile").click()
                          }
                        >
                          UPLOAD
                        </button>
                        <input
                          type="file"
                          id="gstFile"
                          style={{ display: "none" }}
                          onChange={handleGSTFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.png"
                        />
                      </div>
                    </div>

                    {/* PAN Upload */}
                    <div className="movoformgroup">
                      <label className="movolabel">PAN card No.*</label>
                      <div className="upload-input-container">
                        <input
                          type="text"
                          className="movoinput upload-input"
                          placeholder="PAN card No."
                          value={selectedPANFile ? selectedPANFile.name : ""}
                          readOnly
                        />
                        <button
                          type="button"
                          className="upload-btn"
                          onClick={() =>
                            document.getElementById("panFile").click()
                          }
                        >
                          UPLOAD
                        </button>
                        <input
                          type="file"
                          id="panFile"
                          style={{ display: "none" }}
                          onChange={handlePANFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.png"
                        />
                      </div>
                    </div>
                  </div>

                  {/* MSME Section */}
                  <div className="msme-container">
                    <label
                      className="movolabel"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      Do you have an Udyam Registration Certificate? (MSME
                      Certificate)
                      <span className="radio-options-inline">
                        <label>
                          <input type="radio" name="msme" value="yes" /> Yes
                        </label>
                        <label style={{ marginLeft: "10px" }}>
                          <input type="radio" name="msme" value="no" /> No
                        </label>
                      </span>
                    </label>

                    <div className="upload-input-container">
                      <input
                        type="text"
                        className="movoinput upload-input"
                        placeholder="MSME"
                        value={selectedMSMEFile ? selectedMSMEFile.name : ""}
                        readOnly
                      />
                      <button
                        type="button"
                        className="upload-btn"
                        onClick={() =>
                          document.getElementById("msmeFile").click()
                        }
                      >
                        UPLOAD
                      </button>
                      <input
                        type="file"
                        id="msmeFile"
                        style={{ display: "none" }}
                        onChange={handleMSMEFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.png"
                      />
                    </div>
                  </div>

                  {/* Cloud Upload Icons */}
                  <div className="upload-icons-container">
                    {[
                      "Sedex",
                      "BSCI",
                      "FAMA",
                      "FA8000",
                      "GOTS",
                      "GRS",
                      "OCS",
                      "ISO",
                      "BCI",
                      "CT-PAT",
                      "WRAP",
                      "QMS",
                    ].map((cert, index) => (
                      <div key={index} className="upload-icon">
                        <span>{cert}</span>
                        <input
                          type="file"
                          id={`fileInput-${index}`}
                          style={{ display: "none" }}
                          onChange={handleFileUpload}
                        />
                        <label
                          htmlFor={`fileInput-${index}`}
                          className="cloud-upload"
                        >
                          <Image
                            src="/cloudIcon.svg"
                            alt="Upload"
                            width={30}
                            height={30}
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Save Button */}
                  <div className="save-container">
                    <button type="submit" className="save-btn">
                      SAVE
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className={`mocollapsible ${isExpanded5 ? "expanded" : ""}`}>
            {/* Collapsible Header */}
            <div className="mocollapsiblebar" onClick={toggleSection5}>
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">BANK DETAILS</span>
                <span
                  className={`mocollapsibleicon ${isExpanded5 ? "rotate" : ""}`}
                >
                  <Image
                    src="/DropDownButton.svg"
                    alt="dropdown"
                    width={40}
                    height={40}
                  />
                </span>
              </div>
            </div>

            {/* Collapsible Content */}
            {isExpanded5 && (
              <div className="movocollapsiblecontent">
                <form className="movoform">
                  {/* First Row */}
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Bank Name*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Bank Name"
                        required
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Account Number*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Account Number"
                        required
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Re-enter Account Number*
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Re-enter Account Number"
                        required
                      />
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Bank Address*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Bank Address"
                        required
                      />
                    </div>

                    <div className="movoformgroup">
                      <label className="movolabel">IFSC Code*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="IFSC Code"
                        required
                      />
                    </div>
                  </div>

                  {/* Third Row (Swift Code & Cancelled Cheque Side by Side) */}
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Swift Code*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Swift Code"
                        required
                      />
                    </div>

                    <div className="movoformgroup">
                      <label className="movolabel">Cancelled Cheque*</label>
                      <div className="upload-input-container">
                        {/* Input field displaying file name */}
                        <input
                          type="text"
                          className="movoinput upload-input"
                          placeholder="Cancelled Cheque"
                          value={selectedFile ? selectedFile.name : ""}
                          readOnly
                        />
                        {/* Upload button */}
                        <button
                          type="button"
                          className="upload-btn"
                          onClick={handleUploadClick}
                        >
                          UPLOAD
                        </button>
                        {/* Hidden file input */}
                        <input
                          type="file"
                          id="hiddenFileInput"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.png"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="save-container">
                    <button type="submit" className="save-btn">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="save-container">
            <button type="submit" className="save-btn">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
