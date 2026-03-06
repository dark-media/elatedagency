"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiCheck, HiXMark } from "react-icons/hi2";

const comparisons = [
  {
    feature: "Commission Rate",
    elated: "20%",
    others: "25-50%",
    elatedBool: null,
    othersBool: null,
  },
  {
    feature: "Contract Lock-in",
    elated: "None",
    others: "6-12 months",
    elatedBool: null,
    othersBool: null,
  },
  {
    feature: "Transparent Pricing",
    elated: null,
    others: null,
    elatedBool: true,
    othersBool: false,
  },
  {
    feature: "Real-Time Dashboard",
    elated: null,
    others: null,
    elatedBool: true,
    othersBool: false,
  },
  {
    feature: "AI-Powered Chat",
    elated: null,
    others: null,
    elatedBool: true,
    othersBool: false,
  },
  {
    feature: "24/7 Management",
    elated: null,
    others: null,
    elatedBool: true,
    othersBool: false,
  },
  {
    feature: "Cancel Anytime",
    elated: null,
    others: null,
    elatedBool: true,
    othersBool: false,
  },
  {
    feature: "Content Strategy",
    elated: null,
    others: null,
    elatedBool: true,
    othersBool: false,
  },
  {
    feature: "Revenue Analytics",
    elated: null,
    others: null,
    elatedBool: true,
    othersBool: false,
  },
];

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="compare">
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-gold-500/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            The Elated Difference
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Elated vs <span className="gradient-text">Other Agencies</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            See why top creators are switching to Elated. Better terms, better
            technology, better results.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-white/[0.06]">
              <div className="p-4 sm:p-6">
                <span className="text-sm font-medium text-dark-500">
                  Feature
                </span>
              </div>
              <div className="relative border-x border-gold-500/20 bg-gold-500/5 p-4 text-center sm:p-6">
                {/* Gold highlight */}
                <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
                <span className="text-sm font-bold text-gold-400">
                  Elated
                </span>
              </div>
              <div className="p-4 text-center sm:p-6">
                <span className="text-sm font-medium text-dark-500">
                  Others
                </span>
              </div>
            </div>

            {/* Table Body */}
            {comparisons.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                className={`grid grid-cols-3 ${
                  i < comparisons.length - 1 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                {/* Feature Name */}
                <div className="flex items-center p-4 sm:p-5">
                  <span className="text-sm text-dark-300">{row.feature}</span>
                </div>

                {/* Elated Value */}
                <div className="flex items-center justify-center border-x border-gold-500/10 bg-gold-500/[0.03] p-4 sm:p-5">
                  {row.elated ? (
                    <span className="text-sm font-semibold text-gold-400">
                      {row.elated}
                    </span>
                  ) : row.elatedBool ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <HiCheck className="h-4 w-4 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
                      <HiXMark className="h-4 w-4 text-red-400" />
                    </div>
                  )}
                </div>

                {/* Others Value */}
                <div className="flex items-center justify-center p-4 sm:p-5">
                  {row.others ? (
                    <span className="text-sm text-dark-500">{row.others}</span>
                  ) : row.othersBool ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <HiCheck className="h-4 w-4 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
                      <HiXMark className="h-4 w-4 text-red-400" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-6 text-center text-sm text-dark-500"
          >
            Based on publicly available information from competitor agencies.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
