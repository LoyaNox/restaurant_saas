import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Bell,
  ShoppingBag,
  CalendarCheck,
  UtensilsCrossed,
  CreditCard,
  Users2,
  ShieldAlert,
  Radio,
  UserCheck,
  Save,
  Plus,
  Trash2,
  Package,
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

export default function NotificationSettingsPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // 1. General Settings
      enableNotifications: true,
      quietHoursEnabled: true,
      quietHoursStart: "23:00",
      quietHoursEnd: "06:00",

      // 2. Order Notifications
      notifyNewOrder: true,
      notifyOrderCanceled: true,
      notifyDelayedOrder: true,
      delayedOrderThresholdMinutes: "15",

      // 3. Reservation Notifications
      notifyNewReservation: true,
      notifyReservationCancellation: true,
      reservationReminderHoursBefore: "2",

      // 4. Table Notifications
      notifyTableNeedsCleaning: true,
      notifyTableIdleTooLong: true,
      idleTableMinutes: "30",

      // 5. Payment Notifications
      notifyPaymentSuccess: false,
      notifyPaymentFailed: true,
      notifyRefundProcessed: true,

      // 6. Inventory Notifications
      notifyLowStock: true,
      notify86Item: true,

      // 7. Staff Notifications
      notifyShiftStart: true,
      notifyShiftOvertime: true,

      // 8. System & Security
      notifyNewDeviceLogin: true,
      notifyOfflineGateway: true,

      // 9. Delivery Channels
      channelPush: true,
      channelSms: true,
      channelEmail: true,
      channelPosSound: true,

      // 10. Recipients & Routing Rules
      recipientRules: [
        { role: "Kitchen Manager", event: "low_stock", channel: "email" },
        { role: "Floor Supervisor", event: "delayed_order", channel: "push" },
      ],
    },
  });

  const {
    fields: recipientFields,
    append: appendRecipient,
    remove: removeRecipient,
  } = useFieldArray({ control, name: "recipientRules" });

  const onSubmit = (data) => {
    console.log("Notification Settings Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          Notifications & Real-Time Alerts Configuration
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Manage system alerts for kitchen operations, reservations, floor
          management, payments, inventory triggers, and recipient routing rules.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Notification Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#F97316]" />
              1. General Notification & Quiet Hours
            </CardTitle>
            <CardDescription>
              Master switch and schedule window for non-critical broadcast
              suppresses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Global Alert Engine
                </p>
                <p className="text-xs text-stone-500">
                  Enable real-time push, audio chimes, SMS, and email alerts
                  across devices.
                </p>
              </div>
              <Controller
                name="enableNotifications"
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
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="quietHours"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enable Quiet Hours
                  </Label>
                  <p className="text-xs text-stone-500">
                    Mute non-urgent alerts.
                  </p>
                </div>
                <Controller
                  name="quietHoursEnabled"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="quietHours"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quietHoursStart">Quiet Start</Label>
                <Input
                  id="quietHoursStart"
                  type="time"
                  {...register("quietHoursStart")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quietHoursEnd">Quiet End</Label>
                <Input
                  id="quietHoursEnd"
                  type="time"
                  {...register("quietHoursEnd")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Order Notifications */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-[#F97316]" />
              2. Order Lifecycle Alerts
            </CardTitle>
            <CardDescription>
              Configure triggers for incoming, canceled, or prep-delayed orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="newOrder"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    New Order Alert
                  </Label>
                  <p className="text-xs text-stone-500">
                    Notify on incoming order.
                  </p>
                </div>
                <Controller
                  name="notifyNewOrder"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="newOrder"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="cancelOrder"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Order Cancellation
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert on voided orders.
                  </p>
                </div>
                <Controller
                  name="notifyOrderCanceled"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="cancelOrder"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="delayOrder"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Prep Delay Alert
                  </Label>
                  <p className="text-xs text-stone-500">
                    Flag overdue KOT items.
                  </p>
                </div>
                <Controller
                  name="notifyDelayedOrder"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="delayOrder"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="delayedOrderThresholdMinutes">
                Prep Delay Threshold (Minutes)
              </Label>
              <Input
                id="delayedOrderThresholdMinutes"
                type="number"
                {...register("delayedOrderThresholdMinutes")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Reservation Notifications */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-[#F97316]" />
              3. Reservation & Booking Alerts
            </CardTitle>
            <CardDescription>
              Alerts for guest table bookings, changes, and reminder lead times.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="newRes"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    New Reservation
                  </Label>
                  <p className="text-xs text-stone-500">
                    Notify host stand on new booking.
                  </p>
                </div>
                <Controller
                  name="notifyNewReservation"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="newRes"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="cancelRes"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Cancellation Notice
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert when a party cancels.
                  </p>
                </div>
                <Controller
                  name="notifyReservationCancellation"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="cancelRes"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reservationReminderHoursBefore">
                Automated SMS Guest Reminder (Hours Before)
              </Label>
              <Input
                id="reservationReminderHoursBefore"
                type="number"
                {...register("reservationReminderHoursBefore")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 4. Table Notifications */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-[#F97316]" />
              4. Floor & Table Status Alerts
            </CardTitle>
            <CardDescription>
              Floor management notices for bussing tables and idle dining
              parties.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="dirtyTable"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Table Needs Cleaning
                  </Label>
                  <p className="text-xs text-stone-500">
                    Notify bussers after bill settlement.
                  </p>
                </div>
                <Controller
                  name="notifyTableNeedsCleaning"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="dirtyTable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="idleTable"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Idle Seated Table Alert
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert if seated table hasn't ordered.
                  </p>
                </div>
                <Controller
                  name="notifyTableIdleTooLong"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="idleTable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="idleTableMinutes">
                Idle Table Trigger Limit (Minutes)
              </Label>
              <Input
                id="idleTableMinutes"
                type="number"
                {...register("idleTableMinutes")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 5. Payment Notifications */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#F97316]" />
              5. Payment & Settlement Alerts
            </CardTitle>
            <CardDescription>
              Triggers for payment failures, successful checkouts, and processed
              refunds.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="paySuccess"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Payment Success
                  </Label>
                  <p className="text-xs text-stone-500">Chime on paid bills.</p>
                </div>
                <Controller
                  name="notifyPaymentSuccess"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="paySuccess"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="payFail"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Payment Failed
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert on declined cards.
                  </p>
                </div>
                <Controller
                  name="notifyPaymentFailed"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="payFail"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="refundAlert"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Refund Processed
                  </Label>
                  <p className="text-xs text-stone-500">
                    Notify manager on refunds.
                  </p>
                </div>
                <Controller
                  name="notifyRefundProcessed"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="refundAlert"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Inventory Notifications */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#F97316]" />
              6. Stock Level & 86'd Dish Alerts
            </CardTitle>
            <CardDescription>
              Alert staff when ingredients reach reorder thresholds or menu
              items go out of stock.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="lowStock"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Low Stock Reorder Alert
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert when raw inventory dips below threshold.
                  </p>
                </div>
                <Controller
                  name="notifyLowStock"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="lowStock"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="item86"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Item 86'd / Sold Out Notice
                  </Label>
                  <p className="text-xs text-stone-500">
                    Broadcast auto-86 events across POS screens.
                  </p>
                </div>
                <Controller
                  name="notify86Item"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="item86"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Staff & Roster Notifications */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Users2 className="h-4 w-4 text-[#F97316]" />
              7. Staff Shift & Clock-In Alerts
            </CardTitle>
            <CardDescription>
              Manage alerts for employee punch-ins, late clock-ins, and overtime
              hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="shiftStart"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Shift Reminder
                  </Label>
                  <p className="text-xs text-stone-500">
                    Send push reminder to staff 1hr before shift.
                  </p>
                </div>
                <Controller
                  name="notifyShiftStart"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="shiftStart"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="overtimeAlert"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Overtime Threshold Warning
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert manager when employee nears overtime.
                  </p>
                </div>
                <Controller
                  name="notifyShiftOvertime"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="overtimeAlert"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. System & Security Notifications */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[#F97316]" />
              8. System Security & Gateway Health Alerts
            </CardTitle>
            <CardDescription>
              Receive immediate alerts regarding new logins, terminal
              disconnects, and offline gateways.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="deviceLogin"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Unrecognized Device Login
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert admin when new terminal connects.
                  </p>
                </div>
                <Controller
                  name="notifyNewDeviceLogin"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="deviceLogin"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="offlineGateway"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Offline Gateway / Printer Disconnect
                  </Label>
                  <p className="text-xs text-stone-500">
                    Alert on hardware or card reader dropped connections.
                  </p>
                </div>
                <Controller
                  name="notifyOfflineGateway"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="offlineGateway"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 9. Delivery Channels */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Radio className="h-4 w-4 text-[#F97316]" />
              9. Active Notification Delivery Channels
            </CardTitle>
            <CardDescription>
              Toggle preferred dispatch mediums across mobile, web, terminal,
              and email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Mobile Push
                  </p>
                  <p className="text-[11px] text-stone-500">
                    App notifications
                  </p>
                </div>
                <Controller
                  name="channelPush"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    SMS Direct
                  </p>
                  <p className="text-[11px] text-stone-500">Text messaging</p>
                </div>
                <Controller
                  name="channelSms"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Email Digest
                  </p>
                  <p className="text-[11px] text-stone-500">Email updates</p>
                </div>
                <Controller
                  name="channelEmail"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    POS Audio Chime
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Terminal speaker sound
                  </p>
                </div>
                <Controller
                  name="channelPosSound"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10. Recipients & Routing Rules */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-[#F97316]" />
              10. Notification Recipient & Routing Rules
            </CardTitle>
            <CardDescription>
              Route specific notification events directly to designated team
              roles and channels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Configured Routing Rules
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendRecipient({
                    role: "General Manager",
                    event: "payment_failed",
                    channel: "sms",
                  })
                }
                className="gap-1.5 text-xs text-stone-700 bg-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add Routing Rule
              </Button>
            </div>

            <div className="space-y-2">
              {recipientFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center gap-3"
                >
                  <div className="w-full sm:w-1/3">
                    <Input
                      placeholder="Target Role (e.g. Kitchen Manager)"
                      className="bg-white h-9 text-xs"
                      {...register(`recipientRules.${index}.role`)}
                    />
                  </div>
                  <div className="w-full sm:w-1/3">
                    <Controller
                      name={`recipientRules.${index}.event`}
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
                            <SelectItem value="low_stock">
                              Low Stock Event
                            </SelectItem>
                            <SelectItem value="delayed_order">
                              Delayed Order Prep
                            </SelectItem>
                            <SelectItem value="payment_failed">
                              Failed Payment
                            </SelectItem>
                            <SelectItem value="security_login">
                              Security Login
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 flex items-center gap-2">
                    <Controller
                      name={`recipientRules.${index}.channel`}
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
                            <SelectItem value="push">Mobile Push</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="pos_sound">POS Audio</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRecipient(index)}
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

        {/* Global Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Notification Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
