"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Framer from "@/components/Framer";
import { fadeIn } from "@/lib/animation";
import Button from "@/components/Button";

export default function OpenTier3Account() {
  const [formData, setFormData] = useState({
    bvn: "",
    nin: "",
    firstName: "",
    lastName: "",
    otherName: "",
    additionalIDType: "",
    additionalIDNumber: "",
    signature: "",
    email: "",
    phone: "",
    referenceForm: "",
    passportPhoto: "",
    utilityBill: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Restrict BVN and NIN to 11 digits
    if ((name === "bvn" || name === "nin") && !/^\d{0,11}$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <DefaultLayout>
      {/* Hero / Title */}
      <div className="text-center py-10">
        <h1 className="mt-30 text-3xl font-semibold text-gray-900">
          Open a Current Account
        </h1>
        <p className="mt-8 text-gray-700 text-base sm:text-lg">
          Please fill in the form below with accurate details.
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-4 max-w-2xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow my-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BVN */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">BVN</label>
            <input
              type="text"
              name="bvn"
              value={formData.bvn}
              onChange={handleChange}
              placeholder="Enter 11-digit BVN"
              maxLength={11}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          {/* NIN */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">NIN</label>
            <input
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              placeholder="Enter 11-digit NIN"
              maxLength={11}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          {/* Other Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Other Name</label>
            <input
              type="text"
              name="otherName"
              value={formData.otherName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>


           {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>


          {/* Additional ID Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Additional ID Type</label>
            <select
              name="additionalIDType"
              value={formData.additionalIDType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            >
              <option value="">Select ID Type</option>
              <option value="International Passport">International Passport</option>
              <option value="International Passport">Voters Card</option>
              <option value="International Passport">Drivers Licence</option>
              <option value="Resident Permit">Resident Permit</option>
              <option value="Work ID">Work ID</option>
              <option value="School ID">School ID</option>
              <option value="Birth Certificate">Birth Certificate</option>
            </select>
          </div>

          {/* Additional ID Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Additional ID Number</label>
            <input
              type="text"
              name="additionalIDNumber"
              value={formData.additionalIDNumber || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          {/* Signature */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Signature</label>
            <input
              type="file"
              name="signature"
              accept="image/*,application/pdf"
              capture="environment"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
                    alert("File size must be less than 2MB.");
                    return;
                  }
                  setFormData({ ...formData, signature: file });
                }
              }}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload an image of your signature, take a picture, or upload a PDF (Max 2MB).
            </p>

            {/* Display selected file name */}
            {formData.signature && (
              <p className="text-sm text-gray-600 mt-1">Selected file: {formData.signature.name}</p>
            )}
          </div>

         {/* Passport Photo */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Passport Photo</label>
              <input
                type="file"
                name="passportPhoto"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    if (file.size > 2 * 1024 * 1024) {
                      alert("File size must be less than 2MB");
                      e.target.value = ""; // Clear the input
                      return;
                    }
                    setFormData({ ...formData, passportPhoto: file });
                  }
                }}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload an image of your passport photo or take a picture (max 2MB).
              </p>
            </div>


          {/* Reference Form */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">2 Reference Forms</label>
          <input
            type="file"
            name="referenceForm"
            accept="image/*,application/pdf"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const filesArray = Array.from(e.target.files);
                if (filesArray.length > 2) {
                  alert("Please select only 2 files.");
                  return;
                }
                setFormData({ ...formData, referenceForm: filesArray });
              }
            }}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload **exactly 2** completed and signed references (Image or PDF).
          </p>

          {/* Display selected file names */}
          {formData.referenceForm && formData.referenceForm.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {formData.referenceForm.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

          {/* Utility Bill */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Utility Bill</label>
            <input
              type="file"
              name="utilityBill"
              accept="image/*,application/pdf"
              capture="environment"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
                    alert("File size must be less than 2MB.");
                    return;
                  }
                  setFormData({ ...formData, utilityBill: file });
                }
              }}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload an image of your Utility Bill, take a picture, or upload a PDF (Max 2MB).
            </p>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <Button text="Submit Application" type="primary" />
          </div>
        </form>
      </div>

      {/* Note */}
      <div className="text-center text-gray-500 text-sm mb-10">
        <p>Required documents: Signature, Passport Photograph, 2 References (Current/Corporate Accounts), Utility Bill (Within last 3 months) </p>
      </div>
    </DefaultLayout>
  );
}
