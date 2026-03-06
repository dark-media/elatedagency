"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const referralStats = [
  { label: "Total Referrals", value: "12", icon: "users" },
  { label: "Active", value: "8", icon: "check" },
  { label: "Pending", value: "3", icon: "clock" },
  { label: "Total Earnings", value: "$2,340", icon: "dollar" },
];

const referralHistory = [
  { name: "Jessica M.", status: "Active", joinedDate: "Feb 28, 2026", earnings: "$420", monthlyRev: "$8,400" },
  { name: "Amanda K.", status: "Active", joinedDate: "Feb 15, 2026", earnings: "$380", monthlyRev: "$7,600" },
  { name: "Rachel T.", status: "Active", joinedDate: "Feb 3, 2026", earnings: "$310", monthlyRev: "$6,200" },
  { name: "Mia L.", status: "Active", joinedDate: "Jan 20, 2026", earnings: "$290", monthlyRev: "$5,800" },
  { name: "Olivia P.", status: "Active", joinedDate: "Jan 12, 2026", earnings: "$250", monthlyRev: "$5,000" },
  { name: "Emma D.", status: "Active", joinedDate: "Jan 5, 2026", earnings: "$210", monthlyRev: "$4,200" },
  { name: "Sophie R.", status: "Active", joinedDate: "Dec 20, 2025", earnings: "$180", monthlyRev: "$3,600" },
  { name: "Lily W.", status: "Active", joinedDate: "Dec 8, 2025", earnings: "$160", monthlyRev: "$3,200" },
  { name: "Grace H.", status: "Pending", joinedDate: "Mar 2, 2026", earnings: "$0", monthlyRev: "--" },
  { name: "Chloe N.", status: "Pending", joinedDate: "Mar 1, 2026", earnings: "$0", monthlyRev: "--" },
  { name: "Zara B.", status: "Pending", joinedDate: "Feb 28, 2026", earnings: "$0", monthlyRev: "--" },
  { name: "Tara F.", status: "Expired", joinedDate: "Sep 15, 2025", earnings: "$140", monthlyRev: "--" },
];

// Simple QR code SVG generator (creates a stylized representation)
function QRCodeSVG({ data, size = 120 }: { data: string; size?: number }) {
  // Generate a deterministic pattern from the data
  const hash = data.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const modules = 21;
  const cellSize = size / modules;

  const cells: { x: number; y: number }[] = [];
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      // Position detection patterns (corners)
      const isTopLeft = row < 7 && col < 7;
      const isTopRight = row < 7 && col >= modules - 7;
      const isBottomLeft = row >= modules - 7 && col < 7;

      if (isTopLeft || isTopRight || isBottomLeft) {
        // Draw finder patterns
        const isOuter =
          row === 0 || row === 6 || col === 0 || col === 6 ||
          (isTopRight && (col === modules - 1 || col === modules - 7)) ||
          (isBottomLeft && (row === modules - 1 || row === modules - 7));
        const isInner =
          (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
          (isTopRight && row >= 2 && row <= 4 && col >= modules - 5 && col <= modules - 3) ||
          (isBottomLeft && row >= modules - 5 && row <= modules - 3 && col >= 2 && col <= 4);

        if (isOuter || isInner) {
          cells.push({ x: col, y: row });
        }
      } else {
        // Data area - use hash-based pattern
        const seed = (row * modules + col + hash) % 7;
        if (seed < 3) {
          cells.push({ x: col, y: row });
        }
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx="4" />
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x * cellSize}
          y={cell.y * cellSize}
          width={cellSize}
          height={cellSize}
          fill="#0a0a0c"
        />
      ))}
    </svg>
  );
}

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://elatedagency.com/apply?ref=SARAH-J2024";
  const referralCode = "SARAH-J2024";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        "Join the best OF management agency! Use my referral link:"
      )}&url=${encodeURIComponent(referralLink)}`,
      "_blank"
    );
  };

  const shareInstagram = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Referrals</h1>
        <p className="mt-1 text-sm text-white/40">
          Earn 5% of referred creator revenue for 12 months
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {referralStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
          >
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Referral Link & QR Code */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gold-500/10 bg-gold-500/[0.03] p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white">
            Your Referral Link
          </h3>
          <p className="mt-1 text-xs text-white/30">
            Share this link with creators and earn when they join
          </p>

          <div className="mt-4 flex gap-2">
            <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="truncate text-sm text-white/60">{referralLink}</p>
            </div>
            <button
              onClick={copyLink}
              className="shrink-0 rounded-lg bg-gold-500/15 px-5 py-3 text-sm font-semibold text-gold-400 transition-all duration-200 hover:bg-gold-500/25"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-white/20">Referral code:</span>
            <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-xs text-gold-400">
              {referralCode}
            </span>
          </div>

          {/* Share Buttons */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-medium text-white/30">
              Share via
            </p>
            <div className="flex gap-2">
              <button
                onClick={shareTwitter}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/70"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter / X
              </button>
              <button
                onClick={shareInstagram}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/70"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Copy for IG
              </button>
              <button
                onClick={() => {
                  const text = `Check out Elated Agency - the best OF management! ${referralLink}`;
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/70"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
              </button>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h3 className="mb-4 text-sm font-semibold text-white">QR Code</h3>
          <div className="rounded-xl bg-white p-3">
            <QRCodeSVG data={referralLink} size={140} />
          </div>
          <p className="mt-3 text-center text-[10px] text-white/25">
            Scan to open referral link
          </p>
        </div>
      </div>

      {/* Referral History */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Referral History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-3 text-left text-xs font-medium text-white/30">
                  Creator
                </th>
                <th className="pb-3 text-left text-xs font-medium text-white/30">
                  Status
                </th>
                <th className="pb-3 text-left text-xs font-medium text-white/30">
                  Joined
                </th>
                <th className="pb-3 text-right text-xs font-medium text-white/30">
                  Their Revenue
                </th>
                <th className="pb-3 text-right text-xs font-medium text-white/30">
                  Your Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {referralHistory.map((referral, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-white/[0.03] last:border-0"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[10px] font-medium text-white/40">
                        {referral.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-white/70">
                        {referral.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        referral.status === "Active"
                          ? "border border-green-500/20 bg-green-500/10 text-green-400"
                          : referral.status === "Pending"
                          ? "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                          : "border border-white/10 bg-white/5 text-white/30"
                      }`}
                    >
                      {referral.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-white/40">
                    {referral.joinedDate}
                  </td>
                  <td className="py-3 text-right text-sm text-white/40">
                    {referral.monthlyRev}
                  </td>
                  <td className="py-3 text-right text-sm font-medium text-gold-400">
                    {referral.earnings}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl border border-gold-500/10 bg-gold-500/[0.03] p-6">
        <h3 className="mb-4 text-sm font-semibold text-gold-400">
          How the Referral Program Works
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Share Your Link",
              desc: "Share your unique referral link with creators you think would benefit from Elated Agency.",
            },
            {
              step: "2",
              title: "They Join & Grow",
              desc: "When they sign up using your link and get approved, their journey begins.",
            },
            {
              step: "3",
              title: "You Earn 5%",
              desc: "Earn 5% of their OnlyFans revenue for 12 months. Payouts are monthly.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-400">
                {item.step}
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">
                  {item.title}
                </h4>
                <p className="mt-0.5 text-xs text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
