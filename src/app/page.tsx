import Banner from "@/components/Banner";
import Faq from "@/components/faq/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HeroCarousel from "@/components/HeroCarousel";
import IslamicFinances from "@/components/IslamicFinances";
import DefaultLayout from "@/components/layout/DefaultLayout";
import ProductsSection from "@/components/ProductsSection";
import RewardsSection from "@/components/RewardsSection";
import GenericSection from "@/components/section/GenericSection";
// import MudarabahInvestment from "@/components/MudarabahInvestment";

export default function Home() {
  const loanSection = {
    // title: "Apply for Summit Instant Facility and Transform your Financial Life!",
    // text: "Get up to Millions in business finance from Summit Bank at the best industry rate.",
    // button: false,
    // buttontext: "",
    // image: "/pages-section/loan.png",
    // customClass: "p-5 lg:p-10 rounded-2xl bg-[var(--inert-color)]",
  };
  return (
    <div className=" ">
      <DefaultLayout>
        <HeroCarousel />
        {/* <MudarabahInvestment /> */}
        <ProductsSection />
        <Features />
        <IslamicFinances />
        {/* <RewardsSection /> */}
        <Banner />
          <Faq  amount={3}/>
      </DefaultLayout>
    </div>
  );
}
