import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencySection from "@/components/pages/dashboard/owner/settings/business/CurrencySection";
import RegionalSection from "@/components/pages/dashboard/owner/settings/business/RegionalSection";
import TaxSection from "@/components/pages/dashboard/owner/settings/business/TaxSection";
import InvoiceSection from "@/components/pages/dashboard/owner/settings/business/InvoiceSection";
export default function BusinessSettings() {
  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      currency: "inr",
      symbol: "₹",
      position: "before",
      decimals: "2",
      country: "in",
      language: "en",
      timezone: "asia_kolkata",
      dateFormat: "ddmmyyyy",
      timeFormat: "12",
      enableTax: true,
      taxName: "GST",
      taxNumber: "27AAAAA0000A1Z5",
      defaultTaxRate: "5.0",
      taxMode: "exclusive",
      splitTax: "CGST (2.5%), SGST (2.5%)",
      invoicePrefix: "INV-2026-",
      numberFormat: "padded",
      startNumber: "1001",
      invoiceNotes:
        "Thank you for dining with us! Service charge is purely voluntary.",
      showTaxOnInvoice: true,
      showLogoOnInvoice: true,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Configuration Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <CurrencySection control={control} register={register} />
      <RegionalSection control={control} />
      <TaxSection control={control} register={register} watch={watch} />

      <InvoiceSection control={control} register={register} />

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
        >
          <Save className="h-4 w-4" /> Save Business Configuration
        </Button>
      </div>
    </form>
  );
}
