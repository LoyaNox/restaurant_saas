import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  Search,
  Clock,
  Eye,
  UtensilsCrossed,
  ShoppingBag,
  Truck,
  RotateCcw,
  ChefHat,
  PackageCheck,
  CheckCircle2,
  FilterX,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { initialOrders } from "@/data/orders/ordersData";
import OrderDetailsSheet from "@/components/pages/dashboard/owner/orders/OrderDetailsSheet";

const typeIcons = {
  "Dine In": UtensilsCrossed,
  Takeaway: ShoppingBag,
  Delivery: Truck,
};

const statusConfig = {
  New: {
    label: "New",
    color:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
    dot: "bg-blue-500",
  },
  Confirmed: {
    label: "Confirmed",
    color:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900",
    dot: "bg-purple-500",
  },
  Preparing: {
    label: "Preparing",
    color:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
    dot: "bg-amber-500",
  },
  Ready: {
    label: "Ready",
    color:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
    dot: "bg-emerald-500",
  },
  Completed: {
    label: "Completed",
    color:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800",
    dot: "bg-slate-400",
  },
  Cancelled: {
    label: "Cancelled",
    color:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900",
    dot: "bg-rose-500",
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = React.useState(initialOrders);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("ALL");
  const [selectedType, setSelectedType] = React.useState("ALL");
  const [sortOrder, setSortOrder] = React.useState("newest");
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  // Status Metrics
  const counts = React.useMemo(() => {
    return {
      ALL: orders.length,
      New: orders.filter((o) => o.status === "New").length,
      Confirmed: orders.filter((o) => o.status === "Confirmed").length,
      Preparing: orders.filter((o) => o.status === "Preparing").length,
      Ready: orders.filter((o) => o.status === "Ready").length,
      Completed: orders.filter((o) => o.status === "Completed").length,
      Cancelled: orders.filter((o) => o.status === "Cancelled").length,
    };
  }, [orders]);

  // Filter & Sort Pipeline
  const filteredOrders = React.useMemo(() => {
    return orders
      .filter((o) => {
        const matchesStatus =
          selectedStatus === "ALL" || o.status === selectedStatus;
        const matchesSearch =
          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (o.tableNo &&
            o.tableNo.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = selectedType === "ALL" || o.type === selectedType;

        return matchesStatus && matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") return b.id.localeCompare(a.id);
        return a.id.localeCompare(b.id);
      });
  }, [orders, selectedStatus, searchTerm, selectedType, sortOrder]);

  const handleUpdateStatus = (orderId, newStatus) => {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              timeline: [
                ...o.timeline,
                {
                  time: timeNow,
                  status: newStatus,
                  note: `Status updated to ${newStatus}`,
                },
              ],
            }
          : o,
      ),
    );
  };

  const hasActiveFilters =
    searchTerm !== "" || selectedStatus !== "ALL" || selectedType !== "ALL";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("ALL");
    setSelectedType("ALL");
    setSortOrder("newest");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Orders Overview
            </h1>
            <Badge
              variant="secondary"
              className="font-mono text-xs font-semibold"
            >
              {counts.ALL} Total
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time fulfillment operational view. Track preparation,
            readiness, and order life cycles.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 text-xs shrink-0 self-start sm:self-auto shadow-sm"
          onClick={() => setOrders(initialOrders)}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Demo State
        </Button>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="shadow-xs border-muted/80 bg-linear-to-br from-blue-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              New Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold font-mono">{counts.New}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted/80 bg-linear-to-br from-amber-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              In Preparation
            </CardTitle>
            <ChefHat className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold font-mono">
              {counts.Preparing + counts.Confirmed}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Kitchen active queue
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted/80 bg-linear-to-br from-emerald-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Ready for Pickup
            </CardTitle>
            <PackageCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold font-mono">{counts.Ready}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Awaiting dispatch/handout
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted/80 bg-linear-to-br from-slate-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold font-mono">
              {counts.Completed}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Fulfilled successfully
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Filter Bar with Dropdowns */}
      <Card className="shadow-sm border-muted/80">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-55">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Order ID, Table, or Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs bg-muted/20"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Order Status Dropdown */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40 h-9 text-xs bg-muted/20">
                  <div className="flex items-center gap-1.5 truncate">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent className="fixed">
                  <SelectItem value="ALL" className="text-xs">
                    All Statuses ({counts.ALL})
                  </SelectItem>
                  <SelectItem value="New" className="text-xs">
                    New ({counts.New})
                  </SelectItem>
                  <SelectItem value="Confirmed" className="text-xs">
                    Confirmed ({counts.Confirmed})
                  </SelectItem>
                  <SelectItem value="Preparing" className="text-xs">
                    Preparing ({counts.Preparing})
                  </SelectItem>
                  <SelectItem value="Ready" className="text-xs">
                    Ready ({counts.Ready})
                  </SelectItem>
                  <SelectItem value="Completed" className="text-xs">
                    Completed ({counts.Completed})
                  </SelectItem>
                  <SelectItem value="Cancelled" className="text-xs">
                    Cancelled ({counts.Cancelled})
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Order Type Dropdown */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px] h-9 text-xs bg-muted/20">
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
                <SelectContent className="fixed">
                  <SelectItem value="ALL" className="text-xs">
                    All Types
                  </SelectItem>
                  <SelectItem value="Dine In" className="text-xs">
                    Dine In
                  </SelectItem>
                  <SelectItem value="Takeaway" className="text-xs">
                    Takeaway
                  </SelectItem>
                  <SelectItem value="Delivery" className="text-xs">
                    Delivery
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order Dropdown */}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[140px] h-9 text-xs bg-muted/20">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="fixed">
                  <SelectItem value="newest" className="text-xs">
                    Newest First
                  </SelectItem>
                  <SelectItem value="oldest" className="text-xs">
                    Oldest First
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
                >
                  <FilterX className="h-3.5 w-3.5" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Orders Data Table */}
      <Card className="shadow-xs border-muted/80 overflow-hidden">
        <CardContent className="px-4 py-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[130px] text-xs font-semibold">
                  Order ID
                </TableHead>
                <TableHead className="text-xs font-semibold">
                  Order Type
                </TableHead>
                <TableHead className="text-xs font-semibold">
                  Items Count
                </TableHead>
                <TableHead className="text-xs font-semibold">
                  Placed Time
                </TableHead>
                <TableHead className="text-xs font-semibold">
                  Current Status
                </TableHead>
                <TableHead className="text-right text-xs font-semibold w-[100px]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-36 text-center text-muted-foreground text-xs"
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <FilterX className="h-6 w-6 opacity-40 mb-1" />
                      <p className="font-medium text-foreground">
                        No orders match filter criteria
                      </p>
                      <p className="text-[11px]">
                        Try adjusting your search terms or status dropdown
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((o) => {
                  const TypeIcon = typeIcons[o.type] || ShoppingBag;
                  const currentStatus =
                    statusConfig[o.status] || statusConfig.New;

                  return (
                    <TableRow
                      key={o.id}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <TableCell className="font-mono text-xs font-bold text-foreground">
                        {o.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <TypeIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>{o.type}</span>
                          {o.tableNo && (
                            <span className="text-muted-foreground font-normal text-[11px]">
                              ({o.tableNo})
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-medium">
                        {o.itemCount} {o.itemCount === 1 ? "item" : "items"}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {o.orderTime}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`gap-1.5 py-0.5 text-[11px] font-semibold border ${currentStatus.color}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`}
                          />
                          {currentStatus.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 gap-1 text-xs text-muted-foreground group-hover:text-primary font-medium"
                          onClick={() => setSelectedOrder(o)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View</span>
                          <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 5. Side Drawer Details Component */}
      <OrderDetailsSheet
        order={selectedOrder}
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
