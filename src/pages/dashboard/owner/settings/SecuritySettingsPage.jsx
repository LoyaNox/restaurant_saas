import { useForm, Controller } from "react-hook-form";
import {
  Shield,
  KeyRound,
  Laptop,
  Lock,
  History,
  EyeOff,
  BellRing,
  Save,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function SecuritySettingsPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // 1. General Security
      securityEnforcementLevel: "high",
      ipWhitelisting: false,
      allowedIpAddresses: "192.168.1.1, 10.0.0.1",

      // 2. Authentication Settings
      requireTwoFactor: true,
      authMethod: "totp",
      passwordMinLength: "12",
      requireSpecialChars: true,
      passwordExpiryDays: "90",

      // 3. Session & Devices
      sessionTimeoutMinutes: "15",
      maxConcurrentSessions: "3",
      autoRevokeIdleDevices: true,

      // 4. Login Security
      maxFailedAttempts: "5",
      lockoutDurationMinutes: "30",
      enableCaptcha: true,

      // 6. Data & Privacy
      dataRetentionDays: "365",
      maskSensitiveData: true,
      allowAnalyticsCookies: false,

      // 7. Security Alerts
      alertUnrecognizedLogin: true,
      alertPasswordChange: true,
      alertIpMismatch: true,
      alertChannel: "email_sms",
    },
  });

  // Mock Active Sessions Data
  const activeSessions = [
    {
      id: "SESS-881",
      device: "MacBook Pro 16 (Chrome)",
      location: "Main Restaurant Terminal",
      ip: "192.168.1.101",
      lastActive: "Just now",
      current: true,
    },
    {
      id: "SESS-882",
      device: "iPad Air (POS Station 2)",
      location: "Floor - Front Counter",
      ip: "192.168.1.105",
      lastActive: "12 mins ago",
      current: false,
    },
    {
      id: "SESS-883",
      device: "iPhone 15 Pro (Manager App)",
      location: "Mobile Network",
      ip: "172.56.21.89",
      lastActive: "2 hours ago",
      current: false,
    },
  ];

  // Mock Audit Logs Data
  const auditLogs = [
    {
      id: "AUD-901",
      event: "Password Changed",
      user: "admin@restaurant.com",
      ip: "192.168.1.101",
      timestamp: "2026-08-21 19:22",
      severity: "Medium",
    },
    {
      id: "AUD-902",
      event: "Failed Login Attempt (3/5)",
      user: "manager@restaurant.com",
      ip: "185.220.101.5",
      timestamp: "2026-08-21 16:05",
      severity: "High",
    },
    {
      id: "AUD-903",
      event: "2FA Verified Successfully",
      user: "cashier1@restaurant.com",
      ip: "192.168.1.105",
      timestamp: "2026-08-21 12:40",
      severity: "Low",
    },
  ];

  const onSubmit = (data) => {
    console.log("Security Settings Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          System Security & Data Protection
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Configure multi-factor authentication, active session policies, login
          brute-force guards, privacy retention rules, and audit logs.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Security Policies */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#F97316]" />
              1. General Security Policies
            </CardTitle>
            <CardDescription>
              Set global enforcement thresholds and network boundary
              protections.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="enforcementLevel">System Hardening Level</Label>
                <Controller
                  name="securityEnforcementLevel"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="enforcementLevel" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          Standard Protection
                        </SelectItem>
                        <SelectItem value="high">
                          High Security (Recommended)
                        </SelectItem>
                        <SelectItem value="strict">
                          Strict / PCI-DSS Compliant
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="ipWhitelistToggle"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enable IP Whitelisting
                  </Label>
                  <p className="text-xs text-stone-500">
                    Restrict access to trusted static IPs.
                  </p>
                </div>
                <Controller
                  name="ipWhitelisting"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="ipWhitelistToggle"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ipList">
                Allowed IP Addresses (Comma-separated)
              </Label>
              <Input
                id="ipList"
                placeholder="192.168.1.1, 10.0.0.1"
                {...register("allowedIpAddresses")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Authentication Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#F97316]" />
              2. Authentication & Credential Strength
            </CardTitle>
            <CardDescription>
              Configure Two-Factor Authentication (2FA) and password complexity
              policies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enforce Two-Factor Authentication (2FA)
                </p>
                <p className="text-xs text-stone-500">
                  Mandatory 2FA code verification for all admin and manager
                  logins.
                </p>
              </div>
              <Controller
                name="requireTwoFactor"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="authMethod">Primary 2FA Method</Label>
                <Controller
                  name="authMethod"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="authMethod" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="totp">
                          Authenticator App (TOTP)
                        </SelectItem>
                        <SelectItem value="sms">SMS Passcode</SelectItem>
                        <SelectItem value="email">
                          Email Verification Code
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="minLength">Min Password Length</Label>
                <Input
                  id="minLength"
                  type="number"
                  {...register("passwordMinLength")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="expiryDays">Password Expiry (Days)</Label>
                <Input
                  id="expiryDays"
                  type="number"
                  {...register("passwordExpiryDays")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Session & Active Devices */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Laptop className="h-4 w-4 text-[#F97316]" />
              3. Session Control & Active Devices
            </CardTitle>
            <CardDescription>
              Manage concurrent active sessions, idle timeout windows, and
              logged-in devices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="sessionTimeout">
                  Idle Session Timeout (Minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  {...register("sessionTimeoutMinutes")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maxSessions">
                  Max Concurrent Sessions per User
                </Label>
                <Input
                  id="maxSessions"
                  type="number"
                  {...register("maxConcurrentSessions")}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Active Logged-In Terminals & Devices
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs text-red-600 bg-white border-red-200 hover:bg-red-50"
                >
                  Revoke All Other Sessions
                </Button>
              </div>

              <div className="rounded-lg border border-stone-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-stone-50">
                    <TableRow>
                      <TableHead className="text-xs font-semibold text-stone-700">
                        Device / Browser
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-stone-700">
                        Location / Station
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-stone-700">
                        IP Address
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-stone-700">
                        Last Active
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-stone-700 text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeSessions.map((session) => (
                      <TableRow key={session.id} className="text-xs">
                        <TableCell className="font-semibold text-stone-900 flex items-center gap-2">
                          <Smartphone className="h-3.5 w-3.5 text-stone-500" />
                          {session.device}
                          {session.current && (
                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none text-[10px]">
                              This Device
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-stone-600">
                          {session.location}
                        </TableCell>
                        <TableCell className="font-mono text-stone-500">
                          {session.ip}
                        </TableCell>
                        <TableCell className="text-stone-500">
                          {session.lastActive}
                        </TableCell>
                        <TableCell className="text-right">
                          {!session.current && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-red-600 hover:bg-red-50"
                            >
                              Terminate
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Login Security & Brute-Force Guard */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#F97316]" />
              4. Login Security & Brute-Force Throttling
            </CardTitle>
            <CardDescription>
              Prevent unauthorized login attempts with rate-limiting, lockouts,
              and CAPTCHA checks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="maxFailed">Max Failed Login Attempts</Label>
                <Input
                  id="maxFailed"
                  type="number"
                  {...register("maxFailedAttempts")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lockoutDuration">
                  Account Lockout Duration (Minutes)
                </Label>
                <Input
                  id="lockoutDuration"
                  type="number"
                  {...register("lockoutDurationMinutes")}
                />
              </div>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-900">
                  Enable reCAPTCHA / Cloudflare Turnstile on Public Forms
                </p>
                <p className="text-xs text-stone-500">
                  Require bot verification after 3 failed login attempts.
                </p>
              </div>
              <Controller
                name="enableCaptcha"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* 5. Security Audit Log */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <History className="h-4 w-4 text-[#F97316]" />
              5. Real-Time Security Audit Log
            </CardTitle>
            <CardDescription>
              Detailed security-relevant events, access modifications, and
              suspicious activities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-stone-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-stone-50">
                  <TableRow>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Audit ID
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Security Event
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      User Account
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Source IP
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Severity
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id} className="text-xs">
                      <TableCell className="font-mono font-medium text-stone-900">
                        {log.id}
                      </TableCell>
                      <TableCell className="font-semibold text-stone-800">
                        {log.event}
                      </TableCell>
                      <TableCell className="text-stone-600">
                        {log.user}
                      </TableCell>
                      <TableCell className="font-mono text-stone-500">
                        {log.ip}
                      </TableCell>
                      <TableCell className="text-stone-500">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.severity === "High"
                              ? "destructive"
                              : log.severity === "Medium"
                                ? "outline"
                                : "secondary"
                          }
                          className="text-[10px] px-2 py-0.5"
                        >
                          {log.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 6. Data & Privacy Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-[#F97316]" />
              6. Data Protection & Privacy Governance
            </CardTitle>
            <CardDescription>
              Control customer PII masking, system log retention limits, and
              privacy compliance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="maskPii"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Mask Sensitive Customer PII
                  </Label>
                  <p className="text-xs text-stone-500">
                    Hide full credit card & phone numbers on receipt screens.
                  </p>
                </div>
                <Controller
                  name="maskSensitiveData"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="maskPii"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dataRetention">
                  System Audit Data Retention (Days)
                </Label>
                <Input
                  id="dataRetention"
                  type="number"
                  {...register("dataRetentionDays")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Security Alerts */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <BellRing className="h-4 w-4 text-[#F97316]" />
              7. Real-Time Security Incident Alerts
            </CardTitle>
            <CardDescription>
              Configure automated notifications for critical security events and
              policy violations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="alertUnrecognized"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    New Device Login
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert on new IP login.
                  </p>
                </div>
                <Controller
                  name="alertUnrecognizedLogin"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="alertUnrecognized"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="alertPassword"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Password Changes
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert on key updates.
                  </p>
                </div>
                <Controller
                  name="alertPasswordChange"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="alertPassword"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="alertIp"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    IP Mismatch Alert
                  </Label>
                  <p className="text-xs text-stone-500">Flag location jumps.</p>
                </div>
                <Controller
                  name="alertIpMismatch"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="alertIp"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="alertChannel">
                Incident Notification Dispatch Channel
              </Label>
              <Controller
                name="alertChannel"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="alertChannel" className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email_sms">
                        Email + SMS Push
                      </SelectItem>
                      <SelectItem value="email_only">Email Only</SelectItem>
                      <SelectItem value="webhook">
                        Security Webhook Endpoint
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Global Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Security Policies
          </Button>
        </div>
      </form>
    </div>
  );
}
