import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// 1. Import the official icon from lucide-react
import { MoreHorizontal } from "lucide-react";
import { membersData } from "@/data/membersData";

export default function MembersTab({ members = membersData }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDept, setSelectedDept] = React.useState("ALL");
  const [selectedStatus, setSelectedStatus] = React.useState("ALL");

  const departments = React.useMemo(() => {
    const set = new Set(members.map((m) => m.dept));
    return Array.from(set);
  }, [members]);

  const filteredMembers = React.useMemo(() => {
    return members.filter((m) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        m.name.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search) ||
        m.id.toLowerCase().includes(search) ||
        m.role.toLowerCase().includes(search);

      const matchesDept = selectedDept === "ALL" || m.dept === selectedDept;
      const matchesStatus =
        selectedStatus === "ALL" || m.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [members, searchTerm, selectedDept, selectedStatus]);

  const activeCount = members.filter((m) => m.status === "Active").length;
  const inactiveCount = members.filter((m) => m.status === "Inactive").length;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">
              Total Directory
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono">
              {members.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              Registered staff profiles
            </span>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">
              Active Staff
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {activeCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              Currently provisioned accounts
            </span>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">
              Inactive / On Leave
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
              {inactiveCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              Suspended or offboarding status
            </span>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold">
                Staff Directory
              </CardTitle>
              <CardDescription>
                Manage team access, organizational roles, and department
                assignments.
              </CardDescription>
            </div>
            <Button size="sm" className="shrink-0">
              + Add Member
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <Input
              placeholder="Search by name, email, ID, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-xs text-muted-foreground sm:ml-auto font-medium">
              Showing {filteredMembers.length} of {members.length} members
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No members match your search filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((m) => (
                  <TableRow
                    key={m.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                      {m.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={m.avatarUrl} alt={m.name} />
                          <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                            {getInitials(m.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm leading-tight text-foreground">
                            {m.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {m.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {m.role}
                    </TableCell>
                    <TableCell className="text-sm">
                      <Badge variant="outline" className="font-normal text-xs">
                        {m.dept}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-[11px] font-semibold ${
                          m.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900 hover:bg-amber-500/20"
                        }`}
                        variant="outline"
                      >
                        {m.status}
                      </Badge>
                    </TableCell>

                    {/* FIXED THREE-DOT DROPDOWN MENU */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              alert(`Viewing profile for ${m.name}`)
                            }
                          >
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Editing ${m.name}`)}
                          >
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Permissions for ${m.name}`)}
                          >
                            Change Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => alert(`Deactivating ${m.name}`)}
                          >
                            Deactivate Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
