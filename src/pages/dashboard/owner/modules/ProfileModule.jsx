import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  User,
  Building2,
  ShieldCheck,
  Edit3,
  Camera,
  Mail,
  Phone,
  CheckCircle2,
  Save,
  X,
  UploadCloud,
  Check,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ProfileModule() {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Photo & Logo File State
  const [profilePhoto, setProfilePhoto] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  );
  const [restaurantLogo, setRestaurantLogo] = useState(null);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      // 2. Personal Information
      firstName: "Alexander",
      lastName: "Pierce",
      displayName: "Alex Pierce",
      email: "alex.pierce@restaurant.com",
      phone: "+91 98765 43210",
      dob: "1988-05-14",
      gender: "Male",
      language: "English (US)",
      timeZone: "Asia/Kolkata",

      // 3. Restaurant / Business Information
      restaurantName: "Aura Fine Dining & Lounge",
      restaurantId: "REST-2026-8890",
      businessType: "Fine Dining Restaurant",
      businessPhone: "+91 022 2847 9900",
      businessEmail: "contact@aurafinedining.com",
      website: "https://aurafinedining.com",
      address: "Plot 42, Sunset Boulevard, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400050",
      gstNumber: "27AABCU9603R1ZM",
      fssaiNumber: "11521008000432",
      currency: "INR (₹)",
      businessTimeZone: "Asia/Kolkata (GMT+5:30)",

      // 4. Account Information (Read-only System Details)
      ownerId: "OWN-88392-X",
      role: "Owner",
      accountStatus: "Active & Verified",
      registrationDate: "2025-01-15",
      subscriptionPlan: "Enterprise POS Suite",
      subscriptionStatus: "Active (Renews Jan 2027)",
      trialStatus: "Completed (Converted)",
      lastLogin: "2026-08-21 21:40",
      lastLoginLocation: "Mumbai, India (192.168.1.101)",
    },
  });

  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      showNotification("Profile photo updated visually.");
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRestaurantLogo(URL.createObjectURL(file));
      showNotification("Restaurant logo updated visually.");
    }
  };

  const onSubmit = (data) => {
    console.log("Submitted Owner Profile Data:", {
      ...data,
      profilePhoto,
      restaurantLogo,
    });
    setIsEditing(false);
    showNotification("All profile settings saved successfully.");
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-sm font-medium animate-in fade-in">
          <Check className="h-4 w-4 text-emerald-600" />
          {successMessage}
        </div>
      )}

      {/* ========================================== */}
      {/* 1. PROFILE HEADER                          */}
      {/* ========================================== */}
      <Card className="border-stone-200 shadow-sm overflow-hidden bg-white">
        <div className="h-28 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 relative">
          <div className="absolute right-4 top-4">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 gap-1.5 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Account
            </Badge>
          </div>
        </div>
        <CardContent className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-12">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="h-24 w-24 rounded-2xl bg-stone-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <img
                    src={profilePhoto}
                    alt="Owner Profile Photo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <label
                  htmlFor="profile-photo-input"
                  className="absolute bottom-1 right-1 p-1.5 bg-[#F97316] text-white rounded-lg shadow-md hover:bg-[#EA580C] transition-colors cursor-pointer"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <input
                    id="profile-photo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>

              {/* Owner Info & Details */}
              <div className="text-center md:text-left space-y-1 pb-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-stone-900">
                    Alexander Pierce
                  </h1>
                  <Badge
                    variant="outline"
                    className="text-xs border-stone-300 text-stone-700 bg-stone-50 font-semibold"
                  >
                    Role: Owner
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-stone-400" />{" "}
                    alex.pierce@restaurant.com
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-stone-400" /> +91 98765
                    43210
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-stone-400" /> Last Login:
                    2026-08-21 21:40
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex items-center gap-2 pt-2 md:pt-0">
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
                >
                  <Edit3 className="h-4 w-4" /> Edit Profile
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="gap-1.5"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-sm"
                  >
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ========================================== */}
        {/* 2. PERSONAL INFORMATION                    */}
        {/* ========================================== */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <User className="h-4 w-4 text-[#F97316]" />
              2. Personal Information
            </CardTitle>
            <CardDescription>
              Owner contact details, personal localization settings, and
              optional demographic attributes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  disabled={!isEditing}
                  {...register("firstName")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  disabled={!isEditing}
                  {...register("lastName")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  disabled={!isEditing}
                  {...register("displayName")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={!isEditing}
                  {...register("email")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  disabled={!isEditing}
                  {...register("phone")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dob">Date of Birth (Optional)</Label>
                <Input
                  id="dob"
                  type="date"
                  disabled={!isEditing}
                  {...register("dob")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gender">Gender (Optional)</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="gender" className="bg-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                        <SelectItem value="Prefer Not to Say">
                          Prefer Not to Say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="language">Language</Label>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="language" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English (US)">
                          English (US)
                        </SelectItem>
                        <SelectItem value="English (UK)">
                          English (UK)
                        </SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="timeZone">Time Zone</Label>
                <Controller
                  name="timeZone"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="timeZone" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">
                          Asia/Kolkata (GMT+5:30)
                        </SelectItem>
                        <SelectItem value="UTC">UTC (GMT+0:00)</SelectItem>
                        <SelectItem value="America/New_York">
                          America/New_York (EST)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ========================================== */}
        {/* 3. RESTAURANT / BUSINESS INFORMATION       */}
        {/* ========================================== */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#F97316]" />
              3. Restaurant / Business Information
            </CardTitle>
            <CardDescription>
              Operational profile, statutory compliance credentials (GST/FSSAI),
              and outlet location.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Restaurant Logo Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200 gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-center overflow-hidden p-1">
                  {restaurantLogo ? (
                    <img
                      src={restaurantLogo}
                      alt="Restaurant Logo"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="h-8 w-8 text-[#F97316]" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Restaurant Logo
                  </h4>
                  <p className="text-xs text-stone-500">
                    Used on customer receipts, invoices, and POS screens.
                  </p>
                </div>
              </div>

              <label htmlFor="logo-upload">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!isEditing}
                  className="text-xs bg-white pointer-events-none"
                >
                  <UploadCloud className="h-3.5 w-3.5 mr-1.5" /> Upload Logo
                </Button>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  disabled={!isEditing}
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="restaurantName">Restaurant Name</Label>
                <Input
                  id="restaurantName"
                  disabled={!isEditing}
                  {...register("restaurantName")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="restaurantId">Restaurant ID</Label>
                <Input
                  id="restaurantId"
                  disabled
                  className="bg-stone-100 font-mono text-xs text-stone-600"
                  {...register("restaurantId")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="businessType">Business Type</Label>
                <Controller
                  name="businessType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="businessType" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fine Dining Restaurant">
                          Fine Dining Restaurant
                        </SelectItem>
                        <SelectItem value="Quick Service (QSR)">
                          Quick Service (QSR)
                        </SelectItem>
                        <SelectItem value="Cafe & Bakery">
                          Cafe & Bakery
                        </SelectItem>
                        <SelectItem value="Cloud Kitchen / Ghost Kitchen">
                          Cloud Kitchen / Ghost Kitchen
                        </SelectItem>
                        <SelectItem value="Bar & Lounge">
                          Bar & Lounge
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="businessPhone">Phone Number</Label>
                <Input
                  id="businessPhone"
                  disabled={!isEditing}
                  {...register("businessPhone")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="businessEmail">Email</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  disabled={!isEditing}
                  {...register("businessEmail")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  disabled={!isEditing}
                  {...register("website")}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  disabled={!isEditing}
                  {...register("address")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" disabled={!isEditing} {...register("city")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  disabled={!isEditing}
                  {...register("state")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  disabled={!isEditing}
                  {...register("country")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  disabled={!isEditing}
                  {...register("pincode")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  disabled={!isEditing}
                  className="font-mono uppercase"
                  {...register("gstNumber")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fssaiNumber">FSSAI Number</Label>
                <Input
                  id="fssaiNumber"
                  disabled={!isEditing}
                  className="font-mono"
                  {...register("fssaiNumber")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="currency">Currency</Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="currency" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR (₹)">INR (₹)</SelectItem>
                        <SelectItem value="USD ($)">USD ($)</SelectItem>
                        <SelectItem value="EUR (€)">EUR (€)</SelectItem>
                        <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="businessTimeZone">Time Zone</Label>
                <Controller
                  name="businessTimeZone"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="businessTimeZone" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata (GMT+5:30)">
                          Asia/Kolkata (GMT+5:30)
                        </SelectItem>
                        <SelectItem value="UTC (GMT+0:00)">
                          UTC (GMT+0:00)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ========================================== */}
        {/* 4. ACCOUNT INFORMATION                     */}
        {/* ========================================== */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#F97316]" />
              4. Account Information
            </CardTitle>
            <CardDescription>
              Read-only system identifiers, subscription parameters, and
              security log details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Owner ID
                </p>
                <p className="text-sm font-mono font-bold text-stone-900">
                  OWN-88392-X
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Role
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-stone-900">
                    Owner
                  </span>
                  <Badge className="bg-stone-200 text-stone-800 border-none text-[10px] px-1.5">
                    SuperAdmin
                  </Badge>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Account Status
                </p>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-700">
                    Active & Verified
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Registration Date
                </p>
                <p className="text-sm font-semibold text-stone-900">
                  2025-01-15
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Subscription Plan
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-stone-900">
                    Enterprise POS Suite
                  </p>
                  <Badge className="bg-amber-100 text-amber-800 border-none text-[10px]">
                    Annual
                  </Badge>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Subscription Status
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-bold text-stone-900">
                    Active (Renews Jan 2027)
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Trial Status
                </p>
                <p className="text-sm font-semibold text-stone-700">
                  Completed (Converted)
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Last Login
                </p>
                <p className="text-sm font-semibold text-stone-900">
                  2026-08-21 21:40
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Last Login Location
                </p>
                <p className="text-sm font-semibold text-stone-900">
                  Mumbai, India (192.168.1.101)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Action Trigger for Unsaved Form Changes */}
        {isEditing && (
          <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-stone-900 text-white p-4 rounded-xl shadow-2xl z-50 border border-stone-800 animate-in slide-in-from-bottom-5">
            <span className="text-xs text-stone-300 font-medium">
              You are currently editing profile fields.
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="text-stone-900 border-stone-700 hover:bg-stone-800 hover:text-white"
            >
              Discard
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-1.5"
            >
              <Save className="h-3.5 w-3.5" /> Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
