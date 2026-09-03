// // =========================
// // ✅ Redirect to Instant Account Opening
// // =========================
// "use client";

// import React, { useEffect } from "react";
// import DefaultLayout from "@/components/layout/DefaultLayout";

// export default function OpenCurrentAccount() {
//   useEffect(() => {
//     window.location.href =
//       "https://external.summitbankng.com/instant-account";
//   }, []);

//   return (
//     <DefaultLayout>
//       <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">
//           Redirecting...
//         </h1>

//         <p className="text-gray-600 text-lg max-w-md mb-6">
//           You are being redirected to the Instant Account Opening platform.
//         </p>

//         <a
//           href="https://external.summitbankng.com/instant-account"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="px-6 py-3 bg-[#AF1F23] text-white rounded-lg hover:bg-[#8d191d] transition-colors"
//         >
//           Continue
//         </a>
//       </div>
//     </DefaultLayout>
//   );
// }

import { redirect } from "next/navigation";

// =========================
// ✅ Direct Redirect (No Page Render)
// =========================

export default function OpenCurrentAccount() {
  redirect("https://external.summitbankng.com/instant-account");
}