import { useForm, Controller } from "react-hook-form";
import {
  QrCode,
  Palette,
  Layout,
  ShoppingCart,
  UtensilsCrossed,
  Smile,
  Clock,
  Share2,
  BarChart3,
  Save,
  Download,
  Copy,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { Separator } from "@/components/ui/separator";

export default function DigitalMenuSettingsPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // 1. General Settings
      digitalMenuEnabled: true,
      menuSlug: "bistro-central",
      defaultLanguage: "en",
      allowLanguageSwitching: true,

      // 2. Branding & Customization
      primaryColor: "#F97316",
      backgroundColor: "#FAFAFA",
      fontStyle: "inter",
      brandName: "Bistro Central",
      welcomeTagline: "Fresh ingredients, crafted with care.",

      // 3. QR Code Configuration
      qrStyle: "rounded",
      qrLogoOverlay: true,
      qrPrimaryColor: "#000000",

      // 4. Menu Display Rules
      viewMode: "grid",
      showItemImages: true,
      showCalories: true,
      showSearchAndFilter: true,
      enableStickyCategories: true,

      // 5. Digital Ordering Logic
      enableSelfOrdering: true,
      minimumOrderValue: "10.00",
      enableTipping: true,
      defaultTipPercent: "15",

      // 6. Table Ordering (Dine-In QR)
      enableTableQrOrdering: true,
      requireTableNumberValidation: true,
      allowPayAtTable: true,
      payAtTableGateways: "stripe_upi",

      // 7. Customer Experience
      enableGuestCheckout: true,
      collectCustomerPhone: true,
      collectCustomerEmail: false,
      enableFeedbackPrompt: true,

      // 8. Availability & Schedules
      autoHideUnavailableItems: true,
      scheduleNoticeText: "We are currently closed for orders.",

      // 9. SEO & Social Sharing
      metaTitle: "Bistro Central | Interactive Digital Menu",
      metaDescription:
        "Browse our live menu, order directly from your table, and enjoy chef specials.",
      ogImageUrl: "",

      // 10. Analytics & Tracking
      enableGoogleAnalytics: true,
      gaTrackingId: "G-XXXXXXXXXX",
      enableFacebookPixel: false,
      fbPixelId: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Digital Menu Configuration Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          Digital Menu & QR Ordering Configuration
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Customize your web menu appearance, table-side ordering rules, QR
          codes, branding, SEO, and guest analytics.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Digital Menu Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#F97316]" />
              1. General Access & Localizations
            </CardTitle>
            <CardDescription>
              Control public access, URL domain slugs, and default menu
              languages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Public Digital Menu Page
                </p>
                <p className="text-xs text-stone-500">
                  Make your menu accessible online via web link and QR codes.
                </p>
              </div>
              <Controller
                name="digitalMenuEnabled"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="menuSlug">Custom Menu URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 font-mono">
                    menu.site/
                  </span>
                  <Input id="menuSlug" {...register("menuSlug")} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="defaultLanguage">Default Language</Label>
                <Controller
                  name="defaultLanguage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="defaultLanguage">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="langSwitch"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Allow Customer Language Selector
                </Label>
                <p className="text-xs text-stone-500">
                  Display multi-language dropdown on top of the digital menu.
                </p>
              </div>
              <Controller
                name="allowLanguageSwitching"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="langSwitch"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Branding & Customization */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Palette className="h-4 w-4 text-[#F97316]" />
              2. Visual Branding & Theme Styling
            </CardTitle>
            <CardDescription>
              Match your physical establishment's aesthetic with colors, fonts,
              and headers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="brandName">Header Brand Name</Label>
                <Input id="brandName" {...register("brandName")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fontStyle">Typography Theme</Label>
                <Controller
                  name="fontStyle"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="fontStyle">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">
                          Modern Clean (Inter)
                        </SelectItem>
                        <SelectItem value="playfair">
                          Elegant Serif (Playfair)
                        </SelectItem>
                        <SelectItem value="roboto">
                          Classic Sans (Roboto)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="primaryColor">Accent Brand Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    className="w-12 h-9 p-1 cursor-pointer"
                    {...register("primaryColor")}
                  />
                  <Input {...register("primaryColor")} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="backgroundColor">Background Tone</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    className="w-12 h-9 p-1 cursor-pointer"
                    {...register("backgroundColor")}
                  />
                  <Input {...register("backgroundColor")} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="welcomeTagline">
                Hero Header Welcome Message
              </Label>
              <Input id="welcomeTagline" {...register("welcomeTagline")} />
            </div>
          </CardContent>
        </Card>

        {/* 3. QR Code Configuration */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <QrCode className="h-4 w-4 text-[#F97316]" />
              3. Dynamic QR Code Generator & Setup
            </CardTitle>
            <CardDescription>
              Configure look and feel for generated printables and table stands.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="qrStyle">QR Pattern Style</Label>
                <Controller
                  name="qrStyle"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="qrStyle">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded">Rounded Dots</SelectItem>
                        <SelectItem value="square">Standard Square</SelectItem>
                        <SelectItem value="circle">Circular Matrix</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="qrPrimaryColor">QR Foreground Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="qrPrimaryColor"
                    type="color"
                    className="w-12 h-9 p-1 cursor-pointer"
                    {...register("qrPrimaryColor")}
                  />
                  <Input {...register("qrPrimaryColor")} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="qrLogo"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Embed Restaurant Logo in Center
                </Label>
                <p className="text-xs text-stone-500">
                  Overlay brand icon automatically inside generated QR matrices.
                </p>
              </div>
              <Controller
                name="qrLogoOverlay"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="qrLogo"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="button" variant="outline" className="gap-2 text-xs">
                <Download className="h-4 w-4 text-stone-600" /> Download Master
                Table QR (.PNG)
              </Button>
              <Button type="button" variant="outline" className="gap-2 text-xs">
                <Copy className="h-4 w-4 text-stone-600" /> Copy Direct Web URL
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 4. Menu Display Rules */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Layout className="h-4 w-4 text-[#F97316]" />
              4. Menu Display & Card Layout
            </CardTitle>
            <CardDescription>
              Define customer catalog layout preferences and metadata elements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="viewMode">Default Card View</Label>
                <Controller
                  name="viewMode"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="viewMode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">
                          Grid Cards (Rich Visuals)
                        </SelectItem>
                        <SelectItem value="list">Compact List View</SelectItem>
                        <SelectItem value="text">
                          Text-Only Minimalist
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="itemImgs"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Show Item Photos
                  </Label>
                  <p className="text-xs text-stone-500">
                    Render high-res media thumbnails.
                  </p>
                </div>
                <Controller
                  name="showItemImages"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="itemImgs"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="calories"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Show Calorie Info
                  </Label>
                  <p className="text-xs text-stone-500">
                    Display kcal badges on dishes.
                  </p>
                </div>
                <Controller
                  name="showCalories"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="calories"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="stickyCat"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Sticky Category Navigation
                  </Label>
                  <p className="text-xs text-stone-500">
                    Fix category bar to top on scroll.
                  </p>
                </div>
                <Controller
                  name="enableStickyCategories"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="stickyCat"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Digital Ordering Logic */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-[#F97316]" />
              5. Self-Ordering & Checkout Settings
            </CardTitle>
            <CardDescription>
              Allow users to build carts, add tipping, and place digital orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Direct Mobile Checkout
                </p>
                <p className="text-xs text-stone-500">
                  Allow customers to submit orders directly from their personal
                  devices.
                </p>
              </div>
              <Controller
                name="enableSelfOrdering"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="minimumOrderValue">
                  Minimum Basket Value ($)
                </Label>
                <Input
                  id="minimumOrderValue"
                  type="number"
                  step="0.01"
                  {...register("minimumOrderValue")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="defaultTipPercent">
                  Default Preset Tip (%)
                </Label>
                <Input
                  id="defaultTipPercent"
                  type="number"
                  {...register("defaultTipPercent")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Table Ordering (Dine-In QR) */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-[#F97316]" />
              6. In-Restaurant Table QR Ordering
            </CardTitle>
            <CardDescription>
              Configure table pin validation, pay-at-table modes, and session
              handoffs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Dine-In Table Ordering
                </p>
                <p className="text-xs text-stone-500">
                  Route QR scans directly to mapped floor tables in the POS.
                </p>
              </div>
              <Controller
                name="enableTableQrOrdering"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="tableVal"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Verify Location / GPS Pin
                  </Label>
                  <p className="text-xs text-stone-500">
                    Ensure guest is physically present inside restaurant.
                  </p>
                </div>
                <Controller
                  name="requireTableNumberValidation"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="tableVal"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="payAtTable"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Pay-At-Table Prepayment
                  </Label>
                  <p className="text-xs text-stone-500">
                    Require immediate payment before sending KOT to kitchen.
                  </p>
                </div>
                <Controller
                  name="allowPayAtTable"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="payAtTable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Customer Experience & Data Collection */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Smile className="h-4 w-4 text-[#F97316]" />
              7. Customer Experience & Data Capture
            </CardTitle>
            <CardDescription>
              Configure guest checkout fields, phone verification, and post-meal
              surveys.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="guestChk"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Guest Checkout
                  </Label>
                  <p className="text-xs text-stone-500">Order without login.</p>
                </div>
                <Controller
                  name="enableGuestCheckout"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="guestChk"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="collectPhone"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Capture Mobile No.
                  </Label>
                  <p className="text-xs text-stone-500">
                    Send order SMS updates.
                  </p>
                </div>
                <Controller
                  name="collectCustomerPhone"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="collectPhone"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="feedback"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Post-Meal Rating
                  </Label>
                  <p className="text-xs text-stone-500">
                    Prompt 5-star review dialog.
                  </p>
                </div>
                <Controller
                  name="enableFeedbackPrompt"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="feedback"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Availability & Schedule Overrides */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#F97316]" />
              8. Out-of-Stock & Off-Hours Handling
            </CardTitle>
            <CardDescription>
              Define rules for unavailable items and non-operating hours
              banners.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Auto-Hide Out of Stock Items
                </p>
                <p className="text-xs text-stone-500">
                  Completely remove 86'd items instead of displaying greyed-out
                  badges.
                </p>
              </div>
              <Controller
                name="autoHideUnavailableItems"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="scheduleNoticeText">
                Off-Hours Notice Banner Message
              </Label>
              <Input
                id="scheduleNoticeText"
                {...register("scheduleNoticeText")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 9. SEO & Social Sharing */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-[#F97316]" />
              9. SEO & Social Media Metadata
            </CardTitle>
            <CardDescription>
              Optimize social link previews when sharing on WhatsApp, Instagram,
              or Google Search.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="metaTitle">SEO Page Title</Label>
              <Input id="metaTitle" {...register("metaTitle")} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                className="text-xs"
                rows={3}
                {...register("metaDescription")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 10. Analytics & Tracking */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#F97316]" />
              10. Web Analytics & Conversion Tracking
            </CardTitle>
            <CardDescription>
              Track guest views, popular menu items, and mobile checkout
              drop-offs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-stone-900">
                    Google Analytics 4
                  </Label>
                  <Controller
                    name="enableGoogleAnalytics"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <Input
                  placeholder="G-XXXXXXXXXX"
                  className="h-8 text-xs bg-white"
                  {...register("gaTrackingId")}
                />
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-stone-900">
                    Meta / FB Pixel
                  </Label>
                  <Controller
                    name="enableFacebookPixel"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <Input
                  placeholder="Pixel ID"
                  className="h-8 text-xs bg-white"
                  {...register("fbPixelId")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Digital Menu Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
