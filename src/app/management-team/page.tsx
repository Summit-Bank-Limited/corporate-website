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



          text={`Dr. Mohammad Mahbubi Ali is a leading international authority in Islamic banking, finance, and Shariah governance, widely recognised for his intellectual contributions, policy influence, and advisory leadership across Asia, the Middle East, and Africa. 


                 He is a Member of the Islamic Finance Development Committee at the Financial Services Authority (OJK) Indonesia, and sits on several high-level Shariah committees, including CIMB Islamic Bank Malaysia and FWD Takaful Malaysia.


          With a distinguished academic background, Dr. Mahbubi holds a PhD in Islamic Banking and Finance from IIUM and the Chartered Islamic Finance Professional (CIFP) qualification from INCEIF. His professional experience spans senior research, teaching, policy advisory, and leadership roles, including Resident Islamic Finance Expert at the Brunei Darussalam Central Bank, Head of Economics, Finance, Awqaf, and Zakat at IAIS Malaysia, and Chairman of the Islamic Institute of Sidogiri.


          Dr. Mahbubi has authored over 70 peer-reviewed journal articles and research papers, contributed to more than 40 Shariah advisory and consultancy projects, and delivered presentations at numerous international conferences. 


          His works significantly advance discourse on Shariah governance, Islamic financial inclusion, sukuk innovation, sustainable finance, and contemporary fiqh muamalat. He has also led major projects for global and national institutions, including Bank Negara Malaysia, INCEIF, AAOIFI, and Bank Indonesia.


          A recipient of multiple awards, including Best Paper Awards, and several national academic recognitions. He currently serves as Assistant Professor at the IIUM Institute of Islamic Banking and Finance (IIIBF), Malaysia, and Chairman of the Advisory Committee of Experts at Summit Bank Nigeria.`}

        />
      ),
      src: "/management-team/ace-chairman.png",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/company/summitbankng"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ],
    },
    {
      title: "Muhammad Tanko Aliyu",
      category: "Member, ACE",
      content: (
       <DummyContent



          text={`Prof. Muhammad Tanko Aliyu is a Professor of Qur’anic Studies at the Federal University of Lafia, Nigeria. 


              He holds degrees in Qur’an and Hadith (Islamic University, Niger Republic), an M.A. in Islamic Studies (University of Jos), and a PhD in Islamic Studies (Bayero University Kano). 


              Over the past two decades, he has taught Qur’an, Hadith, and related disciplines and has published widely in national and international journals, books, and conference proceedings. 


              His research spans Qur’anic and Hadith Studies, Maqasid al-Shari’ah, Islamic Economics, Fiqh and Usul al-Fiqh, and Political Science. 


              He has held several leadership roles, including Head of Unit, Head of Department, Dean of Arts, and currently serves as Director of the Centre for Security Studies at Federal University of Lafia. 


              He is also a Senate representative on the University Governing Council. Beyond academia, he serves as the Director of the Abubakar Siddiq Mosque and Islamic Centre and Founder of the Abul-Khayr Islamic Foundation. 


              He is an active member of various scholarly associations and currently serves on the Advisory Committee of Experts (ACE) of SUMMIT Bank.`}

        />
      ),
      src: "/management-team/member1.png",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/company/summitbankng"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ],
    },
    {
      title: "Muhammad Auwal Salisu",
      category: "Member, ACE",
      content: (
        <DummyContent



          text={`Dr. Muhammad Auwal Salisu is a Senior Lecturer in Islamic Development and Management Studies at the Federal University, Gashua, Yobe State, Nigeria. 


              With over 17 years of teaching and research experience, he specializes in Fiqh, Usul al-Fiqh, Maqasid al-Shariah, Islamic Finance, Qawa‘id Fiqhiyyah, and Shariah advisory for Islamic banking institutions. 


              He holds a B.A. in Shariah and Islamic Studies from OIC Islamic University (Niger Republic), an M.A. in Usul al-Fiqh from Al-Madinah International University (Malaysia), and a PhD in Islamic Development and Islamic Banking from Universiti Sains Malaysia.


              Dr. Auwal has published extensively in reputable national and international journals, contributed to book chapters, and presented scholarly papers at conferences across several countries. 


              He has supervised undergraduate and postgraduate research and serves as a reviewer and editorial advisor for academic journals. 


              He has held key academic leadership roles, including Postgraduate Coordinator and Head of Department of Islamic Studies, and is currently a Member of the Advisory Committee of Experts at SUMMIT Bank, Nigeria.`}

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
          subtitle={"ACE Members"}
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
