"use client";

import React from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import ActivateCardForm from "@/components/activate-card/ActivateCardForm";
import GeneralHero from "@/components/generalHero/GeneralHero";

export default function ActivateCardPage() {
  const heroData = {
    title: "Activate Your Card",
    text: "Activate your Afrigo card securely and start using it for your transactions.",
    image: "/card.png",
  };

  return (
    <DefaultLayout>
      <GeneralHero
        image={heroData.image}
        title={heroData.title}
        text={heroData.text}
      />
      <div className="w-full py-16 bg-gray-50">
        <div className="main max-w-4xl mx-auto">
          <ActivateCardForm />
        </div>
      </div>
    </DefaultLayout>
  );
}

