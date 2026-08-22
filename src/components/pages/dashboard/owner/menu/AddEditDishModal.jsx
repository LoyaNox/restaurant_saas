import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const ALLERGEN_OPTIONS = [
  "Milk",
  "Eggs",
  "Wheat",
  "Soy",
  "Peanuts",
  "Nuts",
  "Fish",
  "Shellfish",
];

const LABEL_OPTIONS = [
  "Popular",
  "Chef's Special",
  "New",
  "Vegetarian",
  "Vegan",
  "Spicy",
  "Gluten Free",
];

export function AddEditDishModal({
  open,
  onOpenChange,
  initialData = null,
  onSave,
  categories = [],
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: categories[0]?.id || "",
    price: "",
    salePrice: "",
    isAvailable: true,
    isPopular: false,
    labels: [],
    allergens: [],
    prepTime: "",
    calories: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        description: "",
        categoryId: categories[0]?.id || "",
        price: "",
        salePrice: "",
        isAvailable: true,
        isPopular: false,
        labels: [],
        allergens: [],
        prepTime: "",
        calories: "",
        image: "",
      });
    }
  }, [initialData, open]);

  const toggleArrayItem = (key, value) => {
    setFormData((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((i) => i !== value)
          : [...prev[key], value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Dish" : "Add New Dish"}
          </DialogTitle>
          <DialogDescription>
            Configure dish parameters, pricing, allergens, and labels.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">Dish Name *</label>
                <Input
                  required
                  placeholder="e.g. Signature Wagyu Burger"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Category *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Description</label>
              <Textarea
                rows={2}
                placeholder="Brief list of ingredients or taste profile..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Pricing & Prep */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Pricing & Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">Price ($) *</label>
                <Input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Sale Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Optional"
                  value={formData.salePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, salePrice: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Prep Time (mins)</label>
                <Input
                  type="number"
                  placeholder="15"
                  value={formData.prepTime}
                  onChange={(e) =>
                    setFormData({ ...formData, prepTime: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Calories (kcal)</label>
                <Input
                  type="number"
                  placeholder="650"
                  value={formData.calories}
                  onChange={(e) =>
                    setFormData({ ...formData, calories: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Labels & Tags */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Labels & Dietary Options
            </h3>
            <div className="flex flex-wrap gap-2">
              {LABEL_OPTIONS.map((lbl) => {
                const isChecked = formData.labels.includes(lbl);
                return (
                  <Badge
                    key={lbl}
                    variant={isChecked ? "default" : "outline"}
                    className="cursor-pointer text-xs font-normal"
                    onClick={() => toggleArrayItem("labels", lbl)}
                  >
                    {lbl}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Allergens */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Allergens
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALLERGEN_OPTIONS.map((allergen) => (
                <div key={allergen} className="flex items-center space-x-2">
                  <Checkbox
                    id={`alg-${allergen}`}
                    checked={formData.allergens.includes(allergen)}
                    onCheckedChange={() =>
                      toggleArrayItem("allergens", allergen)
                    }
                  />
                  <label
                    htmlFor={`alg-${allergen}`}
                    className="text-xs cursor-pointer"
                  >
                    {allergen}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Switch */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold">
                Available for Order
              </label>
              <p className="text-[11px] text-muted-foreground">
                Toggle off if currently out of stock or out of season.
              </p>
            </div>
            <Switch
              checked={formData.isAvailable}
              onCheckedChange={(val) =>
                setFormData({ ...formData, isAvailable: val })
              }
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {initialData ? "Save Changes" : "Save Dish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
