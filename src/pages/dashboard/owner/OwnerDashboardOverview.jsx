import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Grid2X2,
  Clock,
  Plus,
  AlertTriangle,
  ChefHat,
  ArrowUpRight,
  Utensils,
  Coffee,
  IceCream,
  Flame,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data Sets based on time range
const revenueDataByPeriod = {
  today: [
    { time: "08:00", revenue: 240, orders: 12 },
    { time: "10:00", revenue: 580, orders: 24 },
    { time: "12:00", revenue: 1420, orders: 58 },
    { time: "14:00", revenue: 1100, orders: 42 },
    { time: "16:00", revenue: 650, orders: 28 },
    { time: "18:00", revenue: 1890, orders: 74 },
    { time: "20:00", revenue: 2350, orders: 92 },
    { time: "22:00", revenue: 980, orders: 36 },
  ],
  yesterday: [
    { time: "08:00", revenue: 180, orders: 9 },
    { time: "10:00", revenue: 450, orders: 18 },
    { time: "12:00", revenue: 1280, orders: 48 },
    { time: "14:00", revenue: 950, orders: 35 },
    { time: "16:00", revenue: 520, orders: 22 },
    { time: "18:00", revenue: 1650, orders: 65 },
    { time: "20:00", revenue: 2100, orders: 82 },
    { time: "22:00", revenue: 840, orders: 30 },
  ],
  week: [
    { time: "Mon", revenue: 4200, orders: 180 },
    { time: "Tue", revenue: 4800, orders: 210 },
    { time: "Wed", revenue: 5100, orders: 230 },
    { time: "Thu", revenue: 4900, orders: 215 },
    { time: "Fri", revenue: 6800, orders: 310 },
    { time: "Sat", revenue: 8400, orders: 390 },
    { time: "Sun", revenue: 7600, orders: 340 },
  ],
  month: [
    { time: "Week 1", revenue: 28500, orders: 1250 },
    { time: "Week 2", revenue: 31200, orders: 1380 },
    { time: "Week 3", revenue: 29800, orders: 1310 },
    { time: "Week 4", revenue: 34500, orders: 1520 },
  ],
};

const categoryData = [
  { name: "Main Course", sales: 4250, count: 185, color: "#F97316" },
  { name: "Beverages & Bar", sales: 2100, count: 240, color: "#3B82F6" },
  { name: "Starters & Sides", sales: 1650, count: 142, color: "#10B981" },
  { name: "Desserts", sales: 1200, count: 98, color: "#8B5CF6" },
];

const initialOrders = [
  {
    id: "#ORD-4092",
    table: "Table 04",
    type: "Dine-In",
    customer: "Alex Morgan",
    items: ["2x Wagyu Truffle Burger", "1x Sweet Potato Fries", "2x Craft IPA"],
    total: 68.5,
    status: "Preparing",
    time: "6 mins ago",
    itemsCount: 5,
  },
  {
    id: "#ORD-4091",
    table: "Table 08",
    type: "Dine-In",
    customer: "Sarah Jenkins",
    items: ["1x Woodfired Margherita", "1x Caesar Salad", "1x Pinot Noir"],
    total: 44.0,
    status: "Ready",
    time: "12 mins ago",
    itemsCount: 3,
  },
  {
    id: "#ORD-4090",
    table: "Takeaway",
    type: "Pickup",
    customer: "David Chen",
    items: ["3x Spicy Ramen Bowl", "3x Iced Green Tea"],
    total: 52.5,
    status: "Pending",
    time: "2 mins ago",
    itemsCount: 6,
  },
  {
    id: "#ORD-4089",
    table: "Table 02",
    type: "Dine-In",
    customer: "Emma Watson",
    items: ["2x Grilled Salmon", "1x Tiramisu"],
    total: 58.0,
    status: "Completed",
    time: "25 mins ago",
    itemsCount: 3,
  },
];

const tablesSnapshot = [
  {
    id: "T1",
    name: "Table 01",
    seats: 2,
    status: "occupied",
    order: "#ORD-4088",
    bill: "$42.00",
  },
  {
    id: "T2",
    name: "Table 02",
    seats: 4,
    status: "available",
    order: null,
    bill: null,
  },
  {
    id: "T3",
    name: "Table 03",
    seats: 4,
    status: "reserved",
    order: null,
    bill: null,
  },
  {
    id: "T4",
    name: "Table 04",
    seats: 6,
    status: "occupied",
    order: "#ORD-4092",
    bill: "$68.50",
  },
  {
    id: "T5",
    name: "Table 05",
    seats: 2,
    status: "bill_requested",
    order: "#ORD-4084",
    bill: "$85.00",
  },
  {
    id: "T6",
    name: "Table 06",
    seats: 4,
    status: "available",
    order: null,
    bill: null,
  },
  {
    id: "T7",
    name: "Table 07",
    seats: 8,
    status: "occupied",
    order: "#ORD-4087",
    bill: "$140.00",
  },
  {
    id: "T8",
    name: "Table 08",
    seats: 4,
    status: "occupied",
    order: "#ORD-4091",
    bill: "$44.00",
  },
];

