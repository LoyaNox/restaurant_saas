import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  FilterX,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserPlus,
  UserCheck,
  Crown,
  Tag,
  Download,
  Upload,
} from "lucide-react";

import { initialCustomers, initialTags } from "@/data/customers/customersData";
import CustomerProfileSheet from "@/components/pages/dashboard/owner/customers/CustomerProfileSheet";
import AddEditCustomerModal from "@/components/pages/dashboard/owner/customers/AddEditCustomerModal";

export default function CustomersPage() {
  const [customers, setCustomers] = React.useState(initialCustomers);
  const [tags, setTags] = React.useState(initialTags);

  // Search & Filter States (Section 3)
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("ALL");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [selectedTagFilter, setSelectedTagFilter] = React.useState("ALL");

  // Selection & Modal States
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [customerToEdit, setCustomerToEdit] = React.useState(null);

  // Section 2: Calculate Simple Metrics
  const metrics = React.useMemo(() => {
    return {
      total: customers.length,
      newCust: customers.filter((c) => c.customerType === "New").length,
      returning: customers.filter((c) => c.customerType === "Returning").length,
      active: customers.filter((c) => c.status === "Active").length,
      vip: customers.filter((c) => c.tags?.includes("VIP")).length,
    };
  }, [customers]);

  // Section 3: Filtered Data Pipeline
  const filteredCustomers = React.useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        `${c.firstName} ${c.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "ALL" || c.customerType === typeFilter;
      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
      const matchesTag =
        selectedTagFilter === "ALL" ||
        (c.tags && c.tags.includes(selectedTagFilter));

      return matchesSearch && matchesType && matchesStatus && matchesTag;
    });
  }, [customers, searchTerm, typeFilter, statusFilter, selectedTagFilter]);

  // Handlers
  const handleSaveCustomer = (customerData) => {
    if (customerData.id) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === customerData.id ? customerData : c)),
      );
    } else {
      const newCust = {
        ...customerData,
        id: `CUST-${Date.now().toString().slice(-4)}`,
        visits: 1,
        lastVisit: "Today",
        totalSpent: 0,
        avgSpend: 0,
        totalOrders: 0,
        joinedDate: new Date().toISOString().split("T")[0],
        activities: [
          {
            id: `a-${Date.now()}`,
            time: "Today",
            title: "Customer profile created",
            type: "system",
          },
        ],
      };
      setCustomers((prev) => [newCust, ...prev]);
    }
  };

  const handleDeleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCreateTag = () => {
    const tagName = prompt("Enter new tag name:");
    if (tagName) {
      const newTag = {
        id: tagName.toLowerCase().replace(/\s+/g, "-"),
        name: tagName,
        color: "bg-slate-500/10 text-slate-600 border-slate-200",
      };
      setTags((prev) => [...prev, newTag]);
    }
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    typeFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    selectedTagFilter !== "ALL";

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Customers
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage restaurant customers, profiles, visit frequencies, and
            classifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => {
              setCustomerToEdit(null);
              setIsFormOpen(true);
            }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Customer
          </Button>

          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Upload className="h-3.5 w-3.5" /> Import
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-xs gap-2">
                <Download className="h-3.5 w-3.5" /> Export All Customers
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 2. Customer Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Card className="shadow-xs border-muted/80">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-muted-foreground block">
                Total Customers
              </span>
              <span className="text-xl font-bold font-mono mt-0.5 block">
                {metrics.total}
              </span>
            </div>
            <Users className="h-5 w-5 text-muted-foreground/60" />
          </CardContent>
        </Card>

        <Card className="shadow-xs border-emerald-200/60 bg-emerald-500/5">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 block">
                New Customers
              </span>
              <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                {metrics.newCust}
              </span>
            </div>
            <UserPlus className="h-5 w-5 text-emerald-600/60" />
          </CardContent>
        </Card>

        <Card className="shadow-xs border-blue-200/60 bg-blue-500/5">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-blue-700 dark:text-blue-400 block">
                Returning
              </span>
              <span className="text-xl font-bold font-mono text-blue-700 dark:text-blue-400 mt-0.5 block">
                {metrics.returning}
              </span>
            </div>
            <UserCheck className="h-5 w-5 text-blue-600/60" />
          </CardContent>
        </Card>

        <Card className="shadow-xs border-slate-200/60 bg-slate-500/5">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 block">
                Active
              </span>
              <span className="text-xl font-bold font-mono text-slate-600 dark:text-slate-400 mt-0.5 block">
                {metrics.active}
              </span>
            </div>
            <Users className="h-5 w-5 text-slate-500/60" />
          </CardContent>
        </Card>

        <Card className="shadow-xs border-purple-200/60 bg-purple-500/5 col-span-2 sm:col-span-1">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-purple-700 dark:text-purple-400 block">
                VIP Customers
              </span>
              <span className="text-xl font-bold font-mono text-purple-700 dark:text-purple-400 mt-0.5 block">
                {metrics.vip}
              </span>
            </div>
            <Crown className="h-5 w-5 text-purple-600/60" />
          </CardContent>
        </Card>
      </div>

      {/* 3. Customer Search & Filters Bar */}
      <Card className="shadow-xs border-muted/80">
        <CardContent className="p-3.5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px] h-9 text-xs">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL" className="text-xs">
                    All Types
                  </SelectItem>
                  <SelectItem value="New" className="text-xs">
                    New
                  </SelectItem>
                  <SelectItem value="Returning" className="text-xs">
                    Returning
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] h-9 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL" className="text-xs">
                    All Statuses
                  </SelectItem>
                  <SelectItem value="Active" className="text-xs">
                    Active
                  </SelectItem>
                  <SelectItem value="Inactive" className="text-xs">
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Tags Filter */}
              <Select
                value={selectedTagFilter}
                onValueChange={setSelectedTagFilter}
              >
                <SelectTrigger className="w-[130px] h-9 text-xs">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL" className="text-xs">
                    All Tags
                  </SelectItem>
                  {tags.map((t) => (
                    <SelectItem key={t.id} value={t.name} className="text-xs">
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 text-xs text-muted-foreground gap-1"
                  onClick={() => {
                    setSearchTerm("");
                    setTypeFilter("ALL");
                    setStatusFilter("ALL");
                    setSelectedTagFilter("ALL");
                  }}
                >
                  <FilterX className="h-3.5 w-3.5" /> Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7. Customer Tags & Segments Management Strip */}
      <div className="border rounded-lg p-3 bg-muted/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-muted-foreground flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" /> Segments & Tags:
          </span>
          {tags.map((t) => (
            <Badge
              key={t.id}
              variant="outline"
              className={`cursor-pointer text-[11px] ${t.color}`}
              onClick={() => setSelectedTagFilter(t.name)}
            >
              {t.name}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-primary gap-1"
          onClick={handleCreateTag}
        >
          <Plus className="h-3 w-3" /> Create Tag
        </Button>
      </div>

      {/* 4. Customer Data List Table */}
      <Card className="shadow-xs border-muted/80 overflow-hidden">
        <CardContent className="p-4 py-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-xs font-semibold">
                  Customer
                </TableHead>
                <TableHead className="text-xs font-semibold">Contact</TableHead>
                <TableHead className="text-xs font-semibold">Visits</TableHead>
                <TableHead className="text-xs font-semibold">
                  Last Visit
                </TableHead>
                <TableHead className="text-xs font-semibold">
                  Total Spent
                </TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold w-[80px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-xs text-muted-foreground"
                  >
                    No customers match your search or filter parameters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/30">
                    <TableCell className="text-xs">
                      <span className="font-bold text-foreground block">
                        {c.firstName} {c.lastName}
                      </span>
                      {c.tags && c.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {c.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[9px] px-1 py-0"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">
                      <span>{c.phone}</span>
                      <span className="block text-[11px] font-sans truncate max-w-[140px]">
                        {c.email}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-mono font-medium">
                      {c.visits}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {c.lastVisit}
                    </TableCell>
                    <TableCell className="text-xs font-mono font-bold text-emerald-600">
                      ${c.totalSpent.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          c.status === "Active" ? "default" : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-xs gap-2"
                            onClick={() => setSelectedCustomer(c)}
                          >
                            <Eye className="h-3.5 w-3.5" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs gap-2"
                            onClick={() => {
                              setCustomerToEdit(c);
                              setIsFormOpen(true);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs gap-2 text-destructive"
                            onClick={() => handleDeleteCustomer(c.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
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

      {/* Drawers & Modals */}
      <CustomerProfileSheet
        customer={selectedCustomer}
        open={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
        onEdit={(cust) => {
          setCustomerToEdit(cust);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteCustomer}
      />

      <AddEditCustomerModal
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCustomerToEdit(null);
        }}
        customer={customerToEdit}
        onSave={handleSaveCustomer}
        availableTags={tags}
      />
    </div>
  );
}
