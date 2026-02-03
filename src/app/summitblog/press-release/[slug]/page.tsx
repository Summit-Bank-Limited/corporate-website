// src/app/summitblog/press-release/[slug]/page.tsx
import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { pressReleases } from "@/data/pressReleases";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";

interface PressReleasePageProps {
  params: Promise<{ slug: string }>;
}

export default async function PressReleasePage({ params }: PressReleasePageProps) {
  const { slug } = await params; // unwrap the promise

  const post = pressReleases.find((p) => p.slug === slug);

  if (!post) {
    notFound(); // Returns 404 if slug not found
  }

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <SectionHero
        mainClass="bg-pattern !text-white py-10 rounded-2xl"
        title="Press Release"
        subtitle={post.title}
      />

      <section className="pt-16 pb-24 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Card-style container */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-100 dark:border-neutral-700 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500">{post.date}</p>

            {/* Content with clickable links */}
            <div
              className="text-neutral-700 dark:text-neutral-300 space-y-3"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/><br/>") }}
            />

            {/* Back link */}
            <Link
              href="/summitblog/press-release"
              className="inline-block mt-4 text-[var(--secondary-color)] font-semibold hover:underline"
            >
              ← Back to Press Releases
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
