import { Database, Download, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DataStorageTab() {
  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Database className="h-4 w-4 text-[#F97316]" />
          Data Backup & Local Storage
        </CardTitle>
        <CardDescription>
          Manage automated database backups, export system logs, or restore
          point-in-time data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-stone-900">
              Local Database Export
            </p>
            <p className="text-xs text-stone-500">
              Download a full snapshot of orders, transactions, and settings in
              JSON/SQL format.
            </p>
          </div>
          <Button variant="outline" className="gap-2 text-stone-700 bg-white">
            <Download className="h-4 w-4" /> Export Backup
          </Button>
        </div>

        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-stone-900">
              Cloud Sync & Restore
            </p>
            <p className="text-xs text-stone-500">
              Restore configuration settings from the last cloud backup (21 Aug
              2026, 04:00 AM).
            </p>
          </div>
          <Button className="gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white">
            <UploadCloud className="h-4 w-4" /> Sync Cloud
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
