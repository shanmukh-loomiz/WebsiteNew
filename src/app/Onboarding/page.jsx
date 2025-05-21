"use client";
import React, { useState, useRef, useEffect } from "react";
import "../styles/onboarding.css";
import Image from "next/image";
import Link from "next/link";

// Additional doc types for the document verification
const DOC_TYPES = [
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
];

// Basic regex checks (simplistic, adjust to your needs)
const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/i;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
const SWIFT_REGEX = /^[A-Z0-9]{8,11}$/i;

// Email, Phone
const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
const isValidPhone = (str) => /^\d{10}$/.test(str.trim());

export default function Onboarding() {
  ///////////////////////////////////////////////////
  // Collapsible & Saved States
  ///////////////////////////////////////////////////
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);
  const [isExpanded4, setIsExpanded4] = useState(false);
  const [isExpanded5, setIsExpanded5] = useState(false);

  const [isSaved1, setIsSaved1] = useState(false);
  const [isSaved2, setIsSaved2] = useState(false);
  const [isSaved3, setIsSaved3] = useState(false);
  const [isSaved4, setIsSaved4] = useState(false);
  const [isSaved5, setIsSaved5] = useState(false);

  const [msmeYesSelected, setMsmeYesSelected] = useState(false);
  const [msmeNoSelected, setMsmeNoSelected] = useState(false);
  // Add this with other state declarations at the top of the Onboarding component
