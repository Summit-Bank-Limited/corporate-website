"use client";

import React from "react";
import Image from "next/image";
import DefaultLayout from "@/components/layout/DefaultLayout";
import ResetPinForm from "@/components/reset-pin/ResetPinForm";
import GeneralHero from "@/components/generalHero/GeneralHero";

export default function ResetPinPage() {
  const heroData = {
    title: "Reset Your AfriGo Card PIN",
    text: (
      <div className="flex flex-col items-start gap-4">
        <p>Reset your Afrigo card PIN safely and securely to continue enjoying seamless transactions.</p>

        {/* AfriGo Logo Below Text */}
        <Image
          src="/afrigo.png"
          alt="AfriGo Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
    ),
    image: "/afrigo.png",
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
          <ResetPinForm />
        </div>
      </div>
    </DefaultLayout>
  );
}

