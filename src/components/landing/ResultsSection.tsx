"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  inView,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const counterStats = [
  { target: 50, prefix: "$", suffix: "M+", label: "Total Creator Revenue" },
  { target: 500, prefix: "", suffix: "+", label: "Active Creators" },
  { target: 90, prefix: "", suffix: "%", label: "Retention Rate" },
  { target: 15, prefix: "", suffix: "K", label: "Avg Monthly Revenue" },
];

const barChartData = [
  { month: "Month 1", before: 2000, after: 4500 },
  { month: "Month 2", before: 2200, after: 7200 },
  { month: "Month 3", before: 2100, after: 11000 },
  { month: "Month 4", before: 2300, after: 15000 },
  { month: "Month 5", before: 2000, after: 18500 },
  { month: "Month 6", before: 2400, after: 22000 },
];

const testimonials = [
  {
    name: "Jessica M.",
    image: "/images/elated_agency_1.jpeg",
    quote:
      "I went from $1.8K to $14K in my first three months. The AI chat management alone doubled my subscriber retention.",
    growth: "7.8x growth",
  },
  {
    name: "Sophia R.",
    image: "/images/elated_agency_3.jpeg",
    quote:
      "The content strategy team is incredible. They helped me find my niche and my revenue has grown every single month since joining.",
    growth: "5.2x growth",
  },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const maxValue = 22000;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 section-gradient" id="results">
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blush-500/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Proven Results
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Real <span className="gradient-text">Results</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            Average creators go from $2K/mo to $15K/mo in 90 days. These are not
            projections - they are real numbers from real creators.
          </p>
        </motion.div>

        {/* Animated Counter Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {counterStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center backdrop-blur-sm"
            >
              <div className="text-3xl font-bold text-gold-400 sm:text-4xl">
                <AnimatedCounter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <div className="mt-2 text-xs text-dark-400 sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Revenue Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-white">
              Revenue Growth Over Time
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-dark-500" />
                <span className="text-xs text-dark-400">Without Elated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400" />
                <span className="text-xs text-dark-400">With Elated</span>
              </div>
            </div>
          </div>

          {/* CSS Bar Chart */}
          <div className="flex items-end gap-3 sm:gap-4" style={{ height: 240 }}>
            {barChartData.map((item, i) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center gap-1" style={{ height: 200 }}>
                  {/* Before bar */}
                  <motion.div
                    className="w-[35%] max-w-[20px] rounded-t bg-dark-600"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${(item.before / maxValue) * 100}%` } : { height: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  />
                  {/* After bar */}
                  <motion.div
                    className="w-[35%] max-w-[20px] rounded-t bg-gradient-to-t from-gold-600 to-gold-400"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${(item.after / maxValue) * 100}%` } : { height: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                  />
                </div>
                <span className="text-[10px] text-dark-500 sm:text-xs">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Before/After Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gold-500/20 bg-gold-500/5 p-6 text-center sm:p-8"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <div>
              <div className="text-sm text-dark-400">Before Elated</div>
              <div className="mt-1 text-3xl font-bold text-dark-300">$2,000/mo</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20">
              <svg className="h-5 w-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gold-400">With Elated (90 days)</div>
              <div className="mt-1 text-3xl font-bold gradient-text">$15,000/mo</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-dark-400">
            Average results across 500+ active creators
          </p>
        </motion.div>

        {/* Mini Testimonials */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 + i * 0.15 }}
              className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm"
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{t.name}</span>
                  <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-400">
                    {t.growth}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-dark-400">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
