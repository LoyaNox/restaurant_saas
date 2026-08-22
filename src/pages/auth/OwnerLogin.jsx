import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Store,
  ArrowRight,
  Sparkles,
  Utensils,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

export default function OwnerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FAF9F6] text-[#1C1917] font-sans antialiased selection:bg-[#F97316] selection:text-white relative overflow-hidden">
      {/* Background Accent Lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F97316]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-400/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Light Glass Banner */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative z-10">
        <div className="h-full w-full bg-white/70 border border-stone-200/80 rounded-3xl p-12 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden shadow-xl shadow-stone-200/50">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-gradient-to-br from-[#F97316]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-lg shadow-[#F97316]/20">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-wider uppercase bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent">
                DINEFLOW
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-[#F97316] uppercase font-semibold">
                Enterprise OS
              </span>
            </div>
          </div>

          {/* Middle Value Proposition */}
          <div className="my-auto py-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-xs font-semibold text-[#EA580C] mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Restaurant Architecture</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-stone-900">
              Elevate your culinary operations.
            </h1>
            <p className="mt-6 text-stone-600 text-base leading-relaxed max-w-md">
              Streamline floor logistics, real-time kitchen dispatch, and
              enterprise multi-chain analytics from a unified control dashboard.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-sm">
                <Utensils className="h-5 w-5 text-[#F97316] mb-2" />
                <p className="text-sm font-semibold text-stone-900">
                  Live Floor Management
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Real-time table allocation & order sync.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-[#F97316] mb-2" />
                <p className="text-sm font-semibold text-stone-900">
                  Role Delegations
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Granular permissions for staff & managers.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 pt-6 border-t border-stone-200/80">
            <span>© 2026 DINEFLOW INC.</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEMS ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Right Login Form Card */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16 z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-lg shadow-[#F97316]/20">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider uppercase text-stone-900">
              DINEFLOW
            </span>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-stone-200/60 relative">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                Owner Portal
              </h2>
              <p className="text-stone-500 text-sm mt-2">
                Enter your credentials to access your management suite.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-stone-600"
                >
                  Business Email
                </Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="owner@restaurant.com"
                    className="h-12 pl-11 pr-4 bg-stone-50 border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 text-sm focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:border-transparent transition-all"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-stone-600"
                  >
                    Password
                  </Label>
                  <a
                    href="#forgot"
                    className="text-xs font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
                  >
                    Forgot key?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••••••"
                    className="h-12 pl-11 pr-11 bg-stone-50 border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 text-sm focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:border-transparent transition-all"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="border-stone-300 bg-stone-50 data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-xs text-stone-600 font-normal cursor-pointer select-none"
                >
                  Remember terminal session
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#D97706] hover:to-[#EA580C] text-white rounded-xl h-12 font-semibold text-sm tracking-wide shadow-lg shadow-[#F97316]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Access Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-stone-200/80 text-center">
              <p className="text-xs text-stone-500">
                Need to onboard a new branch?{" "}
                <a
                  href="/register"
                  className="text-stone-900 font-semibold hover:text-[#F97316] transition-colors"
                >
                  Contact Sales
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
