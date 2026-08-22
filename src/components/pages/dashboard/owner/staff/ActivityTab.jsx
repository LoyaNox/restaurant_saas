import * as React from "react";

const badgeStyles = {
  CREATE: "bg-emerald-100 text-emerald-800 border-emerald-300",
  UPDATE: "bg-blue-100 text-blue-800 border-blue-300",
  DELETE: "bg-red-100 text-red-800 border-red-300",
  SECURITY: "bg-amber-100 text-amber-800 border-amber-300",
  SYSTEM: "bg-gray-100 text-gray-800 border-gray-300",
};

export default function ActivityTab({ logs = [], onAddLog }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("ALL");

  // Filter logs logically based on search input and selected event type
  const filteredLogs = React.useMemo(() => {
    return logs.filter((log) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        log.action.toLowerCase().includes(search) ||
        log.user.toLowerCase().includes(search) ||
        log.id.toLowerCase().includes(search);

      const matchesType = selectedType === "ALL" || log.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [logs, searchTerm, selectedType]);

  // Working CSV Export function
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) return;

    const headers = ["ID", "User", "Action", "Type", "Timestamp"];
    const rows = filteredLogs.map((log) => [
      log.id,
      `"${log.user.replace(/"/g, '""')}"`,
      `"${log.action.replace(/"/g, '""')}"`,
      log.type || "SYSTEM",
      log.timestamp,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to trigger a new simulated log
  const handleSimulateLog = () => {
    if (onAddLog) {
      const types = ["CREATE", "UPDATE", "DELETE", "SECURITY", "SYSTEM"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      onAddLog({
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        user: "Admin User",
        action: `Triggered automated ${randomType.toLowerCase()} verification`,
        type: randomType,
        timestamp: "Just now",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
      {/* Header with Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Audit & Activity Log
          </h2>
          <p className="text-sm text-gray-500">
            Real-time tracking of staff management events and administrative
            actions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateLog}
            className="px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            + Test Log Event
          </button>
          <button
            onClick={handleExportCSV}
            disabled={filteredLogs.length === 0}
            className="px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Search and Type Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-3 rounded-md border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search action, user, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-40 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Types</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
            <option value="SECURITY">Security</option>
            <option value="SYSTEM">System</option>
          </select>
        </div>
        <span className="text-xs text-gray-500 font-medium">
          Showing {filteredLogs.length} of {logs.length} entries
        </span>
      </div>

      {/* Activity Item List */}
      {filteredLogs.length === 0 ? (
        <div className="py-12 text-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
          No logs match the selected filter criteria.
        </div>
      ) : (
        <div className="divide-y divide-gray-100 border border-gray-200 rounded-md overflow-hidden">
          {filteredLogs.map((log) => {
            const badgeClass = badgeStyles[log.type] || badgeStyles.SYSTEM;
            return (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold border rounded uppercase tracking-wider ${badgeClass}`}
                  >
                    {log.type || "SYSTEM"}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      Executed by{" "}
                      <span className="font-semibold text-gray-700">
                        {log.user}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400 shrink-0 ml-4">
                  {log.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
