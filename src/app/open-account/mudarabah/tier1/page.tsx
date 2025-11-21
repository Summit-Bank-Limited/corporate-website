"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Framer from "@/components/Framer";
import { fadeIn } from "@/lib/animation";
import Button from "@/components/Button";

export default function OpenTier1Account() {
  const [formData, setFormData] = useState({
    bvn: "",
    firstName: "",
    lastName: "",
    otherName: "",
    signature: "",
    email: "",
    phone: "",
    passportPhoto: "",
  });

  const handleChange = (e) => {
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
          Open Tier 1 Savings Account
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button text="Submit Application" type="primary" />
          </div>
        </form>
      </div>

      {/* Note */}
      <div className="text-center text-gray-500 text-sm mb-10">
        <p>Required documents: Signature, Passport Photgraph</p>
      </div>
    </DefaultLayout>
  );
}
