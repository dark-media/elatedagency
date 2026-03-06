"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="cta">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,165,90,0.08)_0%,_transparent_70%)]" />
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-gold-500/[0.04] blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blush-500/[0.04] blur-[100px]" />

      {/* Animated gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8" ref={ref}>
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[400px] w-[400px] rounded-full border border-gold-500/10 sm:h-[500px] sm:w-[500px]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[550px] w-[550px] rounded-full border border-gold-500/5 sm:h-[650px] sm:w-[650px]" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Your Time Is Now
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to Transform Your{" "}
            <span className="gradient-text">OnlyFans Career?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dark-300">
            Join 500+ creators who have unlocked their true earning potential.
            The application takes less than 2 minutes and there is no commitment
            required.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <Link
              href="/apply"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-10 py-5 text-lg font-bold text-dark-950 shadow-[0_0_40px_rgba(197,165,90,0.3)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(197,165,90,0.5)] hover:-translate-y-1"
            >
              <span className="relative z-10">Apply Now</span>
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

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8"
          >
            <span className="flex items-center gap-2 text-sm text-dark-500">
              <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Takes less than 2 minutes
            </span>
            <span className="flex items-center gap-2 text-sm text-dark-500">
              <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No commitment required
            </span>
            <span className="flex items-center gap-2 text-sm text-dark-500">
              <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cancel anytime
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
