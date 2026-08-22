import { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  Laptop,
  Lock,
  Save,
  LogOut,
  AlertCircle,
  Eye,
  EyeOff,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SecuritySettings() {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [posPinLock, setPosPinLock] = useState(true);
  const [autoLogout, setAutoLogout] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900">
            Account & Terminal Security
          </h2>
          <Badge
            variant="outline"
            className="border-emerald-600/30 text-emerald-700 bg-emerald-50 text-[10px]"
          >
            Encrypted
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Manage account access credentials, active device sessions,
          multi-factor authentication, and POS PIN access controls.
        </p>
      </div>

      {/* 1. PASSWORD & CREDENTIALS */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[#F97316]" />
            Change Password
          </CardTitle>
          <CardDescription className="text-xs">
            Ensure your account uses a strong, unique password to prevent
            unauthorized administrative access.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currPass" className="text-xs font-medium">
              Current Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="currPass"
                type={showCurrentPass ? "text" : "password"}
                placeholder="Enter current password"
                className="h-9 text-xs pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
              >
                {showCurrentPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="newPass" className="text-xs font-medium">
                New Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="newPass"
                  type={showNewPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="h-9 text-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
                >
                  {showNewPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confPass" className="text-xs font-medium">
                Confirm New Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confPass"
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Re-enter new password"
                  className="h-9 text-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
                >
                  {showConfirmPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Password Requirements List */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-[11px] text-stone-500 space-y-1">
            <p className="font-semibold text-stone-700">
              Password Requirements:
            </p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>At least 8 characters long</li>
              <li>Include at least one uppercase letter and one number</li>
              <li>Include at least one special character (!@#$%^&*)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 2. MULTI-FACTOR AUTHENTICATION */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#F97316]" />
            Two-Factor Authentication (2FA)
          </CardTitle>
          <CardDescription className="text-xs">
            Add an additional layer of verification when logging into the owner
            dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
            <div className="pr-2">
              <p className="text-xs sm:text-sm font-semibold text-stone-900">
                Require Authenticator App Code
              </p>
              <p className="text-[11px] text-stone-500">
                Use apps like Google Authenticator or 1Password to generate
                time-based verification passcodes.
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <div className="p-4 border border-stone-200 rounded-xl bg-white space-y-3">
              <p className="text-xs font-semibold text-stone-800">
                Set Up Authenticator
              </p>
              <p className="text-xs text-stone-500">
                Scan this QR code with your authenticator app, then enter the
                generated 6-digit verification code below.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="h-28 w-28 border border-stone-200 bg-stone-100 rounded-lg flex items-center justify-center text-xs text-stone-400">
                  [QR Code Placeholder]
                </div>
                <div className="space-y-2 w-full sm:w-auto">
                  <Input
                    placeholder="Enter 6-digit code"
                    className="h-9 text-xs w-full sm:w-48 font-mono"
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="bg-[#F97316] hover:bg-[#EA580C] text-white text-xs"
                  >
                    Verify & Enable
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3. TERMINAL & STAFF SECURITY */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#F97316]" />
            POS Terminal & In-Store Security
          </CardTitle>
          <CardDescription className="text-xs">
            Set floor access requirements and screen lock behaviors for waiter
            and cashier terminals.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="pr-2">
              <p className="text-xs font-semibold text-stone-900">
                Require Staff PIN for Discount & Refund Voids
              </p>
              <p className="text-[11px] text-stone-500">
                Prompt for a manager PIN before applying custom manual discounts
                or canceling billed orders.
              </p>
            </div>
            <Switch checked={posPinLock} onCheckedChange={setPosPinLock} />
          </div>

          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="pr-2">
              <p className="text-xs font-semibold text-stone-900">
                Automatic Idle Terminal Timeout
              </p>
              <p className="text-[11px] text-stone-500">
                Automatically lock screen after 5 minutes of inactivity on
                cashier terminals.
              </p>
            </div>
            <Switch checked={autoLogout} onCheckedChange={setAutoLogout} />
          </div>
        </CardContent>
      </Card>

      {/* 4. ACTIVE SESSIONS */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Laptop className="h-4 w-4 text-[#F97316]" />
                Active Device Sessions
              </CardTitle>
              <CardDescription className="text-xs">
                Devices currently authenticated into this owner account.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-stone-200 gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Log Out All Other Devices
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
          {/* Current Session */}
          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <Laptop className="h-4 w-4 text-stone-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-stone-900">
                    Chrome on macOS (Pune, India)
                  </p>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-[10px] px-1.5 py-0">
                    Current Device
                  </Badge>
                </div>
                <p className="text-[11px] text-stone-400">
                  IP: 103.21.124.8 • Active now
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Session */}
          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <Smartphone className="h-4 w-4 text-stone-700" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">
                  DineFlow Owner App on iPhone 15 Pro
                </p>
                <p className="text-[11px] text-stone-400">
                  IP: 49.36.192.12 • Last active 2 hours ago
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs text-stone-500 hover:text-red-600"
            >
              Revoke
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 5. RECENT SECURITY LOGS */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <History className="h-4 w-4 text-[#F97316]" />
            Recent Security Activity
          </CardTitle>
          <CardDescription className="text-xs">
            Audit trail of administrative authentication and security events.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 text-xs bg-stone-50 rounded-md border border-stone-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-medium text-stone-800">
                  Successful Owner Sign-In
                </span>
              </div>
              <span className="text-[11px] text-stone-400">
                Today at 10:14 AM
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 text-xs bg-stone-50 rounded-md border border-stone-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-stone-400" />
                <span className="font-medium text-stone-800">
                  Password updated successfully
                </span>
              </div>
              <span className="text-[11px] text-stone-400">
                12 Aug 2026, 04:30 PM
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
        >
          <Save className="h-4 w-4" /> Save Security Settings
        </Button>
      </div>
    </form>
  );
}
