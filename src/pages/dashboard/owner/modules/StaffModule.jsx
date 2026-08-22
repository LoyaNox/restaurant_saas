"use client";

import * as React from "react";
import {
  initialOverviewData,
  initialMembers,
  initialRoles,
  initialPermissions,
  initialActivityLogs,
} from "@/data/staffTabData";
import OverviewTab from "@/components/pages/dashboard/owner/staff/OverviewTab";
import MembersTab from "@/components/pages/dashboard/owner/staff/MembersTab";
import AddStaffTab from "@/components/pages/dashboard/owner/staff/AddStaffTab";
import RolesTab from "@/components/pages/dashboard/owner/staff/RolesTab";
import PermissionsTab from "@/components/pages/dashboard/owner/staff/PermissionsTab";
import ActivityTab from "@/components/pages/dashboard/owner/staff/ActivityTab";
import AnalyticsTab from "@/components/pages/dashboard/owner/staff/AnalyticsTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "members", label: "Members" },
  { id: "add-staff", label: "Add Staff" },
  { id: "roles", label: "Roles" },
  { id: "permissions", label: "Permissions" },
  { id: "activity", label: "Activity" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];

export default function StaffPage() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [members, setMembers] = React.useState(initialMembers);
  const [activityLogs, setActivityLogs] = React.useState(initialActivityLogs);

  const handleAddMember = (newMember) => {
    setMembers((prev) => [newMember, ...prev]);
    setActivityLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        user: "Admin",
        action: `Onboarded ${newMember.name} as ${newMember.role}`,
        timestamp: "Just now",
      },
      ...prev,
    ]);
    setActiveTab("members");
  };

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
        <p className="text-sm text-muted-foreground">
          Centralized directory for personnel records, access policies, and
          audit logs.
        </p>
      </div>

      <div className="flex border-b overflow-x-auto gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-2">
        {activeTab === "overview" && <OverviewTab data={initialOverviewData} />}
        {activeTab === "members" && <MembersTab members={members} />}
        {activeTab === "add-staff" && (
          <AddStaffTab onAddMember={handleAddMember} />
        )}
        {activeTab === "roles" && <RolesTab roles={initialRoles} />}
        {activeTab === "permissions" && (
          <PermissionsTab permissions={initialPermissions} />
        )}
        {activeTab === "activity" && <ActivityTab logs={activityLogs} />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </main>
  );
}
