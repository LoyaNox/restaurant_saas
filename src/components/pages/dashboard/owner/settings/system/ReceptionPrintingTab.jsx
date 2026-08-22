import { useForm, Controller } from "react-hook-form";
import { Printer, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function ReceptionPrintingTab() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      kotPrinter: "kitchen_main",
      receiptPrinter: "front_desk",
      paperWidth: "80mm",
      autoPrintKOT: true,
      autoPrintBill: false,
      printCopies: "1",
    },
  });

  const onSubmit = (data) => console.log("Printing Config:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Printer className="h-4 w-4 text-[#F97316]" />
            Thermal Printing Setup
          </CardTitle>
          <CardDescription>
            Configure default thermal printers for Kitchen Order Tickets (KOT)
            and billing receipts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="kotPrinter">Kitchen Printer (KOT)</Label>
              <Controller
                name="kotPrinter"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="kotPrinter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kitchen_main">
                        Kitchen Printer 1 (192.168.1.100)
                      </SelectItem>
                      <SelectItem value="kitchen_bar">
                        Bar Printer (192.168.1.101)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="receiptPrinter">Billing / Receipt Printer</Label>
              <Controller
                name="receiptPrinter"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="receiptPrinter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="front_desk">
                        Front Desk POS (USB Printer)
                      </SelectItem>
                      <SelectItem value="counter_2">
                        Counter 2 (192.168.1.102)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="paperWidth">Paper Size</Label>
              <Controller
                name="paperWidth"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="paperWidth">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="80mm">
                        80mm (Standard Thermal)
                      </SelectItem>
                      <SelectItem value="58mm">58mm (Compact Roll)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div>
                <Label
                  htmlFor="autoKOT"
                  className="text-xs font-semibold cursor-pointer"
                >
                  Auto-Print KOT on Order
                </Label>
                <p className="text-xs text-stone-500">
                  Automatically print tickets to kitchen upon confirmation.
                </p>
              </div>
              <Controller
                name="autoPrintKOT"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="autoKOT"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div>
                <Label
                  htmlFor="autoBill"
                  className="text-xs font-semibold cursor-pointer"
                >
                  Auto-Print Final Invoice
                </Label>
                <p className="text-xs text-stone-500">
                  Automatically trigger receipt printing after checkout.
                </p>
              </div>
              <Controller
                name="autoPrintBill"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="autoBill"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
        >
          <Save className="h-4 w-4" /> Save Printing Settings
        </Button>
      </div>
    </form>
  );
}
