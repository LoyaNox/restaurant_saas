import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MailCheck,
  Store,
  Check,
  RefreshCw,
  Edit2,
  CheckCircle2,
  AlertOctagon,
  XCircle,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function VerifyEmail() {
  const [email, setEmail] = useState("owner@restaurant.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Verification status handling via query params (e.g. ?status=success | expired | invalid)

  // Initialize state directly from URL search params (no useEffect required)
  const [verificationStatus, setVerificationStatus] = useState(() => {
    if (typeof window === "undefined") return "pending";
    const urlParams = new URLSearchParams(window.location.search);
    const statusParam = urlParams.get("status");

    if (
      statusParam === "success" ||
      statusParam === "expired" ||
      statusParam === "invalid"
    ) {
      return statusParam;
    }
    return "pending";
  });

  const handleResendEmail = () => {
    setIsResending(true);
    setResendSuccess(false);

    // Simulated API call with rate limiting handling
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
    }, 1200);
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    if (!newEmail) return;
    setEmail(newEmail);
    setIsEditingEmail(false);
    setResendSuccess(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FAFAF9] text-[#1C1917] font-serif antialiased selection:bg-[#F97316] selection:text-white">
      {/* Left Hero Banner */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#F5F5F4] border-r border-[#E7E5E4] p-[80px] flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[8px] bg-[#F97316] flex items-center justify-center shadow-md">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="font-mono text-sm tracking-wider uppercase font-semibold text-[#1C1917]">
              DINEFLOW
            </span>
          </div>
          <h1 className="mt-12 text-[48px] font-normal leading-[1.04] text-[#1C1917] tracking-tight">
            Manage your restaurant smarter.
          </h1>
          <p className="mt-6 text-[#78716C] text-[16px] leading-[1.6]">
            Everything you need to handle orders, staff, menus, and multiple
            branches in one architectural operating interface.
          </p>
        </div>

        <div className="z-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-[8px] bg-white border border-[#E7E5E4] text-[#F97316] shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C1917]">
                Identity & Domain Security
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Ensures email authenticity and protects your SaaS account
                configuration.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-[8px] bg-white border border-[#E7E5E4] text-[#F97316] shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C1917]">
                Instant Onboarding
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Once verified, access all enterprise features and store profile
                setups.
              </p>
            </div>
          </div>
        </div>

        <div className="z-10 font-mono text-xs text-[#78716C]">
          [ SINCE 2026 ] © DINEFLOW ARCHITECTURE
        </div>
      </div>

      {/* Right Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-[24px] py-[80px] lg:px-[80px] overflow-y-auto">
        <div className="w-full max-w-xl">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-[8px] bg-[#F97316] flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="font-mono text-sm tracking-wider uppercase font-semibold text-[#1C1917]">
              DINEFLOW
            </span>
          </div>

          <AnimatePresence mode="wait">
            {/* STATE 1: Default Verification Waiting Screen */}
            {verificationStatus === "pending" && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#E7E5E4] rounded-[8px] p-[24px] sm:p-[32px] backdrop-blur-sm shadow-xl shadow-stone-200/60"
              >
                <div className="mx-auto h-16 w-16 rounded-[9999px] bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316] mb-6">
                  <MailCheck className="h-9 w-9" />
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-[32px] font-normal leading-[1.1] text-[#1C1917]">
                    Verify your email
                  </h2>
                  <p className="text-[#78716C] text-[16px] leading-[1.6] mt-2">
                    We've sent a verification link to your email address.
                  </p>
                </div>

                {/* Email Box display */}
                <div className="p-4 bg-[#F5F5F4] border border-[#E7E5E4] rounded-[8px] text-center space-y-1 mb-6">
                  <span className="font-mono text-[12px] uppercase text-[#78716C] font-semibold tracking-wider">
                    REGISTERED EMAIL ADDRESS
                  </span>
                  <p className="text-[#1C1917] font-semibold text-[16px]">
                    {email}
                  </p>
                </div>

                <p className="text-[#78716C] text-[14px] leading-[1.6] text-center mb-6">
                  Please check your inbox and click the verification link to
                  activate your account.
                  <br />
                  <span className="text-xs font-mono text-[#A8A29E] mt-1 block">
                    The verification link will expire after 24 hours.
                  </span>
                </p>

                {/* Resend success notice */}
                {resendSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-[8px] text-emerald-800 text-xs font-sans text-center"
                  >
                    Verification email sent successfully. Please check your
                    inbox.
                  </motion.div>
                )}

                {/* Inline Change Email Form */}
                {isEditingEmail ? (
                  <form
                    onSubmit={handleUpdateEmail}
                    className="mb-6 space-y-3 p-4 border border-[#E7E5E4] rounded-[8px] bg-[#FAFAF9]"
                  >
                    <Label htmlFor="newEmail">Update Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                      <Input
                        id="newEmail"
                        type="email"
                        placeholder="newowner@restaurant.com"
                        className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] font-sans"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-9 font-mono text-[11px] uppercase tracking-wider"
                      >
                        Update & Resend
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsEditingEmail(false)}
                        className="bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4] rounded-[8px] h-9 font-mono text-[11px] uppercase tracking-wider"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center mb-6">
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(true)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#78716C] hover:text-[#1C1917] transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-[#F97316]" /> Entered
                      the wrong email?{" "}
                      <span className="underline">Change email address</span>
                    </button>
                  </div>
                )}

                {/* Email Not Received Troubleshooting Box */}
                <div className="p-4 bg-[#F5F5F4] border border-[#E7E5E4] rounded-[8px] space-y-2 mb-6">
                  <p className="font-mono text-[12px] font-semibold text-[#1C1917] uppercase tracking-wider">
                    Didn't receive the email?
                  </p>
                  <ul className="text-xs text-[#78716C] font-sans space-y-1 pl-4 list-disc">
                    <li>Check your spam or junk folder</li>
                    <li>Make sure your email address is correct</li>
                    <li>Wait a few minutes and try again</li>
                  </ul>
                </div>

                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] hover:bg-[#E7E5E4] rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                >
                  {isResending ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 text-[#F97316]" /> Resend
                      Verification Email
                    </span>
                  )}
                </Button>

                <p className="mt-8 text-center text-xs font-mono text-[#78716C]">
                  ALREADY VERIFIED?{" "}
                  <a
                    href="#login"
                    className="text-[#F97316] font-semibold hover:underline"
                  >
                    LOG IN
                  </a>
                </p>
              </motion.div>
            )}

            {/* STATE 2: Verification Success Screen */}
            {verificationStatus === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#E7E5E4] rounded-[8px] p-[32px] text-center space-y-6 shadow-xl shadow-stone-200/60"
              >
                <div className="mx-auto h-16 w-16 rounded-[9999px] bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-[32px] font-normal leading-[1.1] text-[#1C1917]">
                    Email verified successfully!
                  </h2>
                  <p className="text-[#78716C] text-[16px] leading-[1.6] max-w-sm mx-auto">
                    Your email address has been verified.
                    <br />
                    Your Restaurant SaaS account is now ready.
                  </p>
                </div>

                <Button
                  onClick={() => (window.location.href = "#login")}
                  className="w-full max-w-xs mx-auto bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                >
                  Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* STATE 3: Expired Verification Link Screen */}
            {verificationStatus === "expired" && (
              <motion.div
                key="expired"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#E7E5E4] rounded-[8px] p-[32px] text-center space-y-6 shadow-xl shadow-stone-200/60"
              >
                <div className="mx-auto h-16 w-16 rounded-[9999px] bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <AlertOctagon className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-[32px] font-normal leading-[1.1] text-[#1C1917]">
                    Verification link expired
                  </h2>
                  <p className="text-[#78716C] text-[16px] leading-[1.6] max-w-sm mx-auto">
                    This verification link has expired.
                    <br />
                    Request a new verification link to continue.
                  </p>
                </div>

                <Button
                  onClick={() => setVerificationStatus("pending")}
                  className="w-full max-w-xs mx-auto bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                >
                  Resend Verification Email
                </Button>
              </motion.div>
            )}

            {/* STATE 4: Invalid Verification Link Screen */}
            {verificationStatus === "invalid" && (
              <motion.div
                key="invalid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#E7E5E4] rounded-[8px] p-[32px] text-center space-y-6 shadow-xl shadow-stone-200/60"
              >
                <div className="mx-auto h-16 w-16 rounded-[9999px] bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                  <XCircle className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-[32px] font-normal leading-[1.1] text-[#1C1917]">
                    Invalid verification link
                  </h2>
                  <p className="text-[#78716C] text-[16px] leading-[1.6] max-w-sm mx-auto">
                    This verification link is invalid or has already been used.
                    <br />
                    Please request a new verification email.
                  </p>
                </div>

                <Button
                  onClick={() => setVerificationStatus("pending")}
                  className="w-full max-w-xs mx-auto bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                >
                  Resend Verification Email
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
