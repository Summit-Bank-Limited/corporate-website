"use client";

<<<<<<< HEAD
=======
import FeaturesCard from "@/components/cards/FeaturesCard";
>>>>>>> c68f36458b030ba017ae96c6f510b25a98f98631
import Faq from "@/components/faq/Faq";
import MTDHero from "@/components/generalHero/MTDHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import FeaturesSection from "@/components/section/FeaturesSection";
import GenericSection from "@/components/section/GenericSection";
import Image from "next/image";
import React, { useState } from "react";
import MTDApplicationForm from "@/components/mtd-application/MTDApplicationForm";


export default function page() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const heroDetails = {
    title: "Term Deposit (Mudarabah)",
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

      
    
 
  ]
const allSection = [
    {
      title: "Requirements",
      image: "/account/current-1.png",
      list: [
        "Have an existing account with the Bank",
        "Completed investment application form (stating tenor and amount)",
        "Minimum investment amount of N500,000" 
        
        
      ],
      reverse: true,
    },
    {
      title: "Eligibility",
      image: "/account/current-2.png",
      list: [
        "SMEs and Registered businesses",
        "T&Cs apply"
        ,
    
      ],
    },
  ];

  return (
    <div className="">
      <DefaultLayout>
        <MTDHero 
          text={heroDetails?.text} 
          title={heroDetails?.title}
          onApplyClick={() => setIsApplicationOpen(true)}
        />
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
         <Faq  amount={3}/>
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