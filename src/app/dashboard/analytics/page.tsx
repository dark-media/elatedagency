"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type TimeRange = "30" | "60" | "90";

const revenueData: Record<TimeRange, { date: string; value: number }[]> = {
  "30": [
    { date: "Feb 4", value: 380 },
    { date: "Feb 7", value: 420 },
    { date: "Feb 10", value: 510 },
    { date: "Feb 13", value: 390 },
    { date: "Feb 16", value: 620 },
    { date: "Feb 19", value: 580 },
    { date: "Feb 22", value: 710 },
    { date: "Feb 25", value: 650 },
    { date: "Feb 28", value: 820 },
    { date: "Mar 3", value: 890 },
  ],
  "60": [
    { date: "Jan 5", value: 290 },
    { date: "Jan 12", value: 350 },
    { date: "Jan 19", value: 380 },
    { date: "Jan 26", value: 420 },
    { date: "Feb 2", value: 460 },
    { date: "Feb 9", value: 510 },
    { date: "Feb 16", value: 620 },
    { date: "Feb 23", value: 710 },
    { date: "Mar 1", value: 820 },
    { date: "Mar 3", value: 890 },
  ],
  "90": [
    { date: "Dec 5", value: 180 },
    { date: "Dec 15", value: 220 },
    { date: "Dec 25", value: 310 },
    { date: "Jan 4", value: 290 },
    { date: "Jan 14", value: 380 },
    { date: "Jan 24", value: 420 },
    { date: "Feb 3", value: 460 },
    { date: "Feb 13", value: 580 },
    { date: "Feb 23", value: 710 },
    { date: "Mar 3", value: 890 },
  ],
};

const subscriberGrowth = [
  { month: "Oct", count: 420 },
  { month: "Nov", count: 560 },
  { month: "Dec", count: 680 },
  { month: "Jan", count: 790 },
  { month: "Feb", count: 920 },
  { month: "Mar", count: 1024 },
];

const topContent = [
  { title: "Fitness Journey - Week 12", type: "Photo Set", views: 4280, revenue: "$890", engagement: "94%" },
  { title: "Behind the Scenes Vlog", type: "Video", views: 3650, revenue: "$720", engagement: "88%" },
  { title: "Exclusive Q&A Session", type: "Live Stream", views: 2890, revenue: "$650", engagement: "92%" },
  { title: "Morning Routine Reveal", type: "Photo Set", views: 2340, revenue: "$480", engagement: "85%" },
  { title: "Travel Diary - Miami", type: "Photo Set", views: 2100, revenue: "$420", engagement: "81%" },
];

const revenueBreakdown = [
  { label: "Subscriptions", value: 7200, percentage: 58, color: "bg-gold-400" },
  { label: "Tips", value: 2800, percentage: 22, color: "bg-blush-400" },
  { label: "PPV Content", value: 1850, percentage: 15, color: "bg-purple-400" },
  { label: "Referrals", value: 600, percentage: 5, color: "bg-green-400" },
];

const engagementMetrics = [
  { label: "Avg. Response Time", value: "2.4 hrs", change: "-18%", positive: true },
  { label: "Message Open Rate", value: "87%", change: "+5%", positive: true },
  { label: "Content Engagement", value: "12.8%", change: "+2.3%", positive: true },
  { label: "Renewal Rate", value: "76%", change: "-1.2%", positive: false },
  { label: "Fan Retention (30d)", value: "82%", change: "+3.1%", positive: true },
  { label: "Avg. Tip Amount", value: "$18.50", change: "+$2.30", positive: true },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30");

  const currentData = revenueData[timeRange];
  const maxValue = Math.max(...currentData.map((d) => d.value));
  const maxSub = Math.max(...subscriberGrowth.map((d) => d.count));

  // Generate SVG path for revenue line chart
  const chartWidth = 100;
  const chartHeight = 100;
  const points = currentData.map((d, i) => ({
    x: (i / (currentData.length - 1)) * chartWidth,
    y: chartHeight - (d.value / maxValue) * chartHeight * 0.85,
  }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-white/40">
          Track your performance and growth metrics
        </p>
      </div>

      {/* Revenue Over Time */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Revenue Over Time</h3>
            <p className="mt-0.5 text-xs text-white/30">
              Total: ${currentData.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
            </p>
          </div>
          <div className="flex rounded-lg border border-white/10 p-0.5">
            {(["30", "60", "90"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  timeRange === range
                    ? "bg-gold-500/20 text-gold-400"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {range}D
              </button>
            ))}
          </div>
        </div>

        <div className="relative" style={{ height: 220 }}>
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c5a55a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#c5a55a" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((pct) => (
              <line
                key={pct}
                x1="0"
                y1={chartHeight * pct}
                x2={chartWidth}
                y2={chartHeight * pct}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.3"
              />
            ))}
            {/* Area */}
            <motion.path
              d={areaPath}
              fill="url(#revenueGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            {/* Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#c5a55a"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Data points */}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="#c5a55a" />
            ))}
          </svg>
          {/* X-axis labels */}
          <div className="mt-2 flex justify-between">
            {currentData.filter((_, i) => i % 2 === 0 || i === currentData.length - 1).map((d) => (
              <span key={d.date} className="text-[10px] text-white/25">
                {d.date}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subscriber Growth & Revenue Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Subscriber Growth */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="mb-6 text-sm font-semibold text-white">
            Subscriber Growth
          </h3>
          <div className="flex items-end gap-4" style={{ height: 180 }}>
            {subscriberGrowth.map((item, i) => (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-[10px] font-medium text-white/40">
                  {item.count}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(item.count / maxSub) * 130}px`,
                  }}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className={`w-full rounded-lg ${
                    i === subscriberGrowth.length - 1
                      ? "bg-gradient-to-t from-blush-500 to-blush-400"
                      : "bg-white/10"
                  }`}
                />
                <span className="text-[10px] text-white/30">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="mb-6 text-sm font-semibold text-white">
            Revenue Breakdown
          </h3>
          <div className="space-y-4">
            {revenueBreakdown.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-white/60">{item.label}</span>
                  <span className="text-sm font-medium text-white">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                    className={`absolute inset-y-0 left-0 rounded-full ${item.color}`}
                  />
                </div>
                <p className="mt-1 text-[10px] text-white/25">
                  {item.percentage}% of total
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Top Performing Content
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-3 text-left text-xs font-medium text-white/30">
                  Content
                </th>
                <th className="pb-3 text-left text-xs font-medium text-white/30">
                  Type
                </th>
                <th className="pb-3 text-right text-xs font-medium text-white/30">
                  Views
                </th>
                <th className="pb-3 text-right text-xs font-medium text-white/30">
                  Revenue
                </th>
                <th className="pb-3 text-right text-xs font-medium text-white/30">
                  Engagement
                </th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((item, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="border-b border-white/[0.03] last:border-0"
                >
                  <td className="py-3 text-sm font-medium text-white/70">
                    {item.title}
                  </td>
                  <td className="py-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 text-right text-sm text-white/50">
                    {item.views.toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-sm font-medium text-gold-400">
                    {item.revenue}
                  </td>
                  <td className="py-3 text-right text-sm text-green-400">
                    {item.engagement}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Engagement Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {engagementMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center"
            >
              <p className="text-lg font-bold text-white">{metric.value}</p>
              <p className="mt-0.5 text-[10px] text-white/30">{metric.label}</p>
              <p
                className={`mt-1 text-[10px] font-medium ${
                  metric.positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.change}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