const topDishes = [
  {
    rank: 1,
    name: "Signature Wagyu Burger",
    category: "Mains",
    sales: 142,
    revenue: 2698.0,
    rating: 4.9,
    icon: Flame,
  },
  {
    rank: 2,
    name: "Truffle Mushroom Pasta",
    category: "Mains",
    sales: 98,
    revenue: 1764.0,
    rating: 4.8,
    icon: Utensils,
  },
  {
    rank: 3,
    name: "Artisanal Craft IPA",
    category: "Beverages",
    sales: 210,
    revenue: 1470.0,
    rating: 4.7,
    icon: Coffee,
  },
  {
    rank: 4,
    name: "Valrhona Chocolate Lava",
    category: "Desserts",
    sales: 76,
    revenue: 836.0,
    rating: 4.9,
    icon: IceCream,
  },
];

const inventoryAlerts = [
  {
    item: "Wagyu Beef Patties",
    category: "Meat",
    quantity: "4.5 kg left",
    threshold: "10 kg",
    severity: "high",
  },
  {
    item: "Fresh Truffle Oil",
    category: "Pantry",
    quantity: "2 Bottles left",
    threshold: "5 Bottles",
    severity: "medium",
  },
  {
    item: "Organic Espresso Beans",
    category: "Beverage",
    quantity: "1.2 kg left",
    threshold: "3 kg",
    severity: "medium",
  },
];

