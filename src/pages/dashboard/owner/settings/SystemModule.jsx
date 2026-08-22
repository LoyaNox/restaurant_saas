import { useState } from "react";
import { Printer, HardDrive, Activity, Database } from "lucide-react";

import DataStorageTab from "@/components/pages/dashboard/owner/settings/system/DataStorageTab";
import ReceptionPrintingTab from "@/components/pages/dashboard/owner/settings/system/ReceptionPrintingTab";
import DeviceManagementTab from "@/components/pages/dashboard/owner/settings/system/DeviceManagementTab";
import SystemStatusTab from "@/components/pages/dashboard/owner/settings/system/SystemStatusTab";

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("printing");

  const tabs = [
    { id: "printing", label: "Reception & Printing", icon: Printer },
    { id: "devices", label: "Device Management", icon: HardDrive },
    { id: "status", label: "System Status", icon: Activity },
    { id: "storage", label: "Data & Storage", icon: Database },
  ];

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">System Settings</h1>
        <p className="text-sm text-stone-500 mt-1">
          Configure thermal printers, connected POS devices, system diagnostics,
          and database backup routines.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-stone-200 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-white text-stone-900 border border-stone-200 border-b-white font-semibold shadow-sm -mb-px"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${isActive ? "text-[#F97316]" : "text-stone-400"}`}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panes */}
      <div className="pt-2">
        {activeTab === "printing" && <ReceptionPrintingTab />}
        {activeTab === "devices" && <DeviceManagementTab/>}
        {activeTab === "status" && <SystemStatusTab />}
        {activeTab === "storage" && <DataStorageTab />}
      </div>
    </div>
  );
}
