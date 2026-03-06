"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

const categories = [
  "All",
  "Growth",
  "Strategy",
  "Marketing",
  "Analytics",
  "Monetization",
  "Branding",
  "Security",
];

const articles = [
  {
    title: "How to Grow Your OnlyFans in 2025",
    excerpt:
      "A comprehensive, step-by-step guide to building a thriving subscriber base from zero. Learn the proven strategies that top creators use to attract, convert, and retain paying fans across every major platform.",
    category: "Growth",
    readTime: "12 min read",
    image: "/images/elated_agency_1.jpeg",
    featured: true,
  },
  {
    title: "The Ultimate OnlyFans Pricing Strategy",
    excerpt:
      "Pricing your subscription can make or break your OnlyFans success. Discover how to find the sweet spot that maximizes both subscriber count and revenue, including dynamic pricing tactics and bundle strategies.",
    category: "Monetization",
    readTime: "10 min read",
    image: "/images/elated_agency_5.jpeg",
    featured: true,
  },
  {
    title: "Building Your Brand on OnlyFans",
    excerpt:
      "Your brand is more than just content. It is how subscribers perceive, connect with, and stay loyal to you. Learn how to craft a compelling persona, develop your niche, and stand out in a crowded marketplace.",
    category: "Branding",
    readTime: "9 min read",
    image: "/images/elated_agency_7.jpeg",
    featured: false,
  },
  {
    title: "Social Media Marketing for OnlyFans Creators",
    excerpt:
      "Master the art of promoting your OnlyFans across Twitter, Instagram, TikTok, and Reddit without getting banned. Includes platform-specific strategies, content ideas, and growth hacks used by top earners.",
    category: "Marketing",
    readTime: "14 min read",
    image: "/images/elated_agency_8.jpeg",
    featured: false,
  },
  {
    title: "Understanding OnlyFans Analytics",
    excerpt:
      "Data drives decisions. Learn how to read and interpret your OnlyFans analytics dashboard, identify growth opportunities, track subscriber behavior, and use metrics to optimize your content strategy.",
    category: "Analytics",
    readTime: "8 min read",
    image: "/images/elated_agency_9.jpeg",
    featured: false,
  },
  {
    title: "How to Use PPV Messages Effectively",
    excerpt:
      "Pay-per-view messages are one of the most powerful revenue tools on OnlyFans. Learn when to send them, how to price them, what content to include, and the psychological triggers that drive purchases.",
    category: "Monetization",
    readTime: "11 min read",
    image: "/images/elated_agency_4.jpeg",
    featured: false,
  },
  {
    title: "Content Calendar: Planning Your Posts",
    excerpt:
      "Consistency is the key to OnlyFans success. Learn how to create a content calendar that keeps your feed fresh, engages subscribers daily, and reduces the stress of deciding what to post every day.",
    category: "Strategy",
    readTime: "7 min read",
    image: "/images/elated_agency_11.jpeg",
    featured: false,
  },
  {
    title: "The Creator's Guide to DMCA Protection",
    excerpt:
      "Protecting your content from piracy is essential to maintaining your revenue. Learn how DMCA works, how to file takedown notices, tools for monitoring leaks, and strategies to minimize unauthorized sharing.",
    category: "Security",
    readTime: "10 min read",
    image: "/images/elated_agency_12.webp",
    featured: false,
  },
];

export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const featuredArticles = articles.filter((a) => a.featured);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44">
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blush-400/5 blur-[100px]" />

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
                  FREE RESOURCES
                </span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="gradient-text">Elated</span> Academy
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
                Free educational resources to help you master OnlyFans. Expert
                guides, proven strategies, and insider knowledge from the team
                that manages top creators.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="relative -mt-4 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {featuredArticles.map((article, i) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="card-hover group relative overflow-hidden rounded-2xl border border-white/10"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <span className="inline-block rounded-full bg-gold-500/90 px-3 py-1 text-xs font-semibold text-dark-950">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-400">
                        {article.category}
                      </span>
                      <span className="text-xs text-white/40">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/50">
                      {article.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter & Articles Grid */}
        <section className="section-gradient relative py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white">
                All <span className="gradient-text">Guides & Resources</span>
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950"
                        : "border border-white/10 bg-white/[0.02] text-white/50 hover:border-gold-500/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredArticles.map((article, i) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.05, duration: 0.5 }}
                  className="card-hover group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-full border border-gold-500/30 bg-dark-950/80 px-2.5 py-0.5 text-xs font-medium text-gold-400 backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/40">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-white/30">
                        {article.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gold-400 transition-all duration-300 group-hover:gap-2">
                        Read Guide
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-white/40">
                  No articles found in this category yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/20 to-dark-950" />
          <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl border border-gold-500/20 bg-gradient-to-b from-gold-500/5 to-transparent p-1"
            >
              <div className="rounded-[22px] bg-dark-950 p-8 sm:p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10">
                  <svg
                    className="h-8 w-8 text-gold-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                  Get the Latest{" "}
                  <span className="gradient-text">Creator Tips</span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50">
                  Subscribe to the Elated Academy newsletter and get exclusive
                  guides, growth strategies, and industry insights delivered
                  straight to your inbox every week. Free, forever.
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 rounded-xl border border-gold-500/30 bg-gold-500/5 p-6"
                  >
                    <svg
                      className="mx-auto h-8 w-8 text-gold-400"
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
                    <p className="mt-2 text-sm font-semibold text-gold-400">
                      You&apos;re subscribed!
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      Check your inbox for a welcome email with our top resources.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white placeholder-white/30 transition-all duration-300 hover:border-white/20"
                    />
                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-sm font-semibold text-dark-950 shadow-[0_0_20px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(197,165,90,0.5)]"
                    >
                      <span className="relative z-10">Subscribe</span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                  </form>
                )}

                <p className="mt-4 text-xs text-white/30">
                  No spam. Unsubscribe at any time. We respect your privacy.
                </p>
              </div>
            </motion.div>
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
                Want Expert Help{" "}
                <span className="gradient-text">Implementing These Strategies</span>?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                Reading guides is a great start, but having a dedicated team
                execute these strategies for you is even better. Let Elated
                Agency handle the growth while you focus on creating.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/apply"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-10 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.5)]"
                >
                  <span className="relative z-10">Apply Now</span>
                  <svg
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/5"
                >
                  Explore Services
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
