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
import {
  Clock,
  CheckCircle2,
  ChefHat,
  PackageCheck,
  XCircle,
  FileText,
  History,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const statusConfig = {
  New: {
    color: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900",
    icon: Clock,
  },
  Confirmed: {
    color:
      "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900",
    icon: CheckCircle2,
  },
  Preparing: {
    color:
      "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900",
    icon: ChefHat,
  },
  Ready: {
    color:
      "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900",
    icon: PackageCheck,
  },
  Completed: {
    color:
      "bg-slate-500/10 text-slate-600 border-slate-200 dark:border-slate-800",
    icon: CheckCircle2,
  },
  Cancelled: {
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
};

export default function OrderDetailsSheet({
  order,
  open,
  onClose,
  onUpdateStatus,
}) {
  if (!order) return null;

  const StatusIcon = statusConfig[order.status]?.icon || Clock;

  const getNextStatus = (current) => {
    switch (current) {
      case "New":
        return { label: "Confirm Order", next: "Confirmed" };
      case "Confirmed":
        return { label: "Start Preparing", next: "Preparing" };
      case "Preparing":
        return { label: "Mark as Ready", next: "Ready" };
      case "Ready":
        return { label: "Complete Order", next: "Completed" };
      default:
        return null;
    }
  };

  const nextAction = getNextStatus(order.status);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto flex flex-col justify-between p-4">
        <div className="space-y-6">
          {/* Header */}
          <SheetHeader className="pb-4 border-b space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetTitle className="font-mono text-xl">
                  {order.id}
                </SheetTitle>
                <Badge variant="outline" className="font-normal text-xs">
                  {order.type} {order.tableNo && `• ${order.tableNo}`}
                </Badge>
              </div>
              <Badge
                variant="outline"
                className={`gap-1 uppercase font-semibold text-[11px] ${
                  statusConfig[order.status]?.color
                }`}
              >
                <StatusIcon className="h-3 w-3" />
                {order.status}
              </Badge>
            </div>
            <SheetDescription className="text-xs flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Placed at {order.orderTime} ({order.orderDate})
            </SheetDescription>
          </SheetHeader>

          {/* Ordered Items List */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ShoppingBag className="h-4 w-4" /> Ordered Items (
              {order.items.length})
            </h4>
            <div className="space-y-2 border rounded-lg p-3 bg-muted/20">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-1 pb-2 border-b last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      <span className="font-bold text-primary mr-1.5">
                        {item.quantity}×
                      </span>
                      {item.name}
                    </span>
                  </div>
                  {item.notes && item.notes.length > 0 && (
                    <ul className="pl-5 list-disc text-xs text-amber-600 dark:text-amber-400 space-y-0.5">
                      {item.notes.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Special Instructions / Notes */}
          {order.customerNotes && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText className="h-4 w-4" /> Customer Instructions
              </h4>
              <div className="p-3 border rounded-lg bg-amber-500/5 text-amber-800 dark:text-amber-300 text-xs leading-relaxed border-amber-200/50">
                {order.customerNotes}
              </div>
            </div>
          )}

          {/* Order Lifecycle Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <History className="h-4 w-4" /> Order Timeline
            </h4>
            <div className="space-y-3 relative pl-4 border-l-2 border-muted ml-2">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative space-y-0.5">
                  <div className="absolute -left-5.25 top-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      {event.status}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {event.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <SheetFooter className="pt-4 border-t flex-col sm:flex-row gap-2 mt-6">
          {order.status !== "Completed" && order.status !== "Cancelled" && (
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-destructive hover:text-destructive text-xs"
              onClick={() => {
                onUpdateStatus(order.id, "Cancelled");
                onClose();
              }}
            >
              Cancel Order
            </Button>
          )}

          {nextAction && (
            <Button
              size="sm"
              className="w-full sm:w-auto gap-1.5 text-xs flex-1"
              onClick={() => {
                onUpdateStatus(order.id, nextAction.next);
                onClose();
              }}
            >
              {nextAction.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
