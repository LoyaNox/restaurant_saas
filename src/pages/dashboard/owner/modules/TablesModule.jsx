import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  LayoutGrid,
  List,
  ZoomIn,
  ZoomOut,
  Settings,
  Search,
  Eye,
  Users,
} from "lucide-react";
import { initialTables, initialSections } from "@/data/tables/tablesData";
import FloorPlanSettingsModal from "@/components/pages/dashboard/owner/tables/FloorPlanSettingsModal";
import TableDetailsSheet from "@/components/pages/dashboard/owner/tables/TableDetailsSheet";

const statusColorMap = {
  Available: "bg-emerald-500 text-white border-emerald-600",
  Occupied: "bg-rose-500 text-white border-rose-600",
  Reserved: "bg-amber-500 text-white border-amber-600",
  Cleaning: "bg-blue-500 text-white border-blue-600",
  "Out of Service": "bg-slate-400 text-white border-slate-500",
};

export default function TablesPage() {
  const [tables, setTables] = React.useState(initialTables);
  const [sections, setSections] = React.useState(initialSections);
  const [activeView, setActiveView] = React.useState("floorplan"); // 'floorplan' | 'list'
  const [selectedSection, setSelectedSection] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = React.useState("ALL");

  // Selection & Modal States
  const [selectedTable, setSelectedTable] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  // Canvas Workspace controls
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const [settings, setSettings] = React.useState({
    showGrid: true,
    snapToGrid: true,
    showTableNumber: true,
    showCapacity: true,
    defaultCapacity: 4,
    defaultShape: "Square",
    defaultQrEnabled: true,
  });

  // Section 2: Table Overview Stats Calculation
  const stats = React.useMemo(() => {
    return {
      total: tables.length,
      available: tables.filter((t) => t.status === "Available").length,
      occupied: tables.filter((t) => t.status === "Occupied").length,
      reserved: tables.filter((t) => t.status === "Reserved").length,
      cleaning: tables.filter((t) => t.status === "Cleaning").length,
      outOfService: tables.filter((t) => t.status === "Out of Service").length,
    };
  }, [tables]);

  // Filtered Tables
  const filteredTables = React.useMemo(() => {
    return tables.filter((t) => {
      const matchesSection =
        selectedSection === "all" ||
        t.section.toLowerCase() ===
          sections.find((s) => s.id === selectedSection)?.name.toLowerCase();
      const matchesSearch =
        t.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatusFilter === "ALL" || t.status === selectedStatusFilter;

      return matchesSection && matchesSearch && matchesStatus;
    });
  }, [tables, selectedSection, searchTerm, selectedStatusFilter, sections]);

  // Operations
  const handleSaveTable = (tableData) => {
    if (tableData.id) {
      setTables((prev) =>
        prev.map((t) => (t.id === tableData.id ? tableData : t)),
      );
    } else {
      const newTable = {
        ...tableData,
        id: `TBL-${Date.now().toString().slice(-3)}`,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${tableData.number}`,
        posX: 100,
        posY: 100,
      };
      setTables((prev) => [...prev, newTable]);
    }
  };

  const handleDeleteTable = (tableId) => {
    setTables((prev) => prev.filter((t) => t.id !== tableId));
  };

  const handleAddSection = () => {
    const name = prompt("Enter new section name:");
    if (name) {
      const id = name.toLowerCase().replace(/\s+/g, "-");
      setSections((prev) => [...prev, { id, name }]);
    }
  };

  const openNewTableForm = () => {
    setSelectedTable({
      number: `T-0${tables.length + 1}`,
      name: "",
      section: sections[1]?.name || "Main Dining",
      capacity: settings.defaultCapacity,
      shape: settings.defaultShape,
      status: "Available",
      qrEnabled: settings.defaultQrEnabled,
      posX: 100,
      posY: 100,
    });
    setIsEditMode(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tables & Layout
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage floor plans, seating capacities, live occupancy, and digital
            QR codes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center border rounded-lg p-0.5 bg-muted/40">
            <Button
              variant={activeView === "floorplan" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 text-xs gap-1.5 px-3"
              onClick={() => setActiveView("floorplan")}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Floor Plan
            </Button>
            <Button
              variant={activeView === "list" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 text-xs gap-1.5 px-3"
              onClick={() => setActiveView("list")}
            >
              <List className="h-3.5 w-3.5" /> Table List
            </Button>
          </div>

          <Button
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={openNewTableForm}
          >
            <Plus className="h-3.5 w-3.5" /> Add Table
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setIsSettingsOpen(true)}
            title="Floor Plan Settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Table Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="shadow-xs border-muted/80">
          <CardContent className="p-3">
            <span className="text-[11px] font-medium text-muted-foreground block">
              Total Tables
            </span>
            <div className="text-xl font-bold font-mono mt-0.5">
              {stats.total}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xs border-emerald-200/60 bg-emerald-500/5">
          <CardContent className="p-3">
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 block">
              Available
            </span>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
              {stats.available}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xs border-rose-200/60 bg-rose-500/5">
          <CardContent className="p-3">
            <span className="text-[11px] font-medium text-rose-700 dark:text-rose-400 block">
              Occupied
            </span>
            <div className="text-xl font-bold font-mono text-rose-700 dark:text-rose-400 mt-0.5">
              {stats.occupied}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xs border-amber-200/60 bg-amber-500/5">
          <CardContent className="p-3">
            <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 block">
              Reserved
            </span>
            <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-0.5">
              {stats.reserved}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xs border-blue-200/60 bg-blue-500/5">
          <CardContent className="p-3">
            <span className="text-[11px] font-medium text-blue-700 dark:text-blue-400 block">
              Cleaning
            </span>
            <div className="text-xl font-bold font-mono text-blue-700 dark:text-blue-400 mt-0.5">
              {stats.cleaning}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xs border-slate-200/60 bg-slate-500/5">
          <CardContent className="p-3">
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 block">
              Out of Service
            </span>
            <div className="text-xl font-bold font-mono text-slate-600 dark:text-slate-400 mt-0.5">
              {stats.outOfService}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Sections / Areas Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {sections.map((sec) => (
            <Button
              key={sec.id}
              variant={selectedSection === sec.id ? "default" : "outline"}
              size="sm"
              className="text-xs h-7 rounded-full"
              onClick={() => setSelectedSection(sec.id)}
            >
              {sec.name}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 text-primary gap-1"
            onClick={handleAddSection}
          >
            <Plus className="h-3 w-3" /> Add Section
          </Button>
        </div>
      </div>

      {/* 4. Floor Plan View Workspace */}
      {activeView === "floorplan" && (
        <Card className="shadow-sm border-muted/80 overflow-hidden">
          {/* Controls Bar */}
          <div className="p-3 bg-muted/30 border-b flex items-center justify-between gap-2 text-xs">
            <span className="font-medium text-muted-foreground">
              Visual Workspace
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <span className="font-mono text-[11px] w-12 text-center">
                {zoomLevel}%
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setZoomLevel(100)}
              >
                Fit Screen
              </Button>
            </div>
          </div>

          {/* Canvas Area */}
          <div
            className={`relative min-h-[420px] w-full overflow-auto bg-slate-50 dark:bg-slate-950 p-6 ${
              settings.showGrid
                ? "bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"
                : ""
            }`}
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top left",
            }}
          >
            {filteredTables.map((t) => {
              const isRound = t.shape === "Round";
              const isRect = t.shape === "Rectangle";

              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTable(t);
                    setIsEditMode(false);
                  }}
                  style={{ left: `${t.posX}px`, top: `${t.posY}px` }}
                  className={`absolute cursor-pointer transition-all hover:scale-105 hover:z-10 shadow-md border-2 flex flex-col items-center justify-center p-2 text-center select-none ${
                    statusColorMap[t.status] || statusColorMap.Available
                  } ${
                    isRound
                      ? "rounded-full w-24 h-24"
                      : isRect
                        ? "rounded-lg w-36 h-20"
                        : "rounded-lg w-24 h-24"
                  }`}
                >
                  {settings.showTableNumber && (
                    <span className="font-bold text-sm font-mono leading-none">
                      {t.number}
                    </span>
                  )}
                  {settings.showCapacity && (
                    <span className="text-[10px] opacity-90 flex items-center gap-0.5 mt-1">
                      <Users className="h-2.5 w-2.5" /> {t.capacity}
                    </span>
                  )}
                  <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80 mt-0.5">
                    {t.status}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* 5. Table List Workspace */}
      {activeView === "list" && (
        <Card className="shadow-xs border-muted/80">
          <CardHeader className="p-4 border-b">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search table number or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select
                  value={selectedStatusFilter}
                  onValueChange={setSelectedStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-40 h-9 text-xs">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Occupied">Occupied</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Out of Service">
                      Out of Service
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-xs font-semibold">Table</TableHead>
                  <TableHead className="text-xs font-semibold">
                    Section
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Capacity
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Shape</TableHead>
                  <TableHead className="text-xs font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    QR Order
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold w-[80px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTables.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-xs text-muted-foreground"
                    >
                      No tables match your selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTables.map((t) => (
                    <TableRow key={t.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-bold text-foreground">
                        {t.number}
                        {t.name && (
                          <span className="block text-[11px] font-normal text-muted-foreground">
                            {t.name}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        {t.section}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {t.capacity} seats
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {t.shape}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold ${
                            t.status === "Available"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                              : t.status === "Occupied"
                                ? "bg-rose-500/10 text-rose-600 border-rose-200"
                                : t.status === "Reserved"
                                  ? "bg-amber-500/10 text-amber-600 border-amber-200"
                                  : "bg-slate-500/10 text-slate-600 border-slate-200"
                          }`}
                        >
                          {t.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={t.qrEnabled ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {t.qrEnabled ? "Active" : "Off"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 gap-1 text-xs text-primary font-medium"
                          onClick={() => {
                            setSelectedTable(t);
                            setIsEditMode(false);
                          }}
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Drawer / Modal Components */}
      <TableDetailsSheet
        table={selectedTable}
        open={Boolean(selectedTable)}
        onClose={() => setSelectedTable(null)}
        onSave={handleSaveTable}
        onDelete={handleDeleteTable}
        sections={sections}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />

      <FloorPlanSettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={setSettings}
      />
    </div>
  );
}
