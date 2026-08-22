import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, MapPin, Truck, Pencil, Trash2, Sliders } from "lucide-react";

export default function InventoryDetailsSheet({
  item,
  open,
  onClose,
  onEdit,
  onAdjustStock,
  onDelete,
}) {
  if (!item) return null;

  const totalValue = (item.stock * item.costPerUnit).toFixed(2);

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 border-emerald-200 gap-1 text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In
            Stock
          </Badge>
        );
      case "Low Stock":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 border-amber-200 gap-1 text-xs font-semibold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />{" "}
            Low Stock
          </Badge>
        );
      case "Out of Stock":
        return (
          <Badge
            variant="outline"
            className="bg-destructive/10 text-destructive border-destructive/20 gap-1 text-xs font-semibold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> Out of
            Stock
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto flex flex-col justify-between p-5">
        <div className="space-y-6">
          {/* Header */}
          <SheetHeader className="pb-4 border-b space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <SheetTitle className="text-xl font-bold">
                  {item.name}
                </SheetTitle>
                <SheetDescription className="text-xs font-mono">
                  SKU: {item.sku}
                </SheetDescription>
              </div>
              {getStatusBadge(item.status)}
            </div>
          </SheetHeader>

          {/* Stock Metrics Card */}
          <div className="border rounded-xl p-4 bg-muted/20 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Stock Information
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-lg p-2.5 bg-background">
                <span className="text-[10px] text-muted-foreground block">
                  Current Stock
                </span>
                <span className="font-mono text-lg font-bold">
                  {item.stock}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {item.unit}
                  </span>
                </span>
              </div>
              <div className="border rounded-lg p-2.5 bg-background">
                <span className="text-[10px] text-muted-foreground block">
                  Reorder Level
                </span>
                <span className="font-mono text-lg font-bold text-amber-600">
                  {item.reorderLevel}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {item.unit}
                  </span>
                </span>
              </div>
              <div className="border rounded-lg p-2.5 bg-background">
                <span className="text-[10px] text-muted-foreground block">
                  Cost per Unit
                </span>
                <span className="font-mono text-base font-semibold">
                  ${item.costPerUnit.toFixed(2)}
                </span>
              </div>
              <div className="border rounded-lg p-2.5 bg-background">
                <span className="text-[10px] text-muted-foreground block">
                  Total Inventory Value
                </span>
                <span className="font-mono text-base font-bold text-emerald-600">
                  ${totalValue}
                </span>
              </div>
            </div>
          </div>

          {/* Item Specifications */}
          <div className="space-y-3 border rounded-xl p-3.5 bg-background text-xs">
            <h4 className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Item Information
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> Category
                </span>
                <Badge variant="secondary" className="text-[11px] font-normal">
                  {item.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" /> Supplier
                </span>
                <span className="font-medium">{item.supplier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Storage Location
                </span>
                <span className="font-medium">{item.storageLocation}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-muted-foreground text-[10px]">
                  Last Updated
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {item.lastUpdated}
                </span>
              </div>
            </div>
          </div>

          {/* Action Hub inside drawer */}
          <div className="space-y-2">
            <h4 className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 h-9"
                onClick={() => {
                  onAdjustStock(item);
                  onClose();
                }}
              >
                <Sliders className="h-3.5 w-3.5" /> Adjust Stock
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 h-9"
                onClick={() => {
                  onEdit(item);
                  onClose();
                }}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit Item
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="pt-4 border-t flex-row justify-between gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive text-xs gap-1"
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={onClose}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
