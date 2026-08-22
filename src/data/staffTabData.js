export const initialOverviewData = {
  metrics: [
    { label: "Total Headcount", value: "64", change: "+4 this month" },
    { label: "Active Today", value: "52", change: "81% presence" },
    { label: "Open Roles", value: "8", change: "3 in final interviews" },
    {
      label: "Monthly Turnover",
      value: "1.2%",
      change: "-0.4% vs last quarter",
    },
  ],
  announcements: [
    {
      id: 1,
      title: "Q3 Performance Review Cycle",
      date: "Aug 20, 2026",
      desc: "Self-assessments are open until Sept 5.",
    },
    {
      id: 2,
      title: "New Health Insurance Perks",
      date: "Aug 15, 2026",
      desc: "Updated dental and vision policies added to portal.",
    },
  ],
};

export const initialMembers = [
  {
    id: "STF-101",
    name: "Alex Mercer",
    email: "a.mercer@org.com",
    role: "Engineering Lead",
    dept: "Engineering",
    status: "Active",
  },
  {
    id: "STF-102",
    name: "Sarah Jenkins",
    email: "s.jenkins@org.com",
    role: "Product Manager",
    dept: "Product",
    status: "Active",
  },
  {
    id: "STF-103",
    name: "Rohan Patel",
    email: "r.patel@org.com",
    role: "DevOps Engineer",
    dept: "Engineering",
    status: "On Leave",
  },
  {
    id: "STF-104",
    name: "Lisa Wong",
    email: "l.wong@org.com",
    role: "UX Researcher",
    dept: "Design",
    status: "Active",
  },
];

export const initialRoles = [
  {
    id: "R-1",
    title: "Super Admin",
    count: 3,
    level: "Tier 1",
    description:
      "Unrestricted access across all workspace domains and settings.",
  },
  {
    id: "R-2",
    title: "Department Lead",
    count: 8,
    level: "Tier 2",
    description:
      "Can manage team members, approve leave, and review performance.",
  },
  {
    id: "R-3",
    title: "Standard Staff",
    count: 45,
    level: "Tier 3",
    description:
      "Standard access to workspace documents, tasks, and team schedules.",
  },
  {
    id: "R-4",
    title: "Contractor",
    count: 8,
    level: "Tier 4",
    description:
      "Restricted project-based access without internal workspace visibility.",
  },
];

export const ROLES = [
  "Developer",
  "Product Manager",
  "Designer",
  "Team Lead",
  "QA Engineer",
  "DevOps Specialist",
  "HR Manager",
];

export const initialPermissions = [
  { module: "User Management", read: true, write: true, delete: true },
  { module: "Payroll & Billing", read: true, write: false, delete: false },
  { module: "Project Workspaces", read: true, write: true, delete: false },
  { module: "System Logs & Audit", read: true, write: false, delete: false },
];

export const initialActivityLogs = [
  {
    id: "LOG-01",
    user: "Sarah Jenkins",
    action: "Updated team assignment for STF-103",
    type: "UPDATE",
    timestamp: "10 mins ago",
  },
  {
    id: "LOG-02",
    user: "Alex Mercer",
    action: "Changed role permissions for Standard Staff",
    type: "SECURITY",
    timestamp: "1 hour ago",
  },
  {
    id: "LOG-03",
    user: "Admin",
    action: "Onboarded Marcus Vance as Product Manager",
    type: "CREATE",
    timestamp: "2 hours ago",
  },
  {
    id: "LOG-04",
    user: "System",
    action: "Automated backup completed successfully",
    type: "SYSTEM",
    timestamp: "3 hours ago",
  },
];

export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Operations",
  "Marketing",
  "Human Resources",
  "Finance",
];

export const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  dept: DEPARTMENTS[0],
  role: ROLES[0],
};

