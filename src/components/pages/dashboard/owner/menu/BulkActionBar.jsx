import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Trash2, X } from "lucide-react";

export function BulkActionBar({
  selectedCount,
  onClear,
  onMarkAvailable,
  onMarkUnavailable,
  onDeleteSelected,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-3 rounded-xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-2 text-xs font-semibold pr-2 border-r border-background/20">
        <span>{selectedCount} selected</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="h-5 w-5 hover:bg-background/20 text-background"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={onMarkAvailable}
          className="h-8 text-xs gap-1.5"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          Mark Available
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={onMarkUnavailable}
          className="h-8 text-xs gap-1.5"
        >
          <XCircle className="h-3.5 w-3.5 text-destructive" />
          Mark Unavailable
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={onDeleteSelected}
          className="h-8 text-xs gap-1.5"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}
