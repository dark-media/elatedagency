"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const contractHistory = [
  { version: "v1.0", date: "Jan 15, 2026", status: "Signed", signedDate: "Jan 15, 2026" },
];

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

export default function ContractPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [contractSigned, setContractSigned] = useState(true);
  const [showNewContract, setShowNewContract] = useState(false);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.strokeStyle = "#c5a55a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [showNewContract]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasSigned(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    setSignatureData(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL();
    setSignatureData(data);
    setContractSigned(true);
    setShowNewContract(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contract</h1>
          <p className="mt-1 text-sm text-white/40">
            View and manage your management agreement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              contractSigned
                ? "border-green-500/20 bg-green-500/10 text-green-400"
                : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                contractSigned ? "bg-green-400" : "bg-yellow-400"
              }`}
            />
            {contractSigned ? "Contract Active" : "Pending Signature"}
          </span>
        </div>
      </div>

      {/* Contract Card */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02]">
        {/* Contract Header */}
        <div className="border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Management Agreement
              </h2>
              <p className="mt-0.5 text-xs text-white/30">
                Month-to-month | 20% commission | 7-day cancellation notice
              </p>
            </div>
            {!showNewContract && (
              <button
                onClick={() => setShowNewContract(true)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/50 transition-all hover:bg-white/[0.05] hover:text-white/70"
              >
                View & Re-sign
              </button>
            )}
          </div>
        </div>

        {/* Contract Body */}
        <div className="p-6">
          {showNewContract ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Contract Text */}
              <div className="max-h-96 overflow-y-auto rounded-xl border border-white/5 bg-dark-950 p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/60">
                  {contractText}
                </pre>
              </div>

              {/* Signature Pad */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    Digital Signature
                  </h3>
                  <button
                    onClick={clearSignature}
                    className="text-xs text-white/30 transition-colors hover:text-white/60"
                  >
                    Clear
                  </button>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-1">
                  <canvas
                    ref={canvasRef}
                    className="h-32 w-full cursor-crosshair rounded-lg bg-dark-950"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <p className="mt-2 text-center text-[10px] text-white/20">
                  Draw your signature above
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewContract(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/[0.05] hover:text-white/70"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSignature}
                  disabled={!hasSigned}
                  className="flex-1 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-dark-950 transition-all hover:shadow-[0_0_20px_rgba(197,165,90,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign Contract
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Key Terms Summary */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-white/30">Commission Rate</p>
                  <p className="mt-1 text-xl font-bold text-white">20%</p>
                  <p className="mt-0.5 text-[10px] text-white/25">
                    Of gross OnlyFans revenue
                  </p>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-white/30">Contract Term</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    Month-to-Month
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/25">
                    No long-term commitment
                  </p>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-white/30">Cancellation Notice</p>
                  <p className="mt-1 text-xl font-bold text-white">7 Days</p>
                  <p className="mt-0.5 text-[10px] text-white/25">
                    Written notice required
                  </p>
                </div>
              </div>

              {/* Services Included */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Services Included
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "Account Management",
                    "Content Strategy",
                    "Fan Engagement",
                    "Social Media Growth",
                    "Revenue Optimization",
                    "Monthly Reporting",
                    "Branding Support",
                    "Dedicated Manager",
                  ].map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2 text-sm text-white/50"
                    >
                      <svg className="h-4 w-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Display */}
              {signatureData && (
                <div className="rounded-xl border border-green-500/10 bg-green-500/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-green-400">
                      Contract signed digitally
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contract History */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Contract History
        </h3>
        <div className="space-y-3">
          {contractHistory.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.01] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/70">
                    Management Agreement {item.version}
                  </p>
                  <p className="text-xs text-white/30">
                    Signed on {item.signedDate}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-medium text-green-400">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
