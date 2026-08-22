import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  DollarSign,
  Sliders,
  Download,
  Settings,
  History as HistoryIcon,
} from "lucide-react";

import {
  initialInventory,
  initialCategories,
  initialSuppliers,
  initialStorageLocations,
  initialStockHistory,
} from "@/data/inventory/inventoryData";
import InventoryDetailsSheet from "@/components/pages/dashboard/owner/inventory/InventoryDetailsSheet";
import AddEditItemModal from "@/components/pages/dashboard/owner/inventory/AddEditItemModal";
import StockAdjustmentModal from "@/components/pages/dashboard/owner/inventory/StockAdjustmentModal";

export default function InventoryPage() {
  const [items, setItems] = React.useState(initialInventory);
  const [categories, setCategories] = React.useState(initialCategories);
  const [history, setHistory] = React.useState(initialStockHistory);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.value || React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [supplierFilter, setSupplierFilter] = React.useState("ALL");
  const [locationFilter, setLocationFilter] = React.useState("ALL");
  const [sortBy, setSortBy] = React.useState("name");

  // Settings State (Section 8)
  const [settings, setSettings] = React.useState({
    defaultReorder: 10,
    lowStockNotifications: true,
    defaultUnit: "kg",
    valuationMethod: "FIFO",
    autoDeduction: true,
    allowNegativeStock: false,
  });

  // Modal / Drawer Selection
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [itemToEdit, setItemToEdit] = React.useState(null);
  const [isAddEditOpen, setIsAddEditOpen] = React.useState(false);
  const [isAdjModalOpen, setIsAdjModalOpen] = React.useState(false);
  const [adjTargetItem, setAdjTargetItem] = React.useState(null);

  // Section 2: Calculate Overview Metrics
  const metrics = React.useMemo(() => {
    const totalItems = items.length;
    const inStock = items.filter((i) => i.status === "In Stock").length;
    const lowStock = items.filter((i) => i.status === "Low Stock").length;
    const outOfStock = items.filter((i) => i.status === "Out of Stock").length;
    const totalVal = items.reduce((acc, i) => acc + i.stock * i.costPerUnit, 0);

    return { totalItems, inStock, lowStock, outOfStock, totalVal };
  }, [items]);

  // Section 5 Data Pipeline (Filter & Sort)
  const filteredItems = React.useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "all" ||
          item.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL" || item.status === statusFilter;
        const matchesSupplier =
          supplierFilter === "ALL" || item.supplier === supplierFilter;
        const matchesLocation =
          locationFilter === "ALL" || item.storageLocation === locationFilter;

        return (
          matchesCategory &&
          matchesSearch &&
          matchesStatus &&
          matchesSupplier &&
          matchesLocation
        );
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "stock") return a.stock - b.stock;
        if (sortBy === "value")
          return b.stock * b.costPerUnit - a.stock * a.costPerUnit;
        return 0;
      });
  }, [
    items,
    selectedCategory,
    searchTerm,
    statusFilter,
    supplierFilter,
    locationFilter,
    sortBy,
  ]);

  // Helper to determine status dynamically based on levels
  const calculateStatus = (stock, reorderLevel) => {
    if (stock <= 0) return "Out of Stock";
    if (stock <= reorderLevel) return "Low Stock";
    return "In Stock";
  };

  // Handlers
  const handleSaveItem = (itemData) => {
    const status = calculateStatus(itemData.stock, itemData.reorderLevel);
    const updatedData = { ...itemData, status, lastUpdated: "Just now" };

    if (itemData.id) {
      setItems((prev) =>
        prev.map((i) => (i.id === itemData.id ? updatedData : i)),
      );
    } else {
      const newItem = {
        ...updatedData,
        id: `INV-${Date.now().toString().slice(-4)}`,
        sku: itemData.sku || `SKU-${Math.floor(Math.random() * 900 + 100)}`,
      };
      setItems((prev) => [newItem, ...prev]);
    }
  };

  const handleStockAdjustment = ({
    itemId,
    adjType,
    quantity,
    reason,
    supplier,
  }) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;

        let newStock = item.stock;
        if (adjType === "Add Stock") newStock += quantity;
        if (adjType === "Remove Stock")
          newStock = Math.max(0, item.stock - quantity);
        if (adjType === "Correction") newStock = quantity;

        const newStatus = calculateStatus(newStock, item.reorderLevel);

        // Add history record
        const changeStr =
          adjType === "Add Stock"
            ? `+${quantity} ${item.unit}`
            : adjType === "Remove Stock"
              ? `-${quantity} ${item.unit}`
              : `Set to ${quantity} ${item.unit}`;

        setHistory((hPrev) => [
          {
            id: `h-${Date.now()}`,
            time: "Just now",
            item: item.name,
            change: changeStr,
            type: reason,
            user: "Owner",
          },
          ...hPrev,
        ]);

        return {
          ...item,
          stock: newStock,
          status: newStatus,
          supplier: supplier || item.supplier,
          lastUpdated: "Just now",
        };
      }),
    );
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setSupplierFilter("ALL");
    setLocationFilter("ALL");
    setSelectedCategory("all");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Inventory
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage ingredients, stock levels, suppliers, and inventory
            movements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => {
              setItemToEdit(null);
              setIsAddEditOpen(true);
            }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Item
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => {
              setAdjTargetItem(null);
              setIsAdjModalOpen(true);
            }}
          >
            <Sliders className="h-3.5 w-3.5" /> Stock Adjustment
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-xs gap-2">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 2. Inventory Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Card className="shadow-xs border-muted/80">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-muted-foreground block">
                Total Items
              </span>
              <span className="text-xl font-bold font-mono mt-0.5 block">
                {metrics.totalItems}
              </span>
            </div>
            <Package className="h-5 w-5 text-muted-foreground/60" />
          </CardContent>
        </Card>

        <Card className="shadow-xs border-emerald-200/60 bg-emerald-500/5">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 block">
                In Stock
              </span>
              <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                {metrics.inStock}
              </span>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-600/60" />
          </CardContent>
        </Card>

        {/* PROMINENT LOW STOCK CARD */}
        <Card className="shadow-xs border-amber-300 bg-amber-500/10 dark:bg-amber-950/20">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 block">
                Low Stock
              </span>
              <span className="text-xl font-bold font-mono text-amber-800 dark:text-amber-300 mt-0.5 block">
                {metrics.lowStock}
              </span>
            </div>
            <AlertTriangle className="h-5 w-5 text-amber-600 animate-pulse" />
          </CardContent>
        </Card>

        {/* PROMINENT OUT OF STOCK CARD */}
        <Card className="shadow-xs border-red-300 bg-red-500/10 dark:bg-red-950/20">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-red-800 dark:text-red-300 block">
                Out of Stock
              </span>
              <span className="text-xl font-bold font-mono text-red-800 dark:text-red-300 mt-0.5 block">
                {metrics.outOfStock}
              </span>
            </div>
            <XCircle className="h-5 w-5 text-red-600" />
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted/80 col-span-2 sm:col-span-1">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-muted-foreground block">
                Inventory Value
              </span>
              <span className="text-xl font-bold font-mono text-emerald-600 mt-0.5 block">
                $
                {metrics.totalVal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <DollarSign className="h-5 w-5 text-emerald-600/60" />
          </CardContent>
        </Card>
      </div>

      {/* 3. Inventory Categories Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <Button
              key={cat.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className="h-8 text-xs shrink-0 rounded-full px-3"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
              <span
                className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isActive
                    ? "bg-primary-foreground text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat.id === "all"
                  ? items.length
                  : items.filter((i) => i.category.toLowerCase() === cat.id)
                      .length}
              </span>
            </Button>
          );
        })}
      </div>

      {/* 4. Search & Filters Bar */}
      <Card className="shadow-xs border-muted/80">
        <CardContent className="p-3.5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search item, SKU, supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Status */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] h-9 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL" className="text-xs">
                    All Statuses
                  </SelectItem>
                  <SelectItem value="In Stock" className="text-xs">
                    In Stock
                  </SelectItem>
                  <SelectItem value="Low Stock" className="text-xs">
                    Low Stock
                  </SelectItem>
                  <SelectItem value="Out of Stock" className="text-xs">
                    Out of Stock
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Supplier */}
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[130px] h-9 text-xs">
                  <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL" className="text-xs">
                    All Suppliers
                  </SelectItem>
                  {initialSuppliers.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[130px] h-9 text-xs">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL" className="text-xs">
                    All Locations
                  </SelectItem>
                  {initialStorageLocations.map((loc) => (
                    <SelectItem key={loc} value={loc} className="text-xs">
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px] h-9 text-xs">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name" className="text-xs">
                    Sort: Name
                  </SelectItem>
                  <SelectItem value="stock" className="text-xs">
                    Sort: Stock Level
                  </SelectItem>
                  <SelectItem value="value" className="text-xs">
                    Sort: Total Value
                  </SelectItem>
                </SelectContent>
              </Select>

              {(searchTerm ||
                statusFilter !== "ALL" ||
                supplierFilter !== "ALL" ||
                locationFilter !== "ALL" ||
                selectedCategory !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 text-xs text-muted-foreground gap-1"
                  onClick={clearFilters}
                >
                  <FilterX className="h-3.5 w-3.5" /> Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Main Inventory List Table */}
      <Card className="shadow-xs border-muted/80 overflow-hidden">
        <CardContent className="p-3 py-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-xs font-semibold">Item</TableHead>
                <TableHead className="text-xs font-semibold">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold">Stock</TableHead>
                <TableHead className="text-xs font-semibold">Unit</TableHead>
                <TableHead className="text-xs font-semibold">
                  Reorder Level
                </TableHead>
                <TableHead className="text-xs font-semibold">
                  Supplier
                </TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold w-[80px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-xs text-muted-foreground"
                  >
                    No inventory items found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => {
                  const isLow = item.status === "Low Stock";
                  const isOut = item.status === "Out of Stock";

                  return (
                    <TableRow
                      key={item.id}
                      className={`hover:bg-muted/30 ${
                        isOut
                          ? "bg-red-500/5 dark:bg-red-950/10"
                          : isLow
                            ? "bg-amber-500/5 dark:bg-amber-950/10"
                            : ""
                      }`}
                    >
                      <TableCell className="text-xs">
                        <span className="font-bold text-foreground block">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {item.sku}
                        </span>
                      </TableCell>

                      <TableCell className="text-xs">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-normal"
                        >
                          {item.category}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-xs font-mono font-bold">
                        <span
                          className={
                            isOut
                              ? "text-destructive font-black"
                              : isLow
                                ? "text-amber-600 font-bold"
                                : "text-foreground"
                          }
                        >
                          {item.stock}
                        </span>
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground">
                        {item.unit}
                      </TableCell>

                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {item.reorderLevel} {item.unit}
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground">
                        {item.supplier}
                      </TableCell>

                      <TableCell>
                        {item.status === "In Stock" && (
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px]"
                          >
                            🟢 In Stock
                          </Badge>
                        )}
                        {item.status === "Low Stock" && (
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-700 border-amber-300 text-[10px] font-bold"
                          >
                            🟠 Low Stock
                          </Badge>
                        )}
                        {item.status === "Out of Stock" && (
                          <Badge
                            variant="outline"
                            className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] font-bold"
                          >
                            🔴 Out of Stock
                          </Badge>
                        )}
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
                              onClick={() => setSelectedItem(item)}
                            >
                              <Eye className="h-3.5 w-3.5" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-xs gap-2"
                              onClick={() => {
                                setAdjTargetItem(item);
                                setIsAdjModalOpen(true);
                              }}
                            >
                              <Sliders className="h-3.5 w-3.5" /> Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-xs gap-2"
                              onClick={() => {
                                setItemToEdit(item);
                                setIsAddEditOpen(true);
                              }}
                            >
                              <Pencil className="h-3.5 w-3.5" /> Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-xs gap-2 text-destructive"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 8. Inventory Settings & Stock History Dual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Stock Settings */}
        <Card className="shadow-xs border-muted/80">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" /> Stock
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-medium">
                  Low-Stock Notifications
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  Alert when item crosses reorder level
                </p>
              </div>
              <Switch
                checked={settings.lowStockNotifications}
                onCheckedChange={(checked) =>
                  setSettings((s) => ({ ...s, lowStockNotifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div>
                <Label className="text-xs font-medium">
                  Automatic POS Stock Deduction
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  Deduct inventory as orders complete
                </p>
              </div>
              <Switch
                checked={settings.autoDeduction}
                onCheckedChange={(checked) =>
                  setSettings((s) => ({ ...s, autoDeduction: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div>
                <Label className="text-xs font-medium">
                  Allow Negative Stock
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  Allow sales when stock reaches zero
                </p>
              </div>
              <Switch
                checked={settings.allowNegativeStock}
                onCheckedChange={(checked) =>
                  setSettings((s) => ({ ...s, allowNegativeStock: checked }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3 border-t pt-3">
              <div className="space-y-1">
                <Label className="text-xs">Default Reorder Threshold</Label>
                <Input
                  type="number"
                  value={settings.defaultReorder}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      defaultReorder: Number(e.target.value),
                    }))
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Valuation Method</Label>
                <Select
                  value={settings.valuationMethod}
                  onValueChange={(val) =>
                    setSettings((s) => ({ ...s, valuationMethod: val }))
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIFO" className="text-xs">
                      FIFO (First In, First Out)
                    </SelectItem>
                    <SelectItem value="LIFO" className="text-xs">
                      LIFO (Last In, First Out)
                    </SelectItem>
                    <SelectItem value="WAC" className="text-xs">
                      Weighted Average Cost
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock History */}
        <Card className="shadow-xs border-muted/80">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <HistoryIcon className="h-4 w-4 text-muted-foreground" /> Recent
              Stock Movements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y max-h-[260px] overflow-y-auto">
              {history.map((h) => {
                const isPositive = h.change.startsWith("+");
                return (
                  <div
                    key={h.id}
                    className="p-3 text-xs flex items-center justify-between hover:bg-muted/20"
                  >
                    <div className="space-y-0.5">
                      <span className="font-semibold text-foreground block">
                        {h.item}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {h.time} • {h.type} by {h.user}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`font-mono text-xs ${
                        isPositive
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {h.change}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drawers & Modals */}
      <InventoryDetailsSheet
        item={selectedItem}
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onEdit={(item) => {
          setItemToEdit(item);
          setIsAddEditOpen(true);
        }}
        onAdjustStock={(item) => {
          setAdjTargetItem(item);
          setIsAdjModalOpen(true);
        }}
        onDelete={handleDeleteItem}
      />

      <AddEditItemModal
        open={isAddEditOpen}
        onClose={() => {
          setIsAddEditOpen(false);
          setItemToEdit(null);
        }}
        item={itemToEdit}
        onSave={handleSaveItem}
        categories={initialCategories
          .filter((c) => c.id !== "all")
          .map((c) => c.name)}
        suppliers={initialSuppliers}
        locations={initialStorageLocations}
      />

      <StockAdjustmentModal
        open={isAdjModalOpen}
        onClose={() => {
          setIsAdjModalOpen(false);
          setAdjTargetItem(null);
        }}
        items={items}
        selectedItem={adjTargetItem}
        onSaveAdjustment={handleStockAdjustment}
      />
    </div>
  );
}
