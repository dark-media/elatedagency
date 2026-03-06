"use client";

import { useState, useEffect, useCallback } from "react";

interface Summary {
  totalBlogPosts: number;
  pendingTopics: number;
  totalProspects: number;
  highScoreProspects: number;
  totalOutreachSent: number;
  totalEmailsSent: number;
  totalChatSessions: number;
  totalApplications: number;
}

interface StatusData {
  summary: Summary;
  blogPosts: Array<Record<string, unknown>>;
  contentPlans: Array<Record<string, unknown>>;
  prospects: Array<Record<string, unknown>>;
  outreachMessages: Array<Record<string, unknown>>;
  discoveryLogs: Array<Record<string, unknown>>;
  emailQueue: Array<Record<string, unknown>>;
  emailSequences: Array<Record<string, unknown>>;
  chatSessions: Array<Record<string, unknown>>;
  applications: Array<Record<string, unknown>>;
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    published: "bg-green-500/20 text-green-400",
    sent: "bg-green-500/20 text-green-400",
    active: "bg-green-500/20 text-green-400",
    approved: "bg-green-500/20 text-green-400",
    planned: "bg-blue-500/20 text-blue-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    new: "bg-blue-500/20 text-blue-400",
    writing: "bg-purple-500/20 text-purple-400",
    contacted: "bg-orange-500/20 text-orange-400",
    failed: "bg-red-500/20 text-red-400",
    declined: "bg-red-500/20 text-red-400",
    error: "bg-red-500/20 text-red-400",
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${colors[status] || "bg-white/10 text-white/50"}`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<StatusData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState("overview");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/status", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (!res.ok) {
        if (res.status === 401) {
          setError("Invalid secret. Check your CRON_SECRET.");
          setAuthenticated(false);
          return;
        }
        throw new Error(`Error ${res.status}`);
      }
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [secret]);

  // Auto-refresh every 30s
  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [authenticated, fetchData]);

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dark-950 px-6">
        <div className="w-full max-w-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-white">
            Admin Dashboard
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchData();
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter CRON_SECRET"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-gold-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 py-3 font-semibold text-dark-950 transition-opacity disabled:opacity-50"
            >
              {loading ? "Loading..." : "Access Dashboard"}
            </button>
            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}
          </form>
        </div>
      </main>
    );
  }

  if (!data) return null;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "blog", label: "Blog" },
    { id: "prospects", label: "Prospects" },
    { id: "outreach", label: "Outreach" },
    { id: "emails", label: "Email Queue" },
    { id: "chats", label: "Chat Sessions" },
    { id: "apps", label: "Applications" },
  ];

  const s = data.summary;

  return (
    <main className="min-h-screen bg-dark-950 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Agent Dashboard
            </h1>
            <p className="mt-1 text-sm text-dark-400">
              Real-time view of all AI agent activity
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Blog Posts", value: s.totalBlogPosts, sub: `${s.pendingTopics} topics queued` },
            { label: "Prospects", value: s.totalProspects, sub: `${s.highScoreProspects} high-score` },
            { label: "Outreach Sent", value: s.totalOutreachSent, sub: `${s.totalEmailsSent} emails total` },
            { label: "Chat Sessions", value: s.totalChatSessions, sub: `${s.totalApplications} applications` },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="text-2xl font-bold text-gold-400">
                {card.value}
              </div>
              <div className="mt-1 text-sm font-medium text-white">
                {card.label}
              </div>
              <div className="mt-0.5 text-xs text-dark-500">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-gold-500/20 text-gold-400"
                  : "text-dark-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          {tab === "overview" && (
            <div className="divide-y divide-white/[0.06]">
              {/* Recent Discovery */}
              <div className="p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                  Recent Discovery Runs
                </h3>
                {data.discoveryLogs.length === 0 ? (
                  <p className="text-sm text-dark-500">No discovery runs yet. Cron runs daily at 12pm UTC.</p>
                ) : (
                  <div className="space-y-2">
                    {data.discoveryLogs.map((log) => (
                      <div key={log.id as string} className="flex items-center justify-between text-sm">
                        <div className="text-white/70">
                          <span className="text-white font-medium">{log.platform as string}</span> — &quot;{log.query as string}&quot;
                        </div>
                        <div className="flex items-center gap-3 text-dark-400">
                          <span>{log.resultsFound as number} found</span>
                          <span className="text-gold-400">{log.prospectsCreated as number} new</span>
                          <span>{formatDate(log.createdAt as string)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cron Schedule */}
              <div className="p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                  Cron Schedule (UTC)
                </h3>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  {[
                    { time: "Mon/Wed/Fri 8:00", task: "Generate Blog Post", path: "/api/cron/generate-blog" },
                    { time: "Daily 9:00", task: "Process Email Queue", path: "/api/cron/process-emails" },
                    { time: "Daily 10:00", task: "Advance Email Sequences", path: "/api/cron/advance-sequences" },
                    { time: "Daily 12:00", task: "Reddit Lead Discovery", path: "/api/cron/discover-reddit" },
                    { time: "Daily 14:00", task: "Process Outreach", path: "/api/cron/process-outreach" },
                    { time: "Daily 16:00", task: "Auto-Process Applications", path: "/api/cron/process-applications" },
                  ].map((cron) => (
                    <div key={cron.path} className="flex items-center gap-3 rounded-lg bg-white/[0.02] px-3 py-2">
                      <span className="font-mono text-xs text-gold-400">{cron.time}</span>
                      <span className="text-white/70">{cron.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "blog" && (
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Published Posts
              </h3>
              {data.blogPosts.length === 0 ? (
                <p className="text-sm text-dark-500">No blog posts yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-dark-500">
                      <th className="pb-2">Title</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Published</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.blogPosts.map((post) => (
                      <tr key={post.id as string}>
                        <td className="py-2 pr-4 text-white">
                          <a href={`/blog/${post.slug}`} className="hover:text-gold-400 transition-colors" target="_blank">
                            {post.title as string}
                          </a>
                        </td>
                        <td className="py-2 pr-4 text-dark-400">{post.category as string}</td>
                        <td className="py-2 pr-4"><StatusBadge status={post.published ? "published" : "draft"} /></td>
                        <td className="py-2 text-dark-400">{formatDate(post.publishedAt as string)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Content Plan ({data.contentPlans.filter((t) => t.status === "planned").length} queued)
              </h3>
              <div className="space-y-1">
                {data.contentPlans.map((topic) => (
                  <div key={topic.id as string} className="flex items-center justify-between py-1">
                    <span className="text-sm text-white/70">{topic.topic as string}</span>
                    <StatusBadge status={topic.status as string} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "prospects" && (
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Discovered Prospects ({data.prospects.length})
              </h3>
              {data.prospects.length === 0 ? (
                <p className="text-sm text-dark-500">No prospects discovered yet. Reddit discovery runs daily at 12pm UTC.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-dark-500">
                      <th className="pb-2">Username</th>
                      <th className="pb-2">Platform</th>
                      <th className="pb-2">Score</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Outreach</th>
                      <th className="pb-2">Discovered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.prospects.map((p) => (
                      <tr key={p.id as string}>
                        <td className="py-2 pr-4 text-white">{p.username as string}</td>
                        <td className="py-2 pr-4 text-dark-400">{p.platform as string}</td>
                        <td className="py-2 pr-4">
                          <span className={`font-mono font-medium ${(p.score as number) >= 60 ? "text-green-400" : (p.score as number) >= 40 ? "text-yellow-400" : "text-dark-400"}`}>
                            {p.score as number}
                          </span>
                        </td>
                        <td className="py-2 pr-4"><StatusBadge status={p.status as string} /></td>
                        <td className="py-2 pr-4 text-dark-400">Step {p.outreachStep as number}</td>
                        <td className="py-2 text-dark-400">{formatDate(p.createdAt as string)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === "outreach" && (
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Outreach Messages
              </h3>
              {data.outreachMessages.length === 0 ? (
                <p className="text-sm text-dark-500">No outreach sent yet. Requires prospects with score ≥ 60 and email addresses.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-dark-500">
                      <th className="pb-2">Prospect</th>
                      <th className="pb-2">Subject</th>
                      <th className="pb-2">Step</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Sent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.outreachMessages.map((msg) => (
                      <tr key={msg.id as string}>
                        <td className="py-2 pr-4 text-white">
                          {(msg.prospect as Record<string, string>)?.username || "—"}
                        </td>
                        <td className="py-2 pr-4 text-dark-400">{(msg.subject as string) || "—"}</td>
                        <td className="py-2 pr-4 text-dark-400">{msg.step as number}</td>
                        <td className="py-2 pr-4"><StatusBadge status={msg.status as string} /></td>
                        <td className="py-2 text-dark-400">{formatDate(msg.sentAt as string)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === "emails" && (
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Email Queue
              </h3>
              {data.emailQueue.length === 0 ? (
                <p className="text-sm text-dark-500">No emails in queue. Emails are triggered by newsletter signups, applications, and chat email captures.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-dark-500">
                      <th className="pb-2">To</th>
                      <th className="pb-2">Subject</th>
                      <th className="pb-2">Campaign</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Scheduled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.emailQueue.map((email) => (
                      <tr key={email.id as string}>
                        <td className="py-2 pr-4 text-white">{email.to as string}</td>
                        <td className="py-2 pr-4 text-dark-400 max-w-[200px] truncate">{email.subject as string}</td>
                        <td className="py-2 pr-4 text-dark-400">{email.campaignType as string}</td>
                        <td className="py-2 pr-4"><StatusBadge status={email.status as string} /></td>
                        <td className="py-2 text-dark-400">{formatDate(email.scheduledFor as string)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Active Sequences
              </h3>
              {data.emailSequences.length === 0 ? (
                <p className="text-sm text-dark-500">No active email sequences.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-dark-500">
                      <th className="pb-2">Email</th>
                      <th className="pb-2">Campaign</th>
                      <th className="pb-2">Step</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.emailSequences.map((seq) => (
                      <tr key={seq.id as string}>
                        <td className="py-2 pr-4 text-white">{seq.email as string}</td>
                        <td className="py-2 pr-4 text-dark-400">{seq.campaignType as string}</td>
                        <td className="py-2 pr-4 text-dark-400">Step {seq.currentStep as number}</td>
                        <td className="py-2 pr-4">
                          <StatusBadge status={seq.optedOut ? "opted-out" : seq.completed ? "completed" : "active"} />
                        </td>
                        <td className="py-2 text-dark-400">{formatDate(seq.updatedAt as string)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === "chats" && (
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Chat Sessions
              </h3>
              {data.chatSessions.length === 0 ? (
                <p className="text-sm text-dark-500">No chat sessions yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-dark-500">
                      <th className="pb-2">Visitor</th>
                      <th className="pb-2">Email</th>
                      <th className="pb-2">Messages</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Started</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.chatSessions.map((chat) => (
                      <tr key={chat.id as string}>
                        <td className="py-2 pr-4 font-mono text-xs text-white/50">
                          {(chat.visitorId as string)?.slice(0, 8)}...
                        </td>
                        <td className="py-2 pr-4 text-white">
                          {(chat.visitorEmail as string) || "—"}
                        </td>
                        <td className="py-2 pr-4 text-gold-400">
                          {(chat._count as Record<string, number>)?.messages || 0}
                        </td>
                        <td className="py-2 pr-4"><StatusBadge status={chat.status as string} /></td>
                        <td className="py-2 text-dark-400">{formatDate(chat.createdAt as string)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === "apps" && (
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                Applications
              </h3>
              {data.applications.length === 0 ? (
                <p className="text-sm text-dark-500">No applications submitted yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-dark-500">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Email</th>
                      <th className="pb-2">Earnings</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.applications.map((app) => (
                      <tr key={app.id as string}>
                        <td className="py-2 pr-4 text-white">{app.name as string}</td>
                        <td className="py-2 pr-4 text-dark-400">{app.email as string}</td>
                        <td className="py-2 pr-4 text-dark-400">{(app.currentEarnings as string) || "—"}</td>
                        <td className="py-2 pr-4"><StatusBadge status={app.status as string} /></td>
                        <td className="py-2 text-dark-400">{formatDate(app.createdAt as string)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
