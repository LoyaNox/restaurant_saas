export const projectData = {
  title: "Next.js Application Migration",
  description:
    "Refactoring legacy codebase to component-based architecture with Shadcn UI.",
  status: "In Progress",
  progress: 68,
  stats: [
    { label: "Total Tasks", value: "24", icon: "CheckSquare" },
    { label: "Completed", value: "16", icon: "CheckCircle2" },
    { label: "Pending Review", value: "5", icon: "Clock" },
    { label: "Blockers", value: "3", icon: "AlertTriangle" },
  ],
  tasks: [
    {
      id: "TASK-101",
      title: "Extract static content to data folder",
      category: "Refactoring",
      priority: "High",
      status: "Done",
      assignee: "Alex R.",
    },
    {
      id: "TASK-102",
      title: "Decompose monolithic layout into modular sub-components",
      category: "Architecture",
      priority: "High",
      status: "In Progress",
      assignee: "Sarah K.",
    },
    {
      id: "TASK-103",
      title: "Integrate Shadcn Badge, Card, and Progress primitives",
      category: "UI Design",
      priority: "Medium",
      status: "Todo",
      assignee: "Devin M.",
    },
  ],
};
