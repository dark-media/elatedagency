"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const growthMultipliers = {
  new: { 3: 2.5, 6: 4.0, 12: 6.0 },
  existing: { 3: 1.8, 6: 2.5, 12: 3.5 },
};

const agencyComparisons = [
  { name: "Elated Agency", rate: 20, color: "gold" },
  { name: "Average Agency", rate: 35, color: "white" },
  { name: "Premium Agency", rate: 50, color: "white" },
];

export default function CalculatorPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000);
  const [creatorType, setCreatorType] = useState<"new" | "existing">("existing");

  const calculations = useMemo(() => {
    const ofCut = monthlyRevenue * 0.2;
    const netAfterOf = monthlyRevenue - ofCut;
    const elatedCut = netAfterOf * 0.2;
    const creatorTakeHome = netAfterOf - elatedCut;

    const multipliers = growthMultipliers[creatorType];
    const projected3 = monthlyRevenue * multipliers[3];
    const projected6 = monthlyRevenue * multipliers[6];
    const projected12 = monthlyRevenue * multipliers[12];

    const takeHome3 = projected3 * 0.8 * 0.8;
    const takeHome6 = projected6 * 0.8 * 0.8;
    const takeHome12 = projected12 * 0.8 * 0.8;

    return {
      ofCut,
      netAfterOf,
      elatedCut,
      creatorTakeHome,
      projected3,
      projected6,
      projected12,
      takeHome3,
      takeHome6,
      takeHome12,
    };
  }, [monthlyRevenue, creatorType]);

  const sliderPercentage = ((monthlyRevenue - 500) / (50000 - 500)) * 100;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44">
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-blush-400/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                <span className="text-xs font-medium tracking-wide text-gold-400">
                  EARNINGS CALCULATOR
                </span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                See Your{" "}
                <span className="gradient-text">Earning Potential</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
                Calculate how much more you could earn with professional
                management from Elated Agency. Adjust the sliders and see your
                projected growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator */}
        <section className="section-gradient relative py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-32 space-y-8">
                  {/* Creator Type Toggle */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <label className="text-sm font-semibold text-white">
                      Creator Type
                    </label>
                    <p className="mt-1 text-xs text-white/40">
                      New creators typically see faster percentage growth
                    </p>
                    <div className="mt-4 flex rounded-xl border border-white/10 bg-white/[0.02] p-1">
                      <button
                        onClick={() => setCreatorType("new")}
                        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                          creatorType === "new"
                            ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        New Creator
                      </button>
                      <button
                        onClick={() => setCreatorType("existing")}
                        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                          creatorType === "existing"
                            ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        Existing Creator
                      </button>
                    </div>
                  </div>

                  {/* Revenue Slider */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <label className="text-sm font-semibold text-white">
                      Current Monthly Revenue
                    </label>
                    <p className="mt-1 text-xs text-white/40">
                      Slide to set your current or expected monthly OnlyFans revenue
                    </p>
                    <div className="mt-6 text-center">
                      <span className="text-4xl font-bold text-gold-400">
                        {formatCurrency(monthlyRevenue)}
                      </span>
                      <span className="block text-xs text-white/40 mt-1">
                        per month
                      </span>
                    </div>
                    <div className="relative mt-6">
                      <div className="relative h-2 rounded-full bg-white/10">
                        <div
                          className="absolute h-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                          style={{ width: `${sliderPercentage}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={50000}
                        step={500}
                        value={monthlyRevenue}
                        onChange={(e) =>
                          setMonthlyRevenue(Number(e.target.value))
                        }
                        className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold-400 [&::-webkit-slider-thumb]:bg-dark-950 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(197,165,90,0.5)] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold-400 [&::-moz-range-thumb]:bg-dark-950"
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-white/30">
                      <span>$500</span>
                      <span>$50,000</span>
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <h3 className="text-sm font-semibold text-white">
                      Current Month Breakdown
                    </h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/50">Gross Revenue</span>
                        <span className="text-sm font-semibold text-white">
                          {formatCurrency(monthlyRevenue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/50">
                          OnlyFans Fee (20%)
                        </span>
                        <span className="text-sm text-red-400">
                          -{formatCurrency(calculations.ofCut)}
                        </span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/50">Net After OF</span>
                        <span className="text-sm text-white">
                          {formatCurrency(calculations.netAfterOf)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/50">
                          Elated Fee (20% of net)
                        </span>
                        <span className="text-sm text-gold-400">
                          -{formatCurrency(calculations.elatedCut)}
                        </span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">
                          You Keep
                        </span>
                        <span className="text-lg font-bold text-gold-400">
                          {formatCurrency(calculations.creatorTakeHome)}
                        </span>
                      </div>
                      <p className="text-xs text-white/30">
                        That&apos;s{" "}
                        {Math.round(
                          (calculations.creatorTakeHome / monthlyRevenue) * 100
                        )}
                        % of your gross revenue
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-8 lg:col-span-3"
              >
                {/* Projected Growth */}
                <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-b from-gold-500/5 to-transparent p-8">
                  <h3 className="text-lg font-bold text-white">
                    Projected Growth with Elated
                  </h3>
                  <p className="mt-1 text-sm text-white/40">
                    Based on average results for{" "}
                    {creatorType === "new" ? "new" : "existing"} creators
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {[
                      {
                        label: "3 Months",
                        projected: calculations.projected3,
                        takeHome: calculations.takeHome3,
                        multiplier: growthMultipliers[creatorType][3],
                      },
                      {
                        label: "6 Months",
                        projected: calculations.projected6,
                        takeHome: calculations.takeHome6,
                        multiplier: growthMultipliers[creatorType][6],
                      },
                      {
                        label: "12 Months",
                        projected: calculations.projected12,
                        takeHome: calculations.takeHome12,
                        multiplier: growthMultipliers[creatorType][12],
                      },
                    ].map((period) => (
                      <div
                        key={period.label}
                        className="rounded-xl border border-white/10 bg-dark-950/50 p-6 text-center"
                      >
                        <p className="text-sm font-medium text-gold-400">
                          {period.label}
                        </p>
                        <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                          {formatCurrency(period.projected)}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          projected monthly revenue
                        </p>
                        <div className="mt-3 rounded-lg bg-gold-500/10 px-3 py-1.5">
                          <p className="text-xs font-semibold text-gold-400">
                            You keep: {formatCurrency(period.takeHome)}
                          </p>
                        </div>
                        <p className="mt-2 text-xs text-white/30">
                          {period.multiplier}x growth
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Growth Visual */}
                  <div className="mt-8">
                    <div className="flex items-end justify-between gap-2 h-40">
                      <div className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-xs text-white/40">Now</span>
                        <div
                          className="w-full rounded-t-lg bg-white/10"
                          style={{ height: "20%" }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-xs text-white/40">3 mo</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-gold-500/40 to-gold-400/40"
                          style={{
                            height: `${Math.min(
                              (growthMultipliers[creatorType][3] /
                                growthMultipliers[creatorType][12]) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-xs text-white/40">6 mo</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-gold-500/60 to-gold-400/60"
                          style={{
                            height: `${Math.min(
                              (growthMultipliers[creatorType][6] /
                                growthMultipliers[creatorType][12]) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-xs text-gold-400 font-semibold">12 mo</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-gold-500 to-gold-400"
                          style={{ height: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agency Comparison */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                  <h3 className="text-lg font-bold text-white">
                    Commission Comparison
                  </h3>
                  <p className="mt-1 text-sm text-white/40">
                    See how much more you keep with Elated vs. other agencies
                    (based on {formatCurrency(calculations.projected6)}/mo at 6
                    months)
                  </p>

                  <div className="mt-8 space-y-6">
                    {agencyComparisons.map((agency) => {
                      const grossAtSixMonths = calculations.projected6;
                      const afterOf = grossAtSixMonths * 0.8;
                      const agencyFee = afterOf * (agency.rate / 100);
                      const takeHome = afterOf - agencyFee;
                      const barWidth = (takeHome / (grossAtSixMonths * 0.8)) * 100;

                      return (
                        <div key={agency.name}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-medium ${
                                  agency.color === "gold"
                                    ? "text-gold-400"
                                    : "text-white/50"
                                }`}
                              >
                                {agency.name}
                              </span>
                              <span className="text-xs text-white/30">
                                ({agency.rate}% commission)
                              </span>
                            </div>
                            <span
                              className={`text-sm font-bold ${
                                agency.color === "gold"
                                  ? "text-gold-400"
                                  : "text-white/60"
                              }`}
                            >
                              {formatCurrency(takeHome)}/mo
                            </span>
                          </div>
                          <div className="h-3 w-full rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${barWidth}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className={`h-3 rounded-full ${
                                agency.color === "gold"
                                  ? "bg-gradient-to-r from-gold-500 to-gold-400"
                                  : "bg-white/20"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-xl bg-gold-500/5 border border-gold-500/20 p-4">
                    <p className="text-sm text-white/60">
                      <span className="font-semibold text-gold-400">
                        You save{" "}
                        {formatCurrency(
                          calculations.projected6 *
                            0.8 *
                            (0.35 - 0.2)
                        )}
                        /month
                      </span>{" "}
                      compared to the average agency, and{" "}
                      <span className="font-semibold text-gold-400">
                        {formatCurrency(
                          calculations.projected6 *
                            0.8 *
                            (0.5 - 0.2)
                        )}
                        /month
                      </span>{" "}
                      compared to premium agencies. That adds up to{" "}
                      <span className="font-semibold text-gold-400">
                        {formatCurrency(
                          calculations.projected6 *
                            0.8 *
                            (0.35 - 0.2) *
                            12
                        )}
                      </span>{" "}
                      more in your pocket per year.
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <h4 className="mt-4 font-semibold text-white">
                      No Risk Guarantee
                    </h4>
                    <p className="mt-2 text-sm text-white/50">
                      Month-to-month contracts with no upfront fees. You only pay
                      when you earn. If we do not deliver results, you can leave
                      at any time.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </div>
                    <h4 className="mt-4 font-semibold text-white">
                      Proven Track Record
                    </h4>
                    <p className="mt-2 text-sm text-white/50">
                      Our projections are based on real data from creators in our
                      portfolio. On average, our creators see 300% revenue growth
                      within six months of joining.
                    </p>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs leading-relaxed text-white/30">
                  * Projected earnings are estimates based on average growth
                  rates observed across our creator portfolio. Individual
                  results may vary based on factors including content quality,
                  niche, posting consistency, and current audience size. Past
                  performance is not a guarantee of future results.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Ready to Start{" "}
                <span className="gradient-text">Earning More</span>?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                These numbers could be your reality. Apply today and let our
                team create a customized growth strategy for your OnlyFans.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/apply"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-10 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.5)]"
                >
                  <span className="relative z-10">Apply Now</span>
                  <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/5"
                >
                  View All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
