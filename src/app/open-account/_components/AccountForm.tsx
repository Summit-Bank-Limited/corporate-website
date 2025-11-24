"use client";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  otherName: string;
  email: string;
  phone: string;
  bvn: string;
  nin: string;
  address: string;
  additionalIDType: string;
  additionalIDNumber: string;
  signature: File | null;
  referenceForm: File[]; // multiple files
  passportPhoto: File | null;
  utilityBill: File | null;
}

export default function AccountForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    otherName: "",
    email: "",
    phone: "",
    bvn: "",
    nin: "",
    address: "",
    additionalIDType: "",
    additionalIDNumber: "",
    signature: null,
    referenceForm: [],
    passportPhoto: null,
    utilityBill: null,
  });

  // Handle text and select inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "bvn" || name === "nin") {
      if (!/^\d{0,11}$/.test(value)) return;
    } else if (name === "phone") {
      if (!/^\d{0,15}$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value } as any);
  };

  // Handle file uploads
  const handleFileChange = (
    name: keyof FormData,
    files: FileList | null,
    multiple = false
  ) => {
    if (!files) return;

    if (multiple) {
      const filesArray = Array.from(files);
      if (filesArray.length !== 2) {
        alert("Please select exactly 2 files for reference forms.");
        return;
      }
      setFormData({ ...formData, referenceForm: filesArray });
    } else {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB.");
        return;
      }
      setFormData({ ...formData, [name]: file } as any);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your application has been received!");
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Complete Your Application</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Text Inputs */}
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          name="otherName"
          value={formData.otherName}
          onChange={handleChange}
          placeholder="Other Name"
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          name="bvn"
          type="text"
          value={formData.bvn}
          onChange={handleChange}
          placeholder="BVN (11 digits)"
          maxLength={11}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          name="nin"
          type="text"
          value={formData.nin}
          onChange={handleChange}
          placeholder="NIN (11 digits)"
          maxLength={11}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Home Address"
          className="w-full border p-3 rounded-lg"
        />

        {/* Select */}
        <select
          name="additionalIDType"
          value={formData.additionalIDType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select ID Type</option>
          <option value="International Passport">International Passport</option>
          <option value="Voters Card">Voters Card</option>
          <option value="Drivers Licence">Drivers Licence</option>
          <option value="Resident Permit">Resident Permit</option>
          <option value="Work ID">Work ID</option>
          <option value="School ID">School ID</option>
          <option value="Birth Certificate">Birth Certificate</option>
        </select>
        <input
          name="additionalIDNumber"
          value={formData.additionalIDNumber}
          onChange={handleChange}
          placeholder="ID Number"
          className="w-full border p-3 rounded-lg"
        />

        {/* File Inputs */}
        <div>
          <label>Signature (Max 2MB)</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange("signature", e.target.files)}
            required
          />
          {formData.signature && <p>Selected file: {formData.signature.name}</p>}
        </div>

        <div>
          <label>Passport Photo (Max 2MB)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange("passportPhoto", e.target.files)}
            required
          />
          {formData.passportPhoto && <p>Selected file: {formData.passportPhoto.name}</p>}
        </div>

        <div>
          <label>Reference Forms (exactly 2, Max 2MB each)</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            multiple
            onChange={(e) => handleFileChange("referenceForm", e.target.files, true)}
            required
          />
          {formData.referenceForm.length > 0 && (
            <ul>
              {formData.referenceForm.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label>Utility Bill (Max 2MB)</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange("utilityBill", e.target.files)}
            required
          />
          {formData.utilityBill && <p>Selected file: {formData.utilityBill.name}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white p-3 rounded-lg mt-4 hover:bg-green-800"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
