"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { HiStar } from "react-icons/hi2";

const testimonials = [
  {
    name: "Emily Carter",
    handle: "@emilycarter",
    image: "/images/elated_agency_1.jpeg",
    rating: 5,
    quote:
      "Elated completely transformed my OnlyFans. In three months, I went from barely covering my rent to earning more than I ever thought possible. Their AI chat is a game changer.",
    revenue: "$2K to $18K/mo",
  },
  {
    name: "Mia Thompson",
    handle: "@miathompson",
    image: "/images/elated_agency_3.jpeg",
    rating: 5,
    quote:
      "I was with two other agencies before Elated. The difference is night and day. Transparent pricing, no shady contracts, and they actually deliver on their promises.",
    revenue: "$5K to $28K/mo",
  },
  {
    name: "Sophia Rivera",
    handle: "@sophiarivera",
    image: "/images/elated_agency_5.jpeg",
    rating: 5,
    quote:
      "The content strategy team helped me rebrand and find my niche. My engagement tripled in the first month. I finally feel like I have a real business partner.",
    revenue: "$3K to $22K/mo",
  },
  {
    name: "Jessica Laurent",
    handle: "@jessicalaurent",
    image: "/images/elated_agency_7.jpeg",
    rating: 5,
    quote:
      "What I love most is the transparency. I can see every penny in real-time on the dashboard. No surprises, no hidden fees. And the growth has been incredible.",
    revenue: "$1.5K to $12K/mo",
  },
  {
    name: "Ava Mitchell",
    handle: "@avamitchell",
    image: "/images/elated_agency_9.jpeg",
    rating: 5,
    quote:
      "The 24/7 management means I never miss a message. My subscribers are happier, retention is up, and I have my weekends back. This is how agencies should work.",
    revenue: "$4K to $31K/mo",
  },
  {
    name: "Isabella Rose",
    handle: "@isabellarose",
    image: "/images/elated_agency_4.jpeg",
    rating: 5,
    quote:
      "I was skeptical about the AI chat, but it genuinely sounds like me. My subscribers can not tell the difference and my response time went from hours to seconds.",
    revenue: "$6K to $35K/mo",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        if (scrollPos >= el.scrollWidth / 2) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 section-gradient" id="testimonials">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-blush-500/[0.03] blur-[120px]" />

      <div className="relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl px-6 text-center lg:px-8"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Loved by <span className="gradient-text">Creators</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            Hear from the creators who have transformed their careers with
            Elated.
          </p>
        </motion.div>

        {/* Scrolling Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          {/* Fade edges */}
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#0a0a0c] to-transparent sm:w-32" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#0a0a0c] to-transparent sm:w-32" />

            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-6 overflow-hidden px-6"
              style={{ scrollBehavior: "auto" }}
            >
              {/* Double the testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="group w-[350px] flex-shrink-0 sm:w-[400px]"
                >
                  <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/20 hover:bg-white/[0.04]">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold-500/20">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">
                          {t.name}
                        </div>
                        <div className="text-xs text-dark-500">{t.handle}</div>
                      </div>
                      <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-400">
                        {t.revenue}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="mt-4 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <HiStar
                          key={j}
                          className="h-4 w-4 text-gold-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="mt-4 text-sm leading-relaxed text-dark-300">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
