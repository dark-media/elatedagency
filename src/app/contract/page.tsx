import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Management Agreement | Elated Agency",
  description:
    "Review Elated Agency's transparent management agreement. Month-to-month, 20% commission, 7-day cancellation — no lock-in contracts.",
};

const contractText = `MANAGEMENT AGREEMENT

This Management Agreement ("Agreement") is entered into between Elated Agency ("Agency") and the undersigned Creator ("Creator"), collectively referred to as the "Parties."

1. SERVICES

The Agency agrees to provide the following services to the Creator:
- Account management and optimization
- Content strategy development and planning
- Fan engagement and messaging management
- Social media growth and marketing
- Revenue optimization and analytics
- Branding and creative direction
- Performance tracking and reporting

2. COMMISSION STRUCTURE

The Agency shall receive a commission of twenty percent (20%) of the Creator's gross revenue generated through the OnlyFans platform during the term of this Agreement. This commission applies to all revenue streams including but not limited to:
- Subscription revenue
- Tips and donations
- Pay-per-view (PPV) content sales
- Custom content commissions
- Any other revenue generated through the platform

3. PAYMENT TERMS

Commission payments shall be calculated on a monthly basis. The Agency will provide a detailed revenue report by the 5th business day of each month for the previous month's earnings. Commission payments will be processed within 10 business days of the report date.

4. TERM AND TERMINATION

This Agreement shall be effective on a month-to-month basis, beginning on the date of execution. Either Party may terminate this Agreement by providing seven (7) calendar days written notice to the other Party. Upon termination:
- All pending commission payments remain due
- Creator retains all content and account ownership
- Agency will complete any scheduled content within the notice period
- Both parties agree to a professional handover process

5. CREATOR OBLIGATIONS

The Creator agrees to:
- Provide timely access to necessary accounts and platforms
- Respond to Agency communications within 24 hours
- Maintain consistent content creation as per the agreed schedule
- Comply with all platform terms of service
- Not engage another management agency during the term

6. AGENCY OBLIGATIONS

The Agency agrees to:
- Provide dedicated account management support
- Maintain confidentiality of all Creator information
- Provide transparent monthly reporting
- Act in the Creator's best interest at all times
- Respond to Creator inquiries within 12 hours during business days

7. INTELLECTUAL PROPERTY

All content created by the Creator remains the sole intellectual property of the Creator. The Agency is granted a limited license to use Creator content solely for the purposes of marketing and management as outlined in this Agreement.

8. CONFIDENTIALITY

Both Parties agree to maintain strict confidentiality regarding financial information, business strategies, personal information, and any other proprietary information shared during the course of this Agreement.

9. DISPUTE RESOLUTION

Any disputes arising from this Agreement shall first be addressed through good-faith negotiation between the Parties. If resolution cannot be reached within 30 days, the matter shall be submitted to binding arbitration.

10. GOVERNING LAW

This Agreement shall be governed by and construed in accordance with applicable laws. This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations and agreements.`;

const keyTerms = [
  { label: "Commission Rate", value: "20%", sub: "Of gross OnlyFans revenue" },
  { label: "Contract Term", value: "Month-to-Month", sub: "No long-term commitment" },
  { label: "Cancellation Notice", value: "7 Days", sub: "Written notice required" },
];

const services = [
  "Account Management",
  "Content Strategy",
  "Fan Engagement",
  "Social Media Growth",
  "Revenue Optimization",
  "Monthly Reporting",
  "Branding Support",
  "Dedicated Manager",
];

export default function ContractPage() {
  return (
    <main className="min-h-screen bg-dark-950 pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Management <span className="gradient-text">Agreement</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            Transparent, creator-friendly terms. No hidden fees, no lock-in
            contracts — just a straightforward partnership built on trust.
          </p>
        </div>

        {/* Key Terms */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {keyTerms.map((term) => (
            <div
              key={term.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-5 text-center"
            >
              <p className="text-xs font-medium text-white/40">{term.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{term.value}</p>
              <p className="mt-1 text-xs text-white/25">{term.sub}</p>
            </div>
          ))}
        </div>

        {/* Services Included */}
        <div className="mb-10 rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Services Included
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <svg
                  className="h-4 w-4 flex-shrink-0 text-gold-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Full Contract Text */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Full Agreement
          </h2>
          <div className="rounded-xl border border-white/5 bg-dark-950 p-6">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/60">
              {contractText}
            </pre>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-dark-300">
            Ready to grow your earnings with transparent, fair terms?
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-semibold text-dark-950 shadow-[0_0_30px_rgba(197,165,90,0.3)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(197,165,90,0.5)] hover:-translate-y-1"
          >
            Apply Now
            <svg
              className="h-5 w-5"
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
          </Link>
        </div>
      </div>
    </main>
  );
}
