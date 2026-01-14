"use client";

import React from "react";
import Framer from "../Framer";
import { fadeIn, fadeInLetters, slideUp } from "@/lib/animation";
import Button from "../Button";
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Clock, DollarSign, HandCoinsIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MTDHeroInterface {
  title: string;
  text: string;
  onApplyClick: () => void;
}

export default function MTDHero({
  title,
  text,
  onApplyClick,
}: MTDHeroInterface) {
  const features = [
    {
      icon: Shield,
      text: "Shariah Compliant",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: TrendingUp,
      text: "Higher Returns",
      color: "text-green-600",
    },
    {
      icon: Clock,
      text: "Flexible Tenure",
      color: "text-blue-600",
    },
    {
      icon: HandCoinsIcon,
      text: "Profit Sharing",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <div
        className="h-[800px] pt-20 py-10 max-h-[900px] lg:h-screen overflow-hidden w-screen bg-cover relative bg-[var(--primary-color)]"
        style={{
          backgroundImage: `url('/main-hero-bg.png')`,
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        
        <div className="main pt-10 text-center flex items-center justify-center h-full relative z-10">
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex items-center flex-col lg:w-[700px] mx-auto justify-center space-y-7">
              {/* Animated Title */}
              <div className="flex flex-wrap justify-center gap-x-3">
                {title?.split(" ").map((char: string, i: number) => (
                  <div key={i}>
                    <Framer animation={fadeInLetters(i)}>
                      <h1 className="text-white drop-shadow-lg font-bold">{char}</h1>
                    </Framer>
                  </div>
                ))}
              </div>

              {/* Description */}
              <Framer animation={fadeIn("up", 0.3)}>
                <p className="lg:w-[600px] text-lg lg:text-xl text-black drop-shadow-md">
                  {text}
                </p>
              </Framer>

              {/* Feature Badges */}
              <Framer animation={slideUp(0.5)}>
                <div className="flex flex-wrap justify-center gap-3 lg:gap-4 pt-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full border-2 border-white shadow-lg"
                      >
                        <Icon size={18} className={feature.color} />
                        <span className="text-sm font-semibold text-gray-800 drop-shadow-sm">
                          {feature.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </Framer>

              {/* CTA Button */}
              <Framer animation={slideUp(0.7)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-4"
                >
                  <Button
                    type="primary"
                    buttonFn={onApplyClick}
                    custom="!px-10 !py-5 !text-xl !font-bold group relative overflow-hidden shadow-2xl hover:shadow-[var(--secondary-color)]/50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Apply Now
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight 
                          size={24} 
                          className="group-hover:translate-x-1 transition-transform duration-300" 
                        />
                      </motion.div>
                    </span>
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </Button>
                </motion.div>
              </Framer>

              {/* Trust Indicators */}
              <Framer animation={slideUp(0.8)}>
                <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 pt-4 text-sm">
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span>Minimum: N1,000,000</span>
                  </div>
                  <div className="hidden lg:block w-1 h-1 bg-white/40 rounded-full" />
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span>Seamless Process</span>
                  </div>
                  <div className="hidden lg:block w-1 h-1 bg-white/40 rounded-full" />
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span>Secure & Safe</span>
                  </div>
                </div>
              </Framer>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 lg:right-20 opacity-20"
        >
          <TrendingUp size={60} className="text-white" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-20 left-10 lg:left-20 opacity-20"
        >
          {/* <DollarSign size={60} className="text-white" /> */}
        </motion.div>
      </div>
    </div>
  );
}

