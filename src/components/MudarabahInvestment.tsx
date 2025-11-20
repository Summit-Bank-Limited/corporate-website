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
      icon: DollarSign,
      text: "Profit Sharing",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="w-full py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)] via-white to-[var(--light-blue)] opacity-50" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--secondary-color)] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary-color)] opacity-5 rounded-full blur-3xl" />

      <div className="main relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[var(--secondary-color)]/10"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-[var(--primary-color)]/30">
                <Framer animation={slideUp(0.2)}>
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] rounded-full text-sm font-semibold">
                      Business Investment
                    </span>
                  </div>
                </Framer>

                <Framer animation={slideUp(0.3)}>
                  <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-[var(--brown-color)]">
                    Summit MTD
                    <span className="block text-[var(--secondary-color)]">
                      (Mudarabah)
                    </span>
                  </h2>
                </Framer>

                <Framer animation={slideUp(0.4)}>
                  <p className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed">
                    Grow your business wealth ethically through{" "}
                    <span className="font-semibold text-[var(--secondary-color)]">
                      profit-sharing investments
                    </span>
                    . A Shariah-compliant alternative to fixed deposits with
                    competitive returns.
                  </p>
                </Framer>

                {/* Key Features Grid */}
                <Framer animation={slideUp(0.5)}>
                  <div className="grid grid-cols-2 gap-4 mb-8">
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
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/60 hover:bg-white transition-all duration-300 shadow-sm"
                        >
                          <div className={`p-2 rounded-lg bg-[var(--primary-color)] ${feature.color}`}>
                            <Icon size={20} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
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
                    custom="!px-8 !py-4 !text-lg !font-semibold group hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Explore MTD Investment</span>
                    <ArrowRight 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                      size={20} 
                    />
                  </Button>
                </Framer>

                {/* Trust Badge */}
                <Framer animation={slideUp(0.7)}>
                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                    <Shield size={16} className="text-[var(--secondary-color)]" />
                    <span>Minimum Investment: N500,000</span>
                  </div>
                </Framer>
              </div>

              {/* Right Side - Visual */}
              <div className="relative bg-gradient-to-br from-[var(--secondary-color)]/5 to-[var(--secondary-color)]/10 p-8 lg:p-12 flex items-center justify-center">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-32 h-32 border-4 border-[var(--secondary-color)] rounded-full" />
                  <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-[var(--secondary-color)] rounded-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-[var(--secondary-color)] rounded-full" />
                </div>

                {/* Main Visual Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative z-10"
                >
                  <div className="relative">
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
                      className="w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-full bg-gradient-to-br from-[var(--secondary-color)] to-[var(--secondary-color)]/70 flex items-center justify-center shadow-2xl"
                    >
                      <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white flex items-center justify-center">
                        <TrendingUp 
                          size={64} 
                          className="text-[var(--secondary-color)]" 
                        />
                      </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-lg border-2 border-[var(--secondary-color)]/20"
                    >
                      <DollarSign size={24} className="text-green-600" />
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, 20, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                      className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-lg border-2 border-[var(--secondary-color)]/20"
                    >
                      <Shield size={24} className="text-[var(--secondary-color)]" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Stats Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-[var(--secondary-color)]/20"
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Ethical Investment</p>
                    <p className="text-lg font-bold text-[var(--secondary-color)]">
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

