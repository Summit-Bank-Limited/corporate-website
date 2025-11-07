"use client";

import Faq from "@/components/faq/Faq";
import AccountHero from "@/components/generalHero/AccountHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import FeaturesSection from "@/components/section/FeaturesSection";
import GenericSection from "@/components/section/GenericSection";
import Image from "next/image";
import React, { useState } from "react";
import MTDApplicationForm from "@/components/mtd-application/MTDApplicationForm";
import Button from "@/components/Button";
import Framer from "@/components/Framer";
import { fadeIn } from "@/lib/animation";

export default function page() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const heroDetails = {
    title: "Summit MTD (Mudarabah)",
    text: "Your funds are ethically invested and profits are shared between you and the bank based on a pre-agreed ratio.",
  };

  const allFeatures = [
    {
      title: "Shariah compliant investment alternative to fixed deposit",
      text: "Grow your wealth ethically through profit-sharing, without interest, in accordance with Islamic principles.",
    },
    {
      title: "Higher returns compared to savings account",
      text: "Earn competitive profits through well-managed investments, offering better potential returns than traditional savings.",
    },
    {
      title: "Fair profit-sharing model",
      text: "Enjoy transparent earnings where profits are distributed based on a pre-agreed ratio between you and the bank.",
    },
    {
      title: "Flexible investment period",
      text: "Choose from a range of tenures tailored to your financial goals, whether short-term or long-term.",
    },
    {
      title: "Reinvestment options",
      text: "Easily roll over your matured investment or reinvest profits for compounded growth.",
    },
    {
      title: "Available for homes, cars, and equipment",
      text: "Ideal for funding goals like home ownership, vehicle acquisition, or equipment purchase through ethical financing.",
    },
  ];

  const allSection = [
    {
      title: "Requirements",
      image: "/account/current-1.png",
      list: [
        "Have an existing account with the bank",
        "Completed investment application form (stating tenor and amount)",
        "Minimum investment amount of N500,000",
      ],
      reverse: true,
    },
    {
      title: "Eligibility",
      image: "/account/current-2.png",
      list: [
        "SMEs and Registered businesses",
        "Completed investment application form (stating tenor and amount)",
        "Minimum investment amount of N1,000,000",
        "T&Cs apply",
      ],
    },
  ];

  return (
    <div className="">
      <DefaultLayout>
        <AccountHero text={heroDetails?.text} title={heroDetails?.title} />
        
        {/* Apply Button Section */}
        <div className="main py-10 flex justify-center">
          <Framer animation={fadeIn("up", 0.3)}>
            <Button
              text="Apply"
              type="primary"
              buttonFn={() => setIsApplicationOpen(true)}
            />
          </Framer>
        </div>

        {/* <Partners /> */}
        <FeaturesSection features={allFeatures} />
        {allSection?.map((res, index) => (
          <GenericSection
            title={res?.title}
            image={res?.image}
            reverse={res?.reverse}
            key={index}
          >
            <div className="space-y-3">
              {res?.list.map((item, index) => (
                <div className="flex gap-4 items-center" key={index}>
                  <Image
                    src={"/account/tick-icon.svg"}
                    width={20}
                    height={20}
                    alt="tick"
                  />
                  <p className="text-[var(--text-color)]">{item}</p>
                </div>
              ))}
            </div>
          </GenericSection>
        ))}
        <Faq amount={3} />
        {/*  <Testimonials /> */}
        
        {/* MTD Application Form Modal */}
        <MTDApplicationForm
          isOpen={isApplicationOpen}
          onClose={() => setIsApplicationOpen(false)}
        />
      </DefaultLayout>
    </div>
  );
}