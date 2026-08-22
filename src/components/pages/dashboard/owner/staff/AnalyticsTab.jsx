import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { analyticsData } from "@/data/analyticsData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-popover p-2.5 shadow-md text-popover-foreground text-xs space-y-1">
        <p className="font-semibold text-foreground">
          {label || data.department}
        </p>
        {data.count !== undefined && (
          <p className="text-muted-foreground">
            Headcount:{" "}
            <span className="font-mono font-medium text-foreground">
              {data.count}
            </span>{" "}
            ({data.percentage}%)
          </p>
        )}
        {data.averageYears !== undefined && (
          <p className="text-muted-foreground">
            Avg Tenure:{" "}
            <span className="font-mono font-medium text-foreground">
              {data.averageYears} yrs
            </span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function AnalyticsTab({ data = analyticsData }) {
  const { headcountDistribution, tenureTrend, keyMetrics } = data;

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2 space-y-0">
            <CardDescription className="text-xs font-medium">
              Total Staff
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono">
              {keyMetrics.totalHeadcount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              Active workforce
            </span>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 space-y-0">
            <CardDescription className="text-xs font-medium">
              Average Tenure
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono">
              {keyMetrics.avgTenureYears} Yrs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant="secondary"
              className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              {keyMetrics.quarterlyGrowth} vs last quarter
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 space-y-0">
            <CardDescription className="text-xs font-medium">
              Retention Rate
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono">
              {keyMetrics.retentionRatePercentage}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              Rolling 12-month average
            </span>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 space-y-0">
            <CardDescription className="text-xs font-medium">
              Departments
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono">
              {headcountDistribution.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">
              Functional divisions
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Headcount Breakdown Card */}
        <Card className="shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Headcount Distribution
              </CardTitle>
              <Badge variant="outline" className="text-xs font-normal">
                Departmental Ratio
              </Badge>
            </div>
            <CardDescription>
              Staff allocation across core organizational functional groups.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Interactive Donut Visualization */}
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={headcountDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="percentage"
                  >
                    {headcountDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        className="stroke-background stroke-2"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Accessible Progress Bar Items */}
            <div className="space-y-3">
              {headcountDistribution.map((item) => (
                <div key={item.department} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-foreground flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      {item.department}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {item.count} staff ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-2 border-t text-xs text-muted-foreground">
            Data re-indexed automatically at the start of each month.
          </CardFooter>
        </Card>

        {/* Tenure Trend Card */}
        <Card className="shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Tenure Metrics
              </CardTitle>
              <Badge variant="outline" className="text-xs font-normal">
                Retention Trend
              </Badge>
            </div>
            <CardDescription>
              Historical average employee retention progression across quarters.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Smooth Area Trend Chart */}
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={tenureTrend}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="tenureGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/60"
                  />
                  <XAxis
                    dataKey="quarter"
                    tickLine={false}
                    axisLine={false}
                    className="text-[10px] font-mono"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    domain={[0, "auto"]}
                    className="text-[10px] font-mono"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="averageYears"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#tenureGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>

          <CardFooter className="pt-2 border-t flex justify-between items-center text-xs text-muted-foreground">
            <span>Target Benchmark: 2.5 Years</span>
            <span className="font-mono text-emerald-600 font-semibold dark:text-emerald-400">
              96% to Target
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
