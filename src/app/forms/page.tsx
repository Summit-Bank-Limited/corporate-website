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

  // Flatten ALL files for search results
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

  return (
    <DefaultLayout>
      <div>
        <SectionHero mainClass={"!pt-[50px]"} title="Select the Form(s) You Need" />

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

        {/* SEARCH RESULTS LIST */}
        {searchTerm.length > 0 && (
          <div className="main mt-5 bg-gray-50 p-5 rounded-lg lg:w-[950px] mx-auto shadow-sm">
            <h4 className="text-lg font-semibold mb-3">Search Results</h4>

            {searchResults.length > 0 ? (
              <ul className="list-disc ml-5 space-y-2">
                {searchResults.map((file, i) => (
                  <li key={i}>
                    <a
                      href={`/forms/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline"
                    >
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">Item not found</p>
            )}
          </div>
        )}

        {/* ACCORDION SECTION */}
        <div className="main py-10 space-y-4">
          {filteredList.map((group, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <h5>{group.category}</h5>
                </AccordionTrigger>

                <AccordionContent>
                  {group.files.length > 0 ? (
                    <ul className="list-disc ml-5 space-y-2">
                      {group.files.map((file, i) => (
                        <li key={i}>
                          <a
                            href={`/forms/${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 hover:underline"
                          >
                            {file}
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
      </div>
    </DefaultLayout>
  );
}
