"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { LogoFull } from "@/components/ui/Logo";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
];

const resourceLinks = [
  { href: "/academy", label: "Academy" },
  { href: "/calculator", label: "Calculator" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contract", label: "Contract" },
];

const socialLinks = [
  {
    href: "https://instagram.com/elatedagency",
    label: "Instagram",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/elated_agency",
    label: "Twitter",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://tiktok.com/@elatedagency",
    label: "TikTok",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 409) {
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 4000);
      }
    } catch {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-dark-950">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold-500/[0.03] blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-blush-400/[0.02] blur-[100px]" />
      </div>

      {/* Apply CTA Banner */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVariants}
            custom={0}
            className="relative -mt-px overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 via-dark-950 to-blush-400/5 px-6 py-12 sm:px-12 lg:px-16"
          >
            {/* Decorative corner accents */}
            <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-gold-500/30 rounded-tl-2xl" />
            <div className="absolute right-0 bottom-0 h-16 w-16 border-r-2 border-b-2 border-gold-500/30 rounded-br-2xl" />

            <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                    elevate
                  </span>{" "}
                  your career?
                </h3>
                <p className="mt-2 text-base text-white/50">
                  Join the top 1% of creators managed by an agency that puts
                  your success first.
                </p>
              </div>
              <Link
                href="/apply"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 text-base font-semibold text-dark-950 shadow-[0_0_25px_rgba(197,165,90,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(197,165,90,0.4)]"
              >
                Apply Now
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block">
              <LogoFull className="h-9" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              Premium OnlyFans management agency. We transform talented creators
              into global brands with data-driven strategies and white-glove
              service.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/10 hover:text-gold-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              href="mailto:info@elatedagency.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-gold-400"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              info@elatedagency.com
            </a>
          </motion.div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {/* Company */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={1}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Company
              </h4>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={2}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Resources
              </h4>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={3}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Legal
              </h4>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={4}
            className="lg:col-span-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Stay in the loop
            </h4>
            <p className="mt-3 text-sm text-white/40">
              Industry insights, growth tips, and exclusive opportunities
              delivered weekly.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-24 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-gold-500/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-gold-500/20"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-1.5 text-xs font-semibold text-dark-950 transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,165,90,0.3)]"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Sent
                    </span>
                  ) : (
                    "Join"
                  )}
                </button>
              </div>
            </form>
            <p className="mt-2 text-xs text-white/20">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Elated Agency. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/25 transition-colors duration-300 hover:text-white/50"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/25 transition-colors duration-300 hover:text-white/50"
            >
              Terms
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-xs text-white/25 transition-colors duration-300 hover:text-white/50"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
