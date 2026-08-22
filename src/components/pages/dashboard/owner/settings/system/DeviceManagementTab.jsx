import { HardDrive, RefreshCw, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DeviceManagementTab() {
  const devices = [
    {
      id: "1",
      name: "Main Counter POS",
      type: "Desktop Terminal",
      ip: "192.168.1.10",
      status: "Online",
      icon: Monitor,
    },
    {
      id: "2",
      name: "Waiter Tablet 1",
      type: "Android POS App",
      ip: "192.168.1.22",
      status: "Online",
      icon: Smartphone,
    },
    {
      id: "3",
      name: "Kitchen Display Screen (KDS)",
      type: "Smart Display",
      ip: "192.168.1.30",
      status: "Offline",
      icon: Monitor,
    },
  ];

  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-[#F97316]" />
            Connected Terminals & Devices
          </CardTitle>
          <CardDescription>
            Monitor active POS terminals, hand-held ordering devices, and
            kitchen displays.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-stone-700">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh Status
        </Button>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-stone-200">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className="py-3 flex items-center justify-between first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {device.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      {device.type} • IP: {device.ip}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      device.status === "Online"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-stone-100 text-stone-500 border border-stone-200"
                    }`}
                  >
                    {device.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
