"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCurrencyDollar,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineChartBarSquare,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "AI-Powered Chat",
    description:
      "Our proprietary AI handles subscriber messages 24/7, maintaining your unique voice while maximizing engagement and conversions.",
    gradient: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Revenue Optimization",
    description:
      "Dynamic pricing, smart upselling, and data-driven strategies that consistently deliver 3-10x revenue growth for our creators.",
    gradient: "from-gold-500/20 to-amber-500/20",
    iconColor: "text-gold-400",
  },
  {
    icon: HiOutlineSparkles,
    title: "Content Strategy",
    description:
      "Personalized content calendars, trending analysis, and creative direction tailored to your brand and audience.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: HiOutlineClock,
    title: "24/7 Management",
    description:
      "Round-the-clock account management ensures you never miss an opportunity. Our team works while you sleep.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: HiOutlineChartBarSquare,
    title: "Transparent Analytics",
    description:
      "Real-time dashboard with detailed earnings, subscriber analytics, and performance metrics. No hidden fees, ever.",
    gradient: "from-violet-500/20 to-indigo-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Creator-First Contracts",
    description:
      "No lock-in periods, fair 20% commission, and the freedom to leave anytime. We earn when you earn.",
    gradient: "from-gold-500/20 to-yellow-500/20",
    iconColor: "text-gold-300",
  },
];

export default function WhyElatedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 section-gradient" id="why-elated">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold-500/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400"
          >
            Why Elated
          </motion.span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why Creators Choose{" "}
            <span className="gradient-text">Elated</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            We combine cutting-edge AI technology with hands-on expertise to
            deliver unmatched results for OnlyFans creators.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/0 opacity-0 transition-all duration-500 group-hover:from-gold-500/30 group-hover:via-blush-400/20 group-hover:to-gold-500/30 group-hover:opacity-100" />

              <div className="relative rounded-2xl border border-white/[0.06] bg-dark-950/50 p-8 backdrop-blur-sm transition-all duration-500 group-hover:border-transparent group-hover:bg-dark-950/80">
                {/* Icon */}
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark-400">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent transition-all duration-500 group-hover:w-3/4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
