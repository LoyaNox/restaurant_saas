import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, UtensilsCrossed } from "lucide-react";
import { MenuStats } from "@/components/pages/dashboard/owner/menu/MenuStats";
import { MenuFilters } from "@/components/pages/dashboard/owner/menu/MenuFilters";
import { MenuItemCard } from "@/components/pages/dashboard/owner/menu/MenuItemCard";
import { AddEditDishModal } from "@/components/pages/dashboard/owner/menu/AddEditDishModal";
import { BulkActionBar } from "@/components/pages/dashboard/owner/menu/BulkActionBar";

const MOCK_CATEGORIES = [
  { id: "starters", name: "Starters", count: 4 },
  { id: "mains", name: "Mains", count: 8 },
  { id: "sides", name: "Sides", count: 3 },
  { id: "beverages", name: "Beverages", count: 5 },
  { id: "desserts", name: "Desserts", count: 2 },
];

export default function MenuCatalogPage() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Signature Wagyu Burger",
      description: "Premium wagyu beef, brioche bun, cheddar, house sauce",
      categoryId: "mains",
      categoryName: "Mains",
      price: 18.99,
      isAvailable: true,
      isPopular: true,
      labels: ["Chef's Special"],
      allergens: ["Milk", "Wheat"],
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Computed Stats
  const stats = useMemo(
    () => ({
      total: items.length,
      available: items.filter((i) => i.isAvailable).length,
      unavailable: items.filter((i) => !i.isAvailable).length,
      categories: MOCK_CATEGORIES.length,
      popular: items.filter((i) => i.isPopular).length,
    }),
    [items],
  );

  // Filtered & Sorted list
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "all" || item.categoryId === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAvail =
          availabilityFilter === "all" ||
          (availabilityFilter === "available" && item.isAvailable) ||
          (availabilityFilter === "unavailable" && !item.isAvailable);

        return matchesCategory && matchesSearch && matchesAvail;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [items, selectedCategory, searchQuery, availabilityFilter, sortBy]);

  // Bulk Handlers
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleBulkAvailability = (status) => {
    setItems((prev) =>
      prev.map((i) =>
        selectedIds.includes(i.id) ? { ...i, isAvailable: status } : i,
      ),
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  // Single Actions
  const handleToggleAvailability = (id, status) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isAvailable: status } : i)),
    );
  };

  const handleSaveDish = (dishData) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id ? { ...dishData, id: i.id } : i,
        ),
      );
    } else {
      const newDish = {
        ...dishData,
        id: Date.now().toString(),
        categoryName:
          MOCK_CATEGORIES.find((c) => c.id === dishData.categoryId)?.name ||
          "General",
      };
      setItems((prev) => [newDish, ...prev]);
    }
    setEditingItem(null);
  };

  return (
    <div className="p-6 space-y-6 pb-24 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Menu Catalog</h1>
          <p className="text-xs text-muted-foreground">
            Manage your restaurant dishes, prices, and realtime stock
            availability.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Upload className="h-3.5 w-3.5" /> Import
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add Dish
          </Button>
        </div>
      </div>

      {/* 2. Stats */}
      <MenuStats stats={stats} />

      {/* 3 & 4. Search & Category Filters */}
      <MenuFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        categories={MOCK_CATEGORIES}
      />

      {/* 5. Main Grid Area */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              isSelected={selectedIds.includes(item.id)}
              onSelect={handleSelect}
              onToggleAvailability={handleToggleAvailability}
              onEdit={(i) => {
                setEditingItem(i);
                setIsModalOpen(true);
              }}
              onDuplicate={(i) =>
                handleSaveDish({ ...i, id: null, name: `${i.name} (Copy)` })
              }
              onDelete={(id) =>
                setItems((prev) => prev.filter((i) => i.id !== id))
              }
            />
          ))}
        </div>
      ) : (
        /* 7. Empty State */
        <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg border-dashed bg-muted/20 text-center">
          <div className="p-3 rounded-full bg-muted mb-3">
            <UtensilsCrossed className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-sm">No menu items found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            No dishes match your search or selected filter settings. Try
            clearing filters or create a new dish.
          </p>
          <Button
            size="sm"
            className="mt-4 gap-1.5 text-xs"
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add First Dish
          </Button>
        </div>
      )}

      {/* 9. Bulk Actions floating toolbar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onClear={() => setSelectedIds([])}
        onMarkAvailable={() => handleBulkAvailability(true)}
        onMarkUnavailable={() => handleBulkAvailability(false)}
        onDeleteSelected={handleBulkDelete}
      />

      {/* 10. Add/Edit Dialog */}
      <AddEditDishModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={editingItem}
        onSave={handleSaveDish}
        categories={MOCK_CATEGORIES}
      />
    </div>
  );
}
