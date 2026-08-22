import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DEPARTMENTS, ROLES, INITIAL_FORM_STATE } from "@/data/staffTabData";

export default function AddStaffTab({ onAddMember, onLogActivity }) {
  const [form, setForm] = React.useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newStaffId = `STF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newMember = {
      id: newStaffId,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      dept: form.dept,
      role: form.role,
      status: "Active",
      joinedAt: new Date().toISOString().split("T")[0],
    };

    // Pass data back to parent
    if (onAddMember) {
      onAddMember(newMember);
    }

    // Trigger log entry for audit history
    if (onLogActivity) {
      onLogActivity({
        id: `LOG-${Date.now()}`,
        user: "Admin",
        action: `Onboarded ${newMember.name} (${newMember.role})`,
        type: "CREATE",
        timestamp: "Just now",
      });
    }

    // Feedback and reset
    setSuccessMessage(
      `Successfully registered ${newMember.name} (${newStaffId}).`,
    );
    setForm(INITIAL_FORM_STATE);
    setErrors({});

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Add New Staff Member
        </CardTitle>
        <CardDescription>
          Onboard a new employee to the central workspace directory.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {successMessage && (
          <div className="mb-6 p-3 text-sm rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className={
                errors.name
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.name && (
              <p className="text-xs text-destructive font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Work Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="j.doe@company.com"
              className={
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Department & Role dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="dept">Department</Label>
              <select
                id="dept"
                name="dept"
                value={form.dept}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {DEPARTMENTS.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role">Assigned Role</Label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit & Reset actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" className="w-full sm:w-auto">
              Save Staff Record
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setForm(INITIAL_FORM_STATE);
                setErrors({});
              }}
              className="w-full sm:w-auto"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
