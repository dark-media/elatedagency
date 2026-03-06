"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold-500/20"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const stats = [
  { value: "$50M+", label: "Creator Revenue" },
  { value: "500+", label: "Active Creators" },
  { value: "3-10x", label: "Revenue Growth" },
  { value: "24/7", label: "AI Management" },
];

const particles = [
  { delay: 0, x: "10%", y: "20%", size: 4 },
  { delay: 1.2, x: "85%", y: "15%", size: 6 },
  { delay: 0.5, x: "70%", y: "60%", size: 3 },
  { delay: 2.1, x: "20%", y: "70%", size: 5 },
  { delay: 1.7, x: "50%", y: "30%", size: 4 },
  { delay: 0.9, x: "90%", y: "80%", size: 3 },
  { delay: 2.5, x: "30%", y: "85%", size: 5 },
  { delay: 1.4, x: "65%", y: "10%", size: 4 },
  { delay: 0.3, x: "5%", y: "50%", size: 6 },
  { delay: 2.8, x: "45%", y: "75%", size: 3 },
  { delay: 1.0, x: "80%", y: "40%", size: 5 },
  { delay: 3.2, x: "15%", y: "90%", size: 4 },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Video Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-24 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-dark-950/60 backdrop-blur-sm transition-all hover:border-gold-500/30 hover:bg-dark-950/80 sm:bottom-28 sm:right-8"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H3.75a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75h3z" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v12.74a.75.75 0 01-1.28.53l-4.72-3.15H3.75a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75h3z" />
          </svg>
        )}
      </button>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-[1] bg-dark-950"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-dark-950/40 via-transparent to-dark-950" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-dark-950/30 via-transparent to-dark-950/30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-32 text-center lg:px-8"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-5 py-2 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-sm font-medium text-gold-300">
            Now accepting new creators
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-white">The Future of</span>
          <br />
          <span className="gradient-text text-shadow-glow">
            OnlyFans Management
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-dark-300 sm:text-xl"
        >
          AI-powered management that delivers{" "}
          <span className="font-semibold text-gold-400">3-10x revenue growth</span>.
          Transparent pricing, no lock-in contracts, and 24/7 intelligent support
          built to maximize your earning potential.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/apply"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(197,165,90,0.5)] hover:-translate-y-1"
          >
            <span className="relative z-10">Apply Now</span>
            <svg
              className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/30 hover:bg-white/5 hover:-translate-y-1"
          >
            See How It Works
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </a>
        </motion.div>

        {/* Trust Signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-sm text-dark-500"
        >
          Takes less than 2 minutes. No commitment required.
        </motion.p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 bg-dark-950/60 backdrop-blur-xl"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/5 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
              className="px-4 py-5 text-center sm:py-6"
            >
              <div className="text-xl font-bold text-gold-400 sm:text-2xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-dark-400 sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
