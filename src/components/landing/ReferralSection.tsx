"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineLink,
  HiOutlineUserPlus,
  HiOutlineBanknotes,
  HiOutlineClipboard,
  HiOutlineCheck,
} from "react-icons/hi2";
import { FaXTwitter, FaInstagram, FaTiktok } from "react-icons/fa6";

const steps = [
  {
    icon: HiOutlineLink,
    title: "Get Your Unique Link",
    description: "Join Elated and receive a personalized referral link from your dashboard.",
  },
  {
    icon: HiOutlineUserPlus,
    title: "Share With Friends",
    description: "Share your link with fellow creators. When they join through your link, you are connected.",
  },
  {
    icon: HiOutlineBanknotes,
    title: "Earn 5% Monthly",
    description: "Earn 5% of your referral's monthly net revenue for as long as they remain active.",
  },
];

function formatCurrencyFull(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
}

export default function ReferralSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [referrals, setReferrals] = useState(3);
  const [avgRevenue, setAvgRevenue] = useState(10000);
  const [copied, setCopied] = useState(false);

  const referralEarnings = referrals * avgRevenue * 0.05;

  const handleCopyLink = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 section-gradient" id="referrals">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-gold-500/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Referral Program
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Earn <span className="gradient-text">5%</span> on Every Referral
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            Know a creator who could benefit from Elated? Share your referral link
            and earn 5% of their monthly net revenue. No cap, no limit, forever.
          </p>
        </motion.div>

        {/* How It Works Steps */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-gold-500/20 to-transparent sm:block" />
              )}

              <div className="relative inline-flex rounded-2xl border border-gold-500/20 bg-gold-500/5 p-4 transition-all duration-500 group-hover:border-gold-500/40 group-hover:bg-gold-500/10">
                <step.icon className="h-7 w-7 text-gold-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dark-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Referral Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
            <h3 className="text-lg font-semibold text-white text-center mb-6">
              Calculate Your Referral Earnings
            </h3>

            {/* Number of Referrals */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-dark-300">
                  Number of Referrals
                </label>
                <span className="text-lg font-bold text-white">{referrals}</span>
              </div>
              <div className="relative">
                <div className="relative h-2 rounded-full bg-dark-800">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                    style={{ width: `${(referrals / 20) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={referrals}
                  onChange={(e) => setReferrals(Number(e.target.value))}
                  className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${(referrals / 20) * 100}%`, top: 4 }}
                >
                  <div className="h-4 w-4 rounded-full border-2 border-gold-400 bg-dark-950" />
                </div>
              </div>
            </div>

            {/* Average Revenue Per Referral */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-dark-300">
                  Avg Revenue Per Referral
                </label>
                <span className="text-lg font-bold text-white">
                  {formatCurrencyFull(avgRevenue)}/mo
                </span>
              </div>
              <div className="relative">
                <div className="relative h-2 rounded-full bg-dark-800">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blush-500 to-blush-400"
                    style={{ width: `${(avgRevenue / 50000) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={1000}
                  value={avgRevenue}
                  onChange={(e) => setAvgRevenue(Number(e.target.value))}
                  className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${(avgRevenue / 50000) * 100}%`, top: 4 }}
                >
                  <div className="h-4 w-4 rounded-full border-2 border-blush-400 bg-dark-950" />
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-5 text-center">
              <div className="text-sm text-dark-400">
                Your Monthly Referral Earnings
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={referralEarnings}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-2 text-4xl font-bold gradient-text"
                >
                  {formatCurrencyFull(referralEarnings)}
                  <span className="text-lg text-dark-400">/mo</span>
                </motion.div>
              </AnimatePresence>
              <div className="mt-1 text-xs text-dark-500">
                {formatCurrencyFull(referralEarnings * 12)}/year in passive income
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-6">
              <div className="text-center text-xs text-dark-500 mb-3">
                Share your referral link
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-dark-300 transition-all duration-300 hover:border-gold-500/30 hover:text-white"
                >
                  {copied ? (
                    <>
                      <HiOutlineCheck className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineClipboard className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-dark-400 transition-all duration-300 hover:border-gold-500/30 hover:text-white">
                  <FaXTwitter size={14} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-dark-400 transition-all duration-300 hover:border-gold-500/30 hover:text-white">
                  <FaInstagram size={14} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-dark-400 transition-all duration-300 hover:border-gold-500/30 hover:text-white">
                  <FaTiktok size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/apply"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(197,165,90,0.4)] hover:-translate-y-1"
          >
            <span className="relative z-10">Join & Get Your Referral Link</span>
            <svg
              className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
