"use client";
import React from "react";
import IslamicFinanceCard from "./cards/IslamicFinanceCard";
import Framer from "./Framer";
import { fadeInLetters } from "@/lib/animation";

export default function IslamicFinances() {
  const finances = [
    {
      title: "Ethical Wealth Management",
      text: "Ethical and Shariah-compliant wealth solutions to help you grow, preserve, and distribute your assets with confidence.",
      image: "/coins.svg",
    },
   
  ];
  return (
    <div className="w-full lg:pt-20 py-10">
      <div className="main">
        <h3 className="lg:w-[700px] lg:pb-5 text-center mx-auto">
          Empowering Your Financial Journey with Ethical and Strategic Growth.
        </h3>
        <div
          className="max-h-[900px] lg:h-[90vh] bg-bottom flex items-end justify-center h-full bg-cover rounded-3xl my-10"
          style={{
            backgroundImage: `url('/finance.png')`,
          }}
        >
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-3 py-5 lg:w-[600px] w-full px-4 mx-auto">
            {finances.map((item, index) => (
              <Framer animation={fadeInLetters(index)} key={index}>
                <IslamicFinanceCard
                  image={item.image}
                  title={item.title}
                  text={item.text}
                />
              </Framer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
