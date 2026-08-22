import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Store, Check, ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
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
                Secure Account Recovery
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Token-encrypted link ensures only verified account owners reset
                access.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-[8px] bg-white border border-[#E7E5E4] text-[#F97316] shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C1917]">
                Protected Operations
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Instant audit logging keeps multi-branch permissions strictly
                safe.
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

          {!isSuccess ? (
            <div className="bg-white border border-[#E7E5E4] rounded-[8px] p-[24px] sm:p-[32px] backdrop-blur-sm shadow-xl shadow-stone-200/60">
              <div className="mb-8">
                <h2 className="text-[32px] font-normal leading-[1.1] text-[#1C1917]">
                  Forgot your password?
                </h2>
                <p className="text-[#78716C] text-[16px] leading-[1.6] mt-2">
                  No worries, we'll help you reset it.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-[#78716C] font-sans mt-1">
                    Enter the email address associated with your account.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#E7E5E4] text-center">
                <a
                  href="#login"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#78716C] hover:text-[#1C1917] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 text-[#F97316]" /> BACK TO LOGIN
                </a>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-[#E7E5E4] rounded-[8px] p-[32px] text-center space-y-6 shadow-xl shadow-stone-200/60"
            >
              <div className="mx-auto h-16 w-16 rounded-[9999px] bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
                <MailCheck className="h-9 w-9" />
              </div>

              <div className="space-y-2">
                <h2 className="text-[32px] font-normal leading-[1.1] text-[#1C1917]">
                  Check your email
                </h2>
                <p className="text-[#78716C] text-[16px] leading-[1.6] max-w-sm mx-auto">
                  We've sent a password reset link to{" "}
                  <span className="text-[#1C1917] font-medium">{email}</span>.
                </p>
                <p className="text-[#78716C] text-[14px] leading-[1.6] max-w-sm mx-auto pt-2">
                  Please check your inbox and follow the instructions to reset
                  your password.
                </p>
              </div>

              <Button
                onClick={() => (window.location.href = "#login")}
                className="w-full max-w-xs mx-auto bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
              >
                Back to Login
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
