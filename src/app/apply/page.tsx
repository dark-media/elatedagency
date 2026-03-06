"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  tiktok: string;
  twitter: string;
  onlyfansUrl: string;
  earningsRange: string;
  subscriberCount: string;
  contentType: string;
  timeOnPlatform: string;
  goals: string;
  servicesInterest: string[];
  referralCode: string;
  agreeTerms: boolean;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  instagram: "",
  tiktok: "",
  twitter: "",
  onlyfansUrl: "",
  earningsRange: "",
  subscriberCount: "",
  contentType: "",
  timeOnPlatform: "",
  goals: "",
  servicesInterest: [],
  referralCode: "",
  agreeTerms: false,
};

const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Social Media" },
  { id: 3, label: "Experience" },
  { id: 4, label: "Goals" },
  { id: 5, label: "Referral" },
  { id: 6, label: "Review" },
];

const earningsOptions = [
  "Just starting out ($0)",
  "$1 - $1,000/month",
  "$1,000 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000 - $25,000/month",
  "$25,000 - $50,000/month",
  "$50,000+/month",
];

const contentTypes = [
  "Fitness & Lifestyle",
  "Fashion & Beauty",
  "Cosplay & Creative",
  "Artistic & Photography",
  "Lifestyle & Personal",
  "Other",
];

const timeOptions = [
  "Haven't started yet",
  "Less than 3 months",
  "3 - 6 months",
  "6 - 12 months",
  "1 - 2 years",
  "2+ years",
];

