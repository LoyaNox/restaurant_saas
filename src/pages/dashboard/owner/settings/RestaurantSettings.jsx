import { useState } from "react";
import {
  Store,
  MapPin,
  Clock,
  Globe,
  Upload,
  Save,
  Plus,
  Trash2,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import OrderTimeslotSection from "@/components/pages/dashboard/owner/settings/business/OrderTimeslotSection";

export default function RestaurantSettings() {
  const [cuisines, setCuisines] = useState([
    "Multi-Cuisine",
    "North Indian",
    "Italian",
  ]);
  const [newCuisine, setNewCuisine] = useState("");

  const [operatingHours, setOperatingHours] = useState([
    { day: "Monday", open: "11:00", close: "23:00", isOpen: true },
    { day: "Tuesday", open: "11:00", close: "23:00", isOpen: true },
    { day: "Wednesday", open: "11:00", close: "23:00", isOpen: true },
    { day: "Thursday", open: "11:00", close: "23:00", isOpen: true },
    { day: "Friday", open: "11:00", close: "23:30", isOpen: true },
    { day: "Saturday", open: "11:00", close: "23:30", isOpen: true },
    { day: "Sunday", open: "11:00", close: "23:00", isOpen: true },
  ]);

  const handleAddCuisine = (e) => {
    e.preventDefault();
    if (newCuisine.trim() && !cuisines.includes(newCuisine.trim())) {
      setCuisines([...cuisines, newCuisine.trim()]);
      setNewCuisine("");
    }
  };

  const handleRemoveCuisine = (tagToRemove) => {
    setCuisines(cuisines.filter((tag) => tag !== tagToRemove));
  };

  const toggleDayOpen = (index) => {
    const updated = [...operatingHours];
    updated[index].isOpen = !updated[index].isOpen;
    setOperatingHours(updated);
  };

  const updateTime = (index, field, value) => {
    const updated = [...operatingHours];
    updated[index][field] = value;
    setOperatingHours(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900">
            Restaurant Identity & Profile
          </h2>
          <Badge
            variant="outline"
            className="border-stone-300 text-stone-700 bg-stone-100 text-[10px]"
          >
            Public Identity
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Manage core store details, customer contact channels, operational
          schedule, and branding assets.
        </p>
      </div>

      {/* 1. GENERAL IDENTITY */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Store className="h-4 w-4 text-[#F97316]" />
            Basic Profile Details
          </CardTitle>
          <CardDescription className="text-xs">
            Public brand names, descriptions, and primary restaurant
            categorizations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="restName" className="text-xs font-medium">
                Restaurant Display Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="restName"
                defaultValue="DineFlow Bistro"
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bizName" className="text-xs font-medium">
                Legal Registered Business Name
              </Label>
              <Input
                id="bizName"
                defaultValue="DineFlow Hospitality Pvt Ltd"
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-medium">
              Restaurant Tagline / Description
            </Label>
            <Textarea
              id="description"
              rows={3}
              defaultValue="Authentic multi-cuisine dining experience offering gourmet continental, pan-Asian, and North Indian delicacies in Pune."
              className="text-xs resize-none"
            />
          </div>

          {/* Cuisine Badges Input */}
          <div className="space-y-2 pt-1">
            <Label className="text-xs font-medium">
              Cuisine Tags & Specialties
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {cuisines.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant="secondary"
                  className="bg-stone-100 text-stone-800 border border-stone-200 text-xs px-2.5 py-1 flex items-center gap-1.5"
                >
                  {cuisine}
                  <button
                    type="button"
                    onClick={() => handleRemoveCuisine(cuisine)}
                    className="hover:text-red-500 rounded-full focus:outline-none"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCuisine}
                onChange={(e) => setNewCuisine(e.target.value)}
                placeholder="Add new cuisine (e.g., Italian, Bakery)..."
                className="h-9 text-xs max-w-sm"
              />
              <Button
                type="button"
                onClick={handleAddCuisine}
                variant="outline"
                className="h-9 text-xs gap-1 border-stone-300"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. MEDIA & BRAND ASSETS */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Building className="h-4 w-4 text-[#F97316]" />
            Brand Logos & Visual Assets
          </CardTitle>
          <CardDescription className="text-xs">
            Upload your official logo and cover photo for menus, receipts, and
            web application banners.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Store Logo (512x512px)
              </Label>
              <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer text-center">
                <div className="h-12 w-12 rounded-full bg-stone-200/60 flex items-center justify-center mb-2">
                  <Upload className="h-5 w-5 text-stone-600" />
                </div>
                <p className="text-xs font-semibold text-stone-800">
                  Click to upload logo
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  PNG, JPG, or SVG up to 2MB
                </p>
              </div>
            </div>

            {/* Cover Banner Upload */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Cover Banner Image (1200x400px)
              </Label>
              <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer text-center">
                <div className="h-12 w-12 rounded-full bg-stone-200/60 flex items-center justify-center mb-2">
                  <Upload className="h-5 w-5 text-stone-600" />
                </div>
                <p className="text-xs font-semibold text-stone-800">
                  Click to upload banner
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  High quality landscape photo
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. LOCATION & CONTACT INFORMATION */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#F97316]" />
            Location & Contact Info
          </CardTitle>
          <CardDescription className="text-xs">
            Where customers and delivery executives can find or reach your
            store.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-medium">
                Primary Phone Number
              </Label>
              <Input
                id="phone"
                defaultValue="+91 98765 43210"
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium">
                Public Support Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="contact@dineflow.in"
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-medium">
              Street Address
            </Label>
            <Input
              id="address"
              defaultValue="Plot 42, FC Road, Shivajinagar"
              className="h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-xs font-medium">
                City
              </Label>
              <Input id="city" defaultValue="Pune" className="h-9 text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state" className="text-xs font-medium">
                State / Region
              </Label>
              <Input
                id="state"
                defaultValue="Maharashtra"
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pincode" className="text-xs font-medium">
                Postal PIN Code
              </Label>
              <Input
                id="pincode"
                defaultValue="411005"
                className="h-9 text-xs"
              />
            </div>
          </div>

          <Separator className="my-2" />

          {/* Online Presence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="website"
                className="text-xs font-medium flex items-center gap-1.5"
              >
                <Globe className="h-3.5 w-3.5 text-stone-500" /> Official
                Website
              </Label>
              <Input
                id="website"
                defaultValue="https://dineflow.in"
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="googleMaps" className="text-xs font-medium">
                Google Maps Embed / URL Link
              </Label>
              <Input
                id="googleMaps"
                placeholder="https://maps.google.com/..."
                className="h-9 text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderTimeslotSection />

      {/* 4. OPERATING HOURS */}
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#F97316]" />
            Weekly Store Operating Schedule
          </CardTitle>
          <CardDescription className="text-xs">
            Configure opening and closing times for each day of the week.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
          <div className="space-y-2">
            {operatingHours.map((item, index) => (
              <div
                key={item.day}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200 gap-3 sm:gap-0"
              >
                <div className="flex items-center justify-between sm:justify-start gap-4 sm:w-40">
                  <Switch
                    checked={item.isOpen}
                    onCheckedChange={() => toggleDayOpen(index)}
                  />
                  <span className="text-xs font-semibold text-stone-900">
                    {item.day}
                  </span>
                </div>

                {item.isOpen ? (
                  <div className="flex items-center gap-2">
                    <Select
                      value={item.open}
                      onValueChange={(val) => updateTime(index, "open", val)}
                    >
                      <SelectTrigger className="h-8 w-28 text-xs bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                      </SelectContent>
                    </Select>

                    <span className="text-xs text-stone-400">to</span>

                    <Select
                      value={item.close}
                      onValueChange={(val) => updateTime(index, "close", val)}
                    >
                      <SelectTrigger className="h-8 w-28 text-xs bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                        <SelectItem value="23:30">11:30 PM</SelectItem>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <span className="text-xs text-stone-400 italic">
                    Closed all day
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button Footer */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white gap-2 shadow-sm"
        >
          <Save className="h-4 w-4" /> Save Restaurant Profile
        </Button>
      </div>
    </form>
  );
}