export const permissionsData = {
  Admin: [
    {
      id: "MOD-01",
      module: "Staff Directory",
      description: "Manage employee profiles and records",
      read: true,
      write: true,
      delete: true,
    },
    {
      id: "MOD-02",
      module: "Payroll & Compensation",
      description: "View and adjust salary structures",
      read: true,
      write: true,
      delete: true,
    },
    {
      id: "MOD-03",
      module: "Performance Reviews",
      description: "Access quarterly staff evaluations",
      read: true,
      write: true,
      delete: false,
    },
    {
      id: "MOD-04",
      module: "Audit & Compliance",
      description: "Inspect system usage logs and activity",
      read: true,
      write: true,
      delete: true,
    },
  ],
  Manager: [
    {
      id: "MOD-01",
      module: "Staff Directory",
      description: "Manage employee profiles and records",
      read: true,
      write: true,
      delete: false,
    },
    {
      id: "MOD-02",
      module: "Payroll & Compensation",
      description: "View and adjust salary structures",
      read: true,
      write: false,
      delete: false,
    },
    {
      id: "MOD-03",
      module: "Performance Reviews",
      description: "Access quarterly staff evaluations",
      read: true,
      write: true,
      delete: false,
    },
    {
      id: "MOD-04",
      module: "Audit & Compliance",
      description: "Inspect system usage logs and activity",
      read: true,
      write: false,
      delete: false,
    },
  ],
  Staff: [
    {
      id: "MOD-01",
      module: "Staff Directory",
      description: "Manage employee profiles and records",
      read: true,
      write: false,
      delete: false,
    },
    {
      id: "MOD-02",
      module: "Payroll & Compensation",
      description: "View and adjust salary structures",
      read: false,
      write: false,
      delete: false,
    },
    {
      id: "MOD-03",
      module: "Performance Reviews",
      description: "Access quarterly staff evaluations",
      read: true,
      write: false,
      delete: false,
    },
    {
      id: "MOD-04",
      module: "Audit & Compliance",
      description: "Inspect system usage logs and activity",
      read: false,
      write: false,
      delete: false,
    },
  ],
};

export const rolesData = [
  {
    id: "ROLE-01",
    title: "Store Owner / Admin",
    level: "Executive",
    count: 2,
    description:
      "Full system administration access including financial statements, team management, and global store settings.",
    capabilities: [
      "All System Modules",
      "Billing & Subscriptions",
      "User Role Management",
      "Delete Operations",
    ],
    isSystemDefault: true,
  },
  {
    id: "ROLE-02",
    title: "General Manager",
    level: "Operational",
    count: 5,
    description:
      "Oversees daily restaurant operations, staff scheduling, inventory restocking, and customer issue management.",
    capabilities: [
      "Staff Directory",
      "Inventory Control",
      "Order Processing",
      "Refund Approvals",
    ],
    isSystemDefault: false,
  },
  {
    id: "ROLE-03",
    title: "Shift Supervisor",
    level: "Operational",
    count: 8,
    description:
      "Manages active floor staff, kitchen workflow, table reservations, and end-of-shift cash drawer reconciliations.",
    capabilities: [
      "Order Processing",
      "Table Management",
      "Attendance Logging",
      "Read Inventory",
    ],
    isSystemDefault: false,
  },
  {
    id: "ROLE-04",
    title: "Kitchen Staff / Chef",
    level: "Staff",
    count: 14,
    description:
      "Access to the Kitchen Display System (KDS), stock usage updates, and item availability toggles.",
    capabilities: ["KDS View", "Stock Toggles", "Recipe View"],
    isSystemDefault: false,
  },
  {
    id: "ROLE-05",
    title: "Waitstaff / Cashier",
    level: "Staff",
    count: 22,
    description:
      "Point-of-Sale (POS) order entry, bill generation, table status updates, and digital receipt delivery.",
    capabilities: ["POS Access", "Table Status", "Bill Generation"],
    isSystemDefault: false,
  },
];
