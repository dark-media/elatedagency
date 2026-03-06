"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogoFull } from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/academy", label: "Academy" },
  { href: "/calculator", label: "Calculator" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark-950/80 backdrop-blur-2xl border-b border-gold-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <LogoFull className="h-8 sm:h-9" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium tracking-wide text-white/70 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/login"
              className="text-sm font-medium tracking-wide text-white/60 transition-colors duration-300 hover:text-gold-400"
            >
              Login
            </Link>
            <Link
              href="/apply"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 shadow-[0_0_20px_rgba(197,165,90,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,165,90,0.4)] hover:-translate-y-0.5"
            >
              <span className="relative z-10">Apply Now</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
              {/* Shimmer overlay */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/5 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex w-5 flex-col items-end gap-1.5">
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 5, width: 20 }
                    : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-0.5 rounded-full bg-white"
                style={{ width: 20 }}
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, x: 10 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.2 }}
                className="block h-0.5 w-3.5 rounded-full bg-gold-400"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -7, width: 20 }
                    : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-0.5 rounded-full bg-white"
                style={{ width: 14 }}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-45 flex h-full w-full max-w-sm flex-col border-l border-gold-500/10 bg-dark-950/95 backdrop-blur-2xl lg:hidden"
          >
            {/* Mobile Menu Header Spacer */}
            <div className="h-20" />

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-all duration-300 hover:bg-white/5 hover:text-white"
                    >
                      <span>{link.label}</span>
                      <svg
                        className="h-4 w-4 text-gold-500/0 transition-all duration-300 group-hover:text-gold-500 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="my-6 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"
              />

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  <svg
                    className="h-5 w-5 text-gold-500/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span>Creator Login</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="border-t border-white/5 px-6 py-6"
            >
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-base font-semibold text-dark-950 shadow-[0_0_20px_rgba(197,165,90,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,165,90,0.5)]"
              >
                Apply Now
                <svg
                  className="h-4 w-4"
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
              <p className="mt-3 text-center text-xs text-white/30">
                Exclusive spots available
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
