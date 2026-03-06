"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const services = [
  {
    title: "Account Management",
    description:
      "Our dedicated team monitors and manages your OnlyFans account around the clock. From responding to subscriber messages to optimizing your profile, we handle every detail so you can focus on creating.",
    features: [
      "24/7 account monitoring and management",
      "Profile optimization and bio copywriting",
      "Subscriber relationship management",
      "Welcome messages and auto-responses",
      "Account security and access monitoring",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Chat",
    description:
      "Our proprietary AI chatbots are trained to match your unique voice, personality, and communication style. They engage with subscribers 24/7, turning casual fans into paying supporters while you sleep.",
    features: [
      "Voice-matched AI that sounds exactly like you",
      "24/7 subscriber engagement without your involvement",
      "Intelligent upselling of PPV content",
      "Personalized conversation flows",
      "Human escalation for complex interactions",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: "Content Strategy",
    description:
      "Strategic content planning that maximizes engagement and revenue. We create data-driven content calendars, optimize posting schedules, and identify trending themes that resonate with your audience.",
    features: [
      "Custom content calendars and scheduling",
      "Data-driven posting time optimization",
      "Trend analysis and content ideation",
      "Content performance tracking",
      "A/B testing for post formats",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Revenue Optimization",
    description:
      "Maximize every dollar with our data-driven pricing strategies. We analyze subscriber behavior, optimize PPV pricing, create tip menus, and structure bundles that dramatically increase your average revenue per fan.",
    features: [
      "Dynamic subscription pricing strategy",
      "PPV content pricing optimization",
      "Custom tip menu design and optimization",
      "Bundle and discount strategy",
      "Revenue forecasting and goal setting",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Marketing & Growth",
    description:
      "Aggressive growth strategies that bring new subscribers to your page. We manage your social media presence, run cross-platform promotion campaigns, and leverage network effects to accelerate your growth.",
    features: [
      "Social media management (Twitter, Instagram, TikTok, Reddit)",
      "Cross-platform promotion strategy",
      "Collaboration and shoutout coordination",
      "Hashtag and SEO optimization",
      "Paid advertising management",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: "Analytics & Reporting",
    description:
      "Comprehensive analytics that give you complete visibility into your account performance. Our real-time dashboard tracks every metric that matters, and weekly reports keep you informed of progress and opportunities.",
    features: [
      "Real-time performance dashboard",
      "Weekly detailed performance reports",
      "Subscriber behavior analytics",
      "Revenue trend analysis",
      "Competitor benchmarking insights",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Brand Development",
    description:
      "Build a powerful personal brand that stands out in a crowded market. We help you define your niche, craft your persona, and position yourself for long-term success through strategic collaborations and brand partnerships.",
    features: [
      "Brand positioning and niche strategy",
      "Persona development and messaging",
      "Collaboration and partnership opportunities",
      "Brand identity guidelines",
      "Long-term brand growth roadmap",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "DMCA Protection",
    description:
      "Protect your content from piracy with our comprehensive DMCA monitoring and takedown service. We scan the internet 24/7 for unauthorized use of your content and issue takedown notices on your behalf.",
    features: [
      "24/7 automated piracy monitoring",
      "Rapid DMCA takedown notices",
      "Leak site monitoring and removal",
      "Content fingerprinting technology",
      "Monthly protection reports",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "What is included in your management fee?",
    a: "Everything. All eight services listed above are included in our flat 20% commission. There are no additional fees, no upsells, and no hidden charges. You get access to AI chat, content strategy, marketing, analytics, DMCA protection, brand development, revenue optimization, and dedicated account management.",
  },
  {
    q: "How quickly can you start managing my account?",
    a: "Most creators are fully onboarded within 48 to 72 hours. After you apply and are accepted, we schedule an onboarding call to understand your brand, goals, and preferences. From there, our team sets up your AI chat profile, content calendar, and marketing strategy so we can hit the ground running.",
  },
  {
    q: "Do I need a minimum subscriber count to join?",
    a: "No. We work with creators at every level, from brand new to established top earners. Our strategies and AI tools are effective regardless of your current subscriber count. In fact, newer creators often see the most dramatic percentage growth because they benefit most from professional management and optimization.",
  },
  {
    q: "Can I choose which services to use?",
    a: "Absolutely. While all services are included in your commission, you have full control over which ones we activate. Some creators prefer to handle their own social media but want us to manage chatting and analytics. Others want the full suite. We customize our approach based on your preferences.",
  },
  {
    q: "What makes your AI chat different from other agencies?",
    a: "Our AI is trained specifically on your voice, personality, and communication patterns. Unlike generic chatbots, our system learns how you speak, your favorite phrases, and your engagement style. Subscribers genuinely believe they are chatting with you, which leads to higher retention, more tips, and increased PPV sales.",
  },
];

const comparisons = [
  { label: "Commission Rate", elated: "20%", others: "25-50%" },
  { label: "Contract Length", elated: "Month-to-month", others: "6-12 months" },
  { label: "Upfront Fees", elated: "None", others: "$500-$2,000+" },
  { label: "AI-Powered Chat", elated: "Included", others: "Extra charge" },
  { label: "Real-Time Dashboard", elated: "Included", others: "Not offered" },
  { label: "DMCA Protection", elated: "Included", others: "Extra charge" },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-44">
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-blush-400/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                  WHAT WE DO
                </span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Premium OnlyFans{" "}
                <span className="gradient-text">Management Services</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
                Eight comprehensive services, one transparent commission. Everything
                you need to maximize your OnlyFans earnings while reclaiming your
                time.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/apply"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.5)]"
                >
                  <span className="relative z-10">Start Today</span>
                  <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/5"
                >
                  Calculate Earnings
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-gradient relative py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <motion.h2
                custom={0}
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Everything You Need,{" "}
                <span className="gradient-text">Nothing You Don&apos;t</span>
              </motion.h2>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="mx-auto mt-4 max-w-2xl text-white/60"
              >
                Each service is designed to work together as a complete growth
                engine for your OnlyFans career.
              </motion.p>
            </motion.div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
                  className="card-hover group rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold-500/20 bg-gold-500/5 text-gold-400 transition-all duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/60"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/20 to-dark-950" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <motion.h2
                custom={0}
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Simple, <span className="gradient-text">Transparent Pricing</span>
              </motion.h2>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="mx-auto mt-4 max-w-2xl text-white/60"
              >
                One commission rate. All services included. No surprises.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto mt-16 max-w-lg"
            >
              <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-b from-gold-500/5 to-transparent p-1">
                <div className="rounded-[22px] bg-dark-950 p-8 sm:p-12">
                  <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
                      All-Inclusive
                    </p>
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <span className="text-6xl font-bold tracking-tight text-white">
                        20
                      </span>
                      <span className="text-3xl font-bold text-white/80">%</span>
                    </div>
                    <p className="mt-2 text-sm text-white/50">
                      of your net earnings (after OnlyFans takes their 20%)
                    </p>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      "All 8 management services included",
                      "No upfront fees or setup costs",
                      "Month-to-month, cancel anytime",
                      "You only pay when you earn",
                      "Full transparency and real-time dashboard",
                      "Dedicated account manager",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <svg className="h-5 w-5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-sm text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/apply"
                    className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.5)]"
                  >
                    Get Started Today
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mx-auto mt-20 max-w-2xl"
            >
              <h3 className="mb-8 text-center text-xl font-bold text-white">
                How We Compare
              </h3>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                        Feature
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gold-400">
                        Elated
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-white/40">
                        Other Agencies
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-white/5 ${
                          i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-white/70">
                          {row.label}
                        </td>
                        <td className="px-6 py-4 text-center text-sm font-semibold text-gold-400">
                          {row.elated}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-white/40">
                          {row.others}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-gradient relative py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <motion.h2
                custom={0}
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Service <span className="gradient-text">FAQ</span>
              </motion.h2>
            </motion.div>

            <div className="mt-12 space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-4 text-base font-medium text-white">
                      {faq.q}
                    </span>
                    <motion.svg
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-5 w-5 shrink-0 text-gold-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-white/50">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
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
                Ready to <span className="gradient-text">Elevate</span> Your
                OnlyFans?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                Join the creators who are earning more, working less, and building
                sustainable careers with Elated Agency. Apply now and let us show
                you what premium management looks like.
              </p>
              <div className="mt-10">
                <Link
                  href="/apply"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-10 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.5)]"
                >
                  <span className="relative z-10">Apply Now - It&apos;s Free</span>
                  <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
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
