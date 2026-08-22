import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit2, Copy, Trash2, Flame } from "lucide-react";

export function MenuItemCard({
  item,
  isSelected,
  onSelect,
  onToggleAvailability,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  return (
    <Card
      className={`shadow-sm transition-all hover:shadow-md border ${isSelected ? "border-primary bg-primary/5" : ""}`}
    >
      <CardContent className="p-4 space-y-3">
        {/* Card Header image & checkbox */}
        <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted group">
          <img
            src={item.image || "/placeholder-dish.png"}
            alt={item.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 z-10">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(item.id)}
              className="bg-background/80 backdrop-blur-sm"
            />
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1">
            {item.isPopular && (
              <Badge className="bg-amber-500/90 text-white hover:bg-amber-500 text-[10px] gap-1 px-1.5 py-0.5">
                <Flame className="h-3 w-3 fill-current" /> Popular
              </Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
            <span className="font-mono font-bold text-sm text-foreground shrink-0">
              ${Number(item.price).toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {item.description}
          </p>
        </div>

        {/* Labels & Category */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <Badge variant="outline" className="text-[10px] font-normal">
            {item.categoryName}
          </Badge>
          {item.labels?.map((label, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-[10px] font-normal"
            >
              {label}
            </Badge>
          ))}
        </div>

        {/* Footer Actions & Availability Toggle */}
        <div className="flex items-center justify-between pt-2 border-t mt-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={item.isAvailable}
              onCheckedChange={(checked) =>
                onToggleAvailability(item.id, checked)
              }
              id={`avail-${item.id}`}
            />
            <label
              htmlFor={`avail-${item.id}`}
              className={`text-xs font-medium cursor-pointer ${
                item.isAvailable ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </label>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit(item)}
                className="text-xs gap-2"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Dish
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDuplicate(item)}
                className="text-xs gap-2"
              >
                <Copy className="h-3.5 w-3.5" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(item.id)}
                className="text-xs gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
