import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  CreditCard,
  Building2,
  Receipt,
  Percent,
  Coins,
  DollarSign,
  ShieldAlert,
  Printer,
  Lock,
  Wallet,
  Save,
  Plus,
  Trash2,
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

export default function PaymentSettingsPage() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      // 1. General Payment Rules
      baseCurrency: "USD",
      allowMultiCurrency: false,
      enableOfflinePaymentQueue: true,

      // 2. Payment Methods
      enableCash: true,
      enableCreditCard: true,
      enableAppleGooglePay: true,
      enableStoreCredit: false,

      // 3. Payment Provider / Gateway Integration
      primaryGateway: "stripe",
      stripePublishableKey: "pk_test_51NxXXXXXXXXXXXXXXXXXXXXX",
      stripeSecretKey: "sk_test_51NxXXXXXXXXXXXXXXXXXXXXX",
      enableTestMode: true,

      // 4. Taxes & Compliance
      taxInclusivePricing: false,
      defaultTaxRate: "8.875",
      taxRates: [
        { name: "Standard Sales Tax", rate: "8.875", applyToAlcohol: true },
        { name: "Prepared Food Tax", rate: "5.000", applyToAlcohol: false },
      ],

      // 5. Tips & Gratuity
      enableTipping: true,
      tipSuggestions: "15, 18, 20, 25",
      promptTipOnTerminal: true,

      // 6. Service Charges & Surcharges
      enableAutoGratuity: true,
      autoGratuityThreshold: "6",
      autoGratuityPercent: "18",
      passCreditCardSurcharge: false,

      // 7. Refunds & Voids Control
      requireManagerPinForRefund: true,
      requireManagerPinForVoid: true,
      maxRefundWithoutApproval: "50.00",

      // 8. Receipts & Invoicing
      receiptHeader: "Bistro Central - Downtown",
      receiptFooter: "Thank you for dining with us!",
      printDigitalQrOnReceipt: true,
      autoPrintMerchantCopy: false,

      // 9. Security & Fraud Protection
      enforceAvsZipCheck: true,
      enforceCvvCheck: true,
      maxTransactionLimit: "2500.00",

      // 10. Settlement & Payouts
      payoutSchedule: "daily",
      autoCloseBatchTime: "23:30",
      payoutBankAccountId: "bank_acc_9921837110",
    },
  });

  const {
    fields: taxFields,
    append: appendTax,
    remove: removeTax,
  } = useFieldArray({ control, name: "taxRates" });

  const onSubmit = (data) => {
    console.log("Payment & Settlement Preferences Saved:", data);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">
          Payments, Taxes & Settlement Configuration
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Configure payment gateways, accepted tender types, auto-gratuities,
          tax calculation rules, receipt templates, and payout schedules.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. General Payment Rules */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-[#F97316]" />
              1. General Currency & Offline Processing
            </CardTitle>
            <CardDescription>
              Set store base currency and offline fallback behavior during
              internet outages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="baseCurrency">Base Operating Currency</Label>
                <Controller
                  name="baseCurrency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="baseCurrency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">
                          USD ($) - United States Dollar
                        </SelectItem>
                        <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                        <SelectItem value="GBP">
                          GBP (£) - British Pound
                        </SelectItem>
                        <SelectItem value="CAD">
                          CAD ($) - Canadian Dollar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="offlineQueue"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enable Offline Store-and-Forward
                  </Label>
                  <p className="text-xs text-stone-500">
                    Queue card payments offline during internet drops.
                  </p>
                </div>
                <Controller
                  name="enableOfflinePaymentQueue"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="offlineQueue"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Payment Methods */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#F97316]" />
              2. Accepted Payment Tender Types
            </CardTitle>
            <CardDescription>
              Select checkout payment channels available at POS and online menu
              checkout.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Cash Payments
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Enable cash drawer
                  </p>
                </div>
                <Controller
                  name="enableCash"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Credit / Debit Cards
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Chip, Swiped, Tap
                  </p>
                </div>
                <Controller
                  name="enableCreditCard"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Apple Pay & Google Pay
                  </p>
                  <p className="text-[11px] text-stone-500">NFC Contactless</p>
                </div>
                <Controller
                  name="enableAppleGooglePay"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Store Gift Cards
                  </p>
                  <p className="text-[11px] text-stone-500">Gift Vouchers</p>
                </div>
                <Controller
                  name="enableStoreCredit"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Payment Provider / Gateway Integration */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#F97316]" />
              3. Payment Gateway Credentials
            </CardTitle>
            <CardDescription>
              Connect live API keys for processing card transactions via primary
              processor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="primaryGateway">Primary Payment Gateway</Label>
                <Controller
                  name="primaryGateway"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="primaryGateway">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">
                          Stripe Terminal & Web
                        </SelectItem>
                        <SelectItem value="square">
                          Square Register API
                        </SelectItem>
                        <SelectItem value="clover">
                          Clover Payment Network
                        </SelectItem>
                        <SelectItem value="authorize">Authorize.Net</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="testMode"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enable Test / Sandbox Mode
                  </Label>
                  <p className="text-xs text-stone-500">
                    Simulate transactions without charging live cards.
                  </p>
                </div>
                <Controller
                  name="enableTestMode"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="testMode"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="stripePublishableKey">
                  Publishable API Key
                </Label>
                <Input
                  id="stripePublishableKey"
                  className="font-mono text-xs"
                  {...register("stripePublishableKey")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stripeSecretKey">Secret API Key</Label>
                <Input
                  id="stripeSecretKey"
                  type="password"
                  className="font-mono text-xs"
                  {...register("stripeSecretKey")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Taxes & Compliance */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Percent className="h-4 w-4 text-[#F97316]" />
              4. Tax Rates & Tax Rules Setup
            </CardTitle>
            <CardDescription>
              Configure regional sales tax rates and tax-inclusive pricing
              behaviors.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="inclusiveTax"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Tax-Inclusive Pricing (VAT Style)
                </Label>
                <p className="text-xs text-stone-500">
                  Menu prices already include sales tax calculations.
                </p>
              </div>
              <Controller
                name="taxInclusivePricing"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="inclusiveTax"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Configured Tax Jurisdictions
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendTax({
                    name: "Local Municipal Tax",
                    rate: "2.000",
                    applyToAlcohol: true,
                  })
                }
                className="gap-1.5 text-xs text-stone-700 bg-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add Tax Rate
              </Button>
            </div>

            <div className="space-y-2">
              {taxFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center gap-3"
                >
                  <div className="w-full sm:w-1/2">
                    <Input
                      placeholder="Tax Name (e.g. State Sales Tax)"
                      className="bg-white h-9 text-xs"
                      {...register(`taxRates.${index}.name`)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="Rate %"
                      className="bg-white h-9 text-xs"
                      {...register(`taxRates.${index}.rate`)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Controller
                        name={`taxRates.${index}.applyToAlcohol`}
                        control={control}
                        render={({ field: switchField }) => (
                          <Switch
                            id={`tax-alc-${index}`}
                            checked={switchField.value}
                            onCheckedChange={switchField.onChange}
                          />
                        )}
                      />
                      <Label
                        htmlFor={`tax-alc-${index}`}
                        className="text-xs text-stone-600 cursor-pointer"
                      >
                        Alcohol
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTax(index)}
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

        {/* 5. Tips & Gratuity */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Coins className="h-4 w-4 text-[#F97316]" />
              5. Tipping Options & On-Screen Prompts
            </CardTitle>
            <CardDescription>
              Define customer tip percentages displayed on payment reader
              terminals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Enable Tipping Prompt
                </p>
                <p className="text-xs text-stone-500">
                  Show tip selection screen during reader swipe/tap.
                </p>
              </div>
              <Controller
                name="enableTipping"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="tipSuggestions">
                  Preset Tip Percentages (Comma Separated)
                </Label>
                <Input
                  id="tipSuggestions"
                  placeholder="15, 18, 20, 25"
                  {...register("tipSuggestions")}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="terminalTipPrompt"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Display Smart Tip Recommendations
                  </Label>
                  <p className="text-xs text-stone-500">
                    Switch to flat dollar values for bills under $10.
                  </p>
                </div>
                <Controller
                  name="promptTipOnTerminal"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="terminalTipPrompt"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Service Charges & Surcharges */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-[#F97316]" />
              6. Large Party Auto-Gratuity & Surcharges
            </CardTitle>
            <CardDescription>
              Configure automatic service fees for large guest groups or credit
              processing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="autoGrat"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Enable Large Party Auto-Gratuity
                </Label>
                <p className="text-xs text-stone-500">
                  Automatically attach fixed service charge based on table party
                  size.
                </p>
              </div>
              <Controller
                name="enableAutoGratuity"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="autoGrat"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="autoGratuityThreshold">
                  Minimum Party Guest Count
                </Label>
                <Input
                  id="autoGratuityThreshold"
                  type="number"
                  {...register("autoGratuityThreshold")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="autoGratuityPercent">
                  Auto-Gratuity Percentage (%)
                </Label>
                <Input
                  id="autoGratuityPercent"
                  type="number"
                  {...register("autoGratuityPercent")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Refunds & Voids Control */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[#F97316]" />
              7. Voids, Refunds & Manager Approvals
            </CardTitle>
            <CardDescription>
              Enforce security PIN verifications to protect against unverified
              cashier voids.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="refundPin"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Manager PIN Required for Refunds
                  </Label>
                  <p className="text-xs text-stone-500">
                    Require supervisor authorization on POS screen.
                  </p>
                </div>
                <Controller
                  name="requireManagerPinForRefund"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="refundPin"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="voidPin"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Manager PIN Required for Line Voids
                  </Label>
                  <p className="text-xs text-stone-500">
                    Require PIN after order sent to kitchen.
                  </p>
                </div>
                <Controller
                  name="requireManagerPinForVoid"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="voidPin"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="maxRefundWithoutApproval">
                Unapproved Refund Limit ($)
              </Label>
              <Input
                id="maxRefundWithoutApproval"
                type="number"
                step="0.01"
                {...register("maxRefundWithoutApproval")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 8. Receipts & Invoicing */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-[#F97316]" />
              8. Printed & Digital Receipt Templates
            </CardTitle>
            <CardDescription>
              Customize thermal receipt header headers, footers, and printable
              dynamic QR codes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="receiptHeader">Receipt Business Header</Label>
                <Input id="receiptHeader" {...register("receiptHeader")} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="receiptFooter">Receipt Thank-You Footer</Label>
                <Input id="receiptFooter" {...register("receiptFooter")} />
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <Label
                  htmlFor="qrReceipt"
                  className="text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  Print Survey / Re-order QR Code on Receipt
                </Label>
                <p className="text-xs text-stone-500">
                  Include dynamic web link at bottom of printed bill.
                </p>
              </div>
              <Controller
                name="printDigitalQrOnReceipt"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="qrReceipt"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* 9. Security & Fraud Protection */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#F97316]" />
              9. Fraud Control & Risk Management
            </CardTitle>
            <CardDescription>
              Configure card fraud verification checks and maximum ticket
              limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="avsCheck"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enforce AVS (Zip Code) Checks
                  </Label>
                  <p className="text-xs text-stone-500">
                    Verify billing zip code for keyed-in cards.
                  </p>
                </div>
                <Controller
                  name="enforceAvsZipCheck"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="avsCheck"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <Label
                    htmlFor="cvvCheck"
                    className="text-xs font-semibold text-stone-900 cursor-pointer"
                  >
                    Enforce CVV Code Matching
                  </Label>
                  <p className="text-xs text-stone-500">
                    Decline payments with mismatched security codes.
                  </p>
                </div>
                <Controller
                  name="enforceCvvCheck"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="cvvCheck"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="maxTransactionLimit">
                Single Transaction Safety Cap ($)
              </Label>
              <Input
                id="maxTransactionLimit"
                type="number"
                step="0.01"
                {...register("maxTransactionLimit")}
              />
            </div>
          </CardContent>
        </Card>

        {/* 10. Settlement & Payouts */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Printer className="h-4 w-4 text-[#F97316]" />
              10. Daily Batch Settlement & Bank Payouts
            </CardTitle>
            <CardDescription>
              Automate evening batch closing times and destination bank
              accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="payoutSchedule">Payout Transfer Interval</Label>
                <Controller
                  name="payoutSchedule"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="payoutSchedule">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">
                          Daily Rolling Payouts
                        </SelectItem>
                        <SelectItem value="weekly">
                          Weekly Summary Transfer
                        </SelectItem>
                        <SelectItem value="manual">
                          Manual Batch Trigger Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="autoCloseBatchTime">
                  Automatic Evening Batch Cutoff Time
                </Label>
                <Input
                  id="autoCloseBatchTime"
                  type="time"
                  {...register("autoCloseBatchTime")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Payment & Tax Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
