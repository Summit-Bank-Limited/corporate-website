import SectionHero from "@/components/generalHero/SectionHero";
import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";

export default function Atms() {
  const offices = [
    {
      state: "FCT ABUJA",
      locationType: "Head Office",
      address: "5 Amal Pepple Street, Off Ameyo Adadevoh Way, Jahi, Abuja.",
      phone: "+234 (0) 700 700 0005",
      email: "contact@summitbankng.com",
    },
    {
      state: "FCT ABUJA",
      locationType: "Wuse 2, Flagship Branch",
      address: "Plot 1173 Adetokunbo Ademola Crescent, Wuse 2, Abuja.",
      phone: "+234 (0) 700 700 0005",
      email: "contact@summitbankng.com",
    },
    {
      state: "KADUNA",
      locationType: "Kaduna Road Branch",
      address: "5 Ahmadu Bello Way, Kaduna.",
      phone: "+234 (0) 700 700 0005",
      email: "contact@summitbankng.com",
    },
    {
      state: "KANO",
      locationType: "France Road Branch",
      address: "32-40 Home Plus Plaza, France Road, Kano.",
      phone: "+234 (0) 700 700 0005",
      email: "contact@summitbankng.com",
    },
    {
      state: "KANO",
      locationType: "Bank Road Branch",
      address: "No. 2, Bank Road, Kano State.",
      phone: "+234 (0) 700 700 0005",
      email: "contact@summitbankng.com",
    },
    {
      state: "LAGOS",
      locationType: "Liaison Office",
      address: "No. 39 Adeola Odeku Street, 3rd Floor, Victoria Island, Lagos.",
      phone: "+234 (0) 700 700 0005",
      email: "contact@summitbankng.com",
    },
  ];

  // Group by state
  const groupedOffices = offices.reduce((acc, office) => {
    if (!acc[office.state]) {
      acc[office.state] = [];
    }
    acc[office.state].push(office);
    return acc;
  }, {} as Record<string, typeof offices>);

  return (
    <DefaultLayout>
      <SectionHero
        mainClass="bg-pattern !text-white py-10 rounded-2xl"
        title="ATM Locations"
        subtitle="Summit Bank"
      />

      <section className="pt-16 pb-24 px-4 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {Object.entries(groupedOffices).map(([state, branches]) => (
            <div key={state}>
              <h2 className="text-3xl font-bold text-[var(--primary-color)] border-b border-red-300 pb-2 mb-6 uppercase tracking-wide">
                {state}
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                {branches.map((branch, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-100 dark:border-neutral-700 space-y-3 text-justify"
                  >
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                      {branch.locationType}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {branch.address}
                    </p>
                    <p>
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-neutral-800 dark:text-neutral-100 hover:text-[var(--secondary-color)] transition"
                      >
                        {branch.phone}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`mailto:${branch.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {branch.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div> 
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}

