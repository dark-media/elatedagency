"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden pb-16 pt-32 lg:pb-20 lg:pt-44">
          <div className="absolute top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-gold-500/5 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Privacy <span className="gradient-text">Policy</span>
              </h1>
              <p className="mt-4 text-base text-white/50">
                Last updated: January 15, 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="prose-invert space-y-10"
            >
              {/* Introduction */}
              <div>
                <h2 className="text-xl font-bold text-white">1. Introduction</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Elated Agency (&quot;Elated,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information when you visit our website at elatedagency.com (the &quot;Site&quot;), use our management services, access our creator dashboard, or interact with us in any way.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
                <h3 className="mt-4 text-base font-semibold text-gold-400">2.1 Personal Information You Provide</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  We collect information that you voluntarily provide to us when you register for our services, fill out forms, apply to become a managed creator, contact us, or otherwise interact with our platform. This may include:
                </p>
                <ul className="mt-3 space-y-2 pl-5 text-sm text-white/60">
                  <li className="list-disc">Full legal name and preferred display name</li>
                  <li className="list-disc">Email address and phone number</li>
                  <li className="list-disc">OnlyFans account URL and username</li>
                  <li className="list-disc">Social media account handles and URLs</li>
                  <li className="list-disc">Date of birth and age verification information</li>
                  <li className="list-disc">Billing and payment information</li>
                  <li className="list-disc">Government-issued identification (for identity verification purposes)</li>
                  <li className="list-disc">Content and media you share with us for management purposes</li>
                  <li className="list-disc">Communication records between you and our team</li>
                </ul>

                <h3 className="mt-6 text-base font-semibold text-gold-400">2.2 Account Performance Data</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  When you grant us manager-level access to your OnlyFans account, we collect and process account performance data including subscriber counts, revenue figures, engagement metrics, message statistics, content performance analytics, and transaction records. This data is essential for providing our management, optimization, and reporting services.
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">2.3 Automatically Collected Information</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  When you access our website or dashboard, we automatically collect certain technical information, including your IP address, browser type and version, operating system, referring URLs, pages viewed, time spent on pages, click patterns, device identifiers, and access timestamps. We collect this information through cookies, web beacons, and similar tracking technologies.
                </p>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="mt-3 space-y-2 pl-5 text-sm text-white/60">
                  <li className="list-disc">To provide, operate, and maintain our management services</li>
                  <li className="list-disc">To manage your OnlyFans account in accordance with our service agreement</li>
                  <li className="list-disc">To train and operate our AI chatbot technology to match your communication style</li>
                  <li className="list-disc">To generate analytics, reports, and strategic recommendations</li>
                  <li className="list-disc">To optimize your content strategy, pricing, and revenue</li>
                  <li className="list-disc">To communicate with you about your account, services, and updates</li>
                  <li className="list-disc">To process payments and calculate commissions</li>
                  <li className="list-disc">To monitor for and enforce DMCA protections on your content</li>
                  <li className="list-disc">To improve and develop our services, AI technology, and platform</li>
                  <li className="list-disc">To comply with legal obligations and resolve disputes</li>
                  <li className="list-disc">To detect and prevent fraud, abuse, or security incidents</li>
                </ul>
              </div>

              {/* AI and Data Processing */}
              <div>
                <h2 className="text-xl font-bold text-white">4. AI Technology and Data Processing</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Our AI chatbot technology processes message data, communication patterns, and personality profiles to generate automated responses on your behalf. This processing occurs on secure servers, and the AI models trained on your data are unique to your account. We do not use your personal data or communication patterns to train AI models for other creators or for any other purpose without your explicit consent. You retain full control over the AI chat feature and may disable it at any time through your dashboard.
                </p>
              </div>

              {/* Sharing Information */}
              <div>
                <h2 className="text-xl font-bold text-white">5. How We Share Your Information</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  We do not sell, rent, or trade your personal information to third parties. We may share your information in the following limited circumstances:
                </p>
                <ul className="mt-3 space-y-2 pl-5 text-sm text-white/60">
                  <li className="list-disc"><strong className="text-white/80">Service Providers:</strong> We share data with trusted third-party vendors who assist us in operating our platform, processing payments, providing analytics, and delivering services. These providers are bound by confidentiality agreements and may only use your data to perform services on our behalf.</li>
                  <li className="list-disc"><strong className="text-white/80">Legal Requirements:</strong> We may disclose your information if required to do so by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
                  <li className="list-disc"><strong className="text-white/80">Business Transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.</li>
                  <li className="list-disc"><strong className="text-white/80">With Your Consent:</strong> We may share your information with third parties when you have given us explicit consent to do so.</li>
                </ul>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-xl font-bold text-white">6. Data Security</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include encryption of data in transit and at rest using TLS 1.3 and AES-256 encryption, multi-factor authentication for all team member access, regular security audits and penetration testing, strict access controls with role-based permissions, secure cloud infrastructure with SOC 2 Type II compliance, and comprehensive employee background checks and confidentiality agreements. While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the internet or method of electronic storage is 100% secure.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-xl font-bold text-white">7. Data Retention</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  We retain your personal information for as long as your account is active and for a reasonable period thereafter to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. If you terminate your relationship with Elated, we will retain your information for a period of 90 days to facilitate any transitions, after which we will delete or anonymize your data unless required by law to retain it. AI models trained on your data will be permanently deleted within 30 days of account termination.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-xl font-bold text-white">8. Your Rights</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Depending on your jurisdiction, you may have the following rights regarding your personal information:
                </p>
                <ul className="mt-3 space-y-2 pl-5 text-sm text-white/60">
                  <li className="list-disc"><strong className="text-white/80">Access:</strong> You have the right to request a copy of the personal information we hold about you.</li>
                  <li className="list-disc"><strong className="text-white/80">Rectification:</strong> You have the right to request that we correct any inaccurate or incomplete personal information.</li>
                  <li className="list-disc"><strong className="text-white/80">Deletion:</strong> You have the right to request that we delete your personal information, subject to certain exceptions.</li>
                  <li className="list-disc"><strong className="text-white/80">Portability:</strong> You have the right to request a copy of your data in a structured, commonly used, machine-readable format.</li>
                  <li className="list-disc"><strong className="text-white/80">Opt-Out:</strong> You have the right to opt out of certain data processing activities, including marketing communications.</li>
                  <li className="list-disc"><strong className="text-white/80">Restriction:</strong> You have the right to request that we restrict the processing of your personal information under certain circumstances.</li>
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  To exercise any of these rights, please contact us at info@elatedagency.com. We will respond to your request within 30 days.
                </p>
              </div>

              {/* CCPA */}
              <div>
                <h2 className="text-xl font-bold text-white">9. California Privacy Rights (CCPA)</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA). You have the right to know what personal information we collect, the purposes for which it is used, and whether it is sold or disclosed. You have the right to request deletion of your personal information. You have the right to opt out of the sale of your personal information. We do not sell personal information. You have the right to non-discrimination for exercising your CCPA rights.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-xl font-bold text-white">10. Cookies and Tracking Technologies</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  We use cookies and similar tracking technologies to enhance your experience on our Site. Essential cookies are required for the basic functionality of our website and cannot be disabled. Analytics cookies help us understand how visitors interact with our website so we can improve the user experience. Marketing cookies are used to deliver relevant advertisements and track campaign performance. You can control cookie preferences through your browser settings. Disabling certain cookies may limit your ability to use some features of our Site.
                </p>
              </div>

              {/* Third Party Links */}
              <div>
                <h2 className="text-xl font-bold text-white">11. Third-Party Links</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Our Site may contain links to third-party websites, including OnlyFans, social media platforms, and partner sites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              {/* Children */}
              <div>
                <h2 className="text-xl font-bold text-white">12. Children&apos;s Privacy</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Our services are strictly limited to individuals aged 18 and older. We do not knowingly collect personal information from anyone under the age of 18. If we discover that we have collected information from a minor, we will delete it immediately. If you believe a minor has provided us with personal information, please contact us at info@elatedagency.com.
                </p>
              </div>

              {/* International Transfers */}
              <div>
                <h2 className="text-xl font-bold text-white">13. International Data Transfers</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy, including the use of Standard Contractual Clauses approved by relevant authorities for transfers to countries without adequate data protection laws.
                </p>
              </div>

              {/* Changes */}
              <div>
                <h2 className="text-xl font-bold text-white">14. Changes to This Privacy Policy</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated Privacy Policy on our Site with a new &quot;Last Updated&quot; date and, where appropriate, by sending you a direct notification. Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-xl font-bold text-white">15. Contact Us</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-sm text-white/70">
                    <strong className="text-white">Elated Agency</strong>
                  </p>
                  <p className="mt-1 text-sm text-white/50">Email: info@elatedagency.com</p>
                  <p className="text-sm text-white/50">General: info@elatedagency.com</p>
                  <p className="text-sm text-white/50">Location: Los Angeles, CA, United States</p>
                </div>
              </div>

              {/* Back to home */}
              <div className="border-t border-white/10 pt-8">
                <Link
                  href="/"
                  className="text-sm font-medium text-gold-400 transition-colors hover:text-gold-300"
                >
                  &larr; Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
