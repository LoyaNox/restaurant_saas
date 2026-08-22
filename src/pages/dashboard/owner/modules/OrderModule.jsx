import { useForm, Controller } from "react-hook-form";
import {
  SlidersHorizontal,
  UtensilsCrossed,
  ListOrdered,
  Clock,
  History,
  Save,
  AlertCircle,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrdersSettingsPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // Order Preferences
      defaultOrderType: "dine_in",
      requireTableSelection: true,
      allowCustomItemNotes: true,
      autoAcceptDigitalOrders: false,
      soundAlerts: true,

      // Order Types
      enableDineIn: true,
      enableTakeaway: true,
      enableDelivery: true,
      enableAggregators: false,

      // Order Status Flow
      requireKOTConfirmation: true,
      autoCompleteSettledOrders: true,
      cancellationReasonRequired: true,

      // Order Timing & SLA
      prepTimeDineIn: "15",
      prepTimeTakeaway: "20",
      prepTimeDelivery: "35",
      warningDelayThreshold: "10",

      // Order History & Archival
      activeHistoryDays: "30",
      autoArchiveDays: "90",
      enableAuditLogs: true,
    },
  });

  const onSubmit = (data) => {
    console.log("Orders Configuration Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          Orders Configuration
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Manage ordering behavior, order types, kitchen processing logic,
          preparation timers, and historical data rules.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Order Preferences */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#F97316]" />
              1. General Order Preferences
            </CardTitle>
            <CardDescription>
              Define default creation behaviors and POS order rules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="defaultOrderType">Default POS Order Mode</Label>
                <Controller
                  name="defaultOrderType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="defaultOrderType">
                        <SelectValue placeholder="Select Default Mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dine_in">Dine-In</SelectItem>
                        <SelectItem value="takeaway">
                          Takeaway / Counter
                        </SelectItem>
                        <SelectItem value="delivery">
                          Direct Delivery
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="reqTable"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Require Table Selection
                  </Label>
                  <p className="text-xs text-stone-500">
                    Force staff to assign a table before firing Dine-In orders.
                  </p>
                </div>
                <Controller
                  name="requireTableSelection"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="reqTable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="itemNotes"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Custom Preparation Notes
                  </Label>
                  <p className="text-xs text-stone-500">
                    Allow staff/customers to attach notes to individual items.
                  </p>
                </div>
                <Controller
                  name="allowCustomItemNotes"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="itemNotes"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="autoAccept"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Auto-Accept QR Orders
                  </Label>
                  <p className="text-xs text-stone-500">
                    Send digital menu orders straight to KOT without staff
                    approval.
                  </p>
                </div>
                <Controller
                  name="autoAcceptDigitalOrders"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="autoAccept"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="sound"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Audio Notifications
                  </Label>
                  <p className="text-xs text-stone-500">
                    Play chime on incoming online or KDS updates.
                  </p>
                </div>
                <Controller
                  name="soundAlerts"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="sound"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Supported Channels & Order Types */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-[#F97316]" />
              2. Supported Channels & Order Types
            </CardTitle>
            <CardDescription>
              Toggle available fulfillment modes for your restaurant outlet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Dine-In Service
                </p>
                <p className="text-xs text-stone-500">
                  Table seating, running bills, and KOT dispatching.
                </p>
              </div>
              <Controller
                name="enableDineIn"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Takeaway / Over-the-Counter
                </p>
                <p className="text-xs text-stone-500">
                  Quick checkout, express packing, and customer name tag
                  processing.
                </p>
              </div>
              <Controller
                name="enableTakeaway"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  In-House Direct Delivery
                </p>
                <p className="text-xs text-stone-500">
                  Assign orders to internal fleet drivers and capture customer
                  delivery addresses.
                </p>
              </div>
              <Controller
                name="enableDelivery"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between opacity-80">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-stone-900">
                    Third-Party Aggregators Integration
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-stone-200/50 text-stone-700 border-stone-300"
                  >
                    API Add-on
                  </Badge>
                </div>
                <p className="text-xs text-stone-500">
                  Sync with Swiggy, Zomato, and Uber Eats POS bridges.
                </p>
              </div>
              <Controller
                name="enableAggregators"
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

        {/* 3. Workflow & Status Validation */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ListOrdered className="h-4 w-4 text-[#F97316]" />
              3. Order Workflow & Status Rules
            </CardTitle>
            <CardDescription>
              Define lifecycle triggers from Pending &rarr; Preparing &rarr;
              Ready &rarr; Completed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="reqKOT"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Kitchen KOT Acknowledgment
                </Label>
                <p className="text-xs text-stone-500">
                  Require kitchen staff to manually press "Preparing" before
                  timer starts.
                </p>
              </div>
              <Controller
                name="requireKOTConfirmation"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="reqKOT"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="autoComplete"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Auto-Complete Paid Orders
                </Label>
                <p className="text-xs text-stone-500">
                  Automatically move orders to "Completed" status upon full bill
                  payment.
                </p>
              </div>
              <Controller
                name="autoCompleteSettledOrders"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="autoComplete"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="reasonReq"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Mandatory Cancellation Reason
                </Label>
                <p className="text-xs text-stone-500">
                  Require staff to select/enter a justification before voiding
                  an active order.
                </p>
              </div>
              <Controller
                name="cancellationReasonRequired"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="reasonReq"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* 4. Preparation Timers & SLA */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#F97316]" />
              4. Preparation Timers & SLA Thresholds
            </CardTitle>
            <CardDescription>
              Set target preparation times for KDS displays and delay alert
              triggers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="prepDineIn">Dine-In Target Prep (Mins)</Label>
                <Input
                  id="prepDineIn"
                  type="number"
                  {...register("prepTimeDineIn")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prepTakeaway">
                  Takeaway Target Prep (Mins)
                </Label>
                <Input
                  id="prepTakeaway"
                  type="number"
                  {...register("prepTimeTakeaway")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prepDelivery">
                  Delivery Target Prep (Mins)
                </Label>
                <Input
                  id="prepDelivery"
                  type="number"
                  {...register("prepTimeDelivery")}
                />
              </div>
            </div>

            <Separator />

            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="space-y-2 w-full">
                <p className="text-xs font-semibold text-amber-900">
                  Delayed Order Warning Alert
                </p>
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor="delayWarn"
                    className="text-xs text-amber-800 whitespace-nowrap"
                  >
                    Highlight order as delayed after exceeding target time by:
                  </Label>
                  <div className="w-28">
                    <Input
                      id="delayWarn"
                      type="number"
                      className="bg-white border-amber-200 h-8 text-xs"
                      {...register("warningDelayThreshold")}
                    />
                  </div>
                  <span className="text-xs font-medium text-amber-800">
                    Minutes
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Order Archival & History */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <History className="h-4 w-4 text-[#F97316]" />
              5. Order Archival & History Rules
            </CardTitle>
            <CardDescription>
              Configure live order board history windows and long-term storage
              parameters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="activeHistory">
                  Active Orders Window (Days)
                </Label>
                <Controller
                  name="activeHistoryDays"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="activeHistory">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 Days</SelectItem>
                        <SelectItem value="30">Last 30 Days</SelectItem>
                        <SelectItem value="60">Last 60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-xs text-stone-500">
                  Orders accessible in standard POS search lists.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="autoArchive">
                  Auto-Archive Threshold (Days)
                </Label>
                <Controller
                  name="autoArchiveDays"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="autoArchive">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="180">180 Days (6 Months)</SelectItem>
                        <SelectItem value="365">365 Days (1 Year)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-xs text-stone-500">
                  Move settled orders to cold cloud storage.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 mt-2">
              <div>
                <Label
                  htmlFor="auditLogs"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Enable Order Mutation Audit Log
                </Label>
                <p className="text-xs text-stone-500">
                  Track item additions, price overrides, and cancellations per
                  staff user.
                </p>
              </div>
              <Controller
                name="enableAuditLogs"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="auditLogs"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
            <Save className="h-4 w-4" /> Save Orders Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
