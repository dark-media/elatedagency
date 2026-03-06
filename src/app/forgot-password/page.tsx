"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production this would call an API to send a reset email
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-dark-950 px-6 pt-20">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <p className="mt-2 text-sm text-white/50">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

            {sent ? (
              <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-green-400">
                    Check your email
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/50">
                  If an account exists for {email}, you&apos;ll receive a
                  password reset link shortly.
                </p>
                <Link
                  href="/login"
                  className="mt-4 inline-block text-sm font-medium text-gold-400 transition-colors hover:text-gold-300"
                >
                  Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/70"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-all focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/20"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 py-3 text-sm font-semibold text-dark-950 transition-all hover:shadow-[0_0_20px_rgba(197,165,90,0.3)]"
                >
                  Send Reset Link
                </button>
                <Link
                  href="/login"
                  className="block text-center text-sm text-white/40 transition-colors hover:text-white/60"
                >
                  Back to login
                </Link>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
