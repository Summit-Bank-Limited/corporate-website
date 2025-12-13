import Faq from "@/components/faq/Faq";
import AccountHero from "@/components/generalHero/AccountHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import FeaturesSection from "@/components/section/FeaturesSection";
import GenericSection from "@/components/section/GenericSection";
import Image from "next/image";
import React from "react";

export default function PersonalSavingsAccountPage() {
  const heroDetails = {
    title: "Savings Accounts (Qard)",
    text: "Bank freely with a Shari'ah-compliant savings account that gives you control, convenience, and peace of mind.",
  };

  const allFeatures = [
    {
      title: "Online & Mobile Banking",
      text: "Manage your money anytime, anywhere with our intuitive mobile app and online banking platform.",
    },
    {
      title: "No Minimum Balance",
      text: "Enjoy true financial freedom with zero minimum balance requirements, no hidden restrictions and no hidden charges.",
    },
    {
      title: "Debit Card",
      text: "Access your funds easily with our Shari'ah-compliant debit card and via our intuitive web and mobile applications.",
    },
    {
      title: "Fund Transfers & Bill Payments",
      text: "Make quick, reliable and secure transactions with comprehensive payment solutions.",
    },
  ];

  const allSection = [
    {
      title: "What You Will Need",
      image: "/account/current-1.png",
      list: [
        "Completed account opening form",
        "Bank Verification Number (BVN)",
        "Valid means of identification (National ID, Passport, Driver's License, or Voter's Card)",
        "Proof of address (Utility bill or Tenancy agreement)",
        "Passport photograph",
      ],
      reverse: true,
    },
    {
      title: "Who Can Open a Current Account?",
      image: "/account/current-2.png",
      list: [
        "Individuals aged 18 and above",
        "Parents or guardians opening accounts on behalf of minors",
        "Business owners and entrepreneurs",
        "Professionals and Salaried individuals",
        "Students with a valid means of identification",
      ],
    },
  ];

  return (
    <div className="">
      <DefaultLayout>
        <AccountHero text={heroDetails?.text} title={heroDetails?.title} />
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
      </DefaultLayout>
    </div>
  );
}
