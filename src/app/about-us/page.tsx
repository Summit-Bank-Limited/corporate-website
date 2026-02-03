"use client";
import Framer from "@/components/Framer";
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import GenericSection from "@/components/section/GenericSection";
import { fadeInLetters, slideUp } from "@/lib/animation";
import React from "react";
import AllProfiles from "../../components/profiles/AllProfiles";
import Image from "next/image";

export default function About() {
  const heroData = {
    title: "Transforming money, trade, and lives.",
    text: "Whether you're saving for the future, growing your business, or looking for everyday financial convenience, we're here to support your journey—ethically and intelligently.",
    image: "/pages-section/about.jpg",
    subtitle: "Governance",
  };

  const standSection = {
    title: "Summit Values",
    image: "/pages-section/stand.png",
  };

  const mission = {
    subtitle: "Our Mission",
    text: "To be the trusted partner, providing ethical banking solutions that empower individuals and communities while making a positive impact in the lives of stakeholders for a prosperous society. ",
    // image: "/pages-section/mission.jpeg",
  };
  const values = [
    "Stewardship. We are accountable and responsible",
    "Unity. We are collaborative and respectful",
    "Moral integrity. We are honest and trustworthy",
    "Mastery. We are excellent and professional",
    "Innovation. We are dynamic and creative",
    "Transparency. We are ethical and sincere",
    "Boldness. We are confident and courageous",
    "Authenticity. We are real and sincere",
    "Nobility. We are selfless and fair",
    "Keenness. We are enthusiastic and passionate",
  ];

  const vision = {
    subtitle: "Our Vision",
    text: "To be the leading ethical bank, supporting our stakeholders for common growth and prosperity. ",
  };
  return (
    <div>
      <DefaultLayout>
        {/* <SectionHero
          subtitle={heroData?.subtitle}
          title={heroData?.title}
          text={heroData?.text}
          image={heroData?.image}
        /> */}

        <div className="main py-20 !pt-[160px]">
     <div className="grid md:grid-cols-[5fr_7fr] gap-10 items-start">
  {/* Left Column with header and image */}
  <div className="space-y-6 h-fit">
    <Framer animation={slideUp(0.8)}>
      <h3 id="history" className="scroll-mt-[160px]">Our History</h3>
    </Framer>
    <Framer animation={slideUp(1)}>
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/building.png" // Replace with your actual path
          alt="Our History"
          fill
          className="object-cover"
        />
      </div>
    </Framer>
  </div>

  {/* Right Column with text (moved down slightly using mt-6) */}
  <Framer animation={slideUp(0.6)}>
    <div className="space-y-4 text-justify leading-relaxed mt-6">
      <p>
        Summit Bank Limited was incorporated on 15th July 2024, as a limited liability company and licensed on 6th February 2025, by the Central Bank of Nigeria (CBN) to provide non-interest banking services to the public. The Bank is positioned to become one of the most efficient digital and service focused banks in Nigeria.
      </p>
      <p>
        Summit Bank offers banking services that are non-interest-based transactions. Summit Bank emphasizes profit-and-loss sharing arrangements, ethical investments, and risk-sharing partnerships with its clients. This model aims to promote financial inclusion, social justice, economic equity and moral accountability.
      </p>
      <p>
        Summit Bank is a forward-thinking Nigerian financial institution established to redefine banking through innovation, customer-centric solutions, and a strong commitment to integrity and excellence.
      </p>
    </div>
  </Framer>
</div>

        </div>
        <div className="grid main lg:grid-cols-2">
          <div className="lg:mt-[100px]">
            <div id="values" className="scroll-mt-[160px]">
              <h3 className="!text-2xl md:!text-3xl lg:!text-4xl leading-[1.3] mb-6">Summit Values</h3>
              <div className="space-y-3">
                {values?.map((item, i) => (
                  <Framer animation={fadeInLetters(i)} key={i}>
                    <li
                      key={i}
                      className="list-none flex items-center flex-wrap gap-1"
                    >
                      <div className="font-bold mr-2 bg-secondary-color w-[35px] flex items-center justify-center text-white h-[35px] rounded-md">
                        {item.charAt(0)}
                      </div>
                      <div className="text-secondary-color font-bold">
                        {item.split(".")[0]}.
                      </div>
                      {item.split(".")[1]}
                    </li>
                  </Framer>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <div id="mission" className="scroll-mt-[160px]">
              <SectionHero
                subtitle={mission?.subtitle}
                text={mission?.text}
                textClass={"lg:!text-left lg:w-[600px]"}
                // image={mission?.image}
                // imageClass={" !object-top"}
                customClass={
                  " lg:!text-left !text-2xl md:!text-3xl lg:!text-4xl leading-[1.3]"
                }
                mainClass={"!mt-[100px] !justify-start"}
              />
            </div>
            <div id="vision" className="scroll-mt-[160px]">
              <SectionHero
                subtitle={vision?.subtitle}
                text={vision?.text}
                textClass={"lg:!text-left lg:w-[600px]"}
                customClass={" lg:!text-left  !text-2xl md:!text-3xl lg:!text-4xl leading-[1.3]"}
                mainClass={"!mt-[100px] !justify-start"}
              />
            </div>
          </div>
        </div>

        <AllProfiles />
      </DefaultLayout>
    </div>
  );
}
