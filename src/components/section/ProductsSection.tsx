
"use client";
import React from "react";
import FeaturesCard from "../cards/FeaturesCard";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation";

//Open Account Button

interface FeatureItem {
  title: string;
  text: string;
  icon?: string;
  link?: string;
}

interface ProductsSectionProps {
  features: FeatureItem[];
}

export default function ProductsSection({ features }: ProductsSectionProps) {
  return (
    <section className="w-full max-w-7xl px-6 mx-auto mt-12">
      <div className="flex justify-center gap-6 overflow-x-auto pb-4">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl border-t-4 border-[#C6B17D] shadow-md hover:shadow-lg transition-all duration-300 min-w-[340px] max-w-md"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-[#0A1E42] mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {item.text}
            </p>

            {item.link && (
              <div className="relative inline-block">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#AF1F23] hover:bg-[#b99f5f] rounded-md transition-colors"
                >
                  Open Account Online
                </a>

                {/* 🔥 Pulsing Coming Soon Badge */}
                <motion.span
                  className="absolute -top-2 -left-2 bg-[#AF1F23] text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow"
                  animate={{
                    scale: [0.9, 1, 0.9],   // pulsing
                    opacity: [0.7, 1, 0.7], // subtle fade
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Coming Soon
                </motion.span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}