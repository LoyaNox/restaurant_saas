import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Users,
  UserCheck,
  Briefcase,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Megaphone,
  ChevronRight,
  Plus,
} from "lucide-react";
import { overviewData } from "@/data/overviewData";

const iconMap = {
  Users: Users,
  UserCheck: UserCheck,
  Briefcase: Briefcase,
  Clock: Clock,
};

const categoryStyles = {
  Policy: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900",
  System:
    "bg-slate-500/10 text-slate-600 border-slate-200 dark:border-slate-800",
  General:
    "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900",
};

const priorityStyles = {
  Urgent: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900",
  Medium: "bg-muted text-muted-foreground border-border",
};

export default function OverviewTab({ data = overviewData }) {
  const [announcements, setAnnouncements] = React.useState(
    data.announcements || [],
  );
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    title: "",
    category: "General",
    priority: "Medium",
    desc: "",
    content: "",
    author: "Admin",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) return;

    const newAnnouncement = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };

    setAnnouncements((prev) => [newAnnouncement, ...prev]);

    setFormData({
      title: "",
      category: "General",
      priority: "Medium",
      desc: "",
      content: "",
      author: "Admin",
    });
    setIsAddModalOpen(false);
  };

  const getTrendBadge = (trend, change) => {
    if (trend === "up") {
      return (
        <Badge
          variant="outline"
          className="gap-1 text-emerald-600 border-emerald-200 bg-emerald-500/10 dark:border-emerald-900"
        >
          <TrendingUp className="h-3 w-3" />
          {change}
        </Badge>
      );
    }
    if (trend === "down") {
      return (
        <Badge
          variant="outline"
          className="gap-1 text-amber-600 border-amber-200 bg-amber-500/10 dark:border-amber-900"
        >
          <TrendingDown className="h-3 w-3" />
          {change}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="gap-1 text-muted-foreground bg-muted">
        <Minus className="h-3 w-3" />
        {change}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            System Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            High-level metrics and current organizational announcements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            Download Report
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Announcement
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics.map((m, idx) => {
          const IconComponent = iconMap[m.iconName] || Users;
          return (
            <Card
              key={idx}
              className="shadow-sm transition-all hover:shadow-md"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {m.label}
                  </span>
                  <div className="p-2 rounded-lg bg-muted/50 text-foreground">
                    <IconComponent className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-mono text-foreground">
                    {m.value}
                  </span>
                  {getTrendBadge(m.trend, m.change)}
                </div>

                <p className="text-xs text-muted-foreground">{m.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Announcements Section */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4 border-b flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" />
              Organization Announcements
            </CardTitle>
            <CardDescription>
              Latest policy updates, technical notices, and human resource
              announcements.
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="font-mono text-xs hidden sm:inline-flex"
          >
            {announcements.length} Active Bulletins
          </Badge>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAnnouncement(item)}
              className="group p-4 border rounded-lg space-y-2 bg-card hover:bg-muted/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase font-semibold ${
                      categoryStyles[item.category] || categoryStyles.General
                    }`}
                  >
                    {item.category}
                  </Badge>

                  {item.priority && (
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase font-semibold ${
                        priorityStyles[item.priority] || priorityStyles.Medium
                      }`}
                    >
                      {item.priority}
                    </Badge>
                  )}

                  <span className="text-xs text-muted-foreground font-mono">
                    {item.date}
                  </span>
                </div>

                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0 group-hover:text-foreground">
                <span>View details</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Announcement Detail Dialog */}
      <Dialog
        open={Boolean(selectedAnnouncement)}
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      >
        {selectedAnnouncement && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {selectedAnnouncement.category}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  {selectedAnnouncement.date}
                </span>
              </div>
              <DialogTitle className="text-xl font-bold">
                {selectedAnnouncement.title}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Posted by{" "}
                <span className="font-semibold">
                  {selectedAnnouncement.author}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 text-sm leading-relaxed text-foreground border-y my-2">
              {selectedAnnouncement.content || selectedAnnouncement.desc}
            </div>

            <div className="flex justify-end">
              <Button size="sm" onClick={() => setSelectedAnnouncement(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Add New Announcement Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
            <DialogDescription>
              Create a new update or notice for the organization.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAnnouncement} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Title
              </label>
              <Input
                name="title"
                placeholder="Announcement title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Policy">Policy</option>
                  <option value="System">System</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Short Summary
              </label>
              <Input
                name="desc"
                placeholder="Brief summary for list view"
                value={formData.desc}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Full Content
              </label>
              <Textarea
                name="content"
                placeholder="Detailed announcement information..."
                rows={4}
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Post Announcement
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
