"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

function formatCurrencyFull(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
}

export default function CalculatorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentEarnings, setCurrentEarnings] = useState(5000);

  const multiplier = currentEarnings < 5000 ? 5 : currentEarnings < 15000 ? 4 : 3;
  const projectedGross = currentEarnings * multiplier;
  const onlyFansFee = projectedGross * 0.2;
  const netAfterOF = projectedGross - onlyFansFee;
  const elatedFee = netAfterOF * 0.2;
  const creatorTakeHome = netAfterOF - elatedFee;

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentEarnings(Number(e.target.value));
    },
    []
  );

  const sliderPercent = (currentEarnings / 50000) * 100;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="calculator">
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gold-500/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Earnings Calculator
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            See Your <span className="gradient-text">Potential</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            Slide to enter your current monthly earnings and see what you could
            be making with Elated.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-10">
            {/* Current Earnings Slider */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-dark-300">
                  Your Current Monthly Earnings
                </label>
                <motion.span
                  key={currentEarnings}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-white"
                >
                  {formatCurrencyFull(currentEarnings)}
                </motion.span>
              </div>

              {/* Custom Slider */}
              <div className="relative mt-6">
                <div className="relative h-2 rounded-full bg-dark-800">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                    style={{ width: `${sliderPercent}%` }}
                    layout
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={500}
                  value={currentEarnings}
                  onChange={handleSliderChange}
                  className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
                  style={{ top: 0 }}
                />
                {/* Thumb indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${sliderPercent}%`, top: 4 }}
                >
                  <div className="h-5 w-5 rounded-full border-2 border-gold-400 bg-dark-950 shadow-[0_0_10px_rgba(197,165,90,0.3)]" />
                </div>
              </div>

              <div className="mt-2 flex justify-between text-xs text-dark-600">
                <span>$0</span>
                <span>$25K</span>
                <span>$50K</span>
              </div>
            </div>

            {/* Results Breakdown */}
            <div className="space-y-4 border-t border-white/5 pt-8">
              {/* Projected Gross */}
              <div className="flex items-center justify-between rounded-xl bg-gold-500/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/10">
                    <svg className="h-4 w-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Projected Gross Revenue
                    </div>
                    <div className="text-xs text-dark-500">
                      {multiplier}x growth with Elated
                    </div>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={projectedGross}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-xl font-bold gradient-text"
                  >
                    {formatCurrencyFull(projectedGross)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* OnlyFans Fee */}
              <div className="flex items-center justify-between rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                    <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-dark-300">
                      OnlyFans Platform Fee
                    </div>
                    <div className="text-xs text-dark-500">20% of gross</div>
                  </div>
                </div>
                <motion.div
                  key={onlyFansFee}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-base font-semibold text-red-400/80"
                >
                  -{formatCurrencyFull(onlyFansFee)}
                </motion.div>
              </div>

              {/* Elated Fee */}
              <div className="flex items-center justify-between rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blush-500/10">
                    <svg className="h-4 w-4 text-blush-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-dark-300">
                      Elated Management Fee
                    </div>
                    <div className="text-xs text-dark-500">
                      20% of net (after OF fee)
                    </div>
                  </div>
                </div>
                <motion.div
                  key={elatedFee}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-base font-semibold text-blush-400/80"
                >
                  -{formatCurrencyFull(elatedFee)}
                </motion.div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

              {/* Creator Take-Home */}
              <div className="flex items-center justify-between rounded-2xl border border-gold-500/20 bg-gold-500/5 p-5">
                <div>
                  <div className="text-base font-semibold text-white">
                    Your Monthly Take-Home
                  </div>
                  <div className="text-xs text-dark-400">
                    vs {formatCurrencyFull(currentEarnings)} current
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={creatorTakeHome}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-3xl font-bold gradient-text sm:text-4xl"
                  >
                    {formatCurrencyFull(creatorTakeHome)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Increase badge */}
              {currentEarnings > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                    {formatCurrencyFull(creatorTakeHome - currentEarnings)} more
                    per month ({((creatorTakeHome / currentEarnings - 1) * 100).toFixed(0)}% increase)
                  </span>
                </motion.div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link
                href="/apply"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(197,165,90,0.4)] hover:-translate-y-1"
              >
                <span className="relative z-10">Start Earning More</span>
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
