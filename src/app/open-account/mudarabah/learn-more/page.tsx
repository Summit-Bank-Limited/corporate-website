"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import DefaultLayout from "@/components/layout/DefaultLayout";
import AccountHero from "@/components/generalHero/AccountHero";
import FeaturesSection from "@/components/section/FeaturesSection";
import GenericSection from "@/components/section/GenericSection";
import Faq from "@/components/faq/Faq";
import MTDApplicationForm from "@/components/mtd-application/MTDApplicationForm";
import Button from "@/components/Button";
import Framer from "@/components/Framer";
import { fadeIn } from "@/lib/animation";

export default function LearnMoreMudarabah() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const heroDetails = {
    title: "Mudarabah Savings Account",
    text: (
      <>
        The Mudarabah Savings Account operates under the Islamic finance principle of Mudarabah, 
        which is a partnership between the customer and the bank.
        <br /><br />
        <span className="font-semibold text-gray-900">
          Watch your savings and your ethical returns grow together.
        </span>
      </>
    ),
  };

  const features = [
    {
      title: "Shariah-Compliant",
      text: (
        <ul className="list-disc ml-4 space-y-1 text-gray-700">
          <li>Fully Shariah-compliant Mudarabah partnership model.</li>
          <li>Investments are solely Shariah-compliant.</li>
        </ul>
      ),
    },
    {
      title: "Flexible Access",
      text: "Access your account anytime via Summit Bank Mobile App or Internet Banking.",
    },
    {
      title: "Profit Sharing",
      text: "Monthly profit distribution based on your account’s average balance.",
    },
    {
      title: "Instant Debit Card",
      text: "Get a Verve debit card instantly upon account opening.",
    },
  ];

  const sections = [
    {
      title: "Eligibility Requirements",
      list: [
        "Any individual, including minors (opened and operated by a guardian), can open a Savings Account.",
      ],
    },
  ];

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <AccountHero title={heroDetails.title} text={heroDetails.text} />

      {/* Apply Buttons - Tier buttons */}
      <div className="py-10 flex justify-center gap-6 flex-wrap">
        {[1, 2, 3].map((tier) => (
          <div key={tier} className="flex flex-col items-center">
            <Framer animation={fadeIn("up", 0.2 + tier * 0.1)}>
              <Link href={`/open-account/mudarabah/tier${tier}`}>
                <Button
                  text={`Open Tier ${tier}`}
                  type="primary"
                  buttonFn={() => {}}
                />
              </Link>
            </Framer>
            <span className="text-xs mt-2 text-center">
              {tier === 1 &&
                "BVN, Passport, Signature"}
              {tier === 2 &&
                "BVN, NIN, Passport, Signature, Utility Bill (Within last 3 months)"}
              {tier === 3 &&
                "BVN, NIN, Passport, Signature, Utility Bill (Within last 3 months)"}
            </span>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Eligibility Section */}
      {sections.map((section, index) => (
        <GenericSection key={index} title={section.title}>
          <div className="space-y-3">
            {section.list.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <Image
                  src="/account/tick-icon.svg"
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

      {/* FAQ Section */}
      <Faq amount={3} />

      {/* MTD Application Form Modal */}
      <MTDApplicationForm
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
      />
    </DefaultLayout>
  );
}
