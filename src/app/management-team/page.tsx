"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "@/components/layout/DefaultLayout";
import GenericHero from "@/components/generalHero/GenericHero";
import SectionHero from "@/components/generalHero/SectionHero";

const Carousel = dynamic(
  () => import("@/components/ui/apple-cards-carousel").then(mod => mod.Carousel),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading management team...</p>,
  }
);

const Card = dynamic(
  () => import("@/components/ui/apple-cards-carousel").then(mod => mod.Card),
  { ssr: false }
);

export default function ManagementTeam() {
  interface DummyContentProps {
    text: string;
  }

  const DummyContent = ({ text }: DummyContentProps) => (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-10 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-lg font-sans max-w-3xl mx-auto text-justify">
        {text}
      </p>
    </div>
  );

  const heroData = {
    title: "Meet Our ACE Team",
    text: "Upholding Standards, Inspiring Trust.",
    image: "/pages-hero/Logo1.png",
  };

  // Only 3 members
  const managementTeam = [
    {
      title: "Mohammad Mahbubi Ali, PhD",
      category: "Chairman, ACE",
      content: (
        <DummyContent
          text={`Dr. Mohammad Mahbubi Ali, PhD, is an expert in Islamic finance and serves as Chairman of the Advisory Committee of Experts (ACE) at Summit Bank Nigeria, providing strategic guidance on Shariah-compliant banking operations. He holds a PhD in Islamic Banking and Finance from IIUM, Malaysia, and has extensive experience as a Shariah advisor and auditor accredited by AAOIFI. Dr. Mahbubi Ali has held leadership and advisory roles across international Islamic financial institutions, bridging academic research with practical implementation. His work focuses on Shariah governance, product compliance, and advancing Islamic banking standards globally.`}
        />
      ),
      src: "/management-team/ace-chairman.png",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/company/summitbankng"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ],
    },
    {
      title: "Muhammad Tanko Aliyu, PhD",
      category: "Member, ACE",
      content: (
        <DummyContent
          text={`Prof. Muhammad Tanko Aliyu (Baitullah) is a Professor of Qur’anic Studies at the Federal University of Lafia, Nigeria, with over 21 years of teaching experience in Qur’an, Hadith, and related Islamic studies. He earned his B.A. in Qur’an and Hadith Studies, M.A. in Islamic Studies, and PhD in Islamic Studies, and has held academic positions from Graduate Assistant to Professor, publishing extensively in journals, books, and conference proceedings. He has served in multiple administrative and leadership roles, including Dean of Arts, Director of the Centre for Security Studies, Chief Imam, and board positions in Islamic organizations. Prof. Aliyu also participates in national assignments and currently serves as a member of the Advisory Committee of Experts (ACE) at Summit Bank.`}
        />
      ),
      src: "/management-team/member1.png",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/company/summitbankng"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ],
    },
    {
      title: "Muhammad Auwal Salisu, PhD",
      category: "Member, ACE",
      content: (
        <DummyContent
          text={`Dr. Auwal Salisu is a Senior Lecturer and Head of the Department of Islamic Studies at Federal University Gashua, Nigeria, specializing in Islamic Banking, Fiqh, Usul-Fiqh, Maqasid Sharia, and Sharia advisory. He holds a B.A. in Sharia and Islamic Studies, an M.A. in Usul-Fiqh, and a PhD in Islamic Development and Management Studies (Islamic Banking), with additional professional certifications in Shariah for Banking and Finance. With over 25 years of teaching, research, and Quranic leadership experience, he has published extensively, supervised students, and participated in national and international academic forums, while also engaging in community service initiatives. Dr. Auwal is a member of the Advisory Committee of Experts (ACE) at Summit Bank and directs multiple Islamic educational and development foundations in Yobe State, Nigeria.`}
        />
      ),
      src: "/management-team/member2.png",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/company/summitbankng"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ],
    },
  ];

  const cards = managementTeam.map((card, index) => (
    <div key={card.title} className="w-[280px] md:w-[320px] lg:w-[360px] flex-shrink-0">
      <Card card={card} index={index} />
    </div>
  ));

  return (
    <DefaultLayout>
      <GenericHero title={heroData.title} text={heroData.text} image={heroData.image} />

      <div className="mt-10" id="management-team-anchor">
        <SectionHero
          subtitle={"ACE Management Team"}
          customClass={"!text-2xl md:!text-3xl lg:!text-4xl !leading-[1.3]"}
        />
      </div>

      {/* Carousel centered with spacing */}
      <div className="overflow-x-auto py-6">
        <Suspense fallback={<p className="text-center">Loading management team...</p>}>
          <div className="flex justify-center gap-10 px-4 md:px-8">
            {cards}
          </div>
        </Suspense>
      </div>
    </DefaultLayout>
  );
}
