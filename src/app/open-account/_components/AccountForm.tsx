"use client";
import { useState } from "react";

export default function AccountForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bvn: "",
    address: "",
    idType: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your application has been received!");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Complete Your Application</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg"
          required
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
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          name="bvn"
          value={formData.bvn}
          onChange={handleChange}
          placeholder="BVN"
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

        <select
          name="idType"
          value={formData.idType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select ID Type</option>
          <option value="NIN">NIN</option>
          <option value="International Passport">International Passport</option>
          <option value="Driver's License">Driver's License</option>
          <option value="Voter's Card">Voter's Card</option>
        </select>

        <input
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder="ID Number"
          className="w-full border p-3 rounded-lg"
        />

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
