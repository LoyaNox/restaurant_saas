import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Utensils,
  FolderTree,
  ListOrdered,
  Sliders,
  Layers,
  DollarSign,
  Clock,
  Package,
  FileSpreadsheet,
  Plus,
  Trash2,
  Save,
  Upload,
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
import { Separator } from "@/components/ui/separator";

export default function MenuSettingsPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // 1. General Menu Settings
      menuName: "Main Restaurant Menu",
      currency: "USD",
      taxInclusivePricing: true,
      showDietaryBadges: true,
      enableImageUploads: true,

      // 2. Categories
      categories: [
        { name: "Appetizers", sortOrder: "1", isVisible: true },
        { name: "Main Course", sortOrder: "2", isVisible: true },
        { name: "Desserts", sortOrder: "3", isVisible: true },
      ],

      // 3. Modifiers
      enableModifiers: true,
      modifierGroups: [
        { groupName: "Extra Toppings", required: false, maxSelect: "3" },
        { groupName: "Spice Level", required: true, maxSelect: "1" },
      ],

      // 4. Variants
      enableVariants: true,

      // 5. Pricing
      enableDynamicPricing: false,

      // 6. Availability & Timings
      enableTimedMenu: true,
      breakfastStart: "07:00",
      breakfastEnd: "11:00",

      // 7. Combos & Bundles
      enableCombos: true,

      // 8. Import & Export
      autoSyncIntegrations: true,
    },
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({ control, name: "categories" });

  const {
    fields: modifierFields,
    append: appendModifier,
    remove: removeModifier,
  } = useFieldArray({ control, name: "modifierGroups" });

  const onSubmit = (data) => {
    console.log("Menu Settings Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          Menu Management Configuration
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Manage general settings, category orders, items, modifier groups,
          variants, pricing rules, timeslots, combo logic, and bulk
          import/export.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Menu Settings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Utensils className="h-4 w-4 text-[#F97316]" />
              1. General Menu Settings
            </CardTitle>
            <CardDescription>
              Configure default menu identification, display parameters, and
              global flags.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="menuName">Default Menu Display Name</Label>
                <Input id="menuName" {...register("menuName")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="currency">Base Currency</Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="taxInc"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Tax Inclusive Prices
                  </Label>
                  <p className="text-xs text-stone-500">
                    Prices already include taxes.
                  </p>
                </div>
                <Controller
                  name="taxInclusivePricing"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="taxInc"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="dietary"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Dietary Badges
                  </Label>
                  <p className="text-xs text-stone-500">
                    Show Vegan, Gluten-Free, Nut-Free tags.
                  </p>
                </div>
                <Controller
                  name="showDietaryBadges"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="dietary"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="images"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Item Image Uploads
                  </Label>
                  <p className="text-xs text-stone-500">
                    Enable high-res thumbnails for POS & Web.
                  </p>
                </div>
                <Controller
                  name="enableImageUploads"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="images"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Menu Categories */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-[#F97316]" />
              2. Menu Categories
            </CardTitle>
            <CardDescription>
              Structure your menu sections and dictate display sequence.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Active Categories
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendCategory({
                    name: "New Category",
                    sortOrder: String(categoryFields.length + 1),
                    isVisible: true,
                  })
                }
                className="gap-1.5 text-xs text-stone-700 bg-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add Category
              </Button>
            </div>

            <div className="space-y-2">
              {categoryFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-3"
                >
                  <div className="w-1/2">
                    <Input
                      placeholder="Category Name"
                      className="bg-white h-9 text-xs"
                      {...register(`categories.${index}.name`)}
                    />
                  </div>
                  <div className="w-1/4">
                    <Input
                      type="number"
                      placeholder="Order"
                      className="bg-white h-9 text-xs"
                      {...register(`categories.${index}.sortOrder`)}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-1/4 justify-end">
                    <Controller
                      name={`categories.${index}.isVisible`}
                      control={control}
                      render={({ field: switchField }) => (
                        <Switch
                          checked={switchField.value}
                          onCheckedChange={switchField.onChange}
                        />
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCategory(index)}
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

        {/* 3. Menu Items Defaults */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ListOrdered className="h-4 w-4 text-[#F97316]" />
              3. Menu Item Rules & SKU Behavior
            </CardTitle>
            <CardDescription>
              Set default configuration and validation standards for newly
              created items.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <Label className="text-xs font-semibold text-stone-900">
                    Auto-Generate SKU Code
                  </Label>
                  <p className="text-xs text-stone-500">
                    Assign unique product codes automatically.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <Label className="text-xs font-semibold text-stone-900">
                    Track Inventory Per Item
                  </Label>
                  <p className="text-xs text-stone-500">
                    Auto-out-of-stock when stock count hits 0.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Modifiers & Add-ons */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#F97316]" />
              4. Modifiers & Add-On Groups
            </CardTitle>
            <CardDescription>
              Manage customization groups, mandatory options, and item choice
              limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Custom Modifier Groups
                </p>
                <p className="text-xs text-stone-500">
                  Allow dishes to have extra toppings, crust choices, or spice
                  options.
                </p>
              </div>
              <Controller
                name="enableModifiers"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Modifier Groups
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendModifier({
                      groupName: "New Group",
                      required: false,
                      maxSelect: "1",
                    })
                  }
                  className="gap-1.5 text-xs text-stone-700 bg-white"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Group
                </Button>
              </div>

              <div className="space-y-2">
                {modifierFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center gap-3"
                  >
                    <div className="w-full sm:w-1/2">
                      <Input
                        placeholder="Group Name (e.g. Extra Cheese)"
                        className="bg-white h-9 text-xs"
                        {...register(`modifierGroups.${index}.groupName`)}
                      />
                    </div>
                    <div className="w-full sm:w-1/4">
                      <Input
                        type="number"
                        placeholder="Max Choices"
                        className="bg-white h-9 text-xs"
                        {...register(`modifierGroups.${index}.maxSelect`)}
                      />
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-1/4">
                      <div className="flex items-center gap-1.5">
                        <Label className="text-xs text-stone-500">
                          Required
                        </Label>
                        <Controller
                          name={`modifierGroups.${index}.required`}
                          control={control}
                          render={({ field: switchField }) => (
                            <Switch
                              checked={switchField.value}
                              onCheckedChange={switchField.onChange}
                            />
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeModifier(index)}
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

        {/* 5. Variants & Portion Sizes */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#F97316]" />
              5. Product Variants & Portion Sizes
            </CardTitle>
            <CardDescription>
              Configure size variants such as Small, Medium, Large, Half, or
              Full portion logic.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Portion & Size Variants
                </p>
                <p className="text-xs text-stone-500">
                  Allow items to carry distinct price tiers depending on
                  selected size.
                </p>
              </div>
              <Controller
                name="enableVariants"
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

        {/* 6. Pricing Models */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-[#F97316]" />
              6. Pricing Strategy & Rules
            </CardTitle>
            <CardDescription>
              Configure dynamic pricing, outlet overrides, and Happy Hour price
              modifiers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Dynamic & Channel Pricing
                </p>
                <p className="text-xs text-stone-500">
                  Override item prices automatically for online aggregators or
                  delivery channels.
                </p>
              </div>
              <Controller
                name="enableDynamicPricing"
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

        {/* 7. Item Availability & Timings */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#F97316]" />
              7. Menu Availability & Schedule Rules
            </CardTitle>
            <CardDescription>
              Restrict categories or dishes to specific operating hours (e.g.,
              Breakfast, Lunch).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Time-Based Availability
                </p>
                <p className="text-xs text-stone-500">
                  Hide or show specific menus based on the current time.
                </p>
              </div>
              <Controller
                name="enableTimedMenu"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="breakfastStart">Breakfast Schedule Start</Label>
                <Input
                  type="time"
                  id="breakfastStart"
                  {...register("breakfastStart")}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="breakfastEnd">Breakfast Schedule End</Label>
                <Input
                  type="time"
                  id="breakfastEnd"
                  {...register("breakfastEnd")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Combos, Bundles & Meal Deals */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#F97316]" />
              8. Combos, Bundles & Meal Deals
            </CardTitle>
            <CardDescription>
              Build bundled meals (e.g., Burger + Fries + Drink) with linked
              item choices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Combo Products
                </p>
                <p className="text-xs text-stone-500">
                  Allow creation of bundled items with fixed or choice-based
                  steps.
                </p>
              </div>
              <Controller
                name="enableCombos"
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

        {/* 9. Import, Export & Channel Sync */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-[#F97316]" />
              9. Bulk Import, Export & Data Management
            </CardTitle>
            <CardDescription>
              Export entire catalog structures or import updates via CSV/Excel
              spreadsheets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="autoSync"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Auto-Sync Integrations on Save
                </Label>
                <p className="text-xs text-stone-500">
                  Instantly push menu edits to active online aggregators.
                </p>
              </div>
              <Controller
                name="autoSyncIntegrations"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="autoSync"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="gap-2 text-xs w-full sm:w-auto"
              >
                <Download className="h-4 w-4 text-stone-600" /> Export Menu
                Catalog (.CSV)
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2 text-xs w-full sm:w-auto"
              >
                <Upload className="h-4 w-4 text-stone-600" /> Import Menu Batch
                File
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Global Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Menu Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
