// src/app/summitblog/press-release/page.tsx
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Link from "next/link";
import React from "react";

// Example summit insights data
const summitInsights = [
  
  // {
  //   title: "Summit Bank MD Discusses Non-Interest Banking on Arise TV",
  //   date: "November 12, 2025",
  //   summary:
  //     "Dr. Sirajo Salisu, Managing Director/Chief Executive Office of Summit Bank Ltd, granted an interview to Arise TV on Wednesday 12 November 2025.",
  //   slug: "md-arise-tv-interview",
  // },  
  
  {
    title: "Moments of Celebration and the Values that Shape Tomorrow",
    date: "May, 2026",
    summary:
      "In the last week of May 2026, two important moments came together in a way that deserves reflection. They remind us of responsibility, compassion, and a better way to build prosperity.",
    slug: "moments-of-celebration",
  },
  {
    title: "What Non-Interest Banking Really Means",
    date: "May, 2026",
    summary:
      "Summit Bank is helping drive this transformation by making non-interest banking more accessible, transparent, and customer-centric, with a strong focus on ethical finance, meaningful partnerships, and sustainable long-term growth.",
    slug: "what-is-non-interest-banking",
  },
//   {
//     title: "Summit Bank MD Talks About Non-Interest Banking in a Vanguard Interview",
//     date: "January, 2026",
//     summary:
//       "Dr. Sirajo Salisu, Summit Bank’s Managing Director/Chief Executive Officer, granted an interview Vanguard Newspaper in January 2026.",
//     slug: "md-vanguard-interview",
//   },
//   {
//     title: "Summit Bank Leadership Consolidates Regional Ties with Courtesy Visit to Emir of Kano",
//     date: "December 16, 2026",
//     summary:
//       "The management and board of Summit Bank Limited, led by Chairman Umar Shuaib Ahmed, MD/CEO Dr. Sirajo Salisu, and ED/COO Dr. Mukhtar Adam, paid a high-profile courtesy visit to the Emir of Kano, His Royal Highness Muhammadu Sanusi II, at his palace on 16th December 2025. ",
//     slug: "emir-of-kano-visit",
//   },
];

// Helper to get a short content preview
function getPreview(content: string, maxLength = 120) {
  if (!content) return "";
  return content.length > maxLength ? content.slice(0, maxLength) + "..." : content;
}

export default function SummitInsightsPage() {
  return (
    <DefaultLayout>
      <SectionHero
        mainClass="bg-pattern !text-white py-10 rounded-2xl"
        title="Summit Insights"
        subtitle="Stay Updated with Summit Bank"
      />

      <section className="pt-16 pb-24 px-4 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 gap-10">
            {summitInsights.map((insight) => (
              <div
                key={insight.slug}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-100 dark:border-neutral-700 space-y-3"
              >
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-500">{insight.date}</p>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {getPreview(insight.summary)}
                </p>
                <Link
                  href={`/summitblog/summit-insights/${insight.slug}`}
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