// Add this with other state declarations at the top of the Onboarding component
const [submitError, setSubmitError] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

  // You may want to initialize these based on localStorage if you're saving the form state
  useEffect(() => {
    const loadMsmeSelection = () => {
      const str = localStorage.getItem("documentVerification");
      if (!str) return;

      const dv = JSON.parse(str);

      if (dv.msmeFileName) {
        setMsmeYesSelected(true);
        setMsmeNoSelected(false);
      } else if (dv.msmeNoSelected) {
        setMsmeNoSelected(true);
        setMsmeYesSelected(false);
      }
    };

    loadMsmeSelection();
  }, []);

  // Final "SUBMIT" enabled if all sections are saved
  const allSectionsSaved =
    isSaved1 && isSaved2 && isSaved3 && isSaved4 && isSaved5;

  ///////////////////////////////////////////////////
  // Secondary Contact Toggle
  ///////////////////////////////////////////////////
  const [showSecondaryContact, setShowSecondaryContact] = useState(false);

  ///////////////////////////////////////////////////
  // File Upload States
  ///////////////////////////////////////////////////
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [cancelledChequeFile, setCancelledChequeFile] = useState(null);
  const [selectedGSTFile, setSelectedGSTFile] = useState(null);
  const [selectedPANFile, setSelectedPANFile] = useState(null);
  const [selectedMSMEFile, setSelectedMSMEFile] = useState(null);

  // For additional docs (Sedex, BSCI, etc.)
  const initialDocs = DOC_TYPES.reduce((acc, d) => {
    acc[d] = null;
    return acc;
  }, {});
  const [additionalDocs, setAdditionalDocs] = useState(initialDocs);

  ///////////////////////////////////////////////////
  // Refs: 1) VENDOR DETAILS
  ///////////////////////////////////////////////////
  const vdFirstNameRef = useRef(null);
  const vdLastNameRef = useRef(null);
  const vdPhoneRef = useRef(null);
  const vdAltPhoneRef = useRef(null);
  const vdEmailRef = useRef(null);

  // Secondary Contact
  const sdFirstNameRef = useRef(null);
  const sdLastNameRef = useRef(null);
  const sdPhoneRef = useRef(null);
  const sdEmailRef = useRef(null);

  ///////////////////////////////////////////////////
  // Refs: 2) COMPANY DETAILS
  ///////////////////////////////////////////////////
  const cdRegNameRef = useRef(null);
  const cdWebsiteRef = useRef(null);
  const cdFirmTypeRef = useRef(null);
  const cdPrevTurnoverRef = useRef(null);
  const cdUtilizationRef = useRef(null);
  const cdSupplierTypeRef = useRef(null);
  const cdMachineCountRef = useRef(null);
  const cdProductSpecRef = useRef(null);
  const cdWorkerTypeRef = useRef(null);
  const cdWorkerCountRef = useRef(null);
  const cdProminentBrandsRef = useRef(null);

  ///////////////////////////////////////////////////
  // Refs: 3) COMPANY ADDRESS
  ///////////////////////////////////////////////////
  const caProofTypeRef = useRef(null);
  const caAddressRef = useRef(null);
  const caTownRef = useRef(null);
  const caStateRef = useRef(null);
  const caPincodeRef = useRef(null);

  ///////////////////////////////////////////////////
  // Refs: 4) DOCUMENT VERIFICATION
  ///////////////////////////////////////////////////
  const dvGSTNumberRef = useRef(null);
  const dvPANNumberRef = useRef(null);

  ///////////////////////////////////////////////////
  // Refs: 5) BANK DETAILS
  ///////////////////////////////////////////////////
  const bdBankNameRef = useRef(null);
  const bdAccountNumberRef = useRef(null);
  const bdReAccountNumberRef = useRef(null);
  const bdBankAddressRef = useRef(null);
  const bdIFSCRef = useRef(null);
  const bdSwiftRef = useRef(null);

  ///////////////////////////////////////////////////
  // Errors for Each Section
  ///////////////////////////////////////////////////
  const [vendorErrors, setVendorErrors] = useState([]);
  const [companyErrors, setCompanyErrors] = useState([]);
  const [addressErrors, setAddressErrors] = useState([]);
  const [documentErrors, setDocumentErrors] = useState([]);
  const [bankErrors, setBankErrors] = useState([]);

  ///////////////////////////////////////////////////
  // 1) Validate & Save: Vendor
  ///////////////////////////////////////////////////
  function validateVendorDetails() {
    const errs = [];
    const fName = vdFirstNameRef.current.value.trim();
    const lName = vdLastNameRef.current.value.trim();
    const phone = vdPhoneRef.current.value.trim();
    const email = vdEmailRef.current.value.trim();

    if (!fName) errs.push("First Name is required.");
    if (!lName) errs.push("Last Name is required.");
    if (!phone) errs.push("Phone Number is required.");
    else if (!isValidPhone(phone)) errs.push("Phone must be 10 digits.");
    if (!email) errs.push("Email is required.");
    else if (!isValidEmail(email)) errs.push("Email is invalid.");

    // Secondary
    if (showSecondaryContact) {
      const sf = sdFirstNameRef.current.value.trim();
      const sl = sdLastNameRef.current.value.trim();
      const sp = sdPhoneRef.current.value.trim();
      const se = sdEmailRef.current.value.trim();
      if (!sf) errs.push("Secondary First Name required.");
      if (!sl) errs.push("Secondary Last Name required.");
      if (!sp) errs.push("Secondary Phone required.");
      else if (!isValidPhone(sp))
        errs.push("Secondary Phone must be 10 digits.");
      if (!se) errs.push("Secondary Email required.");
      else if (!isValidEmail(se)) errs.push("Secondary Email invalid.");
    }
    return errs;
  }

  const handleDocumentVerificationSave = () => {
    const errs = validateDocumentVerification();
    if (errs.length > 0) {
      setDocumentErrors(errs);
      return;
    }
    setDocumentErrors([]);
  
    const payload = {
      gstNumberString: dvGSTNumberRef.current.value.trim(),
      gstFileName: selectedGSTFile?.name || "",
      panNumberString: dvPANNumberRef.current.value.trim(),
      panFileName: selectedPANFile?.name || "",
      msmeFileName: selectedMSMEFile?.name || "",
      msmeYesSelected: msmeYesSelected,
      msmeNoSelected: msmeNoSelected,
      additionalDocs,
    };
    localStorage.setItem("documentVerification", JSON.stringify(payload));
  
    setIsSaved4(true);
    setIsExpanded4(false);
  };

  const handleVendorDetailsSave = () => {
    const errs = validateVendorDetails();
    if (errs.length > 0) {
      setVendorErrors(errs);
      return;
    }
    setVendorErrors([]);

    const payload = {
      primaryFirstName: vdFirstNameRef.current.value.trim(),
      primaryLastName: vdLastNameRef.current.value.trim(),
      primaryPhone: vdPhoneRef.current.value.trim(),
      altPhone: vdAltPhoneRef.current.value.trim(),
      primaryEmail: vdEmailRef.current.value.trim(),
      secondaryContact: showSecondaryContact
        ? {
            firstName: sdFirstNameRef.current.value.trim(),
            lastName: sdLastNameRef.current.value.trim(),
            phone: sdPhoneRef.current.value.trim(),
            email: sdEmailRef.current.value.trim(),
          }
        : null,
    };
    localStorage.setItem("vendorDetails", JSON.stringify(payload));

    setIsSaved1(true);
    setIsExpanded1(false);
  };

  ///////////////////////////////////////////////////
  // 2) Validate & Save: Company
  ///////////////////////////////////////////////////
  function validateCompanyDetails() {
    const errs = [];
    const regName = cdRegNameRef.current.value.trim();
    const firmType = cdFirmTypeRef.current.value;
    const turnover = cdPrevTurnoverRef.current.value.trim();

    if (!regName) errs.push("Registered Company Name required.");
    if (!firmType || firmType === "Firm Type") errs.push("Firm Type required.");
    if (!turnover) errs.push("Previous Year Turnover required.");
    // etc…

    return errs;
  }

  const handleCompanyDetailsSave = () => {
    const errs = validateCompanyDetails();
    if (errs.length > 0) {
      setCompanyErrors(errs);
      return;
    }
    setCompanyErrors([]);

    const payload = {
      registeredName: cdRegNameRef.current.value.trim(),
      website: cdWebsiteRef.current.value.trim(),
      firmType: cdFirmTypeRef.current.value,
      prevTurnover: cdPrevTurnoverRef.current.value.trim(),
      utilization: cdUtilizationRef.current.value,
      supplierType: cdSupplierTypeRef.current.value,
      machineCount: cdMachineCountRef.current.value.trim(),
      productSpec: cdProductSpecRef.current.value,
      workerType: cdWorkerTypeRef.current.value,
      workerCount: cdWorkerCountRef.current.value.trim(),
      prominentBrands: cdProminentBrandsRef.current.value.trim(),
    };
    localStorage.setItem("companyDetails", JSON.stringify(payload));

    setIsSaved2(true);
    setIsExpanded2(false);
  };

  ///////////////////////////////////////////////////
  // 3) Validate & Save: Address
  ///////////////////////////////////////////////////
  function validateAddress() {
    const errs = [];
    const proofType = caProofTypeRef.current.value;
    const address = caAddressRef.current.value.trim();
    const town = caTownRef.current.value.trim();
    const state = caStateRef.current.value.trim();
    const pin = caPincodeRef.current.value.trim();

    if (!proofType || proofType === "Address Proof Type")
      errs.push("Select Address Proof Type.");
    if (!address) errs.push("Company Address required.");
    if (!town) errs.push("Town/City required.");
    if (!state) errs.push("State/Country required.");
    if (!pin) errs.push("Pincode required.");
    if (!addressProofFile) errs.push("Address Proof Document required.");

    return errs;
  }

  const handleCompanyAddressSave = () => {
    const errs = validateAddress();
    if (errs.length > 0) {
      setAddressErrors(errs);
      return;
    }
    setAddressErrors([]);

    const payload = {
      addressProofType: caProofTypeRef.current.value,
      addressProofFileName: addressProofFile?.name || "",
      address: caAddressRef.current.value.trim(),
      town: caTownRef.current.value.trim(),
      state: caStateRef.current.value.trim(),
      pincode: caPincodeRef.current.value.trim(),
    };
    localStorage.setItem("companyAddress", JSON.stringify(payload));

    setIsSaved3(true);
    setIsExpanded3(false);
  };

  ///////////////////////////////////////////////////
  // 4) Validate & Save: Document Verification
  ///////////////////////////////////////////////////
  function validateDocumentVerification() {
    const errs = [];
    const gst = dvGSTNumberRef.current.value.trim();
    const pan = dvPANNumberRef.current.value.trim();
  
    if (!gst) errs.push("GST Number required.");
    else if (!GST_REGEX.test(gst)) errs.push("GST Number format invalid.");
    if (!selectedGSTFile) errs.push("GST Document required.");
  
    if (!pan) errs.push("PAN Number required.");
    else if (!PAN_REGEX.test(pan)) errs.push("PAN format invalid.");
    if (!selectedPANFile) errs.push("PAN Document required.");
    
    // MSME validation - Make it compulsory
    if (!msmeYesSelected && !msmeNoSelected) {
      errs.push("MSME selection is required.");
    }
    
    if (msmeYesSelected && !selectedMSMEFile) {
      errs.push("MSME Certificate upload is required.");
    }
    
    if (msmeNoSelected && !selectedMSMEFile) {
      errs.push("Declaration on letterhead is required.");
    }
  
    return errs;
  }

  // Upload for additional docs
  const handleAdditionalDocUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalDocs((prev) => ({
        ...prev,
        [docType]: file,
      }));
    }
  };

  const handleRemoveDoc = (docType) => {
    setAdditionalDocs((prev) => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  
    const input = document.getElementById(`docInput-${docType}`);
    if (input) input.value = null; // reset input
  };
  
  

  ///////////////////////////////////////////////////
  // 5) Validate & Save: Bank
  ///////////////////////////////////////////////////
  function validateBankDetails() {
    const errs = [];
    const bankName = bdBankNameRef.current.value.trim();
    const accNo = bdAccountNumberRef.current.value.trim();
    const reAcc = bdReAccountNumberRef.current.value.trim();
    const bankAddr = bdBankAddressRef.current.value.trim();
    const ifsc = bdIFSCRef.current.value.trim();
    const swift = bdSwiftRef.current.value.trim();

    if (!bankName) errs.push("Bank Name required.");
    if (!accNo) errs.push("Account Number required.");
    if (!reAcc) errs.push("Re-enter Account Number required.");
    if (accNo && reAcc && accNo !== reAcc)
      errs.push("Account Numbers do not match.");

    if (!bankAddr) errs.push("Bank Address required.");

    if (!ifsc) errs.push("IFSC Code required.");
    else if (!IFSC_REGEX.test(ifsc)) errs.push("IFSC format invalid.");

    if (!SWIFT_REGEX.test(swift)) errs.push("Swift format invalid.");

    if (!cancelledChequeFile) errs.push("Cancelled Cheque required.");

    return errs;
  }

  const handleBankDetailsSave = () => {
    const errs = validateBankDetails();
    if (errs.length > 0) {
      setBankErrors(errs);
      return;
    }
    setBankErrors([]);

    const payload = {
      bankName: bdBankNameRef.current.value.trim(),
      accountNumber: bdAccountNumberRef.current.value.trim(),
      reenterAccountNumber: bdReAccountNumberRef.current.value.trim(),
      bankAddress: bdBankAddressRef.current.value.trim(),
      ifsc: bdIFSCRef.current.value.trim(),
      swift: bdSwiftRef.current.value.trim(),
      cancelledChequeFileName: cancelledChequeFile?.name || "",
    };
    localStorage.setItem("bankDetails", JSON.stringify(payload));

    setIsSaved5(true);
    setIsExpanded5(false);
  };

  ///////////////////////////////////////////////////
  // Load from LocalStorage on "Edit"
  // useEffects for each panel
  ///////////////////////////////////////////////////
  // 1) Vendor
  const loadVendorDetailsFromLocal = () => {
    const str = localStorage.getItem("vendorDetails");
    if (!str) return;
    const data = JSON.parse(str);

    if (vdFirstNameRef.current) {
      vdFirstNameRef.current.value = data.primaryFirstName || "";
    }
    if (vdLastNameRef.current) {
      vdLastNameRef.current.value = data.primaryLastName || "";
    }
    if (vdPhoneRef.current) {
      vdPhoneRef.current.value = data.primaryPhone || "";
    }
    if (vdAltPhoneRef.current) {
      vdAltPhoneRef.current.value = data.altPhone || "";
    }
    if (vdEmailRef.current) {
      vdEmailRef.current.value = data.primaryEmail || "";
    }

    if (data.secondaryContact) {
      setShowSecondaryContact(true);
      sdFirstNameRef.current.value = data.secondaryContact.firstName || "";
      sdLastNameRef.current.value = data.secondaryContact.lastName || "";
      sdPhoneRef.current.value = data.secondaryContact.phone || "";
      sdEmailRef.current.value = data.secondaryContact.email || "";
    } else {
      setShowSecondaryContact(false);
    }
  };
  useEffect(() => {
    if (isExpanded1 && !isSaved1) {
      loadVendorDetailsFromLocal();
    }
  }, [isExpanded1, isSaved1]);

  // 2) Company
  const loadCompanyDetailsFromLocal = () => {
    const str = localStorage.getItem("companyDetails");
    if (!str) return;
    const cd = JSON.parse(str);

    if (cdRegNameRef.current)
      cdRegNameRef.current.value = cd.registeredName || "";
    if (cdWebsiteRef.current) cdWebsiteRef.current.value = cd.website || "";
    if (cdFirmTypeRef.current) cdFirmTypeRef.current.value = cd.firmType || "";
    if (cdPrevTurnoverRef.current)
      cdPrevTurnoverRef.current.value = cd.prevTurnover || "";
    if (cdUtilizationRef.current)
      cdUtilizationRef.current.value = cd.utilization || "";
    if (cdSupplierTypeRef.current)
      cdSupplierTypeRef.current.value = cd.supplierType || "";
    if (cdMachineCountRef.current)
      cdMachineCountRef.current.value = cd.machineCount || "";
    if (cdProductSpecRef.current)
      cdProductSpecRef.current.value = cd.productSpec || "";
    if (cdWorkerTypeRef.current)
      cdWorkerTypeRef.current.value = cd.workerType || "";
    if (cdWorkerCountRef.current)
      cdWorkerCountRef.current.value = cd.workerCount || "";
    if (cdProminentBrandsRef.current)
      cdProminentBrandsRef.current.value = cd.prominentBrands || "";
  };
  useEffect(() => {
    if (isExpanded2 && !isSaved2) {
      loadCompanyDetailsFromLocal();
    }
  }, [isExpanded2, isSaved2]);

  // 3) Address
  const loadCompanyAddressFromLocal = () => {
    const str = localStorage.getItem("companyAddress");
    if (!str) return;
    const ca = JSON.parse(str);

    if (caProofTypeRef.current) {
      caProofTypeRef.current.value = ca.addressProofType || "";
    }
    if (caAddressRef.current) {
      caAddressRef.current.value = ca.address || "";
    }
    if (caTownRef.current) {
      caTownRef.current.value = ca.town || "";
    }
    if (caStateRef.current) {
      caStateRef.current.value = ca.state || "";
    }
    if (caPincodeRef.current) {
      caPincodeRef.current.value = ca.pincode || "";
    }

    // File
    if (ca.addressProofFileName) {
      setAddressProofFile({ name: ca.addressProofFileName });
    } else {
      setAddressProofFile(null);
    }
  };
  useEffect(() => {
    if (isExpanded3 && !isSaved3) {
      loadCompanyAddressFromLocal();
    }
  }, [isExpanded3, isSaved3]);

  // 4) Docs
// In loadDocumentVerificationFromLocal function
const loadDocumentVerificationFromLocal = () => {
  const str = localStorage.getItem("documentVerification");
  if (!str) return;
  const dv = JSON.parse(str);

  if (dvGSTNumberRef.current) {
    dvGSTNumberRef.current.value = dv.gstNumberString || "";
  }
  if (dvPANNumberRef.current) {
    dvPANNumberRef.current.value = dv.panNumberString || "";
  }
  if (dv.gstFileName) {
    setSelectedGSTFile({ name: dv.gstFileName });
  } else setSelectedGSTFile(null);

  if (dv.panFileName) {
    setSelectedPANFile({ name: dv.panFileName });
  } else setSelectedPANFile(null);

  if (dv.msmeFileName) {
    setSelectedMSMEFile({ name: dv.msmeFileName });
  } else setSelectedMSMEFile(null);

  // Restore MSME selection
  if (dv.msmeYesSelected) {
    setMsmeYesSelected(true);
    setMsmeNoSelected(false);
  } else if (dv.msmeNoSelected) {
    setMsmeNoSelected(true);
    setMsmeYesSelected(false);
  }

  if (dv.additionalDocs) {
    setAdditionalDocs(dv.additionalDocs);
  } else {
    setAdditionalDocs(initialDocs);
  }
};
  useEffect(() => {
    if (isExpanded4 && !isSaved4) {
      loadDocumentVerificationFromLocal();
    }
  }, [isExpanded4, isSaved4]);

  // 5) Bank
  const loadBankDetailsFromLocal = () => {
    const str = localStorage.getItem("bankDetails");
    if (!str) return;
    const bd = JSON.parse(str);

    if (bdBankNameRef.current) {
      bdBankNameRef.current.value = bd.bankName || "";
    }
    if (bdAccountNumberRef.current) {
      bdAccountNumberRef.current.value = bd.accountNumber || "";
    }
    if (bdReAccountNumberRef.current) {
      bdReAccountNumberRef.current.value = bd.reenterAccountNumber || "";
    }
    if (bdBankAddressRef.current) {
      bdBankAddressRef.current.value = bd.bankAddress || "";
    }
    if (bdIFSCRef.current) {
      bdIFSCRef.current.value = bd.ifsc || "";
    }
    if (bdSwiftRef.current) {
      bdSwiftRef.current.value = bd.swift || "";
    }
    if (bd.cancelledChequeFileName) {
      setCancelledChequeFile({ name: bd.cancelledChequeFileName });
    } else {
      setCancelledChequeFile(null);
    }
  };
  useEffect(() => {
    if (isExpanded5 && !isSaved5) {
      loadBankDetailsFromLocal();
    }
  }, [isExpanded5, isSaved5]);

  ///////////////////////////////////////////////////
  // Final SUBMIT
  ///////////////////////////////////////////////////
  const handleFinalSubmit = async () => {
    // Check if all sections are saved
    if (!allSectionsSaved) {
      setSubmitError(true);
      // Scroll to the error message if needed
      window.scrollTo({
        top: document.querySelector('.submit-error-message')?.offsetTop - 100 || 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // Reset error state if all sections are saved
    setSubmitError(false);
    
    // Set submitting state to true
    setIsSubmitting(true);
    
    try {
      const vendorDetails = JSON.parse(localStorage.getItem("vendorDetails") || "{}");
      const companyDetails = JSON.parse(localStorage.getItem("companyDetails") || "{}");
      const companyAddress = JSON.parse(localStorage.getItem("companyAddress") || "{}");
      const documentVerification = JSON.parse(localStorage.getItem("documentVerification") || "{}");
      const bankDetails = JSON.parse(localStorage.getItem("bankDetails") || "{}");
  
      const allData = {
        vendorDetails,
        companyDetails,
        companyAddress,
        documentVerification,
        bankDetails,
      };
  
      const response = await fetch("/api/save-vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allData),
      });
  
      if (!response.ok) {
        const msg = await response.json();
        console.error("Server error:", msg);
        alert("Server error: " + msg.message);
        setIsSubmitting(false); // Reset submitting state
        return;
      }
  
      const resp = await response.json();
      console.log("Submitted successfully:", resp);
  
      // ✅ Trigger popup here after success
      setIsSubmitted(true);
      setIsSubmitting(false); // Reset submitting state
  
      // ✅ Optional: clear localStorage if needed
      // localStorage.clear();
  
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission error. See console.");
      setIsSubmitting(false); // Reset submitting state
    }
  };
  

  ///////////////////////////////////////////////////
  // File Input Handlers
  ///////////////////////////////////////////////////
  const handleAddressProofUploadClick = () => {
    document.getElementById("addressProofFileInput").click();
  };
  const handleAddressProofFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAddressProofFile(file);
  };

  const handleCancelledChequeUploadClick = () => {
    document.getElementById("cancelledChequeFileInput").click();
  };
  const handleCancelledChequeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setCancelledChequeFile(file);
  };

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

  // ThankYou page

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset(); // Clear the form fields
    setIsSubmitted(true);
  };

  const closePopup = () => {
    setIsSubmitted(false);
    // Reset all form states
    setIsSaved1(false);
    setIsSaved2(false);
    setIsSaved3(false);
    setIsSaved4(false);
    setIsSaved5(false);
    
    // Reset all expanded states
    setIsExpanded1(false);
    setIsExpanded2(false);
    setIsExpanded3(false);
    setIsExpanded4(false);
    setIsExpanded5(false);
    
    // Clear all file states
    setAddressProofFile(null);
    setCancelledChequeFile(null);
    setSelectedGSTFile(null);
    setSelectedPANFile(null);
    setSelectedMSMEFile(null);
    setAdditionalDocs(initialDocs);
    
    // Clear localStorage if needed
    localStorage.clear();
    
    // Redirect to home page
    window.location.href = "/";
  };

  ///////////////////////////////////////////////////
  // Render
  ///////////////////////////////////////////////////
  return (
    <div className="vendoronboarding">
      <div>
        <div className="mopdbanner">
          <h1 className="mopdtitle">Vendor Onboarding</h1>
        </div>

        <p className="onboarding-para">
          *Click on the save button to securely record your progress.
        </p>

        <div className="moform">
          {/* ********************************** */}
          {/* 1) VENDOR DETAILS */}
          {/* ********************************** */}
          <div className={`mocollapsible ${isExpanded1 ? "expanded" : ""}`}>
            <div
              className="mocollapsiblebar"
              onClick={() => setIsExpanded1(!isExpanded1)}
            >
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">VENDOR DETAILS</span>
                {!isSaved1 ? (
                  <span
                    className={`mocollapsibleicon ${
                      isExpanded1 ? "rotate" : ""
                    }`}
                  >
                    <Image
                      src="/DropDownButton.svg"
                      alt="dropdown"
                      width={40}
                      height={40}
                    />
                  </span>
                ) : (
                  <div className="status-icons">
                    <Image
                      src="/successButton.svg"
                      alt="Success"
                      width={22}
                      height={22}
                    />
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSaved1(false);
                        setIsExpanded1(true);
                      }}
                    >
                      <Image
                        src="/editbutton.svg"
                        alt="Edit"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {isExpanded1 && !isSaved1 && (
              <div className="movocollapsiblecontent">
                {/* Error Block */}
                {vendorErrors.length > 0 && (
                  <div className="error-block">
                    {vendorErrors.map((err, i) => (
                      <p key={i} className="error-text">
                        {err}
                      </p>
                    ))}
                  </div>
                )}

                <form className="movoform" onSubmit={(e) => e.preventDefault()}>
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">First Name*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="First Name"
                        ref={vdFirstNameRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Last Name*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Last Name"
                        ref={vdLastNameRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Phone Number*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Phone Number"
                        ref={vdPhoneRef}
                      />
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Alternative Phone Number
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Alt. Phone Number"
                        ref={vdAltPhoneRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Email Address*</label>
                      <input
                        type="email"
                        className="movoinput"
                        placeholder="Email Address"
                        ref={vdEmailRef}
                      />
                    </div>
                  </div>

                  <div className="movosecondary">
                    <label className="movosecondarylabel"> 
                      Secondary Contact Details
                    </label>
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

                  {showSecondaryContact && (
                    <div className="movosecondaryform">
                      <div className="movoformrow">
                        <div className="movoformgroup">
                          <label className="movolabel">First Name*</label>
                          <input
                            type="text"
                            className="movoinput"
                            placeholder="First Name"
                            ref={sdFirstNameRef}
                          />
                        </div>
                        <div className="movoformgroup">
                          <label className="movolabel">Last Name*</label>
                          <input
                            type="text"
                            className="movoinput"
                            placeholder="Last Name"
                            ref={sdLastNameRef}
                          />
                        </div>
                        <div className="movoformgroup">
                          <label className="movolabel">Phone No.*</label>
                          <input
                            type="text"
                            className="movoinput"
                            placeholder="Phone No."
                            ref={sdPhoneRef}
                          />
                        </div>
                      </div>

                      <div className="movoformrow">
                        <div className="movoformgroup">
                          <label className="movolabel">Email Address*</label>
                          <input
                            type="email"
                            className="movoinput"
                            placeholder="Email Address"
                            ref={sdEmailRef}
                          />
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

                  <div className="save-container">
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleVendorDetailsSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ********************************** */}
          {/* 2) COMPANY DETAILS */}
          {/* ********************************** */}
          <div className={`mocollapsible ${isExpanded2 ? "expanded" : ""}`}>
            <div
              className="mocollapsiblebar"
              onClick={() => setIsExpanded2(!isExpanded2)}
            >
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">COMPANY DETAILS</span>

                {!isSaved2 ? (
                  <span
                    className={`mocollapsibleicon ${
                      isExpanded2 ? "rotate" : ""
                    }`}
                  >
                    <Image
                      src="/DropDownButton.svg"
                      alt="dropdown"
                      width={40}
                      height={40}
                    />
                  </span>
                ) : (
                  <div className="status-icons">
                    <Image
                      src="/successButton.svg"
                      alt="Success"
                      width={22}
                      height={22}
                    />
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSaved2(false);
                        setIsExpanded2(true);
                      }}
                    >
                      <Image
                        src="/editbutton.svg"
                        alt="Edit"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isExpanded2 && !isSaved2 && (
              <div className="movocollapsiblecontent">
                {companyErrors.length > 0 && (
                  <div className="error-block">
                    {companyErrors.map((err, i) => (
                      <p key={i} className="error-text">
                        {err}
                      </p>
                    ))}
                  </div>
                )}

                <form className="movoform" onSubmit={(e) => e.preventDefault()}>
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Registered Company Name*
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Registered Company Name"
                        ref={cdRegNameRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Company Website</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Company Website"
                        ref={cdWebsiteRef}
                      />
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Firm Type*</label>
                      <select className="movoinput" ref={cdFirmTypeRef}>
                        <option>Select any option</option>
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="pvtltd">pvtltd</option>
                        <option value="public ltd">public ltd</option>
                      </select>
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Previous Year Turnover (in INR Crores)*
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Previous Year Turnover "
                        ref={cdPrevTurnoverRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Utilization Capacity*</label>
                      <select className="movoinput" ref={cdUtilizationRef}>
                        <option>Select any option</option>
                        <option value="Less than50%">Less than50%</option>
                        <option value="50-75">50-75</option>
                        <option value="max or 75+">max or 75+</option>
                      </select>
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Supplier Type*</label>
                      <select className="movoinput" ref={cdSupplierTypeRef}>
                        <option>Select any option</option>
                        <option value="Domestic">Domestic</option>
                        <option value="Exporter">Exporter</option>
                        <option value="cmt">cmt </option>
                        <option value="Job Worker">Job Worker</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Number of Machines*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Number of Machines"
                        ref={cdMachineCountRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Product Specifications*
                      </label>
                      <select className="movoinput" ref={cdProductSpecRef}>
                        <option>Select any option</option>
                        <option value="Knit">Knit</option>
                        <option value="Woven">Woven</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Worker Type*</label>
                      <select className="movoinput" ref={cdWorkerTypeRef}>
                        <option>Select any option</option>
                        <option value="Payroll">Payroll</option>
                        <option value="Third Party">Third Party</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">No. of Workers*</label>
                      <input
                        type="number"
                        className="movoinput"
                        placeholder="No. of Workers"
                        ref={cdWorkerCountRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Prominent Brands (3 or more)*
                      </label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="List Atleast 3 Prominent Brands"
                        ref={cdProminentBrandsRef}
                      />
                    </div>
                  </div>

                  <div className="save-container">
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleCompanyDetailsSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ********************************** */}
          {/* 3) COMPANY ADDRESS */}
          {/* ********************************** */}
          <div className={`mocollapsible ${isExpanded3 ? "expanded" : ""}`}>
            <div
              className="mocollapsiblebar"
              onClick={() => setIsExpanded3(!isExpanded3)}
            >
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">COMPANY ADDRESS</span>
                {!isSaved3 ? (
                  <span
                    className={`mocollapsibleicon ${
                      isExpanded3 ? "rotate" : ""
                    }`}
                  >
                    <Image
                      src="/DropDownButton.svg"
                      alt="dropdown"
                      width={40}
                      height={40}
                    />
                  </span>
                ) : (
                  <div className="status-icons">
                    <Image
                      src="/successButton.svg"
                      alt="Success"
                      width={22}
                      height={22}
                    />
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSaved3(false);
                        setIsExpanded3(true);
                      }}
                    >
                      <Image
                        src="/editbutton.svg"
                        alt="Edit"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {isExpanded3 && !isSaved3 && (
              <div className="movocollapsiblecontent">
                {addressErrors.length > 0 && (
                  <div className="error-block">
                    {addressErrors.map((err, i) => (
                      <p key={i} className="error-text">
                        {err}
                      </p>
                    ))}
                  </div>
                )}

                <form className="movoform" onSubmit={(e) => e.preventDefault()}>
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Address Proof Type*</label>
                      <select className="movoinput" ref={caProofTypeRef}>
                        <option>Select any option</option>
                        <option value="Utility Bill">Utility Bill</option>
                        <option value="Rent Agreement">Rent Agreement</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Address Proof Document*
                      </label>
                      <div className="upload-input-container">
  <input
    type="text"
    className="movoinput upload-input"
    placeholder="Upload Document"
    value={addressProofFile ? addressProofFile.name : ""}
    readOnly
  />
  {addressProofFile ? (
    <div className="file-action-buttons" style={{ position: "absolute", right: "5px" }}>
      <button
        type="button"
        className="remove-btn"
        onClick={() => setAddressProofFile(null)}
        style={{ padding: "5px 10px", marginRight: "5px" }}
      >
        ✕
      </button>
      <button
        type="button"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={handleAddressProofUploadClick}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15V3M12 3L8 7M12 3L16 7M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="upload-btn"
      onClick={handleAddressProofUploadClick}
    >
      Upload
    </button>
  )}
  <input
    type="file"
    id="addressProofFileInput"
    style={{ display: "none" }}
    onChange={handleAddressProofFileChange}
    accept=".pdf,.doc,.docx,.jpg,.png"
  />
</div>

                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup full-width">
                      <label className="movolabel">Company Address*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Apartment No/Street Address"
                        ref={caAddressRef}
                      />
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Town/City*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Town/City"
                        ref={caTownRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">State/Country*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="State/Country"
                        ref={caStateRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Pincode/Zip*</label>
                      <input
                        type="text"
                        className="movoinput"
                        placeholder="Pincode/Zip"
                        ref={caPincodeRef}
                      />
                    </div>
                  </div>

                  <div className="save-container">
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleCompanyAddressSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ********************************** */}
          {/* ********************************** */}
          {/* ********************************** */}
          {/* 4) DOCUMENT VERIFICATION */}
          {/* ********************************** */}
          <div className={`mocollapsible ${isExpanded4 ? "expanded" : ""}`}>
            <div
              className="mocollapsiblebar"
              onClick={() => setIsExpanded4(!isExpanded4)}
            >
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">
                  DOCUMENT VERIFICATION
                </span>
                {!isSaved4 ? (
                  <span
                    className={`mocollapsibleicon ${
                      isExpanded4 ? "rotate" : ""
                    }`}
                  >
                    <Image
                      src="/DropDownButton.svg"
                      alt="dropdown"
                      width={40}
                      height={40}
                    />
                  </span>
                ) : (
                  <div className="status-icons">
                    <Image
                      src="/successButton.svg"
                      alt="Success"
                      width={22}
                      height={22}
                    />
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSaved4(false);
                        setIsExpanded4(true);
                      }}
                    >
                      <Image
                        src="/editbutton.svg"
                        alt="Edit"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isExpanded4 && !isSaved4 && (
              <div className="movocollapsiblecontent">
                {documentErrors.length > 0 && (
                  <div className="error-block">
                    {documentErrors.map((err, i) => (
                      <p key={i} className="error-text">
                        {err}
                      </p>
                    ))}
                  </div>
                )}

                <form className="movoform" onSubmit={(e) => e.preventDefault()}>
                  {/* GST and PAN fields in a single row */}
                  <div className="document-single-row">
                    {/* GST Number */}
                    <div className="document-field-item">
                      <label className="document-label">GST No. *</label>
                      <input
                        type="text"
                        className="document-input upload-input-dv"
                        placeholder="GST No."
                        ref={dvGSTNumberRef}
                      />
                    </div>

                    {/* GST Upload */}
                   
                    <div className="document-field-item">
  <label className="document-label">GST Doc *</label>
  <div className="upload-input-container">
    <input
      type="text"
      className="movoinput upload-input upload-input-dv"
      placeholder="GST Doc"
      value={selectedGSTFile ? selectedGSTFile.name : ""}
      readOnly
    />
    {selectedGSTFile ? (
      <div className="file-action-buttons" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }}>
        <button
          type="button"
          className="remove-btn"
          onClick={() => setSelectedGSTFile(null)}
          style={{ padding: "5px 10px", marginRight: "5px" }}
        >
          ✕
        </button>
        <button
          type="button"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => document.getElementById("gstFile").click()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15V3M12 3L8 7M12 3L16 7M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    ) : (
      <button
        type="button"
        className="upload-btn"
        onClick={() => document.getElementById("gstFile").click()}
       
      >
        UPLOAD
      </button>
    )}
    <input
      type="file"
      id="gstFile"
      style={{ display: "none" }}
      onChange={handleGSTFileChange}
      accept=".pdf,.doc,.docx,.jpg,.png"
    />
  </div>
</div>

                    {/* PAN Number */}
                    <div className="document-field-item">
                      <label className="document-label">PAN card No. *</label>
                      <input
                        type="text"
                        className="document-input upload-input-dv"
                        placeholder="PAN card No."
                        ref={dvPANNumberRef}
                      />
                    </div>

                    {/* PAN Upload */}
                    <div className="document-field-item upload-input-dv">
  <label className="document-label">PAN Card *</label>
  <div className="upload-input-container">
    <input
      type="text"
      className="movoinput upload-input upload-input-dv"
      placeholder="PAN card"
      value={selectedPANFile ? selectedPANFile.name : ""}
      readOnly
    />
    {selectedPANFile ? (
      <div className="file-action-buttons" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }}>
        <button
          type="button"
          className="remove-btn"
          onClick={() => setSelectedPANFile(null)}
          style={{ padding: "5px 10px", marginRight: "5px" }}
        >
          ✕
        </button>
        <button
          type="button"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => document.getElementById("panFile").click()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15V3M12 3L8 7M12 3L16 7M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    ) : (
      <button
        type="button"
        className="upload-btn"
        onClick={() => document.getElementById("panFile").click()}
        // style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }}
      >
        UPLOAD
      </button>
    )}
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
{/* MSME section - Updated with remove and reupload functionality */}
<div className="msme-section">
  <div className="msme-header">
    <span className="msme-question">
      Do you have an Udyam Registration Certificate ? (MSME Certificate)
    </span>
    <div className="msme-options">
      <label className="msme-option">
        <input
          type="radio"
          name="hasMSME"
          value="yes"
          checked={msmeYesSelected}
          onChange={() => {
            setMsmeYesSelected(true);
            setMsmeNoSelected(false);
          }}
          required
        />
        <span className="msme-option-label">Yes</span>
      </label>
      <label className="msme-option">
        <input
          type="radio"
          name="hasMSME"
          value="no"
          checked={msmeNoSelected}
          onChange={() => {
            setMsmeNoSelected(true);
            setMsmeYesSelected(false);
            setSelectedMSMEFile(null);
          }}
          required
        />
        <span className="msme-option-label">No</span>
      </label>
    </div>
  </div>

  {/* Display upload field for Yes option with remove/reupload */}
  {msmeYesSelected && (
    <div className="msme-upload-container">
      <div className="msme-upload-field">
        <input
          type="text"
          className="msme-input"
          placeholder="MSME"
          value={selectedMSMEFile ? selectedMSMEFile.name : ""}
          readOnly
        />
        {selectedMSMEFile ? (
          <div className="file-action-buttons" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }}>
            <button
              type="button"
              className="remove-btn"
              onClick={() => setSelectedMSMEFile(null)}
              style={{ padding: "5px 10px", marginRight: "5px" }}
            >
              ✕
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={() => document.getElementById("msmeFile").click()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V3M12 3L8 7M12 3L16 7M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="msme-upload-btn"
            onClick={() => document.getElementById("msmeFile").click()}
          >
            UPLOAD
          </button>
        )}
        <input
          type="file"
          id="msmeFile"
          style={{ display: "none" }}
          onChange={handleMSMEFileChange}
          accept=".pdf,.doc,.docx,.jpg,.png"
          required={msmeYesSelected && !selectedMSMEFile}
        />
      </div>
    </div>
  )}

  {/* Display upload field for No option with remove/reupload */}
  {msmeNoSelected && (
    <div className="msme-no-container">
      <p className="msme-info-text">We need it written on the letterhead of the company</p>
      <div className="msme-upload-field">
        <input
          type="text"
          className="msme-input"
          placeholder="Upload Document"
          value={selectedMSMEFile ? selectedMSMEFile.name : ""}
          readOnly
        />
        {selectedMSMEFile ? (
          <div className="file-action-buttons" style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }}>
            <button
              type="button"
              className="remove-btn"
              onClick={() => setSelectedMSMEFile(null)}
              style={{ padding: "5px 10px", marginRight: "5px" }}
            >
              ✕
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={() => document.getElementById("msmeNoFile").click()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V3M12 3L8 7M12 3L16 7M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="msme-upload-btn"
            onClick={() => document.getElementById("msmeNoFile").click()}
          >
            UPLOAD
          </button>
        )}
        <input
          type="file"
          id="msmeNoFile"
          style={{ display: "none" }}
          onChange={handleMSMEFileChange}
          accept=".pdf,.doc,.docx,.jpg,.png"
          required={msmeNoSelected && !selectedMSMEFile}
        />
      </div>
      <a href="#" className="msme-link">
        What are the benefits of having Udyam Registration Certificate?
      </a>
    </div>
  )}
</div>

                  {/* Certificate buttons */}
                  <div className="certificates-grid">
  {/* First Row: 6 items */}
  <div className="certificate-row">
    {DOC_TYPES.slice(0, 6).map((docType) => (
      <div key={docType} className="certificate-container">
        <button
          type="button"
          className="certificate-button"
          onClick={() =>
            document.getElementById(`docInput-${docType}`).click()
          }
        >
          {!additionalDocs[docType] ? (
            <>
              <span>{docType}</span>
              <img
                src="/cloudIcon.svg"
                alt="upload"
                className="certificate-icon"
              />
            </>
          ) : (
            <div className="uploaded-file-display">
              <img src="/successButton.svg" alt="Success" className="success-icon" />
              <span className="uploaded-filename">
                {additionalDocs[docType].name}
              </span>
              <button
                type="button"
                className="remove-upload-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setAdditionalDocs((prev) => {
                    const updated = { ...prev };
                    delete updated[docType];
                    return updated;
                  });
                }}
              >
                ✕
              </button>
            </div>
          )}
        </button>
        <input
          type="file"
          id={`docInput-${docType}`}
          style={{ display: "none" }}
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={(e) => handleAdditionalDocUpload(e, docType)}
        />
      </div>
    ))}
  </div>

  {/* Second Row: 6 items */}
  <div className="certificate-row">
    {DOC_TYPES.slice(6).map((docType) => (
      <div key={docType} className="certificate-container">
        <button
          type="button"
          className="certificate-button"
          onClick={() =>
            document.getElementById(`docInput-${docType}`).click()
          }
        >
          {!additionalDocs[docType] ? (
            <>
              <span>{docType}</span>
              <img
                src="/cloudIcon.svg"
                alt="upload"
                className="certificate-icon"
              />
            </>
          ) : (
            <div className="uploaded-file-display">
              <img src="/successButton.svg" alt="Success" className="success-icon" />
              <span className="uploaded-filename">
                {additionalDocs[docType].name}
              </span>
              <button
                type="button"
                className="remove-upload-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setAdditionalDocs((prev) => {
                    const updated = { ...prev };
                    delete updated[docType];
                    return updated;
                  });
                }}
              >
                ✕
              </button>
            </div>
          )}
        </button>
        <input
          type="file"
          id={`docInput-${docType}`}
          style={{ display: "none" }}
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={(e) => handleAdditionalDocUpload(e, docType)}
        />
      </div>
    ))}
  </div>
</div>


                  <div className="save-container">
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleDocumentVerificationSave}
                    >
                      SAVE
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ********************************** */}
          {/* 5) BANK DETAILS */}
          {/* ********************************** */}
          <div className={`mocollapsible ${isExpanded5 ? "expanded" : ""}`}>
            <div
              className="mocollapsiblebar"
              onClick={() => setIsExpanded5(!isExpanded5)}
            >
              <div className="mocollapsibleheader">
                <span className="mocollapsibletitle">BANK DETAILS</span>
                {!isSaved5 ? (
                  <span
                    className={`mocollapsibleicon ${
                      isExpanded5 ? "rotate" : ""
                    }`}
                  >
                    <Image
                      src="/DropDownButton.svg"
                      alt="dropdown"
                      width={40}
                      height={40}
                    />
                  </span>
                ) : (
                  <div className="status-icons">
                    <Image
                      src="/successButton.svg"
                      alt="Success"
                      width={22}
                      height={22}
                    />
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSaved5(false);
                        setIsExpanded5(true);
                      }}
                    >
                      <Image
                        src="/editbutton.svg"
                        alt="Edit"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isExpanded5 && !isSaved5 && (
              <div className="movocollapsiblecontent">
                {bankErrors.length > 0 && (
                  <div className="error-block">
                    {bankErrors.map((err, i) => (
                      <p key={i} className="error-text">
                        {err}
                      </p>
                    ))}
                  </div>
                )}

                <form className="movoform" onSubmit={(e) => e.preventDefault()}>
                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Bank Name*</label>
                      <input
                        type="text"
                        placeholder="Bank Name"
                        className="movoinput"
                        ref={bdBankNameRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">Account Number*</label>
                      <input
                        type="text"
                        placeholder="Account Number"
                        className="movoinput"
                        ref={bdAccountNumberRef}
                      />
                    </div>
                    <div className="movoformgroup">
                      <label className="movolabel">
                        Re-enter Account Number*
                      </label>
                      <input
                        type="text"
                        placeholder="Re-enter Account Number"
                        className="movoinput"
                        ref={bdReAccountNumberRef}
                      />
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Bank Address*</label>
                      <input
                        type="text"
                        placeholder="Bank Address"
                        className="movoinput"
                        ref={bdBankAddressRef}
                      />
                    </div>

                    <div className="movoformgroup">
                      <label className="movolabel">IFSC Code*</label>
                      <input
                        type="text"
                        placeholder="IFSC Code"
                        className="movoinput"
                        ref={bdIFSCRef}
                      />
                    </div>
                  </div>

                  <div className="movoformrow">
                    <div className="movoformgroup">
                      <label className="movolabel">Swift Code</label>
                      <input
                        type="text"
                        placeholder="Swift Code"
                        className="movoinput"
                        ref={bdSwiftRef}
                      />
                    </div>

                    <div className="movoformgroup">
                      <label className="movolabel">Cancelled Cheque*</label>
                      <div className="upload-input-container">
  <input
    type="text"
    className="movoinput upload-input"
    placeholder="Cancelled Cheque"
    value={cancelledChequeFile ? cancelledChequeFile.name : ""}
    readOnly
  />
  {cancelledChequeFile ? (
    <div className="file-action-buttons" style={{ position: "absolute", right: "5px" }}>
      <button
        type="button"
        className="remove-btn"
        onClick={() => setCancelledChequeFile(null)}
        style={{ padding: "5px 10px", marginRight: "5px" }}
      >
        ✕
      </button>
      <button
        type="button"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={handleCancelledChequeUploadClick}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15V3M12 3L8 7M12 3L16 7M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="upload-btn"
      onClick={handleCancelledChequeUploadClick}
    >
      Upload
    </button>
  )}
  <input
    type="file"
    id="cancelledChequeFileInput"
    style={{ display: "none" }}
    onChange={handleCancelledChequeFileChange}
    accept=".pdf,.doc,.docx,.jpg,.png"
  />
</div>
                    </div>
                  </div>

                  <div className="save-container">
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleBankDetailsSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ********************************** */}
          {/* FINAL SUBMIT BUTTON */}
         {/* ********************************** */}
{/* FINAL SUBMIT BUTTON */}
{/* ********************************** */}
{/* ********************************** */}
{/* FINAL SUBMIT BUTTON */}
{/* ********************************** */}
<div className="save-container">
  {submitError && (
    <div className="submit-error-message">
      <p>Fill All Sections before Submitting.</p>
    </div>
  )}
  <button
    type="button"
    className={`save-btn ${!allSectionsSaved ? 'disabled-btn' : ''}`}
    onClick={handleFinalSubmit}
    disabled={isSubmitting} // Disable while submitting
    
  >
    {isSubmitting ? "Submitting..." : "SUBMIT"}
  </button>
</div>

          {isSubmitted && (
  <div className="popup-overlay">
    <div className="popup-box">
      <Image
        src="/ThankYouPic.svg"
        alt="Thank You"
        width={300}
        height={300}
      />
      <h2 style={{ color: "#233B6E", marginTop: "20px" }}>Thank You!</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>Your vendor onboarding form has been submitted successfully.</p>
      <button className="close-button" onClick={closePopup}>
        Close
      </button>
    </div>
  </div>
          )}
        </div>
      </div>
    </div>
  );
}
