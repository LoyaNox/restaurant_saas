import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Clock, Plus, Trash2, CalendarDays } from "lucide-react";

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

export default function OrderTimeslotSection() {
  const { control, register } = useForm({
    defaultValues: {
      enableTimeslots: true,
      slotInterval: "30",
      maxOrdersPerSlot: "15",
      leadTimeMinutes: "45",
      timeslots: [
        { startTime: "12:00", endTime: "15:00", label: "Lunch Shift" },
        { startTime: "19:00", endTime: "23:00", label: "Dinner Shift" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeslots",
  });

  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#F97316]" />
          Scheduled Order Timeslots
        </CardTitle>
        <CardDescription>
          Configure pickup and delivery order scheduling slots, capacity limits,
          and lead times.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Toggle Master Timeslot Switch */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-900">
              Enable Scheduled Orders & Timeslots
            </p>
            <p className="text-xs text-stone-500">
              Allow customers to pre-order for specific delivery or pickup time
              windows.
            </p>
          </div>
          <Controller
            name="enableTimeslots"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Timeslot Global Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="slotInterval">Slot Interval Window</Label>
            <Controller
              name="slotInterval"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="slotInterval">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="60">60 Minutes (1 Hour)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="maxOrdersPerSlot">Max Orders / Timeslot</Label>
            <Input
              id="maxOrdersPerSlot"
              type="number"
              placeholder="e.g. 10"
              {...register("maxOrdersPerSlot")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="leadTimeMinutes">Minimum Lead Time (Mins)</Label>
            <Input
              id="leadTimeMinutes"
              type="number"
              placeholder="e.g. 45"
              {...register("leadTimeMinutes")}
            />
          </div>
        </div>

        {/* Dynamic Timeslot Shifts */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
              Active Fulfillment Shifts
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  startTime: "09:00",
                  endTime: "12:00",
                  label: "Morning Shift",
                })
              }
              className="gap-1.5 text-xs text-stone-700 bg-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Shift Window
            </Button>
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center gap-3"
              >
                <div className="w-full sm:w-1/3">
                  <Input
                    placeholder="Shift Label (e.g. Lunch)"
                    className="bg-white h-9 text-xs"
                    {...register(`timeslots.${index}.label`)}
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-2/3">
                  <div className="relative w-full">
                    <Clock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-400" />
                    <Input
                      type="time"
                      className="pl-8 bg-white h-9 text-xs"
                      {...register(`timeslots.${index}.startTime`)}
                    />
                  </div>

                  <span className="text-xs text-stone-400 font-medium">to</span>

                  <div className="relative w-full">
                    <Clock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-400" />
                    <Input
                      type="time"
                      className="pl-8 bg-white h-9 text-xs"
                      {...register(`timeslots.${index}.endTime`)}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-9 w-9 text-stone-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
