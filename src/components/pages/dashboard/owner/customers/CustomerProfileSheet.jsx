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
  Phone,
  Mail,
  Calendar,
  Globe,
  Tag,
  Pencil,
  Trash2,
  Heart,
  FileText,
} from "lucide-react";

export default function CustomerProfileSheet({
  customer,
  open,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!customer) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto flex flex-col justify-between p-5">
        <div className="space-y-6">
          {/* Header */}
          <SheetHeader className="pb-4 border-b space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-xl font-bold">
                  {customer.firstName} {customer.lastName}
                </SheetTitle>
                <SheetDescription className="text-xs font-mono">
                  {customer.id}
                </SheetDescription>
              </div>
              <Badge
                variant={customer.status === "Active" ? "default" : "secondary"}
                className="text-xs"
              >
                {customer.status} Customer
              </Badge>
            </div>
          </SheetHeader>

          {/* Section 5: Customer Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="border rounded-lg p-2.5 text-center bg-muted/20">
              <span className="text-[10px] text-muted-foreground block">
                Visits
              </span>
              <span className="font-mono text-base font-bold">
                {customer.visits}
              </span>
            </div>
            <div className="border rounded-lg p-2.5 text-center bg-muted/20">
              <span className="text-[10px] text-muted-foreground block">
                Orders
              </span>
              <span className="font-mono text-base font-bold">
                {customer.totalOrders}
              </span>
            </div>
            <div className="border rounded-lg p-2.5 text-center bg-muted/20">
              <span className="text-[10px] text-muted-foreground block">
                Total Spent
              </span>
              <span className="font-mono text-base font-bold text-emerald-600">
                ${customer.totalSpent.toFixed(2)}
              </span>
            </div>
            <div className="border rounded-lg p-2.5 text-center bg-muted/20">
              <span className="text-[10px] text-muted-foreground block">
                Avg. Spend
              </span>
              <span className="font-mono text-base font-bold">
                ${customer.avgSpend.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Section 5: Contact & Personal Info */}
          <div className="space-y-3 border rounded-lg p-3.5 bg-muted/10 text-xs">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Contact & Profile Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span>{customer.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">{customer.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span>Joined: {customer.joinedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span>Lang: {customer.preferredLanguage || "English"}</span>
              </div>
            </div>

            {customer.tags && customer.tags.length > 0 && (
              <div className="pt-2 border-t flex flex-wrap items-center gap-1.5">
                <Tag className="h-3 w-3 text-muted-foreground" />
                {customer.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {customer.notes && (
              <div className="pt-2 border-t text-muted-foreground flex items-start gap-1.5">
                <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <p className="text-[11px] italic">{customer.notes}</p>
              </div>
            )}
          </div>

          {/* Section 6: Customer Activity & Favorites */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Recent Activity & Preferences
            </h4>

            {customer.favoriteItems && customer.favoriteItems.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900">
                <Heart className="h-3.5 w-3.5 shrink-0" />
                <span className="font-medium">Favorites:</span>
                <span className="truncate">
                  {customer.favoriteItems.join(", ")}
                </span>
              </div>
            )}

            <div className="space-y-2 border-l-2 border-muted pl-3 ml-1">
              {customer.activities && customer.activities.length > 0 ? (
                customer.activities.map((act) => (
                  <div key={act.id} className="text-xs space-y-0.5 relative">
                    <span className="font-semibold text-foreground block">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {act.time}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">
                  No recent activity recorded.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sheet Footer */}
        <SheetFooter className="pt-4 border-t flex-row justify-between gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive text-xs gap-1"
            onClick={() => {
              onDelete(customer.id);
              onClose();
            }}
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
          <Button
            size="sm"
            className="text-xs gap-1"
            onClick={() => {
              onEdit(customer);
              onClose();
            }}
          >
            <Pencil className="h-3.5 w-3.5" /> Edit Profile
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
