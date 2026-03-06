import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://elatedagency.com"),
  title: {
    default: "Elated Agency | #1 AI-Powered OnlyFans Management Agency",
    template: "%s | Elated Agency",
  },
  description:
    "Elated Agency is the world's first fully AI-powered OnlyFans management agency. We help creators earn 3-10x more with AI chat management, content strategy, and 24/7 account optimization. Only 20% commission. No lock-in contracts. Apply in 2 minutes.",
  keywords: [
    "OnlyFans management",
    "OnlyFans agency",
    "OnlyFans management agency",
    "best OnlyFans agency",
    "OnlyFans manager",
    "OnlyFans growth",
    "OnlyFans revenue",
    "OnlyFans chatting service",
    "OnlyFans AI chat",
    "OnlyFans content strategy",
    "creator management",
    "content creator agency",
    "OnlyFans tips",
    "grow OnlyFans",
    "OnlyFans help",
    "OnlyFans account management",
    "OnlyFans marketing",
    "Fansly management",
    "adult content management",
    "OnlyFans promotion",
    "OnlyFans consulting",
    "make money OnlyFans",
    "OnlyFans success",
    "top OnlyFans agency",
    "OnlyFans management company",
    "Elated Agency",
  ],
  authors: [{ name: "Elated Agency" }],
  creator: "Elated Agency",
  publisher: "Elated Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elatedagency.com",
    siteName: "Elated Agency",
    title: "Elated Agency | #1 AI-Powered OnlyFans Management Agency",
    description:
      "The world's first fully AI-powered OnlyFans management agency. Earn 3-10x more. Only 20% commission. No contracts. Apply in 2 minutes.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elated Agency - Premium OnlyFans Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elated Agency | #1 AI-Powered OnlyFans Management Agency",
    description:
      "The world's first fully AI-powered OnlyFans management agency. Earn 3-10x more. Only 20% commission. No contracts.",
    images: ["/images/og-image.png"],
    creator: "@elatedagency",
  },
  alternates: {
    canonical: "https://elatedagency.com",
  },
  category: "Business",
  classification: "Talent Management Agency",
  other: {
    "google-site-verification": "",
    "msvalidate.01": "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elated Agency",
  alternateName: "Elated",
  url: "https://elatedagency.com",
  logo: "https://elatedagency.com/images/logo-full.png",
  description:
    "The world's first fully AI-powered OnlyFans management agency helping creators earn 3-10x more revenue.",
  email: "info@elatedagency.com",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [
    "https://instagram.com/elatedagency",
    "https://twitter.com/elatedagency",
    "https://tiktok.com/@elatedagency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@elatedagency.com",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  offers: {
    "@type": "Offer",
    description:
      "OnlyFans management services with AI-powered chat, content strategy, and revenue optimization",
    priceCurrency: "USD",
    price: "0",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Elated Agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Elated Agency is the world's first fully AI-powered OnlyFans management agency. We help creators earn 3-10x more through AI-powered chat management, content strategy, marketing, and 24/7 account optimization.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Elated Agency charge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Elated Agency charges only 20% of your net earnings (after OnlyFans takes their 20% cut). There are no upfront fees, no setup costs, and no long-term contracts. You can cancel anytime with 7 days notice.",
      },
    },
    {
      "@type": "Question",
      name: "How do I apply to Elated Agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Applying takes less than 2 minutes. Visit elatedagency.com/apply, fill out a short form, and our team will review your application within 24 hours. Once approved, you sign a simple month-to-month contract and we start optimizing your account immediately.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Elated Agency different from other OnlyFans agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Elated is the first agency to use AI at every level - from fan chat management that matches your voice, to revenue optimization, to content strategy. We offer the lowest commission rate in the industry (20%), no lock-in contracts, full transparency with a real-time dashboard, and 24/7 automated management.",
      },
    },
    {
      "@type": "Question",
      name: "Does Elated Agency have a referral program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! When you refer another creator to Elated Agency, you earn 5% of their monthly revenue for as long as they remain with us. Share your unique referral link and start earning passive income from every creator you bring in.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
