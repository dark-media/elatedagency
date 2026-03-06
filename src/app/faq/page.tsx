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

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How does Elated Agency work?",
        a: "Elated is a full-service OnlyFans management agency powered by AI technology. When you join, we assign you a dedicated account manager and set up our proprietary tools on your account. We handle everything from subscriber chatting (via AI that matches your voice), content scheduling, marketing, analytics, and revenue optimization. You focus on creating content while we handle the business side. Our commission is 20% of your net earnings (after OnlyFans takes their cut), with no upfront fees and no long-term contracts.",
      },
      {
        q: "How do I apply to Elated Agency?",
        a: "Applying is simple and takes about five minutes. Click the Apply Now button on our website and fill out the application form with your basic information, current OnlyFans status, and your goals. Our team reviews every application within 24 hours. If we believe we can help you grow, we schedule a video onboarding call to discuss strategy and get you set up. There is no application fee and no obligation.",
      },
      {
        q: "What if I am new to OnlyFans?",
        a: "We welcome creators at every stage, including those who have not yet started. In fact, starting with professional management from day one can dramatically accelerate your growth. We will help you set up your account, develop your brand, create your content strategy, set optimal pricing, and build your subscriber base from the ground up. Our Academy resources are also available for free to help you learn the platform.",
      },
      {
        q: "How quickly will I see results?",
        a: "Most creators see measurable improvement within the first two to four weeks. This includes increased subscriber engagement, higher tip and PPV revenue, and growth in follower count. On average, creators who stay with us for six months see a 300% increase in their monthly revenue. However, results vary based on factors like your niche, content quality, posting consistency, and current audience size.",
      },
    ],
  },
  {
    category: "Pricing & Contracts",
    questions: [
      {
        q: "What is the commission structure?",
        a: "We charge 20% of your net earnings. Here is how it works: OnlyFans takes their standard 20% platform fee first. From the remaining 80% that you receive, Elated takes 20% as our management commission. So if you earn $10,000 in gross revenue, OnlyFans takes $2,000, Elated takes $1,600 (20% of the remaining $8,000), and you keep $6,400. This is significantly lower than most agencies that charge 25% to 50%.",
      },
      {
        q: "How long is the contract?",
        a: "We operate on a month-to-month basis with no long-term commitment required. You can cancel at any time with 30 days written notice. We believe that if we are doing our job well, you will want to stay. We earn your business every single month rather than locking you into a contract that benefits only us.",
      },
      {
        q: "Are there any upfront fees or hidden charges?",
        a: "None whatsoever. There are no setup fees, no onboarding charges, no technology fees, and no hidden costs. Our 20% commission is the only fee you will ever pay, and it is deducted automatically from your earnings. If you earn nothing, you pay nothing. Every service we offer, including AI chat, analytics, DMCA protection, marketing, and more, is included at no additional cost.",
      },
      {
        q: "How do I get paid?",
        a: "Your payment structure does not change when you work with us. OnlyFans pays you directly according to their standard payout schedule. Our management fee is calculated and invoiced separately based on your earnings data. You maintain full control of your OnlyFans payout settings and banking information at all times.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "Do you need access to my OnlyFans account?",
        a: "We only require manager-level permissions on your OnlyFans account, which you grant through the platform's built-in manager access feature. We never ask for your password, and we never have the ability to change your payout information or account settings. Manager access allows us to respond to messages, post content on your behalf, and view analytics, which is everything we need to manage your account effectively.",
      },
      {
        q: "Is my content safe with Elated?",
        a: "Absolutely. Content security is a top priority. We have strict internal policies and NDAs in place to protect your content. Our team members undergo background checks and sign comprehensive confidentiality agreements. Additionally, our DMCA protection service actively monitors the internet for unauthorized use of your content and issues takedown notices on your behalf.",
      },
      {
        q: "Can I see what you are doing on my account?",
        a: "Yes, complete transparency is one of our core values. You have access to our real-time dashboard where you can see every action taken on your account, including messages sent, content posted, and performance metrics. We also provide detailed weekly reports summarizing activity, growth, and strategic recommendations. You are never in the dark about what is happening with your account.",
      },
    ],
  },
  {
    category: "AI & Technology",
    questions: [
      {
        q: "How does the AI chat work?",
        a: "Our proprietary AI chatbot is trained on your communication style, vocabulary, personality traits, and brand voice. During onboarding, we analyze your previous messages and have you complete a personality questionnaire. The AI then engages with subscribers in a way that is indistinguishable from you chatting personally. It handles routine conversations, upsells PPV content naturally, and escalates complex interactions to our human team for review.",
      },
      {
        q: "What makes Elated different from other agencies?",
        a: "Three things set us apart: our AI technology, our transparent pricing, and our creator-first approach. Our proprietary AI allows us to provide 24/7 subscriber engagement at a quality level that would require a large human team at other agencies. This efficiency allows us to charge just 20% while other agencies charge 25% to 50%. And our month-to-month contracts with full transparency mean we have to earn your trust every single day.",
      },
      {
        q: "What platforms do you support?",
        a: "While OnlyFans is our primary focus and expertise, we also support creators on Fansly and other fan subscription platforms. Our marketing services extend across all major social media platforms including Twitter/X, Instagram, TikTok, Reddit, and more. During onboarding, we discuss your full platform presence and create a unified strategy across all channels.",
      },
    ],
  },
  {
    category: "Referrals & Leaving",
    questions: [
      {
        q: "How does the referral program work?",
        a: "Our referral program rewards you for bringing new creators to Elated. When a creator you refer signs up and remains active for at least 30 days, you receive a bonus equal to 5% of their earnings for the first six months. There is no limit to the number of creators you can refer. You can find your unique referral link in your creator dashboard.",
      },
      {
        q: "What happens if I want to leave?",
        a: "We make leaving as easy as joining. Simply provide 30 days written notice by emailing your account manager or submitting a cancellation request through your dashboard. During the notice period, we continue to manage your account at full capacity. Upon cancellation, we remove all manager access, transfer any pending deliverables, and provide a comprehensive handoff document covering your strategies, analytics, and recommendations for continued growth.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44">
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[120px]" />

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
                  COMMON QUESTIONS
                </span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Frequently Asked{" "}
                <span className="gradient-text">Questions</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
                Everything you need to know about working with Elated Agency.
                Can&apos;t find what you&apos;re looking for? Reach out to our team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="section-gradient relative py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {faqs.map((section, sectionIdx) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIdx * 0.05, duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="mb-6 text-lg font-semibold text-gold-400">
                  {section.category}
                </h2>
                <div className="space-y-3">
                  {section.questions.map((faq, i) => {
                    const key = `${sectionIdx}-${i}`;
                    const isOpen = openItems.has(key);
                    return (
                      <div
                        key={key}
                        className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-white/10"
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="flex w-full items-center justify-between px-6 py-5 text-left"
                        >
                          <span className="pr-4 text-base font-medium text-white">
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-400"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <div className="border-t border-white/5 px-6 py-5">
                                <p className="text-sm leading-relaxed text-white/50">
                                  {faq.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Still Have <span className="gradient-text">Questions</span>?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                Our team is available around the clock to answer any questions
                you may have. Whether you want to learn more about our services
                or discuss your specific situation, we are here to help.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.5)]"
                >
                  <span className="relative z-10">Contact Us</span>
                  <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <a
                  href="mailto:info@elatedagency.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/5"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  info@elatedagency.com
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
