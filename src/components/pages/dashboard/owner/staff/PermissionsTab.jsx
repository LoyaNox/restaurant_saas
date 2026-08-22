import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldCheck, Lock, Check, X, Save, RotateCcw } from "lucide-react";
import { permissionsData } from "@/data/staffTabData";

export default function PermissionsTab({ initialData = permissionsData }) {
  // ✅ Correct:
  const [selectedRole, setSelectedRole] = React.useState("Admin");
  const [matrix, setMatrix] = React.useState(initialData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

  const currentPermissions = matrix[selectedRole] || [];

  // Handle individual permission switch toggle
  const handleToggle = (moduleId, accessType) => {
    setMatrix((prev) => ({
      ...prev,
      [selectedRole]: prev[selectedRole].map((item) =>
        item.id === moduleId
          ? { ...item, [accessType]: !item[accessType] }
          : item,
      ),
    }));
    setHasUnsavedChanges(true);
  };

  // Bulk actions to grant or revoke all permissions for the active role
  const handleBulkSet = (allowed) => {
    setMatrix((prev) => ({
      ...prev,
      [selectedRole]: prev[selectedRole].map((item) => ({
        ...item,
        read: allowed,
        write: allowed,
        delete: allowed,
      })),
    }));
    setHasUnsavedChanges(true);
  };

  const handleReset = () => {
    setMatrix(initialData);
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    alert(`Permissions matrix updated for ${selectedRole}`);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Role Switcher Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Access Control & Governance
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure system module privileges by administrative role hierarchy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="gap-1.5 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className="gap-1.5"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold">
                Module Permissions Matrix
              </CardTitle>
              <CardDescription>
                Toggle access rules applied to staff accounts belonging to the
                active role.
              </CardDescription>
            </div>

            {/* Role Select Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase">
                Active Role:
              </span>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40 bg-background">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Administrator</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Standard Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Bulk Action Buttons */}
          <div className="flex items-center gap-2 pt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkSet(true)}
              className="text-xs h-7"
            >
              Grant All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkSet(false)}
              className="text-xs h-7 text-destructive hover:text-destructive"
            >
              Revoke All
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="min-w-[220px]">System Module</TableHead>
                <TableHead className="text-center w-[140px]">
                  Read Access
                </TableHead>
                <TableHead className="text-center w-[140px]">
                  Write Access
                </TableHead>
                <TableHead className="text-center w-[140px]">
                  Delete Access
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPermissions.map((p) => (
                <TableRow
                  key={p.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {p.module}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                  </TableCell>

                  {/* Read Switch */}
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <Switch
                        checked={p.read}
                        onCheckedChange={() => handleToggle(p.id, "read")}
                      />
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono gap-1 ${
                          p.read
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.read ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        {p.read ? "Allowed" : "Denied"}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Write Switch */}
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <Switch
                        checked={p.write}
                        onCheckedChange={() => handleToggle(p.id, "write")}
                      />
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono gap-1 ${
                          p.write
                            ? "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.write ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        {p.write ? "Allowed" : "Denied"}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Delete Switch */}
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <Switch
                        checked={p.delete}
                        onCheckedChange={() => handleToggle(p.id, "delete")}
                      />
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono gap-1 ${
                          p.delete
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.delete ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Lock className="h-3 w-3" />
                        )}
                        {p.delete ? "Allowed" : "Denied"}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
