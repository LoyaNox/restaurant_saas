import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Users,
  Plus,
  Search,
  Edit2,
  Copy,
  Lock,
  Check,
} from "lucide-react";
import { rolesData } from "@/data/staffTabData";

const levelBadgeStyles = {
  Executive:
    "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900",
  Operational:
    "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900",
  Staff:
    "bg-slate-500/10 text-slate-600 border-slate-200 dark:border-slate-800",
};

export default function RolesTab({
  initialRoles = rolesData,
  onNavigateToMembers,
}) {
  const [roles, setRoles] = React.useState(initialRoles);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("ALL");

  // State for Modal Dialog
  const [activeModalRole, setActiveModalRole] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    level: "Staff",
    description: "",
    capabilities: "",
  });

  const filteredRoles = React.useMemo(() => {
    return roles.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === "ALL" || r.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [roles, searchTerm, selectedLevel]);

  const handleOpenNewRoleModal = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      level: "Staff",
      description: "",
      capabilities: "",
    });
    setActiveModalRole({ id: `ROLE-${Date.now()}` });
  };

  const handleOpenEditModal = (role) => {
    setIsEditing(true);
    setActiveModalRole(role);
    setFormData({
      title: role.title,
      level: role.level,
      description: role.description,
      capabilities: role.capabilities ? role.capabilities.join(", ") : "",
    });
  };

  const handleSaveRole = (e) => {
    e.preventDefault();
    const parsedCapabilities = formData.capabilities
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    if (isEditing) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === activeModalRole.id
            ? {
                ...r,
                title: formData.title,
                level: formData.level,
                description: formData.description,
                capabilities: parsedCapabilities,
              }
            : r,
        ),
      );
    } else {
      const newRole = {
        id: activeModalRole.id,
        title: formData.title,
        level: formData.level,
        count: 0,
        description: formData.description,
        capabilities: parsedCapabilities,
        isSystemDefault: false,
      };
      setRoles((prev) => [...prev, newRole]);
    }

    setActiveModalRole(null);
  };

  const handleDuplicate = (role) => {
    const duplicated = {
      ...role,
      id: `ROLE-${Date.now()}`,
      title: `${role.title} (Copy)`,
      count: 0,
      isSystemDefault: false,
    };
    setRoles((prev) => [...prev, duplicated]);
  };

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Roles & Organization Hierarchy
          </h2>
          <p className="text-sm text-muted-foreground">
            Define organizational positions, permission levels, and access
            capabilities.
          </p>
        </div>
        <Button
          size="sm"
          onClick={handleOpenNewRoleModal}
          className="gap-1.5 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Create New Role
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles or capabilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Access Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Levels</SelectItem>
            <SelectItem value="Executive">Executive</SelectItem>
            <SelectItem value="Operational">Operational</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground sm:ml-auto font-medium">
          Showing {filteredRoles.length} of {roles.length} roles
        </span>
      </div>

      {/* Grid View of Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoles.map((r) => (
          <Card
            key={r.id}
            className="shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            <CardHeader className="pb-3 border-b">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-bold text-foreground">
                      {r.title}
                    </CardTitle>
                    {r.isSystemDefault && (
                      <Lock
                        className="h-3.5 w-3.5 text-muted-foreground"
                        title="System default role"
                      />
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-semibold uppercase ${
                      levelBadgeStyles[r.level] || levelBadgeStyles.Staff
                    }`}
                  >
                    {r.level} Level
                  </Badge>
                </div>

                <Badge
                  variant="secondary"
                  className="gap-1 font-mono text-xs shrink-0"
                >
                  <Users className="h-3 w-3" />
                  {r.count} assigned
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {r.description}
              </p>

              {/* Capabilities Chips */}
              {r.capabilities && r.capabilities.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Assigned Capabilities:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {r.capabilities.map((cap, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-[11px] font-normal bg-muted/40 text-foreground"
                      >
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t mt-auto">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs gap-1.5"
                    onClick={() => handleOpenEditModal(r)}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                    onClick={() => handleDuplicate(r)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Duplicate
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs text-primary font-medium"
                  onClick={() =>
                    onNavigateToMembers
                      ? onNavigateToMembers(r.title)
                      : alert(`Filtering members by role: ${r.title}`)
                  }
                >
                  View Members
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Create/Edit Modal Dialog */}
      <Dialog
        open={Boolean(activeModalRole)}
        onOpenChange={(open) => !open && setActiveModalRole(null)}
      >
        {activeModalRole && (
          <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSaveRole}>
              <DialogHeader className="space-y-1">
                <DialogTitle className="text-lg font-bold">
                  {isEditing
                    ? "Edit Role Configuration"
                    : "Create New System Role"}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Configure hierarchy level, descriptive summary, and system
                  capability privileges.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Role Title
                  </label>
                  <Input
                    required
                    placeholder="e.g. Lead Floor Manager"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Access Level Hierarchy
                  </label>
                  <Select
                    value={formData.level}
                    onValueChange={(val) =>
                      setFormData({ ...formData, level: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Executive">Executive</SelectItem>
                      <SelectItem value="Operational">Operational</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Description
                  </label>
                  <Textarea
                    rows={3}
                    placeholder="Describe key responsibilities and boundaries for this position..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Capabilities (Comma-separated)
                  </label>
                  <Input
                    placeholder="Order Entry, Inventory Read, Refund Approvals"
                    value={formData.capabilities}
                    onChange={(e) =>
                      setFormData({ ...formData, capabilities: e.target.value })
                    }
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Separate specific permissions with commas.
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModalRole(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="gap-1.5">
                  <Check className="h-4 w-4" />
                  {isEditing ? "Save Role Changes" : "Create Role"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
