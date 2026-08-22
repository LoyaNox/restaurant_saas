import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StockAdjustmentModal({
  open,
  onClose,
  items,
  selectedItem,
  onSaveAdjustment,
}) {
  const [itemId, setItemId] = React.useState(
    selectedItem?.id || items[0]?.id || "",
  );
  const [adjType, setAdjType] = React.useState("Add Stock");
  const [quantity, setQuantity] = React.useState("");
  const [reason, setReason] = React.value || React.useState("New delivery");
  const [supplier, setSupplier] = React.useState(
    selectedItem?.supplier || "Fresh Foods",
  );
  const [notes, setNotes] = React.useState("");

  // Sync state if selected item changes
  const [prevSelectedItem, setPrevSelectedItem] = React.useState(selectedItem);
  if (selectedItem !== prevSelectedItem) {
    setPrevSelectedItem(selectedItem);
    if (selectedItem) {
      setItemId(selectedItem.id);
      setSupplier(selectedItem.supplier);
    }
  }

  const currentActiveItem = items.find((i) => i.id === itemId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || isNaN(Number(quantity))) return;

    onSaveAdjustment({
      itemId,
      adjType,
      quantity: Number(quantity),
      reason,
      supplier,
      notes,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Stock Adjustment
          </DialogTitle>
          <DialogDescription className="text-xs">
            Record physical inventory count corrections, shipments, or stock
            removals.
          </DialogDescription>
        </DialogHeader>

        <form
          id="stock-adj-form"
          onSubmit={handleSubmit}
          className="space-y-3 text-xs py-1"
        >
          {/* Item Selector */}
          <div className="space-y-1">
            <Label className="text-xs">Select Inventory Item *</Label>
            <Select value={itemId} onValueChange={setItemId}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Choose item..." />
              </SelectTrigger>
              <SelectContent>
                {items.map((i) => (
                  <SelectItem key={i.id} value={i.id} className="text-xs">
                    {i.name} (Current: {i.stock} {i.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Adjustment Type & Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Adjustment Type</Label>
              <Select value={adjType} onValueChange={setAdjType}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Add Stock" className="text-xs">
                    Add Stock (+)
                  </SelectItem>
                  <SelectItem value="Remove Stock" className="text-xs">
                    Remove Stock (-)
                  </SelectItem>
                  <SelectItem value="Correction" className="text-xs">
                    Set Total Quantity (=)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">
                Quantity ({currentActiveItem ? currentActiveItem.unit : "units"}
                ) *
              </Label>
              <Input
                type="number"
                step="any"
                required
                placeholder="e.g. 10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Reason & Supplier */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Reason</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New delivery" className="text-xs">
                    New delivery
                  </SelectItem>
                  <SelectItem value="Wastage / Spoilage" className="text-xs">
                    Wastage / Spoilage
                  </SelectItem>
                  <SelectItem
                    value="Physical Count Correction"
                    className="text-xs"
                  >
                    Physical Count Correction
                  </SelectItem>
                  <SelectItem value="Internal Transfer" className="text-xs">
                    Internal Transfer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Supplier</Label>
              <Input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label className="text-xs">Notes / Invoice #</Label>
            <Input
              placeholder="Morning delivery receipt #402..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </form>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="stock-adj-form"
            size="sm"
            className="text-xs"
          >
            Save Adjustment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
