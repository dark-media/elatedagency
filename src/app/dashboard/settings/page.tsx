"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
  });
  const [socials, setSocials] = useState({
    instagram: "sarahjfit",
    tiktok: "sarahjfit",
    twitter: "sarahjfit",
    onlyfans: "https://onlyfans.com/sarahjfit",
  });
  const [notifications, setNotifications] = useState({
    emailRevenue: true,
    emailMessages: true,
    emailMilestones: true,
    emailMarketing: false,
    pushNewSub: true,
    pushTips: true,
    pushMessages: true,
    pushSystem: true,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "social", label: "Social Media" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
    { id: "danger", label: "Danger Zone" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/40">
          Manage your account preferences
        </p>
      </div>

      {/* Save notification */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm text-green-400"
        >
          Settings saved successfully
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="space-y-1 rounded-xl border border-white/5 bg-white/[0.02] p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gold-500/10 text-gold-400"
                    : tab.id === "danger"
                    ? "text-red-400/50 hover:bg-red-500/5 hover:text-red-400"
                    : "text-white/40 hover:bg-white/5 hover:text-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
            >
              <h2 className="mb-6 text-lg font-semibold text-white">
                Profile Settings
              </h2>

              {/* Avatar */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-xl font-bold text-dark-950">
                  SJ
                </div>
                <div>
                  <button className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white">
                    Change Avatar
                  </button>
                  <p className="mt-1 text-[10px] text-white/25">
                    JPG, PNG. Max 2MB
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition-all focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition-all focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition-all focus:border-gold-500/50"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={showSaved}
                  className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 transition-all hover:shadow-[0_0_20px_rgba(197,165,90,0.3)]"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Social Media */}
          {activeTab === "social" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
            >
              <h2 className="mb-6 text-lg font-semibold text-white">
                Social Media Links
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Instagram
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30">
                      @
                    </span>
                    <input
                      type="text"
                      value={socials.instagram}
                      onChange={(e) =>
                        setSocials({ ...socials, instagram: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-8 pr-4 text-sm text-white transition-all focus:border-gold-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    TikTok
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30">
                      @
                    </span>
                    <input
                      type="text"
                      value={socials.tiktok}
                      onChange={(e) =>
                        setSocials({ ...socials, tiktok: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-8 pr-4 text-sm text-white transition-all focus:border-gold-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Twitter / X
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30">
                      @
                    </span>
                    <input
                      type="text"
                      value={socials.twitter}
                      onChange={(e) =>
                        setSocials({ ...socials, twitter: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-8 pr-4 text-sm text-white transition-all focus:border-gold-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    OnlyFans URL
                  </label>
                  <input
                    type="url"
                    value={socials.onlyfans}
                    onChange={(e) =>
                      setSocials({ ...socials, onlyfans: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition-all focus:border-gold-500/50"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={showSaved}
                  className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 transition-all hover:shadow-[0_0_20px_rgba(197,165,90,0.3)]"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
            >
              <h2 className="mb-6 text-lg font-semibold text-white">
                Notification Preferences
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium text-white/60">
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: "emailRevenue", label: "Revenue reports and earnings updates" },
                      { key: "emailMessages", label: "New messages from your manager" },
                      { key: "emailMilestones", label: "Milestone achievements and celebrations" },
                      { key: "emailMarketing", label: "Tips, guides, and marketing updates" },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-white/[0.01] p-3"
                      >
                        <span className="text-sm text-white/60">
                          {item.label}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key as keyof typeof prev],
                            }))
                          }
                          className={`relative h-6 w-11 rounded-full transition-all duration-200 ${
                            notifications[item.key as keyof typeof notifications]
                              ? "bg-gold-500"
                              : "bg-white/10"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                              notifications[item.key as keyof typeof notifications]
                                ? "left-[22px]"
                                : "left-0.5"
                            }`}
                          />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-white/60">
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: "pushNewSub", label: "New subscriber alerts" },
                      { key: "pushTips", label: "Tip notifications" },
                      { key: "pushMessages", label: "Direct messages" },
                      { key: "pushSystem", label: "System announcements" },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-white/[0.01] p-3"
                      >
                        <span className="text-sm text-white/60">
                          {item.label}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key as keyof typeof prev],
                            }))
                          }
                          className={`relative h-6 w-11 rounded-full transition-all duration-200 ${
                            notifications[item.key as keyof typeof notifications]
                              ? "bg-gold-500"
                              : "bg-white/10"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                              notifications[item.key as keyof typeof notifications]
                                ? "left-[22px]"
                                : "left-0.5"
                            }`}
                          />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={showSaved}
                  className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 transition-all hover:shadow-[0_0_20px_rgba(197,165,90,0.3)]"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
            >
              <h2 className="mb-6 text-lg font-semibold text-white">
                Change Password
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-gold-500/50"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setPasswords({ current: "", new: "", confirm: "" });
                    showSaved();
                  }}
                  className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 transition-all hover:shadow-[0_0_20px_rgba(197,165,90,0.3)]"
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          )}

          {/* Danger Zone */}
          {activeTab === "danger" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-6"
            >
              <h2 className="mb-2 text-lg font-semibold text-red-400">
                Danger Zone
              </h2>
              <p className="mb-6 text-sm text-white/40">
                These actions are permanent and cannot be undone.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-red-500/10 bg-dark-950/50 p-4">
                  <div>
                    <h3 className="text-sm font-medium text-white/70">
                      Delete Account
                    </h3>
                    <p className="mt-0.5 text-xs text-white/30">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  {!deleteConfirm ? (
                    <button
                      onClick={() => setDeleteConfirm(true)}
                      className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
                    >
                      Delete Account
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDeleteConfirm(false)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50 transition-all hover:bg-white/10"
                      >
                        Cancel
                      </button>
                      <button className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-red-600">
                        Confirm Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