const serviceOptions = [
  "Account Management",
  "Content Strategy",
  "Social Media Growth",
  "Fan Engagement & Messaging",
  "Branding & Marketing",
  "Revenue Optimization",
  "Analytics & Reporting",
  "Custom Content Scheduling",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

function ApplyPageInner() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setFormData((prev) => ({ ...prev, referralCode: ref }));
    }
  }, [searchParams]);

  const updateField = useCallback(
    (field: keyof FormData, value: string | boolean | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const toggleService = useCallback((service: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesInterest: prev.servicesInterest.includes(service)
        ? prev.servicesInterest.filter((s) => s !== service)
        : [...prev.servicesInterest, service],
    }));
  }, []);

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      switch (step) {
        case 1:
          if (!formData.name.trim()) newErrors.name = "Name is required";
          if (!formData.email.trim()) newErrors.email = "Email is required";
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Please enter a valid email";
          if (!formData.phone.trim()) newErrors.phone = "Phone is required";
          break;
        case 2:
          // Social media is optional, but validate OnlyFans URL format if provided
          if (
            formData.onlyfansUrl &&
            !formData.onlyfansUrl.includes("onlyfans.com")
          ) {
            newErrors.onlyfansUrl = "Please enter a valid OnlyFans URL";
          }
          break;
        case 3:
          if (!formData.earningsRange)
            newErrors.earningsRange = "Please select your earnings range";
          if (!formData.contentType)
            newErrors.contentType = "Please select your content type";
          if (!formData.timeOnPlatform)
            newErrors.timeOnPlatform = "Please select how long you've been on OF";
          break;
        case 4:
          if (!formData.goals.trim())
            newErrors.goals = "Please tell us about your goals";
          break;
        case 6:
          if (!formData.agreeTerms)
            newErrors.agreeTerms = "You must agree to the terms to continue";
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = async () => {
    if (!validateStep(6)) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setErrors({ submit: "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-dark-950 pt-24 pb-20">
          <div className="mx-auto max-w-2xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-400 shadow-[0_0_40px_rgba(197,165,90,0.3)]">
                <svg className="h-10 w-10 text-dark-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white">
                Application <span className="gradient-text">Submitted!</span>
              </h1>
              <p className="mb-12 text-lg text-white/60">
                Thank you for applying to Elated Agency. We&apos;re excited to
                potentially work with you.
              </p>

              <div className="mb-12 space-y-6 text-left">
                <h2 className="text-center text-xl font-semibold text-white">
                  What Happens Next
                </h2>
                {[
                  {
                    step: "1",
                    title: "Application Review",
                    desc: "Our team will review your application within 24-48 hours.",
                  },
                  {
                    step: "2",
                    title: "Discovery Call",
                    desc: "If approved, we'll schedule a quick call to discuss your goals.",
                  },
                  {
                    step: "3",
                    title: "Onboarding",
                    desc: "Once accepted, you'll get access to your personal dashboard and dedicated manager.",
                  },
                  {
                    step: "4",
                    title: "Growth Begins",
                    desc: "Your account manager begins implementing your custom strategy.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-sm font-bold text-dark-950">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/50">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 text-sm font-semibold text-dark-950 shadow-[0_0_20px_rgba(197,165,90,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,165,90,0.4)] hover:-translate-y-0.5"
                >
                  Create Your Account
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-gold-500/30 hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 pt-24 pb-20">
        <div className="mx-auto max-w-2xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
              Join <span className="gradient-text">Elated Agency</span>
            </h1>
            <p className="text-white/50">
              Take the first step towards maximizing your potential
            </p>
          </motion.div>

          {/* Step Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950"
                          : currentStep === step.id
                          ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950 shadow-[0_0_15px_rgba(197,165,90,0.4)]"
                          : "border border-white/10 bg-white/[0.03] text-white/30"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`mt-2 hidden text-[10px] font-medium sm:block ${
                        currentStep >= step.id ? "text-gold-400" : "text-white/20"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mx-1 h-px w-6 sm:mx-2 sm:w-12 md:w-16">
                      <div className="relative h-full w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500 to-gold-400"
                          initial={false}
                          animate={{
                            width: currentStep > step.id ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Let&apos;s start with the basics
                        </h2>
                        <p className="mt-1 text-sm text-white/40">
                          Tell us a little about yourself
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            Full Name <span className="text-gold-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Your full name"
                            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 ${
                              errors.name
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/10 focus:border-gold-500/50"
                            }`}
                          />
                          {errors.name && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            Email Address <span className="text-gold-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            placeholder="you@example.com"
                            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 ${
                              errors.email
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/10 focus:border-gold-500/50"
                            }`}
                          />
                          {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            Phone Number <span className="text-gold-400">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            placeholder="+1 (555) 000-0000"
                            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 ${
                              errors.phone
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/10 focus:border-gold-500/50"
                            }`}
                          />
                          {errors.phone && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Social Media */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Your social presence
                        </h2>
                        <p className="mt-1 text-sm text-white/40">
                          Share your social media handles (all optional)
                        </p>
                      </div>
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
                              value={formData.instagram}
                              onChange={(e) =>
                                updateField("instagram", e.target.value)
                              }
                              placeholder="username"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-8 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 focus:border-gold-500/50"
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
                              value={formData.tiktok}
                              onChange={(e) =>
                                updateField("tiktok", e.target.value)
                              }
                              placeholder="username"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-8 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 focus:border-gold-500/50"
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
                              value={formData.twitter}
                              onChange={(e) =>
                                updateField("twitter", e.target.value)
                              }
                              placeholder="username"
                              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-8 pr-4 text-sm text-white placeholder-white/20 transition-all duration-300 focus:border-gold-500/50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            OnlyFans URL
                          </label>
                          <input
                            type="url"
                            value={formData.onlyfansUrl}
                            onChange={(e) =>
                              updateField("onlyfansUrl", e.target.value)
                            }
                            placeholder="https://onlyfans.com/yourusername"
                            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 ${
                              errors.onlyfansUrl
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/10 focus:border-gold-500/50"
                            }`}
                          />
                          {errors.onlyfansUrl && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.onlyfansUrl}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Experience */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Your experience
                        </h2>
                        <p className="mt-1 text-sm text-white/40">
                          Help us understand where you are right now
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            Monthly Earnings{" "}
                            <span className="text-gold-400">*</span>
                          </label>
                          <select
                            value={formData.earningsRange}
                            onChange={(e) =>
                              updateField("earningsRange", e.target.value)
                            }
                            className={`w-full appearance-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white transition-all duration-300 ${
                              errors.earningsRange
                                ? "border-red-500/50"
                                : "border-white/10 focus:border-gold-500/50"
                            } ${!formData.earningsRange ? "text-white/20" : ""}`}
                          >
                            <option value="" className="bg-dark-900">
                              Select your earnings range
                            </option>
                            {earningsOptions.map((opt) => (
                              <option
                                key={opt}
                                value={opt}
                                className="bg-dark-900"
                              >
                                {opt}
                              </option>
                            ))}
                          </select>
                          {errors.earningsRange && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.earningsRange}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            Subscriber Count
                          </label>
                          <input
                            type="text"
                            value={formData.subscriberCount}
                            onChange={(e) =>
                              updateField("subscriberCount", e.target.value)
                            }
                            placeholder="e.g. 500"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 focus:border-gold-500/50"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            Content Type{" "}
                            <span className="text-gold-400">*</span>
                          </label>
                          <select
                            value={formData.contentType}
                            onChange={(e) =>
                              updateField("contentType", e.target.value)
                            }
                            className={`w-full appearance-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white transition-all duration-300 ${
                              errors.contentType
                                ? "border-red-500/50"
                                : "border-white/10 focus:border-gold-500/50"
                            } ${!formData.contentType ? "text-white/20" : ""}`}
                          >
                            <option value="" className="bg-dark-900">
                              Select your content type
                            </option>
                            {contentTypes.map((ct) => (
                              <option
                                key={ct}
                                value={ct}
                                className="bg-dark-900"
                              >
                                {ct}
                              </option>
                            ))}
                          </select>
                          {errors.contentType && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.contentType}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            Time on OnlyFans{" "}
                            <span className="text-gold-400">*</span>
                          </label>
                          <select
                            value={formData.timeOnPlatform}
                            onChange={(e) =>
                              updateField("timeOnPlatform", e.target.value)
                            }
                            className={`w-full appearance-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white transition-all duration-300 ${
                              errors.timeOnPlatform
                                ? "border-red-500/50"
                                : "border-white/10 focus:border-gold-500/50"
                            } ${!formData.timeOnPlatform ? "text-white/20" : ""}`}
                          >
                            <option value="" className="bg-dark-900">
                              How long have you been on OF?
                            </option>
                            {timeOptions.map((t) => (
                              <option
                                key={t}
                                value={t}
                                className="bg-dark-900"
                              >
                                {t}
                              </option>
                            ))}
                          </select>
                          {errors.timeOnPlatform && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.timeOnPlatform}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Goals */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Your goals
                        </h2>
                        <p className="mt-1 text-sm text-white/40">
                          What do you want to achieve with Elated?
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-white/70">
                            What are your goals?{" "}
                            <span className="text-gold-400">*</span>
                          </label>
                          <textarea
                            value={formData.goals}
                            onChange={(e) =>
                              updateField("goals", e.target.value)
                            }
                            rows={4}
                            placeholder="Tell us what you'd like to achieve... e.g. grow my subscriber base, increase monthly revenue, better content strategy"
                            className={`w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 ${
                              errors.goals
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/10 focus:border-gold-500/50"
                            }`}
                          />
                          {errors.goals && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.goals}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-3 block text-sm font-medium text-white/70">
                            Which services interest you?
                          </label>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {serviceOptions.map((service) => (
                              <button
                                key={service}
                                type="button"
                                onClick={() => toggleService(service)}
                                className={`rounded-xl border px-4 py-2.5 text-left text-sm transition-all duration-300 ${
                                  formData.servicesInterest.includes(service)
                                    ? "border-gold-500/50 bg-gold-500/10 text-gold-400"
                                    : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/70"
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span
                                    className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                                      formData.servicesInterest.includes(service)
                                        ? "border-gold-500 bg-gold-500"
                                        : "border-white/20"
                                    }`}
                                  >
                                    {formData.servicesInterest.includes(
                                      service
                                    ) && (
                                      <svg className="h-2.5 w-2.5 text-dark-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                      </svg>
                                    )}
                                  </span>
                                  {service}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Referral */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Referral
                        </h2>
                        <p className="mt-1 text-sm text-white/40">
                          Were you referred by someone? (optional)
                        </p>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-white/70">
                          Referral Code
                        </label>
                        <input
                          type="text"
                          value={formData.referralCode}
                          onChange={(e) =>
                            updateField("referralCode", e.target.value)
                          }
                          placeholder="Enter referral code if you have one"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 focus:border-gold-500/50"
                        />
                        <p className="mt-2 text-xs text-white/30">
                          If a creator referred you, enter their code here.
                          Both you and the referrer will receive benefits.
                        </p>
                      </div>
                      <div className="rounded-xl border border-gold-500/10 bg-gold-500/[0.03] p-5">
                        <div className="flex gap-3">
                          <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                          </svg>
                          <div>
                            <h3 className="text-sm font-semibold text-gold-400">
                              Referral Benefits
                            </h3>
                            <p className="mt-1 text-xs text-white/40">
                              Referred creators receive priority onboarding and
                              a dedicated welcome bonus. The referring creator
                              earns 5% of your revenue for 12 months.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Review & Submit */}
                  {currentStep === 6 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Review your application
                        </h2>
                        <p className="mt-1 text-sm text-white/40">
                          Make sure everything looks good
                        </p>
                      </div>
                      <div className="space-y-4">
                        {/* Basic Info Review */}
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gold-400">
                              Basic Info
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setDirection(-1);
                                setCurrentStep(1);
                              }}
                              className="text-xs text-white/30 transition-colors hover:text-gold-400"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="space-y-1.5 text-sm">
                            <p className="text-white/60">
                              <span className="text-white/30">Name: </span>
                              {formData.name}
                            </p>
                            <p className="text-white/60">
                              <span className="text-white/30">Email: </span>
                              {formData.email}
                            </p>
                            <p className="text-white/60">
                              <span className="text-white/30">Phone: </span>
                              {formData.phone}
                            </p>
                          </div>
                        </div>

                        {/* Social Media Review */}
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gold-400">
                              Social Media
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setDirection(-1);
                                setCurrentStep(2);
                              }}
                              className="text-xs text-white/30 transition-colors hover:text-gold-400"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="space-y-1.5 text-sm">
                            {formData.instagram && (
                              <p className="text-white/60">
                                <span className="text-white/30">Instagram: </span>
                                @{formData.instagram}
                              </p>
                            )}
                            {formData.tiktok && (
                              <p className="text-white/60">
                                <span className="text-white/30">TikTok: </span>
                                @{formData.tiktok}
                              </p>
                            )}
                            {formData.twitter && (
                              <p className="text-white/60">
                                <span className="text-white/30">Twitter: </span>
                                @{formData.twitter}
                              </p>
                            )}
                            {formData.onlyfansUrl && (
                              <p className="text-white/60">
                                <span className="text-white/30">OnlyFans: </span>
                                {formData.onlyfansUrl}
                              </p>
                            )}
                            {!formData.instagram &&
                              !formData.tiktok &&
                              !formData.twitter &&
                              !formData.onlyfansUrl && (
                                <p className="text-white/30 italic">
                                  No social media provided
                                </p>
                              )}
                          </div>
                        </div>

                        {/* Experience Review */}
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gold-400">
                              Experience
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setDirection(-1);
                                setCurrentStep(3);
                              }}
                              className="text-xs text-white/30 transition-colors hover:text-gold-400"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="space-y-1.5 text-sm">
                            <p className="text-white/60">
                              <span className="text-white/30">Earnings: </span>
                              {formData.earningsRange}
                            </p>
                            {formData.subscriberCount && (
                              <p className="text-white/60">
                                <span className="text-white/30">Subscribers: </span>
                                {formData.subscriberCount}
                              </p>
                            )}
                            <p className="text-white/60">
                              <span className="text-white/30">Content: </span>
                              {formData.contentType}
                            </p>
                            <p className="text-white/60">
                              <span className="text-white/30">Time on OF: </span>
                              {formData.timeOnPlatform}
                            </p>
                          </div>
                        </div>

                        {/* Goals Review */}
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gold-400">
                              Goals & Services
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setDirection(-1);
                                setCurrentStep(4);
                              }}
                              className="text-xs text-white/30 transition-colors hover:text-gold-400"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="space-y-1.5 text-sm">
                            <p className="text-white/60">{formData.goals}</p>
                            {formData.servicesInterest.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {formData.servicesInterest.map((s) => (
                                  <span
                                    key={s}
                                    className="rounded-full border border-gold-500/20 bg-gold-500/5 px-2.5 py-0.5 text-xs text-gold-400"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Referral Review */}
                        {formData.referralCode && (
                          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <h3 className="mb-2 text-sm font-semibold text-gold-400">
                              Referral
                            </h3>
                            <p className="text-sm text-white/60">
                              Code: {formData.referralCode}
                            </p>
                          </div>
                        )}

                        {/* Terms Agreement */}
                        <div className="mt-6">
                          <label className="flex cursor-pointer items-start gap-3">
                            <input
                              type="checkbox"
                              checked={formData.agreeTerms}
                              onChange={(e) =>
                                updateField("agreeTerms", e.target.checked)
                              }
                              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-gold-500 accent-gold-500"
                            />
                            <span className="text-sm text-white/50">
                              I agree to the{" "}
                              <Link
                                href="/terms"
                                className="text-gold-400 underline underline-offset-2 transition-colors hover:text-gold-300"
                              >
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link
                                href="/privacy"
                                className="text-gold-400 underline underline-offset-2 transition-colors hover:text-gold-300"
                              >
                                Privacy Policy
                              </Link>
                              . I understand that Elated Agency operates on a
                              commission-based model.
                            </span>
                          </label>
                          {errors.agreeTerms && (
                            <p className="mt-1.5 ml-7 text-xs text-red-400">
                              {errors.agreeTerms}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-white/5 px-6 py-4 sm:px-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white/50 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 shadow-[0_0_15px_rgba(197,165,90,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,165,90,0.4)] hover:-translate-y-0.5"
                >
                  Continue
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-2.5 text-sm font-semibold text-dark-950 shadow-[0_0_15px_rgba(197,165,90,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,165,90,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>

            {errors.submit && (
              <div className="border-t border-red-500/10 bg-red-500/5 px-6 py-3 sm:px-8">
                <p className="text-center text-sm text-red-400">
                  {errors.submit}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
      <ApplyPageInner />
    </Suspense>
  );
}