export default function OwnerDashboardOverview() {
  const [timePeriod, setTimePeriod] = useState("today");
  const [orders, setOrders] = useState(initialOrders);
  const [activeOrderFilter, setActiveOrderFilter] = useState("All");

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  const filteredOrders =
    activeOrderFilter === "All"
      ? orders
      : orders.filter((o) => o.status === activeOrderFilter);

  const currentChartData = revenueDataByPeriod[timePeriod];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Greeting Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold tracking-wide uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Restaurant POS & Floor Active
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 mt-1 flex items-center gap-3">
            Dashboard Overview
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20">
              Main Outlet
            </span>
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Real-time sales analytics, live kitchen orders, and table occupancy.
          </p>
        </div>

        {/* Time Period Filter & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white border border-stone-200 rounded-xl p-1 shadow-xs flex items-center text-xs font-medium">
            {[
              { id: "today", label: "Today" },
              { id: "yesterday", label: "Yesterday" },
              { id: "week", label: "This Week" },
              { id: "month", label: "This Month" },
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setTimePeriod(period.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timePeriod === period.id
                    ? "bg-[#F97316] text-white font-semibold shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs">
            <Plus className="h-4 w-4 text-[#F97316]" />
            New Order
          </button>
        </div>
      </div>

      {/* Metric KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Gross Revenue */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F97316]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Gross Revenue
            </span>
            <div className="h-10 w-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316]">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight">
              {timePeriod === "month"
                ? "$124,000.00"
                : timePeriod === "week"
                  ? "$44,800.00"
                  : "$9,210.50"}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                <TrendingUp className="h-3.5 w-3.5" /> +14.2%
              </span>
              <span className="text-stone-400">vs prev period</span>
            </div>
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total Orders
            </span>
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight">
              {timePeriod === "month"
                ? "5,460"
                : timePeriod === "week"
                  ? "1,860"
                  : "366"}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
              <span>
                <strong className="text-stone-800 font-semibold">14</strong>{" "}
                active in kitchen
              </span>
              <span className="text-emerald-600 font-medium">
                96% fulfilled
              </span>
            </div>
          </div>
        </motion.div>

        {/* Table Occupancy Rate */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Table Occupancy
            </span>
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Grid2X2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight">
                75%
              </div>
              <span className="text-xs text-stone-500 font-medium">
                (18 / 24 tables)
              </span>
            </div>
            {/* Occupancy Bar */}
            <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: "75%" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Avg Order Value & Kitchen Speed */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Avg Ticket & Speed
            </span>
            <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight">
              $32.78
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Avg Prep:{" "}
                <strong className="text-purple-700 font-semibold">
                  14 mins
                </strong>
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> +$2.10
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Flow Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                Revenue & Order Volume Trend
              </h2>
              <p className="text-xs text-stone-500">
                Hourly sales performance for the selected time range.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#F97316]" />
                <span className="text-stone-600">Revenue ($)</span>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={currentChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E7E5E4"
                />
                <XAxis
                  dataKey="time"
                  stroke="#A8A29E"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#A8A29E"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1C1917",
                    borderColor: "#292524",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales Distribution */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Sales by Category
            </h2>
            <p className="text-xs text-stone-500">
              Revenue distribution across menu categories.
            </p>

            <div className="h-[200px] w-full my-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="sales"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1C1917",
                      borderRadius: "10px",
                      color: "#FFF",
                      fontSize: "12px",
                    }}
                    formatter={(val) => `$${val}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="truncate text-xs">
                  <p className="font-semibold text-stone-800 truncate">
                    {cat.name}
                  </p>
                  <p className="text-[#78716C]">
                    ${cat.sales.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row: Live Kitchen Orders & Table Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Order Stream Widget (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-[#F97316]" />
                <h2 className="text-base font-bold text-stone-900">
                  Live Kitchen & Orders Feed
                </h2>
              </div>
              <p className="text-xs text-stone-500">
                Track and update live order status in real time.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium">
              {["All", "Pending", "Preparing", "Ready"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveOrderFilter(status)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeOrderFilter === status
                      ? "bg-white text-stone-900 font-semibold shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border border-stone-200/90 rounded-xl p-4 hover:border-stone-300 transition-all bg-stone-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-800 font-bold text-xs shrink-0 shadow-xs">
                      {order.table.replace("Table ", "T")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">
                          {order.id}
                        </span>
                        <span className="text-xs text-stone-400">•</span>
                        <span className="text-xs font-semibold text-stone-600">
                          {order.customer}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-200/70 text-stone-700">
                          {order.type}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                        {order.items.join(", ")}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-amber-500" />{" "}
                          {order.time}
                        </span>
                        <span>{order.itemsCount} items</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-stone-200">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-stone-900">
                        ${order.total.toFixed(2)}
                      </div>
                      <span
                        className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          order.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : order.status === "Preparing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Ready"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Quick Action Toggle Buttons */}
                    <div className="flex items-center gap-1.5">
                      {order.status === "Pending" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "Preparing")
                          }
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
                        >
                          Start Cook
                        </button>
                      )}
                      {order.status === "Preparing" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "Ready")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === "Ready" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "Completed")
                          }
                          className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                        >
                          Serve / Complete
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Table Floor Map Snapshot */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Floor Occupancy
                </h2>
                <p className="text-xs text-stone-500">Live dining floor map</p>
              </div>
              <span className="text-xs font-bold text-[#F97316] hover:underline cursor-pointer">
                View Full Map →
              </span>
            </div>

            {/* Grid of Tables */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
              {tablesSnapshot.map((table) => (
                <div
                  key={table.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                    table.status === "occupied"
                      ? "bg-amber-50/70 border-amber-200 text-amber-900"
                      : table.status === "bill_requested"
                        ? "bg-rose-50/70 border-rose-200 text-rose-900 animate-pulse"
                        : table.status === "reserved"
                          ? "bg-blue-50/70 border-blue-200 text-blue-900"
                          : "bg-stone-50 border-stone-200 text-stone-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{table.name}</span>
                    <span className="text-[10px] opacity-75">
                      {table.seats}P
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] capitalize font-medium opacity-80">
                    {table.status === "bill_requested"
                      ? "Bill Req"
                      : table.status}
                  </div>
                  {table.bill && (
                    <div className="mt-1 text-xs font-extrabold text-stone-900">
                      {table.bill}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />{" "}
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />{" "}
              Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Reserved
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Bill Req
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Selling Dishes & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Bestsellers */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-[#F97316]" />
              <h2 className="text-base font-bold text-stone-900">
                Top Bestselling Items
              </h2>
            </div>
            <span className="text-xs text-stone-400 font-medium">
              Ranked by revenue
            </span>
          </div>

          <div className="space-y-3">
            {topDishes.map((dish) => (
              <div
                key={dish.name}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 hover:border-stone-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#F97316]/10 text-[#F97316] font-extrabold text-xs flex items-center justify-center">
                    #{dish.rank}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-stone-900">
                      {dish.name}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      {dish.sales} orders sold • ⭐ {dish.rating}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-stone-900">
                    ${dish.revenue.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-medium">
                    High Demand
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h2 className="text-base font-bold text-stone-900">
                  Inventory & Stock Warnings
                </h2>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                3 Action Needed
              </span>
            </div>

            <div className="space-y-3">
              {inventoryAlerts.map((alert) => (
                <div
                  key={alert.item}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-amber-200/70 bg-amber-50/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-stone-900">
                        {alert.item}
                      </h4>
                      <p className="text-[11px] text-amber-800 font-medium">
                        Current: {alert.quantity} (Min threshold:{" "}
                        {alert.threshold})
                      </p>
                    </div>
                  </div>

                  <button className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs">
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Automated inventory sync active</span>
            <span className="text-[#F97316] font-semibold cursor-pointer hover:underline">
              Manage Inventory →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
