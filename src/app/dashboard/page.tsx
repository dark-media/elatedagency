"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const revenueData = [
  { month: "Sep", value: 4200 },
  { month: "Oct", value: 5800 },
  { month: "Nov", value: 7100 },
  { month: "Dec", value: 8400 },
  { month: "Jan", value: 9200 },
  { month: "Feb", value: 11800 },
  { month: "Mar", value: 12450 },
];

const recentActivity = [
  { type: "subscriber", text: "New subscriber joined", time: "12 min ago", icon: "user-plus" },
  { type: "tip", text: "$50 tip received", time: "1 hour ago", icon: "dollar" },
  { type: "message", text: "Manager sent strategy update", time: "3 hours ago", icon: "message" },
  { type: "content", text: "Scheduled post published", time: "5 hours ago", icon: "image" },
  { type: "milestone", text: "Hit 1,000 subscriber milestone!", time: "1 day ago", icon: "star" },
  { type: "referral", text: "Referral bonus: $125 earned", time: "2 days ago", icon: "gift" },
];

const metrics = [
  {
    label: "Monthly Revenue",
    value: "$12,450",
    change: "+23.5%",
    positive: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Subscribers",
    value: "1,024",
    change: "+12.8%",
    positive: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    label: "Messages Sent",
    value: "3,847",
    change: "+8.2%",
    positive: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    label: "Growth Rate",
    value: "18.4%",
    change: "+4.1%",
    positive: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

const activityIcon = (type: string) => {
  switch (type) {
    case "subscriber":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
        </div>
      );
    case "tip":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      );
    case "message":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
        </div>
      );
    case "content":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
        </div>
      );
    case "milestone":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
        </div>
      );
    case "referral":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/10 text-pink-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
        </div>
      );
    default:
      return null;
  }
};

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://elatedagency.com/apply?ref=SARAH-J2024";

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Welcome back, <span className="gradient-text">Sarah</span>
          </motion.h1>
          <p className="mt-1 text-sm text-white/40">
            Here&apos;s how your account is performing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Active
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-white/30">{metric.icon}</span>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  metric.positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.positive ? (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                ) : (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                  </svg>
                )}
                {metric.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{metric.value}</p>
            <p className="mt-1 text-xs text-white/40">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart & Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>
            <span className="text-xs text-white/30">Last 7 months</span>
          </div>
          <div className="flex items-end gap-3" style={{ height: 200 }}>
            {revenueData.map((item, i) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-medium text-white/40">
                  ${(item.value / 1000).toFixed(1)}k
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxRevenue) * 140}px` }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                  className={`w-full rounded-lg ${
                    i === revenueData.length - 1
                      ? "bg-gradient-to-t from-gold-500 to-gold-400"
                      : "bg-white/10"
                  }`}
                />
                <span className="text-[10px] text-white/30">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                {activityIcon(activity.type)}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white/70">
                    {activity.text}
                  </p>
                  <p className="text-[10px] text-white/25">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Referral */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Link
              href="/dashboard/analytics"
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center transition-all duration-200 hover:border-gold-500/20 hover:bg-gold-500/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-white/60">
                View Analytics
              </span>
            </Link>
            <Link
              href="/dashboard/content"
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center transition-all duration-200 hover:border-gold-500/20 hover:bg-gold-500/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-white/60">
                Manage Content
              </span>
            </Link>
            <Link
              href="/dashboard/messages"
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center transition-all duration-200 hover:border-gold-500/20 hover:bg-gold-500/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-white/60">
                Check Messages
              </span>
            </Link>
          </div>
        </div>

        {/* Referral Link */}
        <div className="rounded-xl border border-gold-500/10 bg-gold-500/[0.03] p-5">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <h3 className="text-sm font-semibold text-white">
              Your Referral Link
            </h3>
          </div>
          <p className="mt-2 text-xs text-white/40">
            Earn 5% of referred creator revenue for 12 months
          </p>
          <div className="mt-4 flex gap-2">
            <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <p className="truncate text-xs text-white/50">{referralLink}</p>
            </div>
            <button
              onClick={copyReferralLink}
              className="shrink-0 rounded-lg bg-gold-500/10 px-4 py-2.5 text-xs font-semibold text-gold-400 transition-all duration-200 hover:bg-gold-500/20"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <Link
              href="/dashboard/referrals"
              className="text-xs text-gold-400/60 transition-colors hover:text-gold-400"
            >
              View referral dashboard &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
