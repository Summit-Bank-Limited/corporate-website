"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Framer from "./Framer";
import Button from "./Button";
import { slideUp, fadeIn } from "@/lib/animation";
import { ArrowRight, TrendingUp, Shield, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function MudarabahInvestment() {
  const router = useRouter();
  
  const features = [
    {
      icon: Shield,
      text: "Shariah Compliant",
      color: "text-emerald-600",
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
      icon: DollarSign,
      text: "Profit Sharing",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="w-full py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 opacity-60" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-400 opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400 opacity-10 rounded-full blur-3xl" />

      <div className="main relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-200/50"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center text-center bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/20">
                <Framer animation={slideUp(0.2)}>
                  <div className="inline-block mb-3 sm:mb-4">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold border border-emerald-200">
                      Business Investment
                    </span>
                  </div>
                </Framer>

                <Framer animation={slideUp(0.3)}>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-800 text-center">
                    Term Deposit
                  </h2>
                  <span className="mb-3 sm:mb-4 block text-emerald-600 text-base sm:text-lg lg:text-xl font-semibold text-center">
                      (Mudarabah)
                    </span>
                </Framer>

                <Framer animation={slideUp(0.4)}>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed text-center">
                    Grow your business wealth ethically through{" "}
                    <span className="font-semibold text-emerald-600">
                      profit-sharing investments
                    </span>
                    . A Shariah-compliant alternative to fixed deposits with
                    competitive returns.
                  </p>
                </Framer>

                {/* Key Features Grid */}
                <Framer animation={slideUp(0.5)}>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 w-full">
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
                          className="flex flex-col items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 ${feature.color} shadow-sm`}>
                            <Icon size={16} className="sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                            {feature.text}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </Framer>

                {/* CTA Button */}
                <Framer animation={slideUp(0.6)}>
                  <Button
                    type="primary"
                    buttonFn={() => router.push("/business-summit-mtd")}
                    custom="!px-6 sm:!px-8 !py-3 sm:!py-4 !text-base sm:!text-lg !font-semibold group hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                  >
                    <span>Explore MTD Investment</span>
                    <ArrowRight 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5" 
                    />
                  </Button>
                </Framer>

                {/* Trust Badge */}
                <Framer animation={slideUp(0.7)}>
                  <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Shield size={14} className="sm:w-4 sm:h-4 text-emerald-600" />
                    <span>Minimum Investment: N500,000</span>
                  </div>
                </Framer>
              </div>

              {/* Right Side - Visual */}
              <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 p-6 sm:p-8 lg:p-12 flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 sm:top-10 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 border-3 sm:border-4 border-emerald-300 rounded-full" />
                  <div className="absolute bottom-4 left-4 sm:bottom-20 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 border-3 sm:border-4 border-blue-300 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-40 sm:h-40 border-3 sm:border-4 border-emerald-400 rounded-full" />
                </div>

                {/* Main Visual Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative z-10 w-full flex items-center justify-center"
                >
                  <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
                    {/* Central Circle with Icon */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 flex items-center justify-center shadow-2xl relative overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeInOut",
                        }}
                        style={{
                          transform: "skewX(-20deg)",
                        }}
                      />
                      <div className="w-24 h-24 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full bg-white flex items-center justify-center shadow-inner relative z-10">
                        <TrendingUp 
                          size={32}
                          className="sm:w-16 sm:h-16 lg:w-16 lg:h-16 text-emerald-600" 
                        />
                      </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 bg-white p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg border-2 border-emerald-200/50 hover:border-emerald-300 transition-colors"
                    >
                      <DollarSign size={16} className="sm:w-6 sm:h-6 text-green-600" />
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, 15, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                      className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-white p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg border-2 border-blue-200/50 hover:border-blue-300 transition-colors"
                    >
                      <Shield size={16} className="sm:w-6 sm:h-6 text-emerald-600" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Stats Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-emerald-200/50"
                >
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Ethical Investment</p>
                    <p className="text-base sm:text-lg font-bold text-emerald-600">
                      Profit-Sharing Model
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

