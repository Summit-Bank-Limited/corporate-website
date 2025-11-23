"use client";
import React from "react";
import Framer from "../Framer";
import { fadeIn, fadeInLetters, slideUp } from "@/lib/animation";
import ProductsSection from "@/components/section/ProductsSection";
import { usePathname } from "next/navigation";

interface HeroInterface {
  title: string;
  text: React.ReactNode; // <-- allow JSX
}

export default function AccountHero({ title, text }: HeroInterface) {
  const path = usePathname();
  const isPersonalAccounts = path.includes("personal-current-account");

  const allFeatures = [
    {
      title: "Current Account (Qard)",
      text: "Enjoy unrestricted banking with full control, ethical standards, and seamless access to your funds anytime, anywhere.",
      link: "/open-account/current-account",
    },
    {
      title: "Savings Account (Mudarabah)",
      text: "Earn potential returns while maintaining access to your funds. A flexible account designed for responsible growth.",
      link: "/open-account/mudarabah/learn-more",
    },
  ];

  return (
    <div
      className="h-[800px] pt-20 py-10 max-h-[900px] lg:h-screen overflow-hidden w-screen bg-cover relative bg-[var(--primary-color)]"
      style={{ backgroundImage: `url('/main-hero-bg.png')` }}
    >
      <div className="main pt-10 text-center flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex items-center flex-col lg:w-[600px] mx-auto justify-center space-y-7">
            <div className="flex flex-wrap justify-center gap-x-3">
              {isPersonalAccounts ? (
                <Framer animation={slideUp(1)}>
                  <ProductsSection features={allFeatures} />
                </Framer>
              ) : (
                <>
                  {title?.split(" ").map((char: string, i: number) => (
                    <div key={i}>
                      <Framer animation={fadeInLetters(i)}>
                        <h1>{char}</h1>
                      </Framer>
                    </div>
                  ))}
                </>
              )}
            </div>

            {!isPersonalAccounts && (
              <Framer animation={fadeIn("up", 0.3)}>
                <p className="lg:w-[500px]">{text}</p>
              </Framer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
