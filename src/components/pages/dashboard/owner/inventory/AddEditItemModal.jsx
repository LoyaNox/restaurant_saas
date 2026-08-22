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

export default function AddEditItemModal({
  open,
  onClose,
  item,
  onSave,
  categories,
  suppliers,
  locations,
}) {
  const [prevItem, setPrevItem] = React.useState(item);
  const [formData, setFormData] = React.useState(
    item || {
      name: "",
      sku: "",
      category: "Ingredients",
      stock: 0,
      unit: "kg",
      reorderLevel: 10,
      costPerUnit: 0,
      supplier: suppliers[0] || "Fresh Foods",
      storageLocation: locations[0] || "Cold Room A",
    },
  );

  if (item !== prevItem) {
    setPrevItem(item);
    setFormData(
      item || {
        name: "",
        sku: "",
        category: "Ingredients",
        stock: 0,
        unit: "kg",
        reorderLevel: 10,
        costPerUnit: 0,
        supplier: suppliers[0] || "Fresh Foods",
        storageLocation: locations[0] || "Cold Room A",
      },
    );
  }

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            {item?.id ? "Edit Inventory Item" : "Add New Inventory Item"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Set up item master data, unit costs, and reorder trigger points.
          </DialogDescription>
        </DialogHeader>

        <form
          id="item-form"
          onSubmit={handleSubmit}
          className="space-y-3 text-xs py-1"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Item Name *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">SKU Code</Label>
              <Input
                placeholder="ING-001"
                value={formData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => handleChange("category", val)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Measurement Unit</Label>
              <Input
                placeholder="kg, pcs, cases..."
                value={formData.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Current Stock</Label>
              <Input
                type="number"
                step="any"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Reorder Level</Label>
              <Input
                type="number"
                step="any"
                value={formData.reorderLevel}
                onChange={(e) =>
                  handleChange("reorderLevel", Number(e.target.value))
                }
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Cost/Unit ($)</Label>
              <Input
                type="number"
                step="any"
                value={formData.costPerUnit}
                onChange={(e) =>
                  handleChange("costPerUnit", Number(e.target.value))
                }
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Default Supplier</Label>
              <Select
                value={formData.supplier}
                onValueChange={(val) => handleChange("supplier", val)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Storage Location</Label>
              <Select
                value={formData.storageLocation}
                onValueChange={(val) => handleChange("storageLocation", val)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc} className="text-xs">
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          <Button type="submit" form="item-form" size="sm" className="text-xs">
            Save Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
