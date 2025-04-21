/**
 * src/app/api/save-vendor/route.js
 */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Vendor from '@/models/vendorSchema';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ────────────────────────────────────────────── */
/* 1. Helpers                                    */
/* ────────────────────────────────────────────── */

const isBareFilename = (s) =>
  typeof s === 'string' &&
  !s.startsWith('http') &&
  !s.startsWith('data:') &&
  !s.includes('/');

/** Replace dropdown placeholders with safe values. */
const sanitise = {
  firmType: (v) =>
    !v || v === 'Firm Type'
      ? 'Other'
      : v === 'Pvt Ltd'
      ? 'Private Limited'
      : v,
  utilization: (v) => (!v || v === 'Utilization' ? 'Not specified' : v),
  supplierType: (v) => (!v || v === 'Supplier Type' ? 'General' : v),
  productSpec: (v) =>
    !v || v === 'Knit/Woven/Others' ? 'Others' : v,
  workerType: (v) => (!v || v === 'Worker Type' ? 'General' : v),
};

/* ────────────────────────────────────────────── */
/* 2. Normalise front‑end JSON → schema shape    */
/* ────────────────────────────────────────────── */
function normalise(raw) {
  const {
    vendorDetails: vd = {},
    companyDetails: cd = {},
    companyAddress: ca = {},
    documentVerification: dv = {},
    bankDetails: bd = {},
  } = raw;

  /* –– Primary / secondary contacts –– */
  const primaryContact = {
    firstName: vd.primaryFirstName?.trim(),
    lastName: vd.primaryLastName?.trim(),
    phoneNumber: vd.primaryPhone?.trim(),
    alternativePhoneNumber: vd.altPhone?.trim() || '',
    email: vd.primaryEmail?.trim(),
  };

  const secondaryContact = vd.secondaryContact
    ? {
        firstName: vd.secondaryContact.firstName?.trim(),
        lastName: vd.secondaryContact.lastName?.trim(),
        phoneNumber: vd.secondaryContact.phone?.trim(),
        alternativePhoneNumber:
          vd.secondaryContact.alternativePhoneNumber?.trim() || '',
        email: vd.secondaryContact.email?.trim(),
      }
    : undefined;

  /* –– Company details –– */
  const brands =
    Array.isArray(cd.prominentBrands)
      ? cd.prominentBrands
      : (cd.prominentBrands || '')
          .split(',')
          .map((b) => b.trim())
          .filter(Boolean);

  while (brands.length < 3) brands.push(`Brand${brands.length + 1}`);

  const company = {
    name: cd.registeredName?.trim(),
    website: cd.website?.trim() || '',
    firmType: sanitise.firmType(cd.firmType),
    turnover: parseFloat(cd.prevTurnover) || 0,
    utilizationCapacity: sanitise.utilization(cd.utilization),
    supplierType: sanitise.supplierType(cd.supplierType),
    numberOfMachines: parseInt(cd.machineCount) || 0,
    productSpecifications: sanitise.productSpec(cd.productSpec),
    workerType: sanitise.workerType(cd.workerType),
    numberOfWorkers: parseInt(cd.workerCount) || 0,
    prominentBrands: brands,
  };

  /* –– Address –– */
  const address = {
    addressProofType: ca.addressProofType,
    addressProofDocument: ca.addressProofFileName,
    street: ca.address?.trim(),
    city: ca.town?.trim(),
    state: ca.state?.trim(),
    country: ca.country || 'India',
    pincode: ca.pincode?.trim(),
  };

  /* –– Docs –– */
  const documents = {
    gstNumber: dv.gstNumberString?.trim(),
    gstDocument: dv.gstFileName,
    panNumber: dv.panNumberString?.trim(),
    panDocument: dv.panFileName,
    hasMsmeCertificate: !!dv.msmeFileName,
    msmeDocument: dv.msmeFileName,
    certifications: dv.additionalDocs || {},
  };

  /* –– Bank –– */
  const bankDetails = {
    bankName: bd.bankName?.trim(),
    accountNumber: bd.accountNumber?.trim(),
    bankAddress: bd.bankAddress?.trim(),
    ifscCode: bd.ifsc?.trim(),
    swiftCode: bd.swift?.trim(),
    cancelledCheque: bd.cancelledChequeFileName,
  };

  return {
    primaryContact,
    secondaryContact,
    company,
    address,
    documents,
    bankDetails,
  };
}

