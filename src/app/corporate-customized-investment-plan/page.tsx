import FeaturesCard from "@/components/cards/FeaturesCard";
import Faq from "@/components/faq/Faq";
import AccountHero from "@/components/generalHero/AccountHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Partners from "@/components/Partners";
import FeaturesSection from "@/components/section/FeaturesSection";
import GenericSection from "@/components/section/GenericSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import Image from "next/image";
import { title } from "process";
import React from "react";
import { text } from "stream/consumers";

export default function page() {
  const heroDetails = {
    title: "Customized Investment Plans – CIP",
    text: "These are tailor-made investment solutions designed to align with your unique risk profile and financial goals for optimal returns.",
  };

  const allFeatures = [
    {
      title: "Shariah-compliant bonds with stable returns",
      text: "Manage your money anytime, anywhere with our intuitive mobile app and online banking platform.",
    },
    {
      title: "Low-risk investment options",
      text: "Enjoy true financial freedom with zero minimum balance requirements and no hidden restrictions.",
    },
    {
      title: "Diversified portfolio opportunities",
      text: "Access your funds easily with our debit card and personalized cheque book.",
    },
    {
      title: "Regular profit distributions",
      text: "Access your funds easily with our debit card and personalized cheque book.",

    },
  ]
const allSection = [
    {
      title: "Requirements",
      image: "/account/current-1.png",
      list: [
        "Investment application form",
        "Valid means of identification",
        "Minimum investment amount (as determined by Summit Bank)" 
        
        
      ],
      reverse: true,
    },
    {
      title: "Eligibility",
      image: "/account/current-2.png",
      list: [
        "Businesses",
        "Professionals",
        "T&Cs apply"
    ,
      ],
    },
  ];

  return (
    <div className="">
      <DefaultLayout>
        <AccountHero text={heroDetails?.text} title={heroDetails?.title} />
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
      </DefaultLayout>
    </div>
  );
}