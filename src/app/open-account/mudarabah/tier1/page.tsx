"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Button from "@/components/Button";

// interface FormDataType {
//   bvn: string;
//   firstName: string;
//   lastName: string;
//   otherName: string;
//   phone: string;
//   email: string;
//   address: string;
//   landmark: string;
//   state: string;
//   country: string;
//   signature: File | null;
//   passportPhoto: File | null;
// }

// export default function OpenTier1Account() {
//   const [formData, setFormData] = useState<FormDataType>({
//     bvn: "",
//     firstName: "",
//     lastName: "",
//     otherName: "",
//     phone: "",
//     email: "",
//     address: "",
//     landmark: "",
//     state: "",
//     country: "",
//     signature: null,
//     passportPhoto: null,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     if ((name === "bvn" || name === "nin") && !/^\d{0,11}$/.test(value))
//       return;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (!files || files.length === 0) return;

//     if (name === "referenceForm") {
//       const list = Array.from(files);
//       if (list.length > 2) {
//         alert("Please upload exactly 2 reference forms.");
//         e.target.value = "";
//         return;
//       }
//       setFormData((prev) => ({ ...prev, referenceForm: list }));
//       return;
//     }

//     const file = files[0];
//     if (file.size > 2 * 1024 * 1024) {
//       alert("File size must be less than 2MB.");
//       e.target.value = "";
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [name]: file }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Submitted:", formData);
//   };

//   return (
//     <DefaultLayout>
//       <div className="text-center py-10">
//         <h1 className="mt-30 text-3xl font-semibold text-gray-900">
//           Open a Tier 1 Savings Account
//         </h1>
//         <p className="mt-8 text-gray-700 text-base sm:text-lg">
//           Please fill in the form below with accurate details.
//         </p>
//       </div>

//       <div className="mt-4 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow my-10">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Text Inputs */}
//           {[
//             { label: "BVN", name: "bvn", type: "text", placeholder: "11-digit BVN" },
//             { label: "First Name", name: "firstName", type: "text", placeholder: "First Name" },
//             { label: "Last Name", name: "lastName", type: "text", placeholder: "Last Name" },
//             { label: "Other Name", name: "otherName", type: "text", placeholder: "Other/Middle Name" },
//             { label: "Phone Number", name: "phone", type: "tel", placeholder: "eg: 080xxxxxxxx" },
//             { label: "Email", name: "email", type: "email", placeholder: "abc@gmail.com" },
//             { label: "Full Address", name: "address", type: "text", placeholder: "House Number, Street Name, Location/City/Town" },
//             { label: "Nearest Landmark", name: "landmark", type: "text", placeholder: "Busstop, Popular Building etc" },
//             { label: "State", name: "state", type: "text", placeholder: "The state of the above full address" },
//             { label: "Country", name: "country", type: "text", placeholder: "The country of the above full address" },
//           ].map(({ label, name, type, placeholder }) => (
//             <div key={name}>
//               <label className="block text-gray-700 font-medium mb-2">{label}</label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name as keyof FormDataType] as string}
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-700"
//                 required={name !== "otherName"}
//               />
//             </div>
//           ))}

//           {/* File Uploads */}
//           {[
//             { label: "Signature (2MB and below)", name: "signature" },
//             { label: "Passport Photo (2MB and below)", name: "passportPhoto" },
//           ].map(({ label, name }) => (
//             <div key={name}>
//               <label className="block text-gray-700 font-medium mb-2">{label}</label>
//               <input
//                 type="file"
//                 name={name}
//                 accept="image/*,application/pdf"
//                 onChange={handleFileChange}
//                 className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-green-700"
//                 required
//               />
//             </div>
//           ))}

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <Button text="Submit Application" type="primary" buttonFn={() => {}} />
//           </div>
//         </form>
//       </div>

//       <div className="text-center text-gray-500 text-sm mb-10">
//         <p>Required documents: Signature, Passport Photograph</p>
//       </div>
//     </DefaultLayout>
//   );
// }

// =========================
// ✅ New Minimal Page
// =========================

export default function OpenTier1Account() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
        <p className="text-gray-600 text-lg max-w-md">
          This feature is currently under development. Please check back later.
        </p>
      </div>
    </DefaultLayout>
  );
}
