// src/app/summitblog/press-release/page.tsx
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Link from "next/link";
import React from "react";

// Example press releases data
const pressReleases = [
  {
    title: "Summit Bank Chooses ICSFS as Core Technology Partner",
    date: "July 2025",
    summary:
      "Summit Bank Chooses ICSFS as Core Technology Partner to Drive Digital Transformation in Nigeria.",
    slug: "summit-digital-launch",
  },
  {
    title: "Summit Bank Speculated to have Links with Zenith Bank",
    date: "August 3, 2025",
    summary:
      "Shortly after Summit Bank Ltd commenced operations, some media speculations emerged stating that the new non-interest bank may have close business connection with frontline commercial bank, Zenith Bank Plc.",
    slug: "zenith-speculations",
  },
  {
    title: "Summit Bank Honours Customers and Staff, Launches Mobile App to Mark CSW 2025",
    date: "October 10, 2025",
    summary:
      "Summit Bank’s mobile payment transactions hit record numbers, showing strong adoption of digital banking solutions among customers.",
    slug: "Mobile-App-Launch",
  },
  {
    title: "Summit Bank Confirms Operations, Shares Vision for Ethical, Inclusive Finance",
    date: "November 4, 2025",
    summary:
      "The management of Summit Bank Ltd, Nigeria’s newest non-interest bank, has cleared the air about its existence, operations, and direction. A few weeks ago, speculations were rife about the ownership and direction of Summit Bank, linking it to Zenith Bank,",
    slug: "ethical-inclusive-finance",
  },
  {
    title: "Summit Bank MD Discusses Non-Interest Banking on Arise TV",
    date: "November 12, 2025",
    summary:
      "Dr. Sirajo Salisu, Managing Director/Chief Executive Office of Summit Bank Ltd, granted an interview to Arise TV on Wednesday 12 November 2025.",
    slug: "md-arise-tv-interview",
  },
//  {
//     title: "Summit Bank Honours Customers and Staff, Launches Mobile App to Mark CSW 2025",
//     date: "October 10, 2025",
//     summary:
//       "Summit Bank’s mobile payment transactions hit record numbers, showing strong adoption of digital banking solutions among customers.",
//     slug: "Mobile-App-Launch",
//   },
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
