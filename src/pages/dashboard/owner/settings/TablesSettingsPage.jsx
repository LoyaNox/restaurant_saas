import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  LayoutGrid,
  Settings,
  Map,
  Activity,
  CalendarCheck,
  QrCode,
  UtensilsCrossed,
  Timer,
  Users,
  Eye,
  Plus,
  Trash2,
  Save,
  Download,
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

export default function TablesSettingsPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // 1. General Settings
      enableTableManagement: true,
      serviceAreaType: "restaurant",
      allowTableSharing: false,

      // 2. Table Configuration
      tables: [
        { name: "T-01", section: "Main Hall", capacity: "4", shape: "square" },
        { name: "T-02", section: "Main Hall", capacity: "2", shape: "round" },
        { name: "P-01", section: "Patio", capacity: "6", shape: "rectangle" },
      ],

      // 3. Floor Plan Layout
      gridSnapSize: "20",
      showTableNumbersOnGrid: true,
      enableMultiZoneFloorPlan: true,

      // 4. Table Status Logic
      autoDirtyOnCheckout: true,
      turnaroundAlertMinutes: "45",
      idleTableWarningMinutes: "15",

      // 5. Table Reservations
      enableReservations: true,
      maxAdvanceReservationDays: "30",
      gracePeriodMinutes: "15",
      autoReleaseNoShow: true,

      // 6. QR Code Management
      generateTableQrCodes: true,
      qrCodeStyle: "standard",
      showTableNumberInQr: true,

      // 7. Table Ordering & Integration
      allowDirectQrOrdering: true,
      requireWaiterConfirmation: true,
      enableSplitBillingPerTable: true,

      // 8. Table Sessions & Seating
      autoOpenSessionOnOrder: true,
      closeSessionOnSettlement: true,
      trackGuestCounts: true,

      // 9. Capacity & Load Management
      maxOccupancyLimit: "120",
      enforceCapacityLimits: true,
      alertOnOverCapacity: true,

      // 10. Visual Display & Layout Preferences
      activeColorTheme: "status",
      showOccupancyPercentage: true,
      enableKdsFloorSync: true,
    },
  });

  const {
    fields: tableFields,
    append: appendTable,
    remove: removeTable,
  } = useFieldArray({ control, name: "tables" });

  const onSubmit = (data) => {
    console.log("Table Management Settings Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          Table & Floor Management Configuration
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Configure physical dining areas, table layouts, capacity limits, live
          status workflows, reservation rules, and QR code settings.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Table Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#F97316]" />
              1. General Table System Preferences
            </CardTitle>
            <CardDescription>
              Set master controls for table tracking and dining area types.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Dine-In Table Tracking
                </p>
                <p className="text-xs text-stone-500">
                  Track seating, running tabs, and floor layouts across your POS
                  devices.
                </p>
              </div>
              <Controller
                name="enableTableManagement"
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
                <Label htmlFor="serviceAreaType">Primary Floor Concept</Label>
                <Controller
                  name="serviceAreaType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="serviceAreaType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">
                          Standard Restaurant & Dining
                        </SelectItem>
                        <SelectItem value="bar">
                          Bar & Counter Seating
                        </SelectItem>
                        <SelectItem value="foodcourt">
                          Food Court / Open Seating
                        </SelectItem>
                        <SelectItem value="outdoor">
                          Patio & Rooftop Garden
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 self-end">
                <div>
                  <Label
                    htmlFor="shareTable"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Allow Table Sharing / Communal Seating
                  </Label>
                  <p className="text-xs text-stone-500">
                    Open multiple independent bills on a single table.
                  </p>
                </div>
                <Controller
                  name="allowTableSharing"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="shareTable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Table Configuration */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <LayoutGrid className="h-4 w-4 text-[#F97316]" />
              2. Physical Table Inventory Setup
            </CardTitle>
            <CardDescription>
              Define tables, assign floor sections, set seating capacity, and
              pick geometry.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Configured Tables
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendTable({
                    name: `T-0${tableFields.length + 1}`,
                    section: "Main Hall",
                    capacity: "4",
                    shape: "square",
                  })
                }
                className="gap-1.5 text-xs text-stone-700 bg-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add New Table
              </Button>
            </div>

            <div className="space-y-2">
              {tableFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center gap-3"
                >
                  <div className="w-full sm:w-1/4">
                    <Input
                      placeholder="Table No. (e.g. T-01)"
                      className="bg-white h-9 text-xs"
                      {...register(`tables.${index}.name`)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4">
                    <Input
                      placeholder="Section (e.g. Patio)"
                      className="bg-white h-9 text-xs"
                      {...register(`tables.${index}.section`)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4">
                    <Input
                      type="number"
                      placeholder="Seats (e.g. 4)"
                      className="bg-white h-9 text-xs"
                      {...register(`tables.${index}.capacity`)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4 flex items-center gap-2">
                    <Controller
                      name={`tables.${index}.shape`}
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
                            <SelectItem value="square">Square</SelectItem>
                            <SelectItem value="rectangle">Rectangle</SelectItem>
                            <SelectItem value="round">Round</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTable(index)}
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

        {/* 3. Floor Plan Layout */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Map className="h-4 w-4 text-[#F97316]" />
              3. Visual Floor Plan & Grid Rules
            </CardTitle>
            <CardDescription>
              Configure spatial dragging grid, zoning rules, and visual mapping
              controls.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="gridSnapSize">
                  Designer Grid Snap Size (px)
                </Label>
                <Controller
                  name="gridSnapSize"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="gridSnapSize">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10px Fine Grid</SelectItem>
                        <SelectItem value="20">20px Standard Grid</SelectItem>
                        <SelectItem value="30">30px Coarse Grid</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="multiZone"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enable Multi-Zone / Floor Layouts
                  </Label>
                  <p className="text-xs text-stone-500">
                    Separate main hall, outdoor, and private rooms.
                  </p>
                </div>
                <Controller
                  name="enableMultiZoneFloorPlan"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="multiZone"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Table Status Logic */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#F97316]" />
              4. Table Lifecycle & Status Automations
            </CardTitle>
            <CardDescription>
              Automate status shifts (Available $\rightarrow$ Occupied
              $\rightarrow$ Billed $\rightarrow$ Dirty).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="autoDirty"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Auto-Mark Table as "Dirty / Cleaning Needed"
                </Label>
                <p className="text-xs text-stone-500">
                  Set status to dirty immediately after bill payment checkout.
                </p>
              </div>
              <Controller
                name="autoDirtyOnCheckout"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="autoDirty"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="turnaroundAlertMinutes">
                  Target Turnaround Warning (Mins)
                </Label>
                <Input
                  id="turnaroundAlertMinutes"
                  type="number"
                  {...register("turnaroundAlertMinutes")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="idleTableWarningMinutes">
                  Idle Table Notice Alert (Mins)
                </Label>
                <Input
                  id="idleTableWarningMinutes"
                  type="number"
                  {...register("idleTableWarningMinutes")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Table Reservations */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-[#F97316]" />
              5. Table Reservation & Booking Logic
            </CardTitle>
            <CardDescription>
              Configure pre-booking parameters, advance window limits, and hold
              durations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Table Booking Engine
                </p>
                <p className="text-xs text-stone-500">
                  Accept direct web bookings and host stand reservations.
                </p>
              </div>
              <Controller
                name="enableReservations"
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
                <Label htmlFor="maxAdvanceReservationDays">
                  Max Advance Booking Window (Days)
                </Label>
                <Input
                  id="maxAdvanceReservationDays"
                  type="number"
                  {...register("maxAdvanceReservationDays")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gracePeriodMinutes">
                  Reservation Grace Period (Mins)
                </Label>
                <Input
                  id="gracePeriodMinutes"
                  type="number"
                  {...register("gracePeriodMinutes")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. QR Code Management */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <QrCode className="h-4 w-4 text-[#F97316]" />
              6. Table QR Code Generation
            </CardTitle>
            <CardDescription>
              Generate printable QR codes embedded with table IDs for digital
              guest ordering.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="tableQr"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Generate Unique QR Code Per Table
                </Label>
                <p className="text-xs text-stone-500">
                  Automatically map scanned digital orders to the scanned table.
                </p>
              </div>
              <Controller
                name="generateTableQrCodes"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="tableQr"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="button" variant="outline" className="gap-2 text-xs">
                <Download className="h-4 w-4 text-stone-600" /> Export All Table
                QR Codes (.ZIP)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 7. Table Ordering & Integration */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-[#F97316]" />
              7. Table Side Ordering Rules
            </CardTitle>
            <CardDescription>
              Define staff approval triggers, split billing options, and POS
              dispatch rules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="waiterConfirm"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Require Waiter Order Approval
                  </Label>
                  <p className="text-xs text-stone-500">
                    Server must accept QR orders on POS before KOT prints.
                  </p>
                </div>
                <Controller
                  name="requireWaiterConfirmation"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="waiterConfirm"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="splitBill"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enable Per-Seat Split Billing
                  </Label>
                  <p className="text-xs text-stone-500">
                    Allow staff to split check by cover or selected items.
                  </p>
                </div>
                <Controller
                  name="enableSplitBillingPerTable"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="splitBill"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Table Sessions & Seating */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Timer className="h-4 w-4 text-[#F97316]" />
              8. Seating Sessions & Tab Behavior
            </CardTitle>
            <CardDescription>
              Manage session initiation, guest count prompts, and tab settlement
              rules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="openSession"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Auto-Open Session on First Order
                  </Label>
                  <p className="text-xs text-stone-500">
                    Change table to "Occupied" as soon as an item is sent.
                  </p>
                </div>
                <Controller
                  name="autoOpenSessionOnOrder"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="openSession"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="trackCovers"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Prompt Guest Cover Count
                  </Label>
                  <p className="text-xs text-stone-500">
                    Force waiter to enter guest count when opening table.
                  </p>
                </div>
                <Controller
                  name="trackGuestCounts"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="trackCovers"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 9. Capacity & Load Management */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#F97316]" />
              9. Floor Capacity & Load Controls
            </CardTitle>
            <CardDescription>
              Set total venue seating limits and trigger alerts during rush
              periods.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="maxOccupancyLimit">
                  Venue Max Occupancy Limit
                </Label>
                <Input
                  id="maxOccupancyLimit"
                  type="number"
                  {...register("maxOccupancyLimit")}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="capAlert"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Alert Staff Near Capacity Limit
                  </Label>
                  <p className="text-xs text-stone-500">
                    Show notification when seating exceeds 90% load.
                  </p>
                </div>
                <Controller
                  name="alertOnOverCapacity"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="capAlert"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10. Visual Display & Floor Plan Preferences */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#F97316]" />
              10. Visual Floor Display Settings
            </CardTitle>
            <CardDescription>
              Customize color themes and real-time synchronization between POS
              and KDS screens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="activeColorTheme">
                  Floor View Color Scheme
                </Label>
                <Controller
                  name="activeColorTheme"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="activeColorTheme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="status">
                          Status Colors (Green/Red/Yellow)
                        </SelectItem>
                        <SelectItem value="section">
                          Section Groups (Color-coded Zone)
                        </SelectItem>
                        <SelectItem value="timer">
                          Elapsed Time Heatmap
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="kdsSync"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Real-time KDS & Kitchen Sync
                  </Label>
                  <p className="text-xs text-stone-500">
                    Reflect kitchen prep status on floor plan icons.
                  </p>
                </div>
                <Controller
                  name="enableKdsFloorSync"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="kdsSync"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Table & Floor Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
