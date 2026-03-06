"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "calendar" | "list";

interface ContentItem {
  id: string;
  title: string;
  type: "photo" | "video" | "live" | "ppv";
  status: "published" | "scheduled" | "draft" | "queued";
  date: string;
  time: string;
  views: number;
  revenue: number;
  engagement: number;
  day: number;
}

const mockContent: ContentItem[] = [
  { id: "1", title: "Fitness Journey - Week 13", type: "photo", status: "scheduled", date: "Mar 6, 2026", time: "7:00 PM", views: 0, revenue: 0, engagement: 0, day: 6 },
  { id: "2", title: "BTS - Studio Session", type: "video", status: "scheduled", date: "Mar 7, 2026", time: "8:00 PM", views: 0, revenue: 0, engagement: 0, day: 7 },
  { id: "3", title: "Exclusive Q&A - March", type: "live", status: "scheduled", date: "Mar 8, 2026", time: "9:00 PM", views: 0, revenue: 0, engagement: 0, day: 8 },
  { id: "4", title: "Morning Routine Update", type: "photo", status: "draft", date: "Mar 10, 2026", time: "6:00 PM", views: 0, revenue: 0, engagement: 0, day: 10 },
  { id: "5", title: "PPV - Premium Set 14", type: "ppv", status: "queued", date: "Mar 11, 2026", time: "7:00 PM", views: 0, revenue: 0, engagement: 0, day: 11 },
  { id: "6", title: "Collab with @fitqueenjess", type: "photo", status: "scheduled", date: "Mar 15, 2026", time: "8:00 PM", views: 0, revenue: 0, engagement: 0, day: 15 },
  { id: "7", title: "Weekend Vlog", type: "video", status: "draft", date: "Mar 16, 2026", time: "5:00 PM", views: 0, revenue: 0, engagement: 0, day: 16 },
  { id: "8", title: "Fitness Journey - Week 12", type: "photo", status: "published", date: "Mar 3, 2026", time: "7:00 PM", views: 4280, revenue: 890, engagement: 94, day: 3 },
  { id: "9", title: "Behind the Scenes Vlog", type: "video", status: "published", date: "Mar 2, 2026", time: "8:00 PM", views: 3650, revenue: 720, engagement: 88, day: 2 },
  { id: "10", title: "Live Q&A - February Recap", type: "live", status: "published", date: "Mar 1, 2026", time: "9:00 PM", views: 2890, revenue: 650, engagement: 92, day: 1 },
  { id: "11", title: "PPV - Premium Set 13", type: "ppv", status: "published", date: "Feb 28, 2026", time: "7:00 PM", views: 1920, revenue: 1240, engagement: 78, day: 28 },
  { id: "12", title: "Travel Diary - Miami", type: "photo", status: "published", date: "Feb 25, 2026", time: "6:00 PM", views: 2100, revenue: 420, engagement: 81, day: 25 },
];

const uploadQueue = [
  { name: "beach_set_14.zip", size: "245 MB", progress: 100, status: "ready" },
  { name: "studio_bts.mp4", size: "1.2 GB", progress: 67, status: "uploading" },
  { name: "march_preview.jpg", size: "4.2 MB", progress: 100, status: "ready" },
];

const daysInMonth = 31;
const firstDayOffset = 6; // March 2026 starts on a Sunday (offset 0 for Sun, so 6 for Sat... let's use 0 for Sunday)

const typeColors: Record<string, string> = {
  photo: "bg-blue-500/20 text-blue-400 border-blue-500/20",
  video: "bg-purple-500/20 text-purple-400 border-purple-500/20",
  live: "bg-green-500/20 text-green-400 border-green-500/20",
  ppv: "bg-gold-500/20 text-gold-400 border-gold-500/20",
};

const statusColors: Record<string, string> = {
  published: "border-green-500/20 bg-green-500/10 text-green-400",
  scheduled: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  draft: "border-white/10 bg-white/5 text-white/40",
  queued: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
};

