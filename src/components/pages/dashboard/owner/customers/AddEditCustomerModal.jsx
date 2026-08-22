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

export default function AddEditCustomerModal({
  open,
  onClose,
  customer,
  onSave,
  availableTags,
}) {
  // Key-based state synchronization during render
  const [prevCustomer, setPrevCustomer] = React.useState(customer);
  const [formData, setFormData] = React.useState(
    customer || {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      birthday: "",
      gender: "Male",
      preferredLanguage: "English",
      notes: "",
      status: "Active",
      customerType: "New",
      tags: [],
    },
  );

  if (customer !== prevCustomer) {
    setPrevCustomer(customer);
    setFormData(
      customer || {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        birthday: "",
        gender: "Male",
        preferredLanguage: "English",
        notes: "",
        status: "Active",
        customerType: "New",
        tags: [],
      },
    );
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tagName) => {
    setFormData((prev) => {
      const currentTags = prev.tags || [];
      const exists = currentTags.includes(tagName);
      return {
        ...prev,
        tags: exists
          ? currentTags.filter((t) => t !== tagName)
          : [...currentTags, tagName],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            {customer?.id ? "Edit Customer Profile" : "Add New Customer"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Enter basic contact details, notes, and tags to classify this
            customer.
          </DialogDescription>
        </DialogHeader>

        <form
          id="customer-form"
          onSubmit={handleSubmit}
          className="space-y-4 text-xs py-2"
        >
          {/* Basic Information */}
          <div className="space-y-2">
            <h4 className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Basic Information
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-xs">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-xs">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  required
                  className="h-8 text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2 border-t pt-3">
            <h4 className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Additional Information
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="birthday" className="text-xs">
                  Birthday
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday || ""}
                  onChange={(e) =>
                    handleInputChange("birthday", e.target.value)
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Gender</Label>
                <Select
                  value={formData.gender || "Male"}
                  onValueChange={(val) => handleInputChange("gender", val)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male" className="text-xs">
                      Male
                    </SelectItem>
                    <SelectItem value="Female" className="text-xs">
                      Female
                    </SelectItem>
                    <SelectItem value="Other" className="text-xs">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Language</Label>
                <Select
                  value={formData.preferredLanguage || "English"}
                  onValueChange={(val) =>
                    handleInputChange("preferredLanguage", val)
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English" className="text-xs">
                      English
                    </SelectItem>
                    <SelectItem value="Spanish" className="text-xs">
                      Spanish
                    </SelectItem>
                    <SelectItem value="French" className="text-xs">
                      French
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1 pt-1">
              <Label htmlFor="notes" className="text-xs">
                Notes / Preferences
              </Label>
              <Input
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Allergies, preferred seating, dietary restrictions..."
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-2 border-t pt-3">
            <h4 className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Classification & Status
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <Select
                  value={formData.status || "Active"}
                  onValueChange={(val) => handleInputChange("status", val)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active" className="text-xs">
                      Active
                    </SelectItem>
                    <SelectItem value="Inactive" className="text-xs">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Customer Type</Label>
                <Select
                  value={formData.customerType || "New"}
                  onValueChange={(val) =>
                    handleInputChange("customerType", val)
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New" className="text-xs">
                      New
                    </SelectItem>
                    <SelectItem value="Returning" className="text-xs">
                      Returning
                    </SelectItem>
                    <SelectItem value="VIP" className="text-xs">
                      VIP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <Label className="text-xs">Tags</Label>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const isSelected = (formData.tags || []).includes(tag.name);
                  return (
                    <Button
                      key={tag.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="h-6 text-[11px] px-2"
                      onClick={() => handleTagToggle(tag.name)}
                    >
                      {tag.name}
                    </Button>
                  );
                })}
              </div>
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
          <Button
            type="submit"
            form="customer-form"
            size="sm"
            className="text-xs"
          >
            Save Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
