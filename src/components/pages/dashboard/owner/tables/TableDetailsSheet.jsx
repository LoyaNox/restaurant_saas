import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  Pencil,
  Trash2,
  Users,
  MapPin,
  Save,
  X,
  Copy,
} from "lucide-react";

const statusStyles = {
  Available:
    "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900",
  Occupied: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900",
  Reserved:
    "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900",
  Cleaning: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900",
  "Out of Service":
    "bg-slate-500/10 text-slate-600 border-slate-200 dark:border-slate-800",
};

export default function TableDetailsSheet({
  table,
  open,
  onClose,
  onSave,
  onDelete,
  sections,
  isEditMode,
  setIsEditMode,
}) {
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    if (table) {
      setFormData(table);
    }
  }, [table]);

  if (!table) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditMode(false);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <SheetHeader className="pb-4 border-b space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetTitle className="font-mono text-xl">
                  {formData.number || table.number}
                </SheetTitle>
                <Badge variant="outline" className="font-normal text-xs">
                  {formData.section || table.section}
                </Badge>
              </div>
              <Badge
                variant="outline"
                className={`font-semibold text-[11px] ${
                  statusStyles[formData.status || table.status]
                }`}
              >
                {formData.status || table.status}
              </Badge>
            </div>
            <SheetDescription className="text-xs">
              {table.id
                ? `ID: ${table.id}`
                : "Configure floor table properties"}
            </SheetDescription>
          </SheetHeader>

          {/* Read View (Section 6) */}
          {!isEditMode ? (
            <div className="space-y-6">
              {/* Table Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs border rounded-lg p-3 bg-muted/20">
                <div>
                  <span className="text-muted-foreground block">
                    Display Name
                  </span>
                  <span className="font-medium text-foreground">
                    {table.name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">
                    Seating Capacity
                  </span>
                  <span className="font-medium text-foreground flex items-center gap-1 mt-0.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    {table.capacity} Seats
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">
                    Physical Shape
                  </span>
                  <span className="font-medium text-foreground">
                    {table.shape}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">
                    Layout Position
                  </span>
                  <span className="font-mono text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                    X: {table.posX}, Y: {table.posY}
                  </span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Quick Status Update
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Available",
                    "Occupied",
                    "Reserved",
                    "Cleaning",
                    "Out of Service",
                  ].map((status) => (
                    <Button
                      key={status}
                      variant={table.status === status ? "default" : "outline"}
                      size="sm"
                      className="text-xs h-8 justify-start"
                      onClick={() => onSave({ ...table, status })}
                    >
                      <span
                        className={`h-2 w-2 rounded-full mr-2 ${
                          status === "Available"
                            ? "bg-emerald-500"
                            : status === "Occupied"
                              ? "bg-rose-500"
                              : status === "Reserved"
                                ? "bg-amber-500"
                                : status === "Cleaning"
                                  ? "bg-blue-500"
                                  : "bg-slate-400"
                        }`}
                      />
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              {/* QR Code Section */}
              <div className="border rounded-lg p-4 bg-muted/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold flex items-center gap-1.5">
                    <QrCode className="h-4 w-4" /> QR Ordering
                  </span>
                  <Badge
                    variant={table.qrEnabled ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    {table.qrEnabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
                {table.qrEnabled && (
                  <div className="flex items-center gap-4 pt-1">
                    <img
                      src={table.qrCodeUrl}
                      alt="QR Code"
                      className="h-20 w-20 rounded border bg-white p-1"
                    />
                    <div className="space-y-1.5 flex-1">
                      <p className="text-[11px] text-muted-foreground">
                        Scan to open digital menu & order directly for{" "}
                        {table.number}.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1 w-full"
                      >
                        <Copy className="h-3 w-3" /> Copy QR Link
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Edit / Create Form (Section 7) */
            <form
              id="table-form"
              onSubmit={handleFormSubmit}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="number" className="text-xs">
                    Table Number *
                  </Label>
                  <Input
                    id="number"
                    value={formData.number || ""}
                    onChange={(e) =>
                      handleInputChange("number", e.target.value)
                    }
                    required
                    className="h-8 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">
                    Table Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g. Patio Booth"
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Section / Area *</Label>
                  <Select
                    value={formData.section || ""}
                    onValueChange={(val) => handleInputChange("section", val)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections
                        .filter((s) => s.id !== "all")
                        .map((sec) => (
                          <SelectItem
                            key={sec.id}
                            value={sec.name}
                            className="text-xs"
                          >
                            {sec.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="capacity" className="text-xs">
                    Capacity (Seats) *
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    min={1}
                    value={formData.capacity || 2}
                    onChange={(e) =>
                      handleInputChange("capacity", Number(e.target.value))
                    }
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Shape</Label>
                  <Select
                    value={formData.shape || "Square"}
                    onValueChange={(val) => handleInputChange("shape", val)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Square" className="text-xs">
                        Square
                      </SelectItem>
                      <SelectItem value="Round" className="text-xs">
                        Round
                      </SelectItem>
                      <SelectItem value="Rectangle" className="text-xs">
                        Rectangle
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Status</Label>
                  <Select
                    value={formData.status || "Available"}
                    onValueChange={(val) => handleInputChange("status", val)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available" className="text-xs">
                        Available
                      </SelectItem>
                      <SelectItem value="Occupied" className="text-xs">
                        Occupied
                      </SelectItem>
                      <SelectItem value="Reserved" className="text-xs">
                        Reserved
                      </SelectItem>
                      <SelectItem value="Cleaning" className="text-xs">
                        Cleaning
                      </SelectItem>
                      <SelectItem value="Out of Service" className="text-xs">
                        Out of Service
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="space-y-0.5">
                  <Label className="text-xs font-medium">QR Ordering</Label>
                  <p className="text-[11px] text-muted-foreground">
                    Enable self-serve ordering
                  </p>
                </div>
                <Switch
                  checked={formData.qrEnabled || false}
                  onCheckedChange={(val) => handleInputChange("qrEnabled", val)}
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="pt-4 border-t flex-col sm:flex-row gap-2 mt-6">
          {!isEditMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive text-xs gap-1"
                onClick={() => {
                  onDelete(table.id);
                  onClose();
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
              <Button
                size="sm"
                className="text-xs gap-1 flex-1"
                onClick={() => setIsEditMode(true)}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit Table
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs gap-1"
                onClick={() => setIsEditMode(false)}
              >
                <X className="h-3.5 w-3.5" /> Cancel
              </Button>
              <Button
                type="submit"
                form="table-form"
                size="sm"
                className="text-xs gap-1 flex-1"
              >
                <Save className="h-3.5 w-3.5" /> Save Changes
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
