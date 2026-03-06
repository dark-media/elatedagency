"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  from: string;
  initials: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  read: boolean;
  isSystem: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    from: "Alex (Account Manager)",
    initials: "AM",
    subject: "Content Strategy Update - March",
    preview: "Hey Sarah! I've put together your content strategy for March...",
    body: "Hey Sarah!\n\nI've put together your content strategy for March based on your February performance data. Here are the key highlights:\n\n1. Your photo sets are outperforming video content by 23% in engagement\n2. Posting between 6-8 PM EST gets the best subscriber response\n3. I recommend increasing PPV content to 3x per week\n4. Your fitness journey series is your strongest performer - let's build on that\n\nLet's schedule a call this week to discuss the full plan. What times work for you?\n\nBest,\nAlex",
    time: "2 hours ago",
    read: false,
    isSystem: false,
  },
  {
    id: "2",
    from: "Elated Agency",
    initials: "EA",
    subject: "Congratulations! 1,000 Subscriber Milestone",
    preview: "You've just hit a major milestone - 1,000 subscribers!",
    body: "Congratulations Sarah!\n\nYou've just hit a major milestone - 1,000 subscribers! This is an incredible achievement and a testament to your hard work and dedication.\n\nHere are some stats from your journey:\n- Time to reach 1K: 4.5 months\n- Average monthly growth: 220 subscribers\n- Top month: February (132 new subs)\n\nAs a reward, you've unlocked access to our premium analytics tools and priority support.\n\nKeep up the amazing work!\n\nThe Elated Team",
    time: "5 hours ago",
    read: false,
    isSystem: true,
  },
  {
    id: "3",
    from: "Alex (Account Manager)",
    initials: "AM",
    subject: "February Revenue Report",
    preview: "Your February numbers are in and they look fantastic...",
    body: "Hi Sarah,\n\nYour February numbers are in and they look fantastic! Here's a quick summary:\n\n- Total Revenue: $11,800 (+23.5% from January)\n- Subscriptions: $6,900\n- Tips: $2,600\n- PPV: $1,800\n- Referral Bonus: $500\n\nYour growth trajectory puts you on track to hit $15K/month by April if we maintain this momentum.\n\nI'll have the detailed report uploaded to your dashboard by end of day.\n\nCheers,\nAlex",
    time: "1 day ago",
    read: true,
    isSystem: false,
  },
  {
    id: "4",
    from: "Elated Agency",
    initials: "EA",
    subject: "New Feature: Content Calendar",
    preview: "We've launched a new content calendar feature in your dashboard...",
    body: "Hi Sarah,\n\nExciting news! We've launched a brand new Content Calendar feature in your dashboard.\n\nWith the Content Calendar, you can:\n- Schedule posts in advance\n- View your posting frequency at a glance\n- Track content performance over time\n- Coordinate with your account manager on content themes\n\nHead over to Dashboard > Content to check it out.\n\nHappy creating!\n\nThe Elated Team",
    time: "3 days ago",
    read: true,
    isSystem: true,
  },
  {
    id: "5",
    from: "Alex (Account Manager)",
    initials: "AM",
    subject: "Re: Collaboration Opportunity",
    preview: "Great news! The collaboration with @fitqueenjess is confirmed...",
    body: "Great news, Sarah!\n\nThe collaboration with @fitqueenjess is confirmed for March 15th. Here's what we've agreed on:\n\n- Joint photo set + BTS video\n- Cross-promotion on both accounts\n- Shared PPV release on March 18th\n- Both accounts to promote starting March 12th\n\nI'll send you a detailed brief by Friday. Can you block out March 15th in your schedule?\n\nBest,\nAlex",
    time: "5 days ago",
    read: true,
    isSystem: false,
  },
  {
    id: "6",
    from: "Elated Agency",
    initials: "EA",
    subject: "Welcome to Elated Agency!",
    preview: "Welcome aboard, Sarah! We're thrilled to have you join the Elated family...",
    body: "Welcome aboard, Sarah!\n\nWe're thrilled to have you join the Elated family. Here's what happens next:\n\n1. Your dedicated account manager Alex will reach out within 24 hours\n2. We'll set up your custom content strategy\n3. Your dashboard is now fully active with analytics tracking\n4. Referral program is ready to go\n\nIf you have any questions, don't hesitate to reach out through this messaging system.\n\nExcited to help you grow!\n\nThe Elated Team",
    time: "2 weeks ago",
    read: true,
    isSystem: true,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [composing, setComposing] = useState(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const filteredMessages =
    filter === "unread" ? messages.filter((m) => !m.read) : messages;
  const unreadCount = messages.filter((m) => !m.read).length;

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    setComposing(false);
    if (!message.read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );
    }
  };

  const handleSend = () => {
    if (!composeSubject.trim() || !composeBody.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      from: "You",
      initials: "SJ",
      subject: composeSubject,
      preview: composeBody.slice(0, 60) + "...",
      body: composeBody,
      time: "Just now",
      read: true,
      isSystem: false,
    };
    setMessages((prev) => [newMessage, ...prev]);
    setComposeSubject("");
    setComposeBody("");
    setComposing(false);
    setSelectedMessage(newMessage);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="mt-1 text-sm text-white/40">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All caught up"}
          </p>
        </div>
        <button
          onClick={() => {
            setComposing(true);
            setSelectedMessage(null);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-sm font-semibold text-dark-950 transition-all duration-200 hover:shadow-[0_0_20px_rgba(197,165,90,0.3)]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Compose
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Message List */}
        <div className="lg:col-span-2">
          {/* Filter Tabs */}
          <div className="mb-4 flex gap-1 rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                filter === "all"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                filter === "unread"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Messages */}
          <div className="space-y-1">
            {filteredMessages.map((message) => (
              <motion.button
                key={message.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openMessage(message)}
                className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                  selectedMessage?.id === message.id
                    ? "border-gold-500/30 bg-gold-500/5"
                    : message.read
                    ? "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
                    : "border-gold-500/10 bg-gold-500/[0.03] hover:bg-gold-500/[0.05]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      message.isSystem
                        ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {message.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`truncate text-sm ${
                          message.read
                            ? "font-medium text-white/60"
                            : "font-semibold text-white"
                        }`}
                      >
                        {message.from}
                      </span>
                      <span className="shrink-0 text-[10px] text-white/25">
                        {message.time}
                      </span>
                    </div>
                    <p
                      className={`mt-0.5 truncate text-sm ${
                        message.read ? "text-white/40" : "font-medium text-white/70"
                      }`}
                    >
                      {message.subject}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/25">
                      {message.preview}
                    </p>
                  </div>
                  {!message.read && (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                  )}
                </div>
              </motion.button>
            ))}

            {filteredMessages.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-white/30">No messages to display</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail / Compose */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {composing ? (
              <motion.div
                key="compose"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    New Message
                  </h2>
                  <button
                    onClick={() => setComposing(false)}
                    className="rounded-lg p-1 text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">
                      To
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/50">
                      Elated Agency Support Team
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      placeholder="Enter subject"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-gold-500/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">
                      Message
                    </label>
                    <textarea
                      value={composeBody}
                      onChange={(e) => setComposeBody(e.target.value)}
                      rows={8}
                      placeholder="Write your message..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-200 focus:border-gold-500/50"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSend}
                      disabled={!composeSubject.trim() || !composeBody.trim()}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 transition-all duration-200 hover:shadow-[0_0_20px_rgba(197,165,90,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      Send Message
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="mb-6">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        selectedMessage.isSystem
                          ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {selectedMessage.initials}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-white">
                        {selectedMessage.subject}
                      </h2>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-white/50">
                          {selectedMessage.from}
                        </span>
                        <span className="text-xs text-white/20">
                          {selectedMessage.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-6">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/60">
                    {selectedMessage.body}
                  </div>
                </div>
                <div className="mt-6 border-t border-white/5 pt-4">
                  <button
                    onClick={() => {
                      setComposing(true);
                      setComposeSubject(`Re: ${selectedMessage.subject}`);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50 transition-all duration-200 hover:bg-white/[0.05] hover:text-white/70"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Reply
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-64 items-center justify-center rounded-xl border border-white/5 bg-white/[0.01]"
              >
                <div className="text-center">
                  <svg className="mx-auto h-10 w-10 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <p className="mt-3 text-sm text-white/25">
                    Select a message to view
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
