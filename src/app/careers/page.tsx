import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Careers | Elated Agency",
  description:
    "Join the Elated Agency team. We're building the future of OnlyFans management with AI-powered tools and a creator-first approach.",
};

const openings = [
  {
    title: "Senior Account Manager",
    type: "Full-time / Remote",
    description:
      "Manage a portfolio of top creators, develop growth strategies, and drive revenue optimization. 3+ years in talent or account management required.",
  },
  {
    title: "AI/ML Engineer",
    type: "Full-time / Remote",
    description:
      "Build and improve our AI chatbot, content recommendation engine, and analytics platform. Experience with LLMs and Python required.",
  },
  {
    title: "Content Strategist",
    type: "Full-time / Remote",
    description:
      "Develop content calendars, trend analysis, and creative direction for our creator roster. Deep understanding of social media platforms required.",
  },
  {
    title: "Growth Marketing Manager",
    type: "Full-time / Remote",
    description:
      "Lead creator acquisition campaigns across paid and organic channels. Experience with performance marketing and the creator economy preferred.",
  },
];

const perks = [
  { title: "Fully Remote", description: "Work from anywhere in the world" },
  { title: "Competitive Pay", description: "Top-of-market compensation packages" },
  { title: "Flexible Hours", description: "Results matter, not when you clock in" },
  { title: "Growth Budget", description: "$2,000/year for learning & development" },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              <span className="text-xs font-medium tracking-wide text-gold-400">
                WE&apos;RE HIRING
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Build the Future of{" "}
              <span className="gradient-text">Creator Management</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
              Join a fast-growing team that&apos;s redefining how creators build
              their businesses. We combine cutting-edge AI with human expertise
              to deliver results that matter.
            </p>
          </div>

          {/* Perks */}
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-5 text-center"
              >
                <p className="text-sm font-semibold text-white">{perk.title}</p>
                <p className="mt-1 text-xs text-white/40">{perk.description}</p>
              </div>
            ))}
          </div>

          {/* Open Positions */}
          <h2 className="mb-6 text-2xl font-bold text-white">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-gold-500/20"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {job.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-gold-400">{job.type}</p>
                  </div>
                  <a
                    href="mailto:info@elatedagency.com"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 px-5 py-2 text-sm font-medium text-gold-400 transition-all hover:bg-gold-500/10"
                  >
                    Apply
                    <svg
                      className="h-4 w-4"
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
                  </a>
                </div>
                <p className="mt-3 text-sm text-white/50">{job.description}</p>
              </div>
            ))}
          </div>

          {/* General Application */}
          <div className="mt-12 rounded-xl border border-gold-500/20 bg-gold-500/5 p-8 text-center">
            <h3 className="text-lg font-semibold text-white">
              Don&apos;t see your role?
            </h3>
            <p className="mt-2 text-sm text-white/50">
              We&apos;re always looking for talented people. Send your resume and
              a note about what excites you about Elated.
            </p>
            <a
              href="mailto:info@elatedagency.com"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-sm font-semibold text-dark-950 transition-all hover:shadow-[0_0_30px_rgba(197,165,90,0.3)]"
            >
              Send Us Your Resume
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
