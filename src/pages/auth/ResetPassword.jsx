import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Store,
  Check,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordCriteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
  const doPasswordsMatch =
    formData.password && formData.password === formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid || !doPasswordsMatch) return;

    setIsSubmitting(true);
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
                Strong Credential Security
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Updated passwords are encrypted and instantly revoked across
                older sessions.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-[8px] bg-white border border-[#E7E5E4] text-[#F97316] shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C1917]">
                Seamless Re-authentication
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Immediately log back in with your updated security setup.
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
                  Reset your password
                </h2>
                <p className="text-[#78716C] text-[16px] leading-[1.6] mt-2">
                  Create a new password for your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password">New Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-[#A8A29E] hover:text-[#1C1917] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">
                    Confirm New Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3.5 top-3 text-[#A8A29E] hover:text-[#1C1917] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#F5F5F4] border border-[#E7E5E4] rounded-[8px] space-y-2">
                  <p className="font-mono text-[12px] font-semibold text-[#78716C]">
                    PASSWORD MUST CONTAIN:
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[12px] text-[#78716C]">
                    <span
                      className={`flex items-center gap-1.5 ${passwordCriteria.length ? "text-[#F97316]" : ""}`}
                    >
                      <Check className="h-3 w-3" /> 8+ chars
                    </span>
                    <span
                      className={`flex items-center gap-1.5 ${passwordCriteria.uppercase ? "text-[#F97316]" : ""}`}
                    >
                      <Check className="h-3 w-3" /> Uppercase
                    </span>
                    <span
                      className={`flex items-center gap-1.5 ${passwordCriteria.lowercase ? "text-[#F97316]" : ""}`}
                    >
                      <Check className="h-3 w-3" /> Lowercase
                    </span>
                    <span
                      className={`flex items-center gap-1.5 ${passwordCriteria.number ? "text-[#F97316]" : ""}`}
                    >
                      <Check className="h-3 w-3" /> Number
                    </span>
                  </div>
                  {formData.confirmPassword && !doPasswordsMatch && (
                    <p className="font-mono text-[#F97316] text-[12px] pt-1">
                      Passwords do not match.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                  disabled={
                    !isPasswordValid || !doPasswordsMatch || isSubmitting
                  }
                >
                  {isSubmitting ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-[#E7E5E4] rounded-[8px] p-[32px] text-center space-y-6 shadow-xl shadow-stone-200/60"
            >
              <div className="mx-auto h-16 w-16 rounded-[9999px] bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
                <ShieldCheck className="h-9 w-9" />
              </div>

              <div className="space-y-2">
                <h2 className="text-[32px] font-normal leading-[1.1] text-[#1C1917]">
                  Password reset successfully
                </h2>
                <p className="text-[#78716C] text-[16px] leading-[1.6] max-w-sm mx-auto">
                  Your password has been updated. You can now sign in with your
                  new password.
                </p>
              </div>

              <Button
                onClick={() => (window.location.href = "#login")}
                className="w-full max-w-xs mx-auto bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
              >
                Back to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
