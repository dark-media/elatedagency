"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden pb-16 pt-32 lg:pb-20 lg:pt-44">
          <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-gold-500/5 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Terms of <span className="gradient-text">Service</span>
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
              {/* Acceptance */}
              <div>
                <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Creator,&quot; &quot;you,&quot; or &quot;your&quot;) and Elated Agency LLC (&quot;Elated,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a Delaware limited liability company. By accessing our website, creating an account, applying to our program, or using any of our services, you agree to be bound by these Terms, our Privacy Policy, and any additional terms and conditions that may apply to specific services.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  If you do not agree to these Terms, you must not access or use our services. You must be at least 18 years of age and legally capable of entering into binding contracts to use our services.
                </p>
              </div>

              {/* Description of Services */}
              <div>
                <h2 className="text-xl font-bold text-white">2. Description of Services</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Elated Agency provides OnlyFans talent management services including, but not limited to, account management, AI-powered subscriber chat, content strategy and scheduling, revenue optimization, social media marketing and growth, analytics and reporting, brand development, and DMCA content protection (&quot;Services&quot;). The specific scope of Services provided to you will be detailed during your onboarding process and may be customized based on your preferences and goals.
                </p>
              </div>

              {/* Account Access */}
              <div>
                <h2 className="text-xl font-bold text-white">3. Account Access and Permissions</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  To provide our Services, you agree to grant Elated manager-level access to your OnlyFans account through the platform&apos;s built-in manager permissions system. You acknowledge and agree that:
                </p>
                <ul className="mt-3 space-y-2 pl-5 text-sm text-white/60">
                  <li className="list-disc">We will never request your OnlyFans password or login credentials</li>
                  <li className="list-disc">Manager access will be used solely for the purposes of providing the agreed-upon Services</li>
                  <li className="list-disc">You retain full ownership and control of your OnlyFans account at all times</li>
                  <li className="list-disc">You may revoke manager access at any time through your OnlyFans account settings</li>
                  <li className="list-disc">We will not modify your payout information, banking details, or account security settings</li>
                  <li className="list-disc">All actions taken on your account will be logged and visible through our real-time dashboard</li>
                </ul>
              </div>

              {/* Commission and Payment */}
              <div>
                <h2 className="text-xl font-bold text-white">4. Commission Structure and Payment</h2>
                <h3 className="mt-4 text-base font-semibold text-gold-400">4.1 Commission Rate</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Elated charges a commission of twenty percent (20%) of your net earnings from the OnlyFans platform. &quot;Net earnings&quot; is defined as the gross revenue generated from your OnlyFans account minus the platform fee charged by OnlyFans (currently 20%). For example, if your gross revenue is $10,000, OnlyFans retains $2,000 (20%), and Elated&apos;s commission is $1,600 (20% of the remaining $8,000).
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">4.2 No Upfront Fees</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  There are no upfront fees, setup costs, onboarding charges, or hidden fees of any kind. Our commission is the only payment required and is based solely on performance. If you do not earn, you do not pay.
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">4.3 Payment Processing</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  OnlyFans pays you directly according to their standard payout schedule. Elated&apos;s commission will be calculated and invoiced monthly based on your verified earnings data. Invoices are due within 14 days of issuance. We accept payments via bank transfer, PayPal, and other major payment methods.
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">4.4 Disputes</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  If you believe a commission calculation is incorrect, you must notify us in writing within 30 days of the invoice date. We will review the disputed amount and provide supporting documentation. Any undisputed portion of an invoice remains due and payable.
                </p>
              </div>

              {/* Term and Termination */}
              <div>
                <h2 className="text-xl font-bold text-white">5. Term and Termination</h2>
                <h3 className="mt-4 text-base font-semibold text-gold-400">5.1 Term</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  This Agreement operates on a month-to-month basis commencing on the date you are accepted into our program and complete the onboarding process. There is no minimum commitment period.
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">5.2 Termination by Creator</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  You may terminate this Agreement at any time by providing thirty (30) days written notice to your account manager or by submitting a cancellation request through your creator dashboard. During the notice period, we will continue to provide full Services.
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">5.3 Termination by Elated</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  We reserve the right to terminate this Agreement with thirty (30) days written notice. We may also terminate immediately without notice if you breach these Terms, engage in illegal activity, violate OnlyFans terms of service, fail to pay commissions due, provide fraudulent information, or engage in conduct that could harm our reputation or the interests of other creators.
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">5.4 Effect of Termination</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Upon termination, we will remove all manager access from your OnlyFans account within 48 hours, provide a comprehensive handoff document, delete AI models trained on your data within 30 days, and invoice any outstanding commissions. All commissions earned through the date of termination remain due and payable.
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-xl font-bold text-white">6. Intellectual Property</h2>
                <h3 className="mt-4 text-base font-semibold text-gold-400">6.1 Your Content</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  You retain all ownership rights to your content, including photos, videos, text, and other materials you create (&quot;Your Content&quot;). By engaging our Services, you grant Elated a limited, non-exclusive, non-transferable license to use, reproduce, and distribute Your Content solely for the purpose of providing management services, including posting on your OnlyFans account and promoting your brand on social media channels as agreed upon.
                </p>

                <h3 className="mt-6 text-base font-semibold text-gold-400">6.2 Elated&apos;s Intellectual Property</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  All intellectual property related to Elated&apos;s platform, technology, AI systems, analytics tools, methodologies, and branding are and remain the exclusive property of Elated Agency. You may not copy, modify, distribute, sell, or otherwise exploit any of our proprietary technology or materials.
                </p>
              </div>

              {/* Confidentiality */}
              <div>
                <h2 className="text-xl font-bold text-white">7. Confidentiality</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Both parties agree to maintain the confidentiality of all non-public information received from the other party. This includes, but is not limited to, business strategies, financial information, subscriber data, content, technology, and proprietary methods. Confidential information shall not be disclosed to any third party without the prior written consent of the disclosing party, except as required by law or as necessary to provide the Services contemplated by these Terms.
                </p>
              </div>

              {/* Representations */}
              <div>
                <h2 className="text-xl font-bold text-white">8. Representations and Warranties</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  You represent and warrant that:
                </p>
                <ul className="mt-3 space-y-2 pl-5 text-sm text-white/60">
                  <li className="list-disc">You are at least 18 years of age</li>
                  <li className="list-disc">You have the legal right and authority to enter into this Agreement</li>
                  <li className="list-disc">All information you provide to us is accurate and complete</li>
                  <li className="list-disc">You are the rightful owner of your OnlyFans account and all content therein</li>
                  <li className="list-disc">Your content does not violate any applicable laws, regulations, or third-party rights</li>
                  <li className="list-disc">You will comply with OnlyFans terms of service at all times</li>
                  <li className="list-disc">You will promptly inform us of any changes to your account, personal information, or circumstances that may affect our Services</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-xl font-bold text-white">9. Limitation of Liability</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  To the maximum extent permitted by applicable law, Elated Agency and its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, revenue, data, goodwill, or other intangible losses, arising from or related to your use of our Services, regardless of the theory of liability. Our total aggregate liability for all claims arising out of or related to these Terms shall not exceed the total commissions paid by you to Elated during the twelve (12) months preceding the claim.
                </p>
              </div>

              {/* Indemnification */}
              <div>
                <h2 className="text-xl font-bold text-white">10. Indemnification</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  You agree to indemnify, defend, and hold harmless Elated Agency and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising from or related to your content, your violation of these Terms, your violation of any applicable law or regulation, your violation of any third-party rights, or any dispute between you and a subscriber or third party.
                </p>
              </div>

              {/* Disclaimer */}
              <div>
                <h2 className="text-xl font-bold text-white">11. Disclaimer of Warranties</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE ANY SPECIFIC RESULTS, REVENUE LEVELS, OR SUBSCRIBER GROWTH. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS. ALL PROJECTIONS AND ESTIMATES ARE FOR INFORMATIONAL PURPOSES ONLY.
                </p>
              </div>

              {/* Independent Contractor */}
              <div>
                <h2 className="text-xl font-bold text-white">12. Independent Contractor Relationship</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  The relationship between you and Elated is that of independent contractors. Nothing in these Terms creates an employer-employee, partnership, joint venture, or agency relationship. You are solely responsible for your own tax obligations, including income tax, self-employment tax, and any other applicable taxes.
                </p>
              </div>

              {/* Dispute Resolution */}
              <div>
                <h2 className="text-xl font-bold text-white">13. Dispute Resolution</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Any dispute, controversy, or claim arising out of or relating to these Terms or the breach thereof shall first be submitted to mediation in accordance with the rules of the American Arbitration Association. If mediation is unsuccessful, the dispute shall be resolved through binding arbitration conducted in Los Angeles County, California. The arbitration shall be conducted by a single arbitrator in accordance with the rules of the American Arbitration Association. The decision of the arbitrator shall be final and binding on both parties.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-xl font-bold text-white">14. Governing Law</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles. Any legal action or proceeding not subject to arbitration shall be brought exclusively in the state or federal courts located in Los Angeles County, California.
                </p>
              </div>

              {/* Modifications */}
              <div>
                <h2 className="text-xl font-bold text-white">15. Modifications to Terms</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and sending you a direct notification at least thirty (30) days before the changes take effect. Your continued use of our Services after the effective date of the modified Terms constitutes your acceptance of the changes. If you do not agree to the modified Terms, you may terminate this Agreement in accordance with Section 5.
                </p>
              </div>

              {/* Severability */}
              <div>
                <h2 className="text-xl font-bold text-white">16. Severability</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.
                </p>
              </div>

              {/* Entire Agreement */}
              <div>
                <h2 className="text-xl font-bold text-white">17. Entire Agreement</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  These Terms, together with the Privacy Policy and any additional agreements executed between you and Elated, constitute the entire agreement between the parties and supersede all prior negotiations, representations, and agreements. No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such provision or any other provision.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-xl font-bold text-white">18. Contact Information</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  For questions or concerns regarding these Terms of Service, please contact us:
                </p>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-sm text-white/70">
                    <strong className="text-white">Elated Agency LLC</strong>
                  </p>
                  <p className="mt-1 text-sm text-white/50">Email: legal@elatedagency.com</p>
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
