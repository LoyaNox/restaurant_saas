import { Controller } from "react-hook-form";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export default function InvoiceSection({ control, register }) {
  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#F97316]" />
          Invoice & Receipts
        </CardTitle>
        <CardDescription>
          Customize receipt numbering, headers, and footer notes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
            <Input id="invoicePrefix" {...register("invoicePrefix")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="numberFormat">Numbering Format</Label>
            <Controller
              name="numberFormat"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="numberFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="padded">4 Digits (e.g. 0001)</SelectItem>
                    <SelectItem value="unpadded">Standard (e.g. 1)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="startNumber">Starting Sequence</Label>
            <Input
              id="startNumber"
              type="number"
              {...register("startNumber")}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="invoiceNotes">Invoice Footer / Terms Note</Label>
          <Textarea id="invoiceNotes" rows={2} {...register("invoiceNotes")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200/80">
            <Label
              htmlFor="showTax"
              className="text-xs font-medium cursor-pointer"
            >
              Show Tax Breakdown on Receipt
            </Label>
            <Controller
              name="showTaxOnInvoice"
              control={control}
              render={({ field }) => (
                <Switch
                  id="showTax"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200/80">
            <Label
              htmlFor="showLogo"
              className="text-xs font-medium cursor-pointer"
            >
              Print Restaurant Logo on Bill Header
            </Label>
            <Controller
              name="showLogoOnInvoice"
              control={control}
              render={({ field }) => (
                <Switch
                  id="showLogo"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
