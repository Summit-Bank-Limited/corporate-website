// "use client";

// import React from "react";
// import { WordRotate } from "./magicui/word-rotate";
// import Framer from "./Framer";
// import { slideUp } from "@/lib/animation";
// import ProductCard from "./cards/ProductCard";
// import { useRouter } from "next/navigation";
// import { Carousel, Card } from "@/components/ui/apple-cards-carousel";


// export default function ProductsSection() {
//   const allWords = ["Nationwide Digital", "Non-Interest "];
//   const router = useRouter();
//   const allProducts = [
//     {
//       heading: "Deposit Products",
//       text: "Enjoy interest-free and profit-sharing deposit accounts designed to align with your values while ensuring financial stability and growth.",
//       //image: "/product/deposit-products.png",
//       type: "small",
//       link: "/deposit-products",
//     },
//     {
//       heading: "Trade & Working Capital Financing",
//       text: "Seamless and Shariah-compliant trade finance solutions to facilitate imports, exports, and working capital needs while minimizing financial risk.",
//       image: "/product/trade-and-working-capital-financing.jpg",
//       type: "medium",
//       link: "/trade-and-working-capital-financing",
//     },
//     {
//       heading: "Personal Financing",
//       text: "Access ethical financing solutions that support business growth, asset acquisition, and investments. All without compromising your values.",
//       image: "/product/financing.png",
//       type: "small",
//       link: "/financing-products",
//     },
   
//     {
//       heading: "Treasury & Investment Products",
//       text: "Diversify your portfolio with Shariah-compliant bonds, mutual funds, and money market instruments designed for secure and ethical wealth-building.",
//       image: "/product/treasury-and-investment-products.jpg",
//       type: "medium",
//       link: "/treasury-and-investment-products",
//     },
//     {
//       heading: "Digital & Alternative Banking Solutions",
//       text: "Experience the future of banking with digital solutions, blockchain-powered investments, and interest-free credit cards. All designed for modern, ethical banking.",
//       image: "/product/digital-and-alternative-banking-solutions.png",
//       type: "medium",
//       link: "/digital-and-alternative-banking-solutions",
//     },
//   ];

//   const handleClick = (item: any) => {
//     router.push(item?.link);
//   };
//   return (
//     <div className="w-full pt-24 py-10">
//       <div className="main  ">
//         <div className="lg:w-[90%] mx-auto text-center">
//           <Framer animation={slideUp(0.3)}>
//             <div className="flex items-center flex-wrap gap-2 justify-center">
//               <h2> Excellence in</h2>
//               <WordRotate
//                 className="!text-3xl md:!text-4xl lg:!text-6xl leading-[1] font-bold !text-[var(--secondary-color)]"
//                 words={allWords}
//               />
//             </div>
//           </Framer>
//           <Framer animation={slideUp(0.6)}>
//             <h2 className="pb-5">Banking Services</h2>
//           </Framer>
//           <Framer animation={slideUp(0.7)}>
//             <p className="py-4 lg:max-w-[800px] w-full mx-auto">
//               Get premium financial solutions for personal and business needs.
//               We deliver expert support and tailored services with unmatched
//               professionalism.
//             </p>
//           </Framer>
//         </div>
//         <div className="products grid md:grid-cols-10 gap-4 py-10">
//           {allProducts.map((item, index) => (
//             <ProductCard
//               heading={item.heading}
//               text={item.text}
//               type={item.type}
//               index={index}
//               image={item.image}
//               key={index}
//               link={item?.link}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WordRotate } from "./magicui/word-rotate";
import Framer from "./Framer";
import { slideUp } from "@/lib/animation";
import ProductCard from "./cards/ProductCard";
import { useRouter } from "next/navigation";

export default function ProductsSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [animate, setAnimate] = useState(false);

  const allWords = ["Nationwide Digital", "Non-Interest"];
  const router = useRouter();

  const allProducts = [
    {
      heading: "Deposit Products",
      text:
        "Enjoy interest-free and profit-sharing deposit accounts designed to align with your values while ensuring financial stability and growth.",
      type: "small",
      link: "/deposit-products",
    },
    {
      heading: "Trade & Working Capital Financing",
      text:
        "Seamless and Shariah-compliant trade finance solutions to facilitate imports, exports, and working capital needs while minimizing financial risk.",
      image: "/product/trade-and-working-capital-financing.jpg",
      type: "medium",
      link: "/trade-and-working-capital-financing",
    },
    {
      heading: "Personal Financing",
      text:
        "Access ethical financing solutions that support business growth, asset acquisition, and investments.",
      image: "/product/financing.png",
      type: "small",
      link: "/financing-products",
    },
    {
      heading: "Treasury & Investment Products",
      text:
        "Diversify your portfolio with Shariah-compliant investment products.",
      image: "/product/treasury-and-investment-products.jpg",
      type: "medium",
      link: "/treasury-and-investment-products",
    },
    {
      heading: "Digital & Alternative Banking Solutions",
      text:
        "Experience the future of ethical digital banking.",
      image: "/product/digital-and-alternative-banking-solutions.png",
      type: "medium",
      link: "/digital-and-alternative-banking-solutions",
    },
  ];

  /* ================= SESSION + DELAY LOGIC ================= */
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("capitalizationPopupSeen");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setAnimate(true);
        sessionStorage.setItem("capitalizationPopupSeen", "true");
      }, 1500); // 1.5s delay

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setAnimate(false);
    setTimeout(() => setShowPopup(false), 200);
  };

  return (
    <>
      {/* ================= POPUP MODAL ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div
            className={`relative bg-white rounded-2xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-hidden
            transition-all duration-300 ease-out
            ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 bg-white rounded-full w-9 h-9 flex items-center justify-center
              text-gray-700 hover:text-black text-xl font-bold shadow"
              aria-label="Close"
            >
              ×
            </button>

            {/* Image */}
            <div className="relative w-full h-[85vh]">
              <Image
                src="/news/capitalization.png"
                alt="Summit Bank Capitalization Status"
                fill
                priority
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE CONTENT ================= */}
      <div className="w-full pt-24 py-10">
        <div className="main">
          <div className="lg:w-[90%] mx-auto text-center">
            <Framer animation={slideUp(0.3)}>
              <div className="flex items-center flex-wrap gap-2 justify-center">
                <h2>Excellence in</h2>
                <WordRotate
                  className="!text-3xl md:!text-4xl lg:!text-6xl font-bold !text-[var(--secondary-color)]"
                  words={allWords}
                />
              </div>
            </Framer>

            <Framer animation={slideUp(0.6)}>
              <h2 className="pb-5">Banking Services</h2>
            </Framer>

            <Framer animation={slideUp(0.7)}>
              <p className="py-4 lg:max-w-[800px] mx-auto">
                Get premium financial solutions for personal and business needs.
                We deliver expert support and tailored services with unmatched
                professionalism.
              </p>
            </Framer>
          </div>

          <div className="products grid md:grid-cols-10 gap-4 py-10">
            {allProducts.map((item, index) => (
              <ProductCard
                key={index}
                heading={item.heading}
                text={item.text}
                image={item.image}
                type={item.type}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
