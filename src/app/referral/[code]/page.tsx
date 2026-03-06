"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogoFull } from "@/components/ui/Logo";
import {
  FiArrowRight,
  FiDollarSign,
  FiTrendingUp,
  FiShield,
  FiStar,
} from "react-icons/fi";

export default function ReferralPage() {
  const params = useParams();
  const code = params.code as string;
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (code && !tracked) {
      fetch("/api/referral/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }).catch(() => {});
      setTracked(true);
    }
  }, [code, tracked]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <LogoFull className="h-9" />
        </Link>
        <Link
          href={`/apply?ref=${code}`}
          className="px-6 py-2.5 bg-gradient-to-r from-[#c5a55a] to-[#d4af6a] text-black font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-[#c5a55a]/20 transition-all"
        >
          Apply Now
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,165,90,0.15),transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c5a55a]/10 border border-[#c5a55a]/20 mb-8">
              <FiStar className="text-[#c5a55a]" />
              <span className="text-sm text-[#c5a55a] font-medium">
                You&apos;ve been personally invited
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Friend Thinks You
              <br />
              <span className="bg-gradient-to-r from-[#c5a55a] to-[#d4af6a] bg-clip-text text-transparent">
                Deserve to Earn More
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#b8b8c1] max-w-2xl mx-auto mb-10 leading-relaxed">
              Join Elated Agency and let our AI-powered management team help you
              grow your OnlyFans revenue by 3-10x. No upfront fees. No lock-in
              contracts. Just results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/apply?ref=${code}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c5a55a] to-[#d4af6a] text-black font-bold rounded-full text-lg hover:shadow-xl hover:shadow-[#c5a55a]/30 transition-all hover:-translate-y-1"
              >
                Apply Now — It&apos;s Free
                <FiArrowRight />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c5a55a]/30 text-white font-semibold rounded-full text-lg hover:bg-[#c5a55a]/10 transition-all"
              >
                Calculate Your Earnings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why Creators Love Elated
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FiDollarSign,
                title: "Lowest Commission",
                description:
                  "Only 20% of your net earnings — the lowest rate in the industry. Most agencies charge 25-50%.",
              },
              {
                icon: FiTrendingUp,
                title: "3-10x Revenue Growth",
                description:
                  "Our AI-powered management consistently helps creators multiply their monthly earnings within 90 days.",
              },
              {
                icon: FiShield,
                title: "No Lock-In Contracts",
                description:
                  "Month-to-month agreement. Cancel anytime with 7 days notice. We earn your business every single day.",
              },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl bg-[#141418] border border-white/5 hover:border-[#c5a55a]/30 transition-all"
              >
                <benefit.icon className="text-3xl text-[#c5a55a] mb-4" />
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-[#91919f] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#0f0f13]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Get Started in Minutes
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Apply",
                desc: "Fill out our quick application form. Takes less than 2 minutes.",
              },
              {
                step: "2",
                title: "Get Approved",
                desc: "Our team reviews your profile within 24 hours.",
              },
              {
                step: "3",
                title: "Sign & Start",
                desc: "Sign a simple month-to-month contract. We start optimizing immediately.",
              },
              {
                step: "4",
                title: "Watch It Grow",
                desc: "Track your revenue growth in real-time on your personal dashboard.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#c5a55a] to-[#d4af6a] flex items-center justify-center text-black font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-[#91919f]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Bonus */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-[#c5a55a]/10 to-[#f472b6]/10 border border-[#c5a55a]/20">
            <h2 className="text-3xl font-bold mb-4">
              Earn by Referring Others
            </h2>
            <p className="text-lg text-[#b8b8c1] mb-8 max-w-2xl mx-auto">
              Once you join Elated, you&apos;ll get your own unique referral
              link. Earn{" "}
              <span className="text-[#c5a55a] font-bold">
                5% of every creator&apos;s revenue
              </span>{" "}
              that you refer — for as long as they&apos;re with us.
            </p>
            <Link
              href={`/apply?ref=${code}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c5a55a] to-[#d4af6a] text-black font-bold rounded-full text-lg hover:shadow-xl hover:shadow-[#c5a55a]/30 transition-all hover:-translate-y-1"
            >
              Join Elated Now
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(197,165,90,0.1),transparent_70%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-[#91919f] mb-10">
            Apply now and start earning more within days. Your friend is already
            benefiting from Elated — don&apos;t miss out.
          </p>
          <Link
            href={`/apply?ref=${code}`}
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#c5a55a] to-[#d4af6a] text-black font-bold rounded-full text-xl hover:shadow-2xl hover:shadow-[#c5a55a]/30 transition-all hover:-translate-y-1"
          >
            Apply Now — Free Forever
            <FiArrowRight />
          </Link>
          <p className="text-sm text-[#5d5d6c] mt-4">
            No credit card required. No upfront fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-[#5d5d6c] text-sm">
        <p>
          &copy; {new Date().getFullYear()} Elated Agency. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}