/* ────────────────────────────────────────────── */
/* 3. Cloudinary / placeholder upload helper      */
/* ────────────────────────────────────────────── */
async function uploadDocs({ address, documents, bankDetails, folder }) {
  const up = async (file, sub) => {
    if (!file)
      return `https://placeholder.com/${folder}/${sub}/placeholder`;

    if (typeof file === 'string' && file.startsWith('http')) return file;

    if (isBareFilename(file)) {
      return `https://placeholder.com/${folder}/${sub}/${encodeURIComponent(
        file
      )}`;
    }

    try {
      const { secure_url } = await cloudinary.uploader.upload(file, {
        folder: `${folder}/${sub}`,
        resource_type: 'auto',
      });
      return secure_url;
    } catch (err) {
      console.error(`Cloudinary upload fail (${sub}) →`, err);
      return `https://placeholder.com/${folder}/${sub}/placeholder`;
    }
  };

  /* per‑cert upload */
  const certs = {};
  for (const [k, v] of Object.entries(documents.certifications || {})) {
    if (!v) continue;
    const key = k.toLowerCase().replace(/[^a-z0-9]/g, '');
    certs[key] = await up(v, 'certifications');
  }

  return {
    addressProofUrl: await up(address.addressProofDocument, 'address'),
    gstDocumentUrl: await up(documents.gstDocument, 'company'),
    panDocumentUrl: await up(documents.panDocument, 'company'),
    msmeDocumentUrl: documents.hasMsmeCertificate
      ? await up(documents.msmeDocument, 'company')
      : null,
    certifications: certs,
    cancelledChequeUrl: await up(bankDetails.cancelledCheque, 'bank'),
  };
}

/* ────────────────────────────────────────────── */
/* 4.   POST handler                              */
/* ────────────────────────────────────────────── */
export async function POST(req) {
  try {
    await connectDB();
    const raw = await req.json();
    console.log('📥  Incoming payload:', JSON.stringify(raw, null, 2));

    /* A. reshape front‑end JSON */
    const { primaryContact, secondaryContact, company, address, documents, bankDetails } =
      normalise(raw);

    /* B. Cloudinary (or placeholder) URLs */
    const folder = `vendor-documents/${(company.name || 'unknown_vendor')
      .replace(/[^a-z0-9]/gi, '_')}`;
    const uploaded = await uploadDocs({ address, documents, bankDetails, folder });

    /* C. final payload for MongoDB */
    const payload = {
      primaryContact,
      ...(secondaryContact && { secondaryContact }),
      company,
      address: {
        ...address,
        addressProofDocument: uploaded.addressProofUrl,
      },
      documents: {
        gstNumber: documents.gstNumber,
        gstDocument: uploaded.gstDocumentUrl,
        panNumber: documents.panNumber,
        panDocument: uploaded.panDocumentUrl,
        hasMsmeCertificate: documents.hasMsmeCertificate,
        ...(documents.hasMsmeCertificate && {
          msmeDocument: uploaded.msmeDocumentUrl,
        }),
        certifications: uploaded.certifications,
      },
      bankDetails: {
        ...bankDetails,
        cancelledCheque: uploaded.cancelledChequeUrl,
      },
      status: 'pending',
    };

    console.log('📤  Prepared vendor data:', JSON.stringify(payload, null, 2));

    const vendor = await Vendor.create(payload);

    return NextResponse.json(
      { success: true, vendorId: vendor._id, message: 'Vendor saved' },
      { status: 201 }
    );
  } catch (err) {
    console.error('❌  Save‑vendor error:', err);
    if (err.name === 'ValidationError') {
      const details = Object.values(err.errors).map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: details },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
