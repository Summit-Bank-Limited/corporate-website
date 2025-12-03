"use client";

import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const formsList = [
    {
      category: "Account Opening Forms",
      files: [
        "Account upgrade individual.pdf",
        "Account Referee.pdf",
        "Corporate account.pdf",
        "Individual account.pdf",
      ],
    },
    {
      category: "Card & Collectibles Forms",
      files: [
        "Corporate Account Collectibles.pdf",
        "GeNS Indemnity.pdf",
        "Indemnity for Retracted Card.pdf",
        "Individual Account Collectibles.pdf",
        "PIN Release.pdf",
        "Statement and Relationship letter.pdf",
        "Transaction Alert.pdf",
      ],
    },
    {
      category: "Digital Channels Forms",
      files: [
        "Corporate - Single User Registration.pdf",
        "Internet and Online Banking.pdf",
        "Transfer Limit Corporate .pdf",
        "Transfer Limit Individual.pdf",
      ],
    },
    {
      category: "General Forms",
      files: ["BVN Linking and Correction.pdf"],
    },
    {
      category: "Investment Forms",
      files: ["Investment Form.pdf"],
    },
  ];

  const allFiles = formsList.flatMap((group) => group.files);

  const searchResults = allFiles.filter((file) =>
    file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredList = formsList.map((group) => ({
    ...group,
    files: group.files.filter((f) =>
      f.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  // Function to remove ".pdf" safely
  const cleanName = (file: string) => file.replace(/\.pdf$/i, "");

  return (
    <DefaultLayout>
      <div>
        <SectionHero
          mainClass={"!pt-[50px]"}
          title="Select the Form(s) You Need"
        />

        {/* SEARCH BAR */}
        <div className="main">
          <div className="flex items-center border h-[70px] p-2 px-4 rounded-lg gap-4 lg:w-[950px] mx-auto">
            <SearchIcon size={20} color="gray" />
            <input
              className="w-full h-[70px] outline-0 focus:outline-0"
              type="search"
              placeholder="Search forms..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* SEARCH RESULTS */}
        {searchTerm.length > 0 && (
          <div className="main mt-5 bg-gray-50 p-5 rounded-lg lg:w-[950px] mx-auto shadow-sm">
            <h4 className="text-lg font-semibold mb-3">Search Results</h4>

            {searchResults.length > 0 ? (
              <ul className="space-y-3">
                {searchResults.map((file, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <img src="/pdf logo.png" alt="PDF" className="w-6 h-6" />
                    <a
                      href={`/forms/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-700 hover:underline"
                    >
                      {cleanName(file)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">Item not found</p>
            )}
          </div>
        )}

        {/* ACCORDION FOR FORM CATEGORIES */}
        <div className="main py-10 space-y-4">
          {filteredList.map((group, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <h5>{group.category}</h5>
                </AccordionTrigger>

                <AccordionContent>
                  {group.files.length > 0 ? (
                    <ul className="space-y-3">
                      {group.files.map((file, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <img
                            src="/pdf logo.png"
                            alt="PDF"
                            className="w-6 h-6"
                          />
                          <a
                            href={`/forms/${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-700 hover:underline"
                          >
                            {cleanName(file)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No matching forms.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        {/* CONTACT EMAIL FOR FORM SUBMISSION */}
        <div className="main mt-10 mb-16 text-center">
          <p className="text-gray-700 text-sm">
            For all completed form submissions, kindly send to{" "}
            <a
              href="mailto:contact@summitbank.com"
              className="text-red-700 font-semibold hover:underline"
            >
              contact@summitbankng.com 
              
            </a>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
