"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlinePencilSquare,
  HiOutlineCheckBadge,
  HiOutlineDocumentCheck,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

const steps = [
  {
    number: "01",
    icon: HiOutlinePencilSquare,
    title: "Apply",
    time: "2 minutes",
    description:
      "Fill out our simple application form. Tell us about your content, your audience, and your goals. No lengthy questionnaires.",
  },
  {
    number: "02",
    icon: HiOutlineCheckBadge,
    title: "Get Approved",
    time: "24 hours",
    description:
      "Our team reviews your application and gets back to you within 24 hours. We look for passion and potential, not just follower counts.",
  },
  {
    number: "03",
    icon: HiOutlineDocumentCheck,
    title: "Sign Your Contract",
    time: "Digital & instant",
    description:
      "Review and sign your transparent, no-lock-in digital contract. Everything is clear - no hidden fees, no surprises, cancel anytime.",
  },
  {
    number: "04",
    icon: HiOutlineRocketLaunch,
    title: "Watch Your Revenue Grow",
    time: "Day one",
    description:
      "Our AI and management team go to work immediately. See real results in your first week with optimized content, pricing, and engagement strategies.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="how-it-works">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[600px] w-[400px] rounded-full bg-gold-500/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Getting Started
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            From application to revenue growth in four simple steps.
            No complexity, no hassle.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mx-auto mt-20 max-w-4xl">
          {/* Connecting Line - Desktop */}
          <div className="absolute left-[39px] top-0 hidden h-full w-px bg-gradient-to-b from-gold-500/0 via-gold-500/20 to-gold-500/0 md:block" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="group relative flex flex-col gap-6 md:flex-row md:items-start"
              >
                {/* Step Number / Icon */}
                <div className="relative flex-shrink-0">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-gold-500/20 bg-dark-950 transition-all duration-500 group-hover:border-gold-500/40 group-hover:shadow-[0_0_30px_rgba(197,165,90,0.15)]">
                    <step.icon className="h-8 w-8 text-gold-400 transition-transform duration-500 group-hover:scale-110" />
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-400 text-xs font-bold text-dark-950">
                      {step.number}
                    </div>
                  </div>
                  {/* Pulse effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gold-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="flex-1 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-gold-500/10 group-hover:bg-white/[0.04] md:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <span className="inline-flex items-center rounded-full border border-gold-500/20 bg-gold-500/5 px-3 py-1 text-xs font-medium text-gold-400">
                      {step.time}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-dark-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <a
            href="/apply"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(197,165,90,0.4)] hover:-translate-y-1"
          >
            <span className="relative z-10">Start Your Application</span>
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
          </a>
        </motion.div>
      </div>
    </section>
  );
}
