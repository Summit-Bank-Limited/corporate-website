
"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import SectionHero from "../generalHero/SectionHero";
import { motion } from "framer-motion";

const Carousel = dynamic(() => import("@/components/ui/apple-cards-carousel").then(mod => mod.Carousel), {
  ssr: false,
  loading: () => <p className="text-center">Loading board members...</p>,
});

const Card = dynamic(() => import("@/components/ui/apple-cards-carousel").then(mod => mod.Card), {
  ssr: false,
});

export default function AllProfiles() {
  interface DummyContentProps {
    text: string;
  }
  const DummyContent = ({ text }: DummyContentProps) => {
    return (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto text-justify">
          {text}
        </p>
      </div>
    );
  };

  const beyondNumbers = (
    <div className="mt-[-50px] text-center">
      <SectionHero
        subtitle={
          <div className="inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6B17D] via-[#AF1F23] to-[#C6B17D] bg-[length:200%_auto] bg-left animate-gradient text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              ...Beyond Numbers
            </span>
            <p className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#AF1F23] via-[#C6B17D] to-[#AF1F23] bg-[length:200%_auto] bg-left animate-gradient text-lg md:text-xl font-medium">
              We build smarter tools, deeper trust, and real impact.
            </p>
          </div>
        }
        customClass="!text-3xl md:!text-5xl lg:!text-6xl !leading-[1.2]"
      />
    </div>
  );

  const directors = [
    {
      title: "Umar Shuaib Ahmed",
      category: "Board Chairman",
      content: (
        <DummyContent
          text={`Before jointly founding Summit Bank Ltd, Umar served on the Board of Zenith Bank Plc as an Executive Director for over six years. Within the Zenith group, he also served as a Non-Executive Director at Zenith Pensions Custodian Limited. In addition, he supervised Zenith Bank Sierra Leone as the Group Supervising Director.  
      Umar started his banking career at Nigeria International Bank (Citibank Nigeria) in 1993. Thereafter, he worked briefly at Liberty Bank Plc and Broad Bank of Nigeria Ltd, before joining Zenith Bank plc in 2006.  
      Umar is coming to the board of Summit Bank with three decades of cognate experience. He has worked in Branch operations, Branch management, domestic and treasury operations, trade and transaction services, business development, finance and risk management, remedial management, finance recovery, treasury management, and trade finance. His experience spanned different groups, functions and geography.  
      In 1990, Mr. Ahmed earned a B.Sc. (Hons) degree in Accounting from Ahmadu Bello University, Zaria, and later earned an MSc. in Banking and Finance from Bayero University, Kano. In addition, he holds a Professional Certificate in Islamic Banking and Finance from the International Institute of Islamic Banking and Finance, Bayero University, Kano. He has attended several local and international executive programs at renowned institutions, including LBS and Harvard. He is a Fellow of the Nigerian Institute of Management (FNIM), Fellow of the Chartered Institute of finance and Risk Management of Nigeria (FCILRM), Senior Honorary Member of the Chartered Institute of Bankers of Nigeria (HCIBN), Member, Association of National Accountants of Nigeria (CNA), and Member, Chartered Institute of Directors of Nigeria (M.CIoD).`}
        />
      ),
      src: "/directors/Chairman1.jpeg",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/in/umar-shuaib-ahmed-10b62b34/"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ]
    },
    {
      title: "Sirajo Salisu, PhD",
      category: "Managing Director/CEO",
      content: (
        <DummyContent
          text={`Dr. Sirajo Salisu is a thoroughbred banker with 16 years of experience in executive management positions in different banks. From 2009 to 2015, he served as Managing Director/CEO of Arab-Gambia Islamic Bank in The Republic of Gambia, where he recorded remarkable achievements. In 2016, Dr. Salisu returned to Nigeria and joined Jaiz Bank Plc, where he served as Pioneer Regional Manager (South), Chief Risk Officer (CRO), Executive Director (Business Development), and was subsequently appointed Managing Director/CEO in August 2022.  
      Overall, he has 31 years of practical banking experience with an extensive understanding of the non-interest banking space.  
      He holds a BSc in Economics, an MSc in (Monetary) Economics, and a PhD in (Agricultural) Economics. He also holds a second master's degree in Islamic Banking and Finance. In addition, Dr Salisu is a Certified Risk Manager (CRM), a Fellow of the Institute of Credit Administration (FICA), and an Honorary Senior Member of the Chartered Institute of Bankers of Nigeria (CIBN). He is also an Alumnus of the Lagos Business School (LBS), Nigeria, and Madinah Institute for Leadership and Entrepreneurship (MILE) in the Kingdom of Saudi Arabia.`}
        />
      ),
      src: "/directors/MD.jpeg",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/company/summitbankng"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ]
    },
    {
      title: "Mukhtar Adam, PhD",
      category: "Executive Director/COO",
      content: (
        <DummyContent
          text={`Mukhtar Adam is a Co-Founder and Executive Director at Summit Bank. Prior to this role, he served as the Group Chief Financial Officer (CFO) of Zenith Bank Plc and in 2023 he was recognized as the All Africa CFO of the year. Before joining Zenith Bank in 2007, he honed his skills as a Senior Consultant in the Financial Services Group of PricewaterhouseCoopers (PwC).  
      His vast expertise spans numerous financial areas, from financial sector management and policy analysis to financial reporting and analysis, tax management, audit management, strategy development and execution, risk management, and financial advisory.  
      Mukhtar Adam has participated in several executive programs at world-leading institutions, including Harvard, Wharton, INSEAD, LSE, and MIT. He holds a PhD in Finance from Leeds Beckett University, an MSc in Finance from the University of London, an MBA in Finance from the University of Leicester, and a B.Ed. in Social Sciences from the University of Cape Coast in Ghana. He is a fellow/member of ICAN, ICAG, CITN, and other professional bodies.`}
        />
      ),
      src: "/directors/ED.jpeg",
       linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/in/mukhtar-adam-phd-69a05821/"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ]
    },
    {
      title: "Aisha Bello",
      category: "Non-Executive Director",
      content: (
        <DummyContent
          text={`Aisha Bello is a seasoned banker with extensive operational banking experience across the sector and a keen eye for numbers. She served as a Deputy General Manager at Zenith Bank and First Bank of Nigeria, and was the pioneer MD/CEO of I-Care Microfinance Bank Limited, Nigeria’s first non-interest MFB. Overall, she has over 30 years of banking experience.  
      She holds a B.Sc. in Accounting, an MBA, and a Professional Certificate in Islamic Banking and Finance from the International Institute of Islamic Banking and Finance, Bayero University, Kano.`}
        />
      ),
      src: "/directors/AISHA.jpeg",
       linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/company/summitbankng"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ]

    },
    {
      title: "Asmau Nana Babah",
      category: "Independent Non-Executive Director",
      content: (
        <DummyContent
          text={`Asmau Nana Babah has 28 years of banking experience with the Central Bank of Nigeria (CBN), across Corporate Strategy, Strategy & Performance Departments, and also served as Branch Controller. She also worked as a State Counsel in the Ministry of Justice, Sokoto.  
      Her expertise includes strategic management, operations risk management, policy formulation, and banking operations.  
      She holds an LLB from Bayero University, an LLM from Ahmadu Bello University, and a Diploma in Business Continuity Management from Coventry University.`}
        />
      ),
      src: "/directors/ASMAU1.jpg",
       linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/in/asma-u-nana-babah-mbci-miiba-33b40539/"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ]
    },
    {
      title: "Basit Adekunle Olawoyin",
      category: "Independent Non-Executive Director",
      content: (
        <DummyContent
          text={`Basit Adekunle Olawoyin has close to two decades of experience in Energy, Project Finance, Banking, Public-Private Partnerships, Corporate Law, and Compliance.  
      He holds an LLM specializing in Credit Transactions, Taxation, and Energy from the University of Lagos and a Law degree from the University of Ilorin.  
      He previously held senior legal roles at Eat ‘N’ Go Ltd, BOI Investments & Trust, Eximia Legal Consultants, and BGL Plc. Basit currently leads The Transaction Experts LP, advising on power sector projects in Nigeria.`}
        />
      ),
      src: "/directors/Basit2.jpeg",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/in/basit-olawoyin-56813813/"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ]
    },
    {
      title: "Seidu Adebowale John",
      category: "Independent Non-Executive Director",
      content: (
        <DummyContent
          text={`Seidu John Adebowale has over 25 years of experience in financial services, including 14 years in banking and 11 years in accounting and consultancy.  
      He holds an MBA, an MPhil, and a PhD in Strategic Marketing, plus a Professional Certificate in Islamic Banking and Finance.  
      He is a Fellow of ICAN, CITN, and holds multiple certifications including CRISC, CRM, and CFAt.`}
        />
      ),
      src: "/directors/SEIDU.jpeg",
      linkedIn: [
        { label: "Personal Profile", url: "https://www.linkedin.com/in/adebowale-seidu-ph-d-fca-fcti-crisc-crm-mciod-5930b253/"},
        {label: "Summit Bank", url: "https://www.linkedin.com/company/summitbankng"}
      ]
    },
  ];

  const cards = directors.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div>
      {beyondNumbers}
      <div className="mt-[-50px]" id="board-anchor">
        <SectionHero
          subtitle={"Meet The Board"}
          customClass={" !text-2xl md:!text-3xl lg:!text-4xl !leading-[1.3]"}
        />
      </div>
      <Suspense fallback={<p className="text-center">Loading board members...</p>}>
        <Carousel items={cards} />
      </Suspense>
    </div>
  );
}
