"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "./Button";
import { ArrowRight, ChevronRight, Search, X, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import Hamburger from "hamburger-react";
import Framer from "./Framer";
import { fadeInLetters, slideUp } from "@/lib/animation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { MainHeader } from "./main-header/main-header";
import { BsTwitterX } from "react-icons/bs";
import {
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTiktokFill,
} from "react-icons/ri";
import { SiFacebook } from "react-icons/si";
import { color, motion } from "framer-motion";
import { getCloudinaryUrl } from "@/lib/utils";

export default function Header({ scrollState }: { scrollState: boolean }) {
  const [isOpen, setOpen] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<any>(null);
  const pathname = usePathname();
  const openSearch = () => {
    setSearchMenu(!searchMenu);
  };
  const triggerMenu = (item: any) => {
    setMenuOpen(true);
    setCurrentMenu(item);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setCurrentMenu(null);
  };
  const handleSignin = () => {
    console.log("i clicked");
  };

  const closeMobileMenu = () => {
    setOpen(false);
    setCurrentMenu(null);
  };

  const router = usePathname();

  const menuData = [
    {
      text: "About Us",
      link: "/about-us",
      subLinks: [
        {
          text: "Summit Bank",
          links: [
            {
              name: "Summit Overview",
              link: "/about-us",
              description: "Our History, Mission, and Values"
            },
            {
              name: "Our Board",
              link: "/about-us#board",
              description: "Leadership and Governance"
            }
          ]
        },

        {
          text: "Careers",
          links: [
            {
              name: "Career Opportunities",
              link: "/careers/career-opportunities",
              description: "Join Our Team"
            },
            {
              name: "Internships",
              link: "/careers/internships",
              description: "Gain Real-World Experience"
            },
          ],
        },
        // {
        //   text: "Investor Relation",
        //   links: [
        //     {
        //       name: "Annual Reports & Accounts",
        //       link: "#",
        //     },
        //     {
        //       name: "Unaudited Account",
        //       link: "#",
        //     },
        //     {
        //       name: "Audited Report",
        //       link: "#",
        //     },
        //     {
        //       name: "Notice of AGM",
        //       link: "#",
        //     },
        //     {
        //       name: "Other",
        //       link: "#",
        //     },
        //   ],
        // },
      ],
    },
    {
      text: "Personal",
      link: "/personal",
      id: 1,
      subLinks: [
        {
          text: "Accounts",
          links: [
            {
              name: "Personal Accounts",
              link: "/personal-current-account",
              description: "Current (Qard), Savings (Qard), Savings (Mudarabah)"
            },
            // {
            //   name: "Savings Accounts (Qard)",
            //   link: "/personal-savings-account",
            // },
            // {
            //   name: "Savings Account (Mudarabah)",
            //   link: "/saving-account",
            // },
          ],
        },
        {
          text: "Finance",
          links: [
            {
              name: "Summit Cost-Plus - SCP (Murabaha)",
              link: "/personal-summit-cost-plus",
            },
            {
              name: "Summit Lease to Own Finance - SLOF (Ijara)",
              link: "/personal-summit-lease",
            },
          ],
        },
        {
          text: "Investment",
          links: [
            {
              name: "Summit MTD (Mudarabah)",
              link: "/personal-summit-mtd",
            },
            {
              name: "Summit Sukuk Investments - SSI",
              link: "/personal-summit-sukuk-investments",
            },
            {
              name: "Customized Investment Plan – CIP",
              link: "/personal-customized-investment-plan",
            },
          ],
        },
      ],
    },

    {
      text: "SME",
      link: "/business",
      id: 1,
      subLinks: [
        {
          text: "Accounts",
          links: [
            {
              name: "Corporate Current Account (Qard)",
              link: "/business-corporate-account",
            },
          ],
        },
        {
          text: "Finance",
          links: [
            {
              name: "Summit Cost-Plus - SCP (Murabaha)",
              link: "/business-summit-cost-plus",
            },
            {
              name: "Summit Lease to Own Finance - SLOF (Ijara)",
              link: "/business-summit-lease",
            },
          ],
        },
        {
          text: "Investment",
          links: [
            {
              name: "Summit MTD (Mudarabah)",
              link: "/business-summit-mtd",
            },
            {
              name: "Summit Sukuk Investments - SSI",
              link: "/business-summit-sukuk-investments",
            },
            {
              name: "Customized Investment Plan – CIP",
              link: "/business-customized-investment-plan",
            },
          ],
        },
      ],
    },

    {
      text: "Corporate",
      link: "/corporate",
      id: 1,
      subLinks: [
        {
          text: "Accounts",
          links: [
            {
              name: "Corporate Current Account (Qard)",
              link: "/corporate-account",
            },
          ],
        },
        {
          text: "Finance",
          links: [
            {
              name: "Summit Cost-Plus - SCP (Murabaha)",
              link: "/corporate-summit-cost-plus",
            },
            {
              name: "Summit Lease to Own Finance - SLOF (Ijara)",
              link: "/corporate-summit-lease",
            },
          ],
        },
        {
          text: "Investment",
          links: [
            {
              name: "Summit MTD (Mudarabah)",
              link: "/corporate-summit-mtd",
            },
            {
              name: "Summit Sukuk Investments - SSI",
              link: "/corporate-summit-sukuk-investments",
            },
            {
              name: "Customized Investment Plan – CIP",
              link: "/corporate-customized-investment-plan",
            },
          ],
        },
      ],
    },

    // {
    //   text: "Products",
    //   link: "#",
    //   subLinks: [
    //     {
    //       text: "Deposit Products",
    //       link: "/deposit-products",
    //     },
    //     {
    //       text: "Financing Products",
    //       link: "/financing-products",
    //     },
    //     {
    //       text: "Trade & Working Capital Financing",
    //       link: "/trade-and-working-capital-financing",
    //     },
    //     {
    //       text: "Treasury & Investment Products",
    //       link: "/treasury-and-investment-products",
    //     },
    //     {
    //       text: "Takaful (Islamic Insurance)",
    //       link: "/takaful",
    //     },
    //     {
    //       text: "Digital & Alternative Banking Solutions",
    //       link: "/digital-and-alternative-banking-solutions",
    //     },
    //   ],
    //   id: 2,
    // },

    {
      text: "Contact",
      link: "#",
      subLinks: [
        {
          text: "",
          links: [
            {
              name: "ATM Locations",
              link: "/atms",
            },
          ]
        },
        {
          text: "",
          links: [
            {
              name: "Branch Locations",
              link: "/branches",
            },
          ]
        }

      ]
    },

    {
      text: "Help & Support",
      link: "#",
      subLinks: [
        {
          text: "",
          links: [
            {
              name: "FAQs",
              link: "/faq",
            },
          ]
        },
        // {
        //   text: "",
        //   links: [
        //     {
        //       name: "Gallery",
        //       link: "/gallery",
        //     },
        //   ]
        // },
        {
          text: "",
          links: [
            {
              name: "Complaints and Enquiries",
              link: "/contact",
            },
          ]
        }

      ]
    },


    // {
    //   text: "Help & Support",
    //   link: "#",
    //   subLinks: [
    //     {
    //       text: "FAQs",
    //       link: "/faq",
    //     },
    //     {
    //       text: "Blog",
    //       link: "/blog",
    //     },
    //     {
    //       text: "Complaints and Enquiries",
    //       link: "/contact",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="">
      {!scrollState && (
        <div className="fixed top-0 left-0 z-50 w-full bg-[var(--secondary-color)] h-[40px]">
          <div className=" flex h-full items-center justify-end main">
            <div className="socials flex lg:items-center gap-5">
              <a href="https://www.facebook.com/Summitbankng1">
                <SiFacebook size={20} color="white" />
              </a>
              <a
                href="https://x.com/SummitBankNG"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <BsTwitterX size={20} color="white" />
              </a>
              <a
                href=" https://www.instagram.com/summitbankng"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <RiInstagramFill size={20} color="white" />
              </a>
              <a
                href="https://www.linkedin.com/company/summitbankng"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <RiLinkedinBoxFill size={20} color="white" />
              </a>
              <a
                href="https://www.tiktok.com/@summitbankng"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <RiTiktokFill size={20} color="white" />
              </a>
            </div>
          </div>
        </div>
      )}
      <div
        className={` fixed  left-0 w-screen flex items-center justify-center z-50 bg-[var(--primary-color)] ${scrollState && !isOpen ? "top-0" : !scrollState && !isOpen ? 'top-[40px]' : isOpen ? "top-0" : ""
          }`}
      >
        <div
          className={`main relative  flex items-center justify-between h-[100px] transition-all duration-300 ${scrollState && "!mt-0"
            }`}
        >
          <Link href="/" className=" z-50">
            <Image
              className="h-[80px] w-[80px] object-cover"
              src={require("../../public/logo.svg")}
              height={40}
              width={40}
              alt="logo"
            />
          </Link>

          {/* <div className="hidden  links lg:flex items-center gap-10 2xl:gap-12 z-20">
          {menuData?.map((menu, index) => (
            <Framer animation={slideUp(index * 0.2)} key={index}>
              <Link
                className={` transition-all duration-300 hover:font-bold text-black ${
                  currentMenu?.text == menu?.text && "font-bold"
                } ${
                  router == menu?.link &&
                  "font-bold !text-[var(--secondary-color)] border-b-2 border-b-[var(--secondary-color)]"
                }  `}
                href={menu.link}
                onMouseOver={
                  (menu?.subLinks ?? []).length > 0
                    ? () => triggerMenu(menu)
                    : closeMenu
                }
              >
                {menu.text}
              </Link>
            </Framer>
          ))}
        </div> */}
          <MainHeader menu={menuData} />
          <a
            href="https://www.cbn.gov.ng/supervision/fi.html?id=9892"
            target="_blank"
            referrerPolicy="no-referrer"
            className={`lg:flex hidden  text-sm items-center gap-2 ${scrollState ? "text-[#898d96]" : "text-[#898d96]"
              } ${searchMenu && "hidden"}`}
          >

            <Image
              src="/logo/central-bank-of-nigeria.png"
              alt="CBN Logo"
              width={30}
              height={30}
            />
            Licensed by the Central Bank of Nigeria

            <Image
              src="/logo/NIFI.png"
              height={40}
              width={40}
              alt="nifi"
            />
          </a>
          <div className="ml-6 flex items-center gap-3">
          <Link href="https://ibank.summitbankng.com/IBS/">
            <Button type="primary" buttonFn={() => {}}>
              <span className="whitespace-nowrap">Internet Banking</span>
            </Button>
          </Link>
          
          {/* Animated Business MTD Button */}
          <Link href="/business-summit-mtd" className="relative">
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-[var(--secondary-color)] opacity-75 blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Main button */}
              <div className="relative bg-[var(--secondary-color)] text-white px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap flex items-center gap-2 shadow-lg border-2 border-white/20">
                {/* Sparkle icon with rotation */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles size={18} className="text-white" />
                </motion.div>
                
                <span className="relative z-10">Business MTD</span>
                
                {/* "New" badge */}
                <motion.span
                  className="absolute -top-2 -right-2 bg-[var(--primary-color)] text-[var(--secondary-color)] text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-[var(--secondary-color)]"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  NEW
                </motion.span>
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                  style={{
                    transform: "skewX(-20deg)",
                  }}
                />
              </div>
              
              {/* Floating particles effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[
                  { x: -15, y: -15 },
                  { x: 15, y: -10 },
                  { x: -10, y: 15 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[var(--primary-color)] rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: [0, pos.x],
                      y: [0, pos.y],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </Link>
        </div>
          {/* <div className="hidden xl:flex items-center justify-center gap-1 z-20"> */}
          {/* <Framer animation={slideUp(0.45)}>
              <Select>
                <SelectTrigger
                  className={`w-[170px] !bg-secondary-color !text-white  text-base transition-all duration-300 !h-[50px] ${
                    searchMenu && "hidden"
                  }`}
                >
                  <SelectValue className=" " placeholder="Internet Banking" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>

            </Framer> */}
          {/* <Framer animation={slideUp(0.7)}>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`h-[45px] px-4 border focus-within:outline-0 transition-all duration-500 bg-white border-r-0  rounded-lg rounded-r-none ${
                    searchMenu ? " opacity-100 w-[250px]" : "w-0 opacity-0"
                  }  `}
                />
                <Button
                  type="primary"
                  buttonFn={openSearch}
                  custom={`!px-4 hover:!px-4 ${
                    searchMenu && " rounded-l-none"
                  } `}
                >
                  <Search
                    className={`text-white transition-all duration-500 ${
                      searchMenu && "opacity-0 hidden"
                    }`}
                    color="white"
                    size={20}
                  />
                  <X
                    className={`text-white transition-all duration-500 ${
                      !searchMenu && "opacity-0 hidden"
                    }`}
                    color="white"
                    size={20}
                  />
                </Button>
              </div>
            </Framer> */}
          {/* </div> */}

          <div
            className={` z-10  rounded-xl bg-[var(--light-blue)]  min-h-[100px] w-full pt-[100px] left-0  h-0 opacity-0 transition-all duration-300  absolute pb-10 ${menuOpen
                ? "top-0 h-fit opacity-100"
                : "top-menu-exit !opacity-0 !h-0"
              }`}
            onMouseLeave={closeMenu}
          >
            <div className="w-[680px] h-fit mx-auto">
              {currentMenu?.subLinks?.map((item: any, index: number) => (
                <div key={index}>
                  {item?.links ? (
                    <div className="space-y-2">
                      {item.links.map((res: any, j: number) => (
                        <Link
                          key={j}
                          href={res?.link}
                          onClick={closeMobileMenu}
                          className="block text-black hover:font-bold"
                        >
                          - {res.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      className={`text-black flex justify-between items-center gap-3 ${router === item.link &&
                        "font-bold !text-[var(--secondary-color)]"
                        }`}
                      href={item.link}
                      onClick={closeMobileMenu}
                    >
                      - {item.text}
                    </Link>
                  )}
                </div>
              )) ?? null}
            </div>
          </div>
          {menuOpen && (
            <div
              className="overlay -z-20 fixed top-0 left-0 w-full h-full bg-black/0"
              onClick={closeMenu}
            ></div>
          )}

          {/* <div
          className={`search-modal-container right-[7%]  max-w-[1600px] z-50 flex items-center justify-between bg-[var(--light-blue)] rounded-xl p-4 ${
            searchMenu ? "search-modal-enter" : "top-menu-exit"
          } `}
        >
          <input
            type="text"
            placeholder="Search..."
            className="h-[60px] px-4 focus-within:outline-0  w-screen max-w-[1200px]"
          />
          <Button type="primary" custom={"!h-[50px]"} buttonFn={openSearch}>
            X
          </Button>
        </div> */}
          {/* <div className={searchMenu ? "overlayMenu" : "hidden"}></div> */}
          <div className=" block xl:hidden z-50">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
          {isOpen && (
            <div className="fixed xl:hidden top-0 h-full w-full bg-[var(--light-blue)] z-40 left-0">
              <div className="p-4 main lg:p-10 gap-3 pt-[130px] space-y-6">
                {menuData?.map((menu, index) => (
                  <Framer animation={slideUp(index * 0.2)} key={index}>
                    {menu?.subLinks ? (
                      <div
                        className={`w-fit text-black flex justify-between items-center gap-3 ${currentMenu?.text === menu.text && "font-bold"
                          } ${router === menu.link &&
                          "font-bold !text-[var(--secondary-color)] border-b-2 border-b-[var(--secondary-color)]"
                          }`}
                        onClick={() => {
                          if ((menu?.subLinks ?? [])?.length > 0) {
                            setCurrentMenu(menu);
                          } else {
                            closeMobileMenu();
                          }
                        }}
                      >
                        {menu.text}
                        {(menu?.subLinks ?? []).length > 0 && (
                          <ChevronRight size={20} />
                        )}
                      </div>
                    ) : (
                      <Link
                        href={menu?.link}
                        className={`w-fit text-black flex justify-between items-center gap-3 ${currentMenu?.text === menu.text && "font-bold"
                          } ${router === menu.link &&
                          "font-bold !text-[var(--secondary-color)] border-b-2 border-b-[var(--secondary-color)]"
                          }`}
                        onClick={() => {
                          if ((menu?.subLinks ?? [])?.length > 0) {
                            setCurrentMenu(menu);
                          } else {
                            closeMobileMenu();
                          }
                        }}
                      >
                        {menu.text}
                        {(menu?.subLinks ?? []).length > 0 && (
                          <ChevronRight size={20} />
                        )}
                      </Link>
                    )}

                    {currentMenu?.subLinks &&
                      currentMenu?.text === menu.text && (
                        <div className="space-y-5 py-5">
                          {currentMenu?.subLinks?.map(
                            (item: any, i: number) => (
                              <div key={i}>
                                {item?.links ? (
                                  <div className="space-y-2">
                                    {item.links.map((res: any, j: number) => (
                                      <Link
                                        key={j}
                                        href={res?.link}
                                        onClick={closeMobileMenu}
                                        className="block text-black hover:font-bold"
                                      >
                                        - {res.name}
                                      </Link>
                                    ))}
                                  </div>
                                ) : (
                                  <Link
                                    className={`text-black flex justify-between items-center gap-3 ${router === item.link &&
                                      "font-bold !text-[var(--secondary-color)]"
                                      }`}
                                    href={item.link}
                                    onClick={closeMobileMenu}
                                  >
                                    - {item.text}
                                  </Link>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </Framer>
                ))}
              </div>

              {/* Footer controls */}
              {/* <div className="flex gap-3 pt-5 items-center justify-between main">
                <Framer animation={slideUp(0.45)}>
                  <Select>
                    <SelectTrigger
                      className={`w-[170px] text-base !text-white !bg-secondary-color transition-all duration-300 !h-[50px] ${
                        searchMenu && "hidden"
                      }`}
                    >
                      <SelectValue placeholder="Internet Banking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Private</SelectItem>
                      <SelectItem value="dark">Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </Framer>

                <Framer animation={slideUp(0.7)}>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search..."
                      className={`h-[45px] px-4 border focus-within:outline-0 transition-all duration-500 bg-white border-r-0 rounded-lg rounded-r-none ${
                        searchMenu ? "opacity-100 w-[250px]" : "w-0 opacity-0"
                      }`}
                    />
                    <Button
                      type="primary"
                      buttonFn={openSearch}
                      custom={`!px-4 hover:!px-4 ${
                        searchMenu && " rounded-l-none"
                      }`}
                    >
                      <Search
                        className={`text-white transition-all duration-500 ${
                          searchMenu && "opacity-0 hidden"
                        }`}
                        size={20}
                      />
                      <X
                        className={`text-white transition-all duration-500 ${
                          !searchMenu && "opacity-0 hidden"
                        }`}
                        size={20}
                      />
                    </Button>
                  </div>
                </Framer>
              </div> */}
              <a
                href="https://www.cbn.gov.ng/supervision/fi.html?id=9892"
                target="_blank"
                referrerPolicy="no-referrer"
                className=" absolute bottom-10 flex left-10  text-sm items-center gap-2"
              >
                <Image
                  src="/logo/central-bank-of-nigeria.png"
                  height={50}
                  width={50}
                  className="rounded-full"
                  alt="cbn"
                />
                Licensed By the Central Bank of Nigeria
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