export default function ContentPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  const scheduledItems = mockContent.filter(
    (c) => c.status === "scheduled" || c.status === "queued"
  );
  const publishedItems = mockContent.filter((c) => c.status === "published");

  // Generate calendar grid
  const calendarDays: (number | null)[] = [];
  // March 2026 starts on Sunday (day 0)
  for (let i = 0; i < 0; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  const getContentForDay = (day: number) =>
    mockContent.filter((c) => c.day === day);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content</h1>
          <p className="mt-1 text-sm text-white/40">
            Manage your content calendar and uploads
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setViewMode("calendar")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                viewMode === "calendar"
                  ? "bg-gold-500/20 text-gold-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                viewMode === "list"
                  ? "bg-gold-500/20 text-gold-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Published", value: publishedItems.length.toString(), color: "text-green-400" },
          { label: "Scheduled", value: scheduledItems.length.toString(), color: "text-blue-400" },
          { label: "In Queue", value: uploadQueue.length.toString(), color: "text-yellow-400" },
          { label: "Avg. Engagement", value: "87%", color: "text-gold-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-0.5 text-xs text-white/30">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              March 2026
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 text-[10px]">
                {Object.entries(typeColors).map(([type, colors]) => (
                  <span
                    key={type}
                    className={`rounded-full border px-2 py-0.5 ${colors}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-white/5">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="bg-white/[0.03] px-2 py-2 text-center text-[10px] font-medium text-white/30"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, i) => {
              const content = day ? getContentForDay(day) : [];
              const isToday = day === 5;
              return (
                <div
                  key={i}
                  className={`min-h-[80px] bg-white/[0.01] p-1.5 ${
                    day ? "hover:bg-white/[0.03]" : "bg-white/[0.005]"
                  } transition-colors`}
                >
                  {day && (
                    <>
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${
                          isToday
                            ? "bg-gold-500 font-bold text-dark-950"
                            : "text-white/40"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {content.slice(0, 2).map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedContent(item)}
                            className={`w-full truncate rounded px-1 py-0.5 text-left text-[9px] font-medium border ${
                              typeColors[item.type]
                            } transition-all hover:opacity-80`}
                          >
                            {item.title}
                          </button>
                        ))}
                        {content.length > 2 && (
                          <span className="block text-[9px] text-white/25">
                            +{content.length - 2} more
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">
            All Content
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-3 text-left text-xs font-medium text-white/30">
                    Content
                  </th>
                  <th className="pb-3 text-left text-xs font-medium text-white/30">
                    Type
                  </th>
                  <th className="pb-3 text-left text-xs font-medium text-white/30">
                    Status
                  </th>
                  <th className="pb-3 text-left text-xs font-medium text-white/30">
                    Date
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
                {mockContent.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.03 * i }}
                    onClick={() => setSelectedContent(item)}
                    className="cursor-pointer border-b border-white/[0.03] transition-colors hover:bg-white/[0.02] last:border-0"
                  >
                    <td className="py-3 text-sm font-medium text-white/70">
                      {item.title}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                          typeColors[item.type]
                        }`}
                      >
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                          statusColors[item.status]
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-white/40">
                      {item.date}
                    </td>
                    <td className="py-3 text-right text-sm text-white/50">
                      {item.views > 0 ? item.views.toLocaleString() : "--"}
                    </td>
                    <td className="py-3 text-right text-sm font-medium text-gold-400">
                      {item.revenue > 0 ? `$${item.revenue}` : "--"}
                    </td>
                    <td className="py-3 text-right text-sm text-green-400">
                      {item.engagement > 0 ? `${item.engagement}%` : "--"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Queue */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Upload Queue</h3>
          <button className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload Files
          </button>
        </div>

        <div className="space-y-3">
          {uploadQueue.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.01] p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                <svg className="h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-white/70">
                    {file.name}
                  </p>
                  <span className="ml-2 text-xs text-white/25">{file.size}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        file.status === "ready"
                          ? "bg-green-500"
                          : "bg-gold-500"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-medium ${
                      file.status === "ready"
                        ? "text-green-400"
                        : "text-gold-400"
                    }`}
                  >
                    {file.status === "ready"
                      ? "Ready"
                      : `${file.progress}%`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Posts */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Upcoming Scheduled Posts
        </h3>
        <div className="space-y-2">
          {scheduledItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.01] p-3"
            >
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{item.day}</p>
                  <p className="text-[10px] text-white/25">Mar</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/70">
                    {item.title}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span
                      className={`rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${
                        typeColors[item.type]
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-[10px] text-white/25">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  statusColors[item.status]
                }`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Detail Modal */}
      <AnimatePresence>
        {selectedContent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContent(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-dark-900 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedContent.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                        typeColors[selectedContent.type]
                      }`}
                    >
                      {selectedContent.type.charAt(0).toUpperCase() +
                        selectedContent.type.slice(1)}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                        statusColors[selectedContent.status]
                      }`}
                    >
                      {selectedContent.status.charAt(0).toUpperCase() +
                        selectedContent.status.slice(1)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="rounded-lg p-1 text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-sm text-white/40">Date</span>
                  <span className="text-sm font-medium text-white/70">
                    {selectedContent.date} at {selectedContent.time}
                  </span>
                </div>
                {selectedContent.views > 0 && (
                  <>
                    <div className="flex justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-sm text-white/40">Views</span>
                      <span className="text-sm font-medium text-white/70">
                        {selectedContent.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-sm text-white/40">Revenue</span>
                      <span className="text-sm font-medium text-gold-400">
                        ${selectedContent.revenue}
                      </span>
                    </div>
                    <div className="flex justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-sm text-white/40">Engagement</span>
                      <span className="text-sm font-medium text-green-400">
                        {selectedContent.engagement}%
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                {selectedContent.status === "draft" && (
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2.5 text-sm font-semibold text-dark-950">
                    Schedule Post
                  </button>
                )}
                <button
                  onClick={() => setSelectedContent(null)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/[0.05]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
