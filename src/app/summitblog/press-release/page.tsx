// src/app/summitblog/press-release/page.tsx
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Link from "next/link";
import React from "react";

// Example press releases data
const pressReleases = [
  
  
  
  // {
  //   title: "Summit Bank MD Discusses Non-Interest Banking on Arise TV",
  //   date: "November 12, 2025",
  //   summary:
  //     "Dr. Sirajo Salisu, Managing Director/Chief Executive Office of Summit Bank Ltd, granted an interview to Arise TV on Wednesday 12 November 2025.",
  //   slug: "md-arise-tv-interview",
  // },
  {
    title: "Summit Bank Confirms CBN Capital Requirement, Looks Ahead with Firm Vision",
    date: "January, 2026",
    summary:
      "With the Central Bank of Nigeria’s (CBN) updated recapitalisation deadline of 31 March 2026, Summit Bank has confirmed that it has fully met its capital requirement, positioning the bank in strong compliance with the CBN’s objective of strengthening financial stability within the Nigerian banking sector.",
    slug: "cbn-capital-requirement",
  },
  {
    title: "Summit Bank MD Talks About Non-Interest Banking in a Vanguard Interview",
    date: "January, 2026",
    summary:
      "Dr. Sirajo Salisu, Summit Bank’s Managing Director/Chief Executive Officer, granted an interview Vanguard Newspaper in January 2026.",
    slug: "md-vanguard-interview",
  },
  {
    title: "Summit Bank Leadership Consolidates Regional Ties with Courtesy Visit to Emir of Kano",
    date: "December 16, 2026",
    summary:
      "The management and board of Summit Bank Limited, led by Chairman Umar Shuaib Ahmed, MD/CEO Dr. Sirajo Salisu, and ED/COO Dr. Mukhtar Adam, paid a high-profile courtesy visit to the Emir of Kano, His Royal Highness Muhammadu Sanusi II, at his palace on 16th December 2025. ",
    slug: "emir-of-kano-visit",
  },
  {
    title: "Summit Bank COO Talks About Life and Business in Punch Interview",
    date: "December, 2025",
    summary:
      "Dr. Mukhtar Adam, Summit Bank’s Executive Director/Chief Operating Officer, granted an interview to Punch newspaper in December 2025. ",
    slug: "coo-punch-interview",
  },
  {
    title: "Summit Bank MD Discusses Non-Interest Banking on Arise TV",
    date: "November 12, 2025",
    summary:
      "Dr. Sirajo Salisu, Managing Director/Chief Executive Office of Summit Bank Ltd, granted an interview to Arise TV on Wednesday 12 November 2025.",
    slug: "md-arise-tv-interview",
  }, 
 {
    title: "Summit Bank Confirms Operations, Shares Vision for Ethical, Inclusive Finance",
    date: "November 4, 2025",
    summary:
      "The management of Summit Bank Ltd, Nigeria’s newest non-interest bank, has cleared the air about its existence, operations, and direction. A few weeks ago, speculations were rife about the ownership and direction of Summit Bank, linking it to Zenith Bank,",
    slug: "ethical-inclusive-finance",
  },
  {
    title: "Summit Bank Honours Customers and Staff, Launches Mobile App to Mark CSW 2025",
    date: "October 10, 2025",
    summary:
      "Summit Bank’s mobile payment transactions hit record numbers, showing strong adoption of digital banking solutions among customers.",
    slug: "Mobile-App-Launch",
  },
  {
    title: "Summit Bank Speculated to have Links with Zenith Bank",
    date: "August 3, 2025",
    summary:
      "Shortly after Summit Bank Ltd commenced operations, some media speculations emerged stating that the new non-interest bank may have close business connection with frontline commercial bank, Zenith Bank Plc.",
    slug: "zenith-speculations",
  },
  {
    title: "Summit Bank Chooses ICSFS as Core Technology Partner",
    date: "July 2025",
    summary:
      "Summit Bank Chooses ICSFS as Core Technology Partner to Drive Digital Transformation in Nigeria.",
    slug: "summit-digital-launch",
  },


];

// Helper to get a short content preview
function getPreview(content: string, maxLength = 120) {
  if (!content) return "";
  return content.length > maxLength ? content.slice(0, maxLength) + "..." : content;
}

export default function PressReleasesPage() {
  return (
    <DefaultLayout>
      <SectionHero
        mainClass="bg-pattern !text-white py-10 rounded-2xl"
        title="Press Releases"
        subtitle="Stay Updated with Summit Bank"
      />

      <section className="pt-16 pb-24 px-4 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 gap-10">
            {pressReleases.map((release) => (
              <div
                key={release.slug}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-100 dark:border-neutral-700 space-y-3"
              >
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  {release.title}
                </h3>
                <p className="text-sm text-gray-500">{release.date}</p>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {getPreview(release.summary)}
                </p>
                <Link
                  href={`/summitblog/press-release/${release.slug}`}
                  className="text-[var(--secondary-color)] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

