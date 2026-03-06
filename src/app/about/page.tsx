"use client";

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

const team = [
  {
    name: "Gary Anderson",
    role: "CEO & Founder",
    image: "/images/gary-headshot-fixed.jpeg",
    bio: "Gary founded Elated Agency with a vision to revolutionize OnlyFans management through AI. With a background in machine learning and platform engineering, he architected the proprietary systems that power Elated's 24/7 creator management — enabling personalized, round-the-clock support for over 500 creators at a fraction of the cost of traditional agencies.",
  },
  {
    name: "Natalie Weiss",
    role: "Chief Client Officer",
    image: "/images/elated_agency_3.jpeg",
    bio: "Natalie is the heart of Elated's creator relationships. With over a decade of experience in talent management and digital media, she oversees all client communications and ensures every creator receives a personal, hands-on experience. She has helped over 500 creators optimize their content strategy and grow sustainable revenue streams.",
  },
  {
    name: "Team Elated",
    role: "Creator Success Team",
    image: "/images/elated_agency_14.jpeg",
    bio: "Our dedicated team of strategists, content specialists, and AI engineers work behind the scenes to deliver exceptional results. With expertise spanning digital marketing, revenue optimization, and creator economics, Team Elated ensures every creator gets the personalized support they need to thrive.",
  },
];

const values = [
  {
    title: "Transparency",
    description:
      "No hidden fees, no surprise charges. Our 20% commission structure is straightforward, and you can see exactly what we do on your account at any time through our real-time dashboard.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Creator-First",
    description:
      "Every decision we make starts with one question: does this benefit our creators? From our month-to-month contracts to our 24/7 support, everything is designed around your success.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "We leverage cutting-edge AI to handle chatting, analytics, and optimization so you can focus on what you do best: creating. Our proprietary technology gives you an unfair advantage.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "Results",
    description:
      "We are measured by one thing: your earnings. Our creators see an average revenue increase of 300% within the first six months. If we do not perform, you are free to leave at any time.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Elated Agency was founded in Los Angeles with a bold vision: combine AI technology with personalized talent management to create the ultimate OnlyFans management experience.",
  },
  {
    year: "2023",
    title: "First 50 Creators",
    description:
      "Within six months of launch, we onboarded our first 50 creators and proved that our AI-powered approach could deliver real, measurable results across a diverse portfolio.",
  },
  {
    year: "2024",
    title: "AI Chat Launch",
    description:
      "We released our proprietary AI chatbot technology, allowing creators to maintain 24/7 subscriber engagement with voice-matched responses that sound authentically like them.",
  },
  {
    year: "2024",
    title: "Revenue Milestone",
    description:
      "Our creators collectively surpassed $10M in managed revenue, with an average income increase of 300% for creators who stayed with us for six months or more.",
  },
  {
    year: "2025",
    title: "Academy Launch",
    description:
      "We launched Elated Academy, a free educational resource hub providing creators with expert guides, strategies, and insights to grow on OnlyFans, regardless of agency affiliation.",
  },
  {
    year: "2025",
    title: "Global Expansion",
    description:
      "Elated expanded internationally, welcoming creators from over 30 countries and adding multilingual support to our AI chat and management platform.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-44">
          {/* Background orbs */}
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blush-400/5 blur-[100px]" />

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
                  OUR STORY
                </span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                About{" "}
                <span className="gradient-text">Elated Agency</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
                We are a team of innovators, strategists, and technologists united
                by a single mission: to help OnlyFans creators earn more, work
                less, and build lasting digital empires.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-gradient relative py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="order-2 lg:order-1"
              >
                <motion.h2
                  custom={0}
                  variants={fadeUp}
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Our Mission:{" "}
                  <span className="gradient-text">
                    Revolutionize Creator Management with AI
                  </span>
                </motion.h2>
                <motion.p
                  custom={1}
                  variants={fadeUp}
                  className="mt-6 text-base leading-relaxed text-white/60"
                >
                  The traditional talent management model is broken. Agencies charge
                  exorbitant fees, lock creators into long-term contracts, and
                  provide little transparency into what they actually do. We built
                  Elated to change that.
                </motion.p>
                <motion.p
                  custom={2}
                  variants={fadeUp}
                  className="mt-4 text-base leading-relaxed text-white/60"
                >
                  By combining proprietary AI technology with dedicated human
                  expertise, we deliver premium management services at a fraction of
                  the cost. Our AI handles the repetitive, time-consuming tasks
                  like subscriber chatting and analytics, while our human team
                  focuses on strategy, relationships, and creative direction.
                </motion.p>
                <motion.p
                  custom={3}
                  variants={fadeUp}
                  className="mt-4 text-base leading-relaxed text-white/60"
                >
                  The result? Creators keep more of their earnings, have complete
                  visibility into their account activity, and receive the kind of
                  personalized attention that was previously reserved for top-tier
                  talent.
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src="/images/elated_agency_1.jpeg"
                    alt="Elated Agency team collaboration"
                    width={600}
                    height={500}
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
                </div>
                {/* Stats overlay */}
                <div className="absolute -bottom-6 -left-6 rounded-xl border border-gold-500/20 bg-dark-950/90 px-6 py-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-gold-400">300%</p>
                  <p className="text-xs text-white/50">Avg. Revenue Increase</p>
                </div>
                <div className="absolute -right-4 -top-4 rounded-xl border border-gold-500/20 bg-dark-950/90 px-6 py-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-gold-400">24/7</p>
                  <p className="text-xs text-white/50">AI-Powered Support</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
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
                Meet the <span className="gradient-text">Team</span>
              </motion.h2>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="mx-auto mt-4 max-w-2xl text-white/60"
              >
                The visionaries behind Elated Agency. A perfect blend of
                technology expertise and creator industry knowledge.
              </motion.p>
            </motion.div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-dark-900/30 p-1 transition-all duration-500 hover:border-gold-500/30"
                >
                  <div className="relative overflow-hidden rounded-xl bg-dark-950 p-8">
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-gold-500/20">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-gold-400">
                          {member.role}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-white/50">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
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
                Our <span className="gradient-text">Values</span>
              </motion.h2>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="mx-auto mt-4 max-w-2xl text-white/60"
              >
                The principles that guide every decision we make and every
                relationship we build.
              </motion.p>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="card-hover group rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold-500/20 bg-gold-500/5 text-gold-400 transition-all duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10">
                    {value.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/20 to-dark-950" />
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
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
                Our <span className="gradient-text">Journey</span>
              </motion.h2>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="mx-auto mt-4 max-w-2xl text-white/60"
              >
                From a bold idea to a global platform. Here are the milestones
                that have shaped Elated Agency.
              </motion.p>
            </motion.div>

            <div className="relative mt-16">
              {/* Center line */}
              <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent md:left-1/2 md:-translate-x-px" />

              <div className="space-y-12">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className={`relative flex items-start gap-8 ${
                      i % 2 === 0
                        ? "md:flex-row"
                        : "md:flex-row-reverse md:text-right"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 top-1 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold-500 bg-dark-950 md:left-1/2" />

                    {/* Content */}
                    <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                      <span className="inline-block rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400">
                        {milestone.year}
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-white">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
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
                Ready to Join the{" "}
                <span className="gradient-text">Elated Family</span>?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                Whether you are a seasoned creator or just getting started, we
                have the tools, technology, and team to take your OnlyFans to the
                next level. Apply today and see the difference.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/apply"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.5)]"
                >
                  <span className="relative z-10">Apply Now</span>
                  <svg
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/5"
                >
                  Get in Touch
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
