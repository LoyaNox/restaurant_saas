import { Controller } from "react-hook-form";
import { Calculator } from "lucide-react";
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

export default function TaxSection({ control, register, watch }) {
  const enableTax = watch("enableTax");

  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-[#F97316]" />
          Tax Infrastructure
        </CardTitle>
        <CardDescription>
          Manage tax rates, identification numbers, and pricing inclusions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-900">
              Enable Tax Processing
            </p>
            <p className="text-xs text-stone-500">
              Calculate and print itemized taxes during checkout.
            </p>
          </div>
          <Controller
            name="enableTax"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {enableTax && (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="taxName">Tax Name Label</Label>
                <Input
                  id="taxName"
                  placeholder="e.g., GST, VAT"
                  {...register("taxName")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="taxNumber">GSTIN / Tax Reg Number</Label>
                <Input id="taxNumber" {...register("taxNumber")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                <Input
                  id="defaultTaxRate"
                  type="number"
                  step="0.1"
                  {...register("defaultTaxRate")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="taxMode">Pricing Inclusivity</Label>
                <Controller
                  name="taxMode"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="taxMode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exclusive">
                          Tax Exclusive (Added on top of menu price)
                        </SelectItem>
                        <SelectItem value="inclusive">
                          Tax Inclusive (Included within menu price)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="splitTax">Sub-Tax Splits</Label>
                <Input
                  id="splitTax"
                  placeholder="CGST, SGST, IGST"
                  {...register("splitTax")}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
