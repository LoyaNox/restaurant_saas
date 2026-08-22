import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function FloorPlanSettingsModal({
  open,
  onClose,
  settings,
  onSaveSettings,
}) {
  const [localSettings, setLocalSettings] = React.useState(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (key, value) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Floor Plan & Table Settings
          </DialogTitle>
          <DialogDescription className="text-xs">
            Configure visual grid display preferences and default table metrics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-xs py-2">
          {/* Floor Plan Config */}
          <div className="space-y-3">
            <h4 className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Floor Plan Display
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Alignment Grid</Label>
                <Switch
                  checked={localSettings.showGrid}
                  onCheckedChange={(val) => handleChange("showGrid", val)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Snap to Grid</Label>
                <Switch
                  checked={localSettings.snapToGrid}
                  onCheckedChange={(val) => handleChange("snapToGrid", val)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Table Number</Label>
                <Switch
                  checked={localSettings.showTableNumber}
                  onCheckedChange={(val) =>
                    handleChange("showTableNumber", val)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Capacity Label</Label>
                <Switch
                  checked={localSettings.showCapacity}
                  onCheckedChange={(val) => handleChange("showCapacity", val)}
                />
              </div>
            </div>
          </div>

          {/* Defaults Config */}
          <div className="space-y-3 border-t pt-3">
            <h4 className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              New Table Defaults
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Default Capacity</Label>
                <Input
                  type="number"
                  value={localSettings.defaultCapacity}
                  onChange={(e) =>
                    handleChange("defaultCapacity", Number(e.target.value))
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Default Shape</Label>
                <Select
                  value={localSettings.defaultShape}
                  onValueChange={(val) => handleChange("defaultShape", val)}
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
            </div>
            <div className="flex items-center justify-between pt-1">
              <Label className="text-xs">Enable QR Ordering by Default</Label>
              <Switch
                checked={localSettings.defaultQrEnabled}
                onCheckedChange={(val) => handleChange("defaultQrEnabled", val)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="text-xs"
            onClick={() => {
              onSaveSettings(localSettings);
              onClose();
            }}
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
