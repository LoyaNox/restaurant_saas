import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Building,
  MapPin,
  Globe,
  Utensils,
  DollarSign,
  Clock,
  Check,
  ArrowRight,
  ArrowLeft,
  Store,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function OwnerRegister() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    restaurantPhone: "",
    restaurantEmail: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    restaurantType: "Restaurant",
    cuisineType: "",
    currency: "USD ($)",
    timeZone: "UTC-5 (EST)",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, agreedToTerms: checked }));
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

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!isPasswordValid || !doPasswordsMatch)) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) return;

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
                Owner + Organization Setup
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Creates your main owner profile and attaches your flagship
                location automatically.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-[8px] bg-white border border-[#E7E5E4] text-[#F97316] shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C1917]">
                Multi-User Access Control
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Invite managers, kitchen staff, and cashiers directly from your
                new portal.
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
                  Create your account
                </h2>
                <p className="text-[#78716C] text-[16px] leading-[1.6] mt-2">
                  Start managing your restaurant with DineFlow.
                </p>

                <div className="grid grid-cols-3 gap-2 mt-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 transition-all duration-300 rounded-[9999px] ${
                        step >= i ? "bg-[#F97316]" : "bg-[#E7E5E4]"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between font-mono text-[12px] font-semibold text-[#78716C] mt-3">
                  <span className={step >= 1 ? "text-[#F97316]" : ""}>
                    01. PERSONAL
                  </span>
                  <span className={step >= 2 ? "text-[#F97316]" : ""}>
                    02. LOCATION
                  </span>
                  <span className={step >= 3 ? "text-[#F97316]" : ""}>
                    03. DETAILS
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleNext}
                    className="space-y-4"
                  >
                    <p className="font-mono text-[12px] font-semibold text-[#F97316] tracking-wider uppercase mb-2">
                      Personal Information
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">First Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                          <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="John"
                            className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          className="bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

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
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                        <Input
                          id="phone"
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                          <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F5F5F4] border border-[#E7E5E4] rounded-[8px] space-y-2">
                      <p className="font-mono text-[12px] font-semibold text-[#78716C]">
                        PASSWORD REQUIREMENTS:
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
                      disabled={!isPasswordValid || !doPasswordsMatch}
                    >
                      Next: Restaurant Info{" "}
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleNext}
                    className="space-y-4"
                  >
                    <p className="font-mono text-[12px] font-semibold text-[#F97316] tracking-wider uppercase mb-2">
                      Restaurant Information
                    </p>

                    <div className="space-y-1.5">
                      <Label htmlFor="restaurantName">Restaurant Name *</Label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                        <Input
                          id="restaurantName"
                          type="text"
                          name="restaurantName"
                          placeholder="Gourmet Bistro"
                          className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.restaurantName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="restaurantPhone">
                          Restaurant Phone *
                        </Label>
                        <Input
                          id="restaurantPhone"
                          type="tel"
                          name="restaurantPhone"
                          placeholder="+1 (555) 123-4567"
                          className="bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.restaurantPhone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="restaurantEmail">
                          Restaurant Email
                        </Label>
                        <Input
                          id="restaurantEmail"
                          type="email"
                          name="restaurantEmail"
                          placeholder="contact@gourmet.com"
                          className="bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.restaurantEmail}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="address">Street Address *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                        <Input
                          id="address"
                          type="text"
                          name="address"
                          placeholder="123 Culinary Ave"
                          className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          type="text"
                          name="city"
                          placeholder="New York"
                          className="bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="state">State / Prov</Label>
                        <Input
                          id="state"
                          type="text"
                          name="state"
                          placeholder="NY"
                          className="bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="postalCode">ZIP Code</Label>
                        <Input
                          id="postalCode"
                          type="text"
                          name="postalCode"
                          placeholder="10001"
                          className="bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.postalCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="country">Country *</Label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                        <Input
                          id="country"
                          type="text"
                          name="country"
                          placeholder="United States"
                          className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <Button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4] rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                      >
                        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
                      </Button>
                      <Button
                        type="submit"
                        className="w-2/3 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                      >
                        Next: Details{" "}
                        <ChevronRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.form
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <p className="font-mono text-[12px] font-semibold text-[#F97316] tracking-wider uppercase mb-2">
                      Restaurant Details & Terms
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Shadcn Select Component */}
                      <div className="space-y-1.5">
                        <Label htmlFor="restaurantType">Restaurant Type</Label>
                        <Select
                          value={formData.restaurantType}
                          onValueChange={(val) =>
                            handleSelectChange("restaurantType", val)
                          }
                        >
                          <SelectTrigger id="restaurantType">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Restaurant">
                              Restaurant
                            </SelectItem>
                            <SelectItem value="Cafe">Cafe</SelectItem>
                            <SelectItem value="Bakery">Bakery</SelectItem>
                            <SelectItem value="Fast Food">Fast Food</SelectItem>
                            <SelectItem value="Cloud Kitchen">
                              Cloud Kitchen
                            </SelectItem>
                            <SelectItem value="Bar">Bar</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="cuisineType">Cuisine Type</Label>
                        <div className="relative">
                          <Utensils className="absolute left-3.5 top-3 h-4 w-4 text-[#A8A29E]" />
                          <Input
                            id="cuisineType"
                            type="text"
                            name="cuisineType"
                            placeholder="Italian, Casual..."
                            className="pl-10 bg-white border-[#E7E5E4] rounded-[8px] focus:border-[#F97316] text-[#1C1917] placeholder:text-[#A8A29E] font-sans"
                            value={formData.cuisineType}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Currency Shadcn Select Component */}
                      <div className="space-y-1.5">
                        <Label htmlFor="currency">Currency *</Label>
                        <Select
                          value={formData.currency}
                          onValueChange={(val) =>
                            handleSelectChange("currency", val)
                          }
                        >
                          <SelectTrigger id="currency">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-[#A8A29E]" />
                              <SelectValue placeholder="Select currency" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD ($)">USD ($)</SelectItem>
                            <SelectItem value="EUR (€)">EUR (€)</SelectItem>
                            <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                            <SelectItem value="CAD ($)">CAD ($)</SelectItem>
                            <SelectItem value="AUD ($)">AUD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Time Zone Shadcn Select Component */}
                      <div className="space-y-1.5">
                        <Label htmlFor="timeZone">Time Zone *</Label>
                        <Select
                          value={formData.timeZone}
                          onValueChange={(val) =>
                            handleSelectChange("timeZone", val)
                          }
                        >
                          <SelectTrigger id="timeZone">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-[#A8A29E]" />
                              <SelectValue placeholder="Select timezone" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-5 (EST)">
                              UTC-5 (EST)
                            </SelectItem>
                            <SelectItem value="UTC-8 (PST)">
                              UTC-8 (PST)
                            </SelectItem>
                            <SelectItem value="UTC+0 (GMT)">
                              UTC+0 (GMT)
                            </SelectItem>
                            <SelectItem value="UTC+1 (CET)">
                              UTC+1 (CET)
                            </SelectItem>
                            <SelectItem value="UTC+5:30 (IST)">
                              UTC+5:30 (IST)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Shadcn Checkbox Component */}
                    <div className="pt-2">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onCheckedChange={handleCheckboxChange}
                          className="mt-1"
                        />
                        <Label
                          htmlFor="agreedToTerms"
                          className="text-[16px] text-[#78716C] leading-[1.6] font-normal cursor-pointer"
                        >
                          I agree to the{" "}
                          <a
                            href="#terms"
                            className="text-[#F97316] underline hover:text-[#1C1917]"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#privacy"
                            className="text-[#F97316] underline hover:text-[#1C1917]"
                          >
                            Privacy Policy
                          </a>
                          .
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <Button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4] rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                      >
                        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
                      </Button>
                      <Button
                        type="submit"
                        className="w-2/3 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
                        disabled={!formData.agreedToTerms || isSubmitting}
                      >
                        {isSubmitting
                          ? "Creating Account..."
                          : "Create Account"}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="mt-8 text-center text-xs font-mono text-[#78716C]">
                ALREADY HAVE AN ACCOUNT?{" "}
                <a
                  href="/login"
                  className="text-[#F97316] font-semibold hover:underline"
                >
                  LOG IN
                </a>
              </p>
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
                  Account Created Successfully!
                </h2>
                <p className="text-[#78716C] text-[16px] leading-[1.6] max-w-sm mx-auto">
                  Welcome to DineFlow,{" "}
                  <span className="text-[#1C1917]">{formData.firstName}</span>.
                  Your restaurant profile for{" "}
                  <span className="text-[#1C1917]">
                    {formData.restaurantName}
                  </span>{" "}
                  is live.
                </p>
              </div>

              <div className="p-4 bg-[#F5F5F4] border border-[#E7E5E4] rounded-[8px] font-mono text-[12px] text-[#78716C] max-w-sm mx-auto text-left space-y-2">
                <p className="flex justify-between">
                  <span>ACCOUNT ROLE:</span>{" "}
                  <span className="text-[#1C1917]">OWNER</span>
                </p>
                <p className="flex justify-between">
                  <span>OWNER EMAIL:</span>{" "}
                  <span className="text-[#1C1917]">{formData.email}</span>
                </p>
                <p className="flex justify-between">
                  <span>LOCATION:</span>{" "}
                  <span className="text-[#1C1917]">
                    {formData.city}, {formData.country}
                  </span>
                </p>
              </div>

              <Button
                onClick={() => alert("Navigating to Dashboard...")}
                className="w-full max-w-xs mx-auto bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-[8px] h-11 font-mono text-[12px] font-semibold tracking-wider uppercase transition-colors"
              >
                Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
