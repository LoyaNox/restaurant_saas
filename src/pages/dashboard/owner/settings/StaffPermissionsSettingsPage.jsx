import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Users,
  ShieldCheck,
  KeyRound,
  CheckSquare,
  History,
  Plus,
  Trash2,
  Save,
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

export default function StaffPermissionsSettingsPage() {
  const [selectedRole, setSelectedRole] = useState("Manager");

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // 1. General Staff Settings
      autoClockOutHours: "12",
      requireManagerPinForVoid: true,
      allowSelfScheduleView: true,

      // 3. Permissions Matrix (Role level settings)
      permissions: {
        Manager: {
          accessPOS: true,
          viewReports: true,
          processRefunds: true,
          manageInventory: true,
          editStaff: true,
        },
        Cashier: {
          accessPOS: true,
          viewReports: false,
          processRefunds: false,
          manageInventory: false,
          editStaff: false,
        },
        KitchenStaff: {
          accessPOS: false,
          viewReports: false,
          processRefunds: false,
          manageInventory: true,
          editStaff: false,
        },
      },

      // 4. Login & Security Settings
      enforceTwoFactor: false,
      pinLength: "4",
      sessionTimeoutMinutes: "30",
      maxFailedLoginAttempts: "5",

      // 5. Approval Rules
      approvalRules: [
        {
          triggerEvent: "Discount > 20%",
          requiredRole: "Manager",
          actionType: "PIN Entry",
        },
        {
          triggerEvent: "Order Voiding",
          requiredRole: "Store Owner",
          actionType: "Remote Approval",
        },
      ],
    },
  });

  const {
    fields: approvalFields,
    append: appendApproval,
    remove: removeApproval,
  } = useFieldArray({ control, name: "approvalRules" });

  // Sample Audit Logs Data
  const auditLogs = [
    {
      id: "LOG-1001",
      timestamp: "2026-08-21 21:45",
      user: "Alex Rivera (Manager)",
      action: "Approved $45 Refund",
      ip: "192.168.1.102",
      status: "Success",
    },
    {
      id: "LOG-1002",
      timestamp: "2026-08-21 20:12",
      user: "Sam Chen (Cashier)",
      action: "Attempted Void without PIN",
      ip: "192.168.1.105",
      status: "Blocked",
    },
    {
      id: "LOG-1003",
      timestamp: "2026-08-21 18:30",
      user: "System Security",
      action: "Role 'KitchenStaff' updated",
      ip: "127.0.0.1",
      status: "Success",
    },
  ];

  const onSubmit = (data) => {
    console.log("Staff & Security Settings Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          Staff, Roles & Security Governance
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Configure general staff access, granular permission matrices,
          authentication rules, override approvals, and review activity audit
          logs.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Staff Policy Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#F97316]" />
              1. General Staff Rules & Shift Governance
            </CardTitle>
            <CardDescription>
              Set global floor rules, automatic clock-out windows, and basic
              staff privileges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="managerPin"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Require Manager PIN for Order Voids
                  </Label>
                  <p className="text-xs text-stone-500">
                    Require supervisor pin to clear submitted tickets.
                  </p>
                </div>
                <Controller
                  name="requireManagerPinForVoid"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="managerPin"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="selfSchedule"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Allow Staff Self-Schedule Access
                  </Label>
                  <p className="text-xs text-stone-500">
                    Staff can view upcoming shifts from employee portal.
                  </p>
                </div>
                <Controller
                  name="allowSelfScheduleView"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="selfSchedule"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="autoClockOut">
                Force Shift Auto-Clockout (Hours)
              </Label>
              <Input
                id="autoClockOut"
                type="number"
                {...register("autoClockOutHours")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 2 & 3. Roles and Permissions Matrix */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#F97316]" />2 & 3. Roles &
              Access Permission Matrix
            </CardTitle>
            <CardDescription>
              Select a staff role to customize specific system access
              privileges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Label className="text-xs font-semibold text-stone-900 uppercase">
                Select Role to Edit:
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[200px] bg-white h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                  <SelectItem value="KitchenStaff">Kitchen Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Permissions for {selectedRole} Role
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { key: "accessPOS", label: "Access POS Register" },
                  { key: "viewReports", label: "View Financial Reports" },
                  { key: "processRefunds", label: "Process Refunds & Returns" },
                  { key: "manageInventory", label: "Manage Inventory & Stock" },
                  {
                    key: "editStaff",
                    label: "Edit Staff Schedules & Accounts",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200"
                  >
                    <Label
                      htmlFor={`${selectedRole}-${item.key}`}
                      className="text-xs text-stone-700 cursor-pointer"
                    >
                      {item.label}
                    </Label>
                    <Controller
                      name={`permissions.${selectedRole}.${item.key}`}
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id={`${selectedRole}-${item.key}`}
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Login & Security Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#F97316]" />
              4. Login, PINs & Authentication Security
            </CardTitle>
            <CardDescription>
              Configure password strength rules, staff PIN lengths, and terminal
              lockouts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enforce Two-Factor Authentication (2FA)
                </p>
                <p className="text-xs text-stone-500">
                  Require 2FA verification for management level users logging
                  into backend settings.
                </p>
              </div>
              <Controller
                name="enforceTwoFactor"
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
                <Label htmlFor="pinLength">Terminal Access PIN Length</Label>
                <Controller
                  name="pinLength"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="pinLength" className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4-Digit PIN</SelectItem>
                        <SelectItem value="6">6-Digit PIN</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sessionTimeout">
                  Idle Terminal Lock (Minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  {...register("sessionTimeoutMinutes")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maxAttempts">Max Failed PIN Attempts</Label>
                <Input
                  id="maxAttempts"
                  type="number"
                  {...register("maxFailedLoginAttempts")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Approval Rules */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-[#F97316]" />
              5. Manager Overrides & Approval Workflows
            </CardTitle>
            <CardDescription>
              Define critical triggers that demand high-level staff approval
              before proceeding.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Configured Escalation Triggers
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendApproval({
                    triggerEvent: "High Value Refund (> $100)",
                    requiredRole: "Store Owner",
                    actionType: "PIN Entry",
                  })
                }
                className="gap-1.5 text-xs text-stone-700 bg-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add Approval Rule
              </Button>
            </div>

            <div className="space-y-2">
              {approvalFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center gap-3"
                >
                  <div className="w-full sm:w-1/3">
                    <Input
                      placeholder="Trigger Event (e.g. Price Override)"
                      className="bg-white h-9 text-xs"
                      {...register(`approvalRules.${index}.triggerEvent`)}
                    />
                  </div>
                  <div className="w-full sm:w-1/3">
                    <Controller
                      name={`approvalRules.${index}.requiredRole`}
                      control={control}
                      render={({ field: selectField }) => (
                        <Select
                          onValueChange={selectField.onChange}
                          value={selectField.value}
                        >
                          <SelectTrigger className="bg-white h-9 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Store Owner">
                              Store Owner
                            </SelectItem>
                            <SelectItem value="Shift Lead">
                              Shift Lead
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 flex items-center gap-2">
                    <Controller
                      name={`approvalRules.${index}.actionType`}
                      control={control}
                      render={({ field: selectField }) => (
                        <Select
                          onValueChange={selectField.onChange}
                          value={selectField.value}
                        >
                          <SelectTrigger className="bg-white h-9 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PIN Entry">PIN Entry</SelectItem>
                            <SelectItem value="Remote Approval">
                              Remote Push Approval
                            </SelectItem>
                            <SelectItem value="Biometric">
                              Biometric Swipe
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeApproval(index)}
                      className="h-9 w-9 text-stone-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 6. Activity & Audit Logs */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <History className="h-4 w-4 text-[#F97316]" />
              6. System Activity & Security Audit Logs
            </CardTitle>
            <CardDescription>
              Recent security overrides, administrative actions, and permission
              modifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-stone-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-stone-50">
                  <TableRow>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Log ID
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Staff / User
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Action Performed
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      IP Terminal
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-stone-700">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id} className="text-xs">
                      <TableCell className="font-mono font-medium text-stone-900">
                        {log.id}
                      </TableCell>
                      <TableCell className="text-stone-500">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-semibold text-stone-800">
                        {log.user}
                      </TableCell>
                      <TableCell className="text-stone-700">
                        {log.action}
                      </TableCell>
                      <TableCell className="font-mono text-stone-500">
                        {log.ip}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "Success"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-[10px] px-2 py-0.5"
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Security & Permission Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
