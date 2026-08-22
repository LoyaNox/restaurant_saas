import { Activity, CheckCircle, Wifi, Server } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SystemStatusTab() {
  const statusItems = [
    {
      label: "Local POS Server",
      status: "Operational",
      desc: "Latency: 2ms",
      icon: Server,
    },
    {
      label: "Internet Gateway",
      status: "Operational",
      desc: "100 Mbps Fibre",
      icon: Wifi,
    },
    {
      label: "Cloud Database Sync",
      status: "Operational",
      desc: "Last synced 1 min ago",
      icon: CheckCircle,
    },
  ];

  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#F97316]" />
          System Health Diagnostics
        </CardTitle>
        <CardDescription>
          Real-time status monitor for local hardware and connectivity services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-stone-600" />
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {item.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
