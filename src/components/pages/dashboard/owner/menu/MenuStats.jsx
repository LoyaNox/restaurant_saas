import { Card, CardContent } from "@/components/ui/card";
import {
  Utensils,
  CheckCircle2,
  XCircle,
  // FolderGrid,
  Flame,
  Folder,
} from "lucide-react";

export function MenuStats({ stats }) {
  const statItems = [
    {
      label: "Total Items",
      value: stats.total,
      icon: Utensils,
      color: "text-blue-500",
    },
    {
      label: "Available",
      value: stats.available,
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      label: "Unavailable",
      value: stats.unavailable,
      icon: XCircle,
      color: "text-destructive",
    },
    {
      label: "Categories",
      value: stats.categories,
      icon: Folder,
      color: "text-purple-500",
    },
    {
      label: "Popular Items",
      value: stats.popular,
      icon: Flame,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-2xl font-bold font-mono">{item.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-muted/60 ${item.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
