import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Grid2X2,
  UtensilsCrossed,
  QrCode,
  Boxes,
  Users,
  UserCheck,
  User,
  Settings,
  ChevronsUpDown,
  Store,
  LogOut,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard/owner",
    icon: LayoutDashboard,
    purpose: "Business overview",
    end: true,
  },
  {
    title: "Orders",
    url: "/dashboard/owner/orders",
    icon: ShoppingBag,
    purpose: "Manage restaurant orders",
  },
  {
    title: "Tables",
    url: "/dashboard/owner/tables",
    icon: Grid2X2,
    purpose: "Dine-in table management",
  },
  {
    title: "Menu",
    url: "/dashboard/owner/menu",
    icon: UtensilsCrossed,
    purpose: "Categories, items, pricing, modifiers",
  },
  {
    title: "Digital Menu",
    url: "/dashboard/owner/digital-menu",
    icon: QrCode,
    purpose: "QR menu, preview, appearance, publishing",
  },
  {
    title: "Inventory",
    url: "/dashboard/owner/inventory",
    icon: Boxes,
    purpose: "Stock and ingredient management",
  },
  {
    title: "Customers",
    url: "/dashboard/owner/customers",
    icon: Users,
    purpose: "Customer profiles and order history",
  },
  {
    title: "Staff",
    url: "/dashboard/owner/staff",
    icon: UserCheck,
    purpose: "Staff members, roles, permissions",
  },
  {
    title: "Profile",
    url: "/dashboard/owner/profile",
    icon: User,
    purpose: "Owner's personal profile/account",
  },
  {
    title: "Settings",
    url: "/dashboard/owner/settings",
    icon: Settings,
    purpose: "Restaurant and system configuration",
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-stone-200 bg-white shadow-xs"
    >
      {/* Header / Branch Switcher */}
      <SidebarHeader className="border-b border-stone-100 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-stone-100 data-[state=open]:text-stone-900 transition-colors"
                >
                  <div className="flex aspect-square h-9 w-9 items-center justify-center rounded-xl bg-[#F97316] text-white shadow-xs">
                    <Store className="h-5 w-5" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-stone-900">
                      DineFlow Outlet
                    </span>
                    <span className="truncate text-xs text-stone-500 font-medium">
                      Main Branch (Active)
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4 text-stone-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-1 shadow-lg">
                <DropdownMenuItem className="gap-2.5 p-2 rounded-lg cursor-pointer">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 bg-stone-50">
                    <Store className="h-4 w-4 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-stone-900">
                      Main Branch
                    </p>
                    <p className="text-[10px] text-stone-500">
                      Downtown Square
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2.5 p-2 rounded-lg cursor-pointer">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 bg-stone-50">
                    <Store className="h-4 w-4 text-stone-500" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-stone-900">
                      Westside Bistro
                    </p>
                    <p className="text-[10px] text-stone-500">West Boulevard</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation Items */}
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 px-3 py-1">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5 px-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-[#F97316]/10 text-[#F97316] shadow-2xs font-bold"
                            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isActive ? "text-[#F97316]" : "text-stone-500"
                            }`}
                          />
                          <span>{item.title}</span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer / Account Section */}
      <SidebarFooter className="border-t border-stone-100 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/login")}
              className="hover:bg-rose-50 hover:text-rose-600 text-stone-600 transition-colors rounded-xl p-2.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-semibold text-xs">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#FAF9F5] text-stone-900 antialiased font-sans">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Fixed Header Navbar */}
          <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg p-1.5" />

              {/* Quick Search */}
              <div className="relative hidden md:block w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search orders, tables, dishes..."
                  className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-stone-100 border border-transparent focus:border-[#F97316]/40 focus:bg-white text-stone-900 focus:outline-none transition-all placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#F97316] ring-2 ring-white" />
              </button>

              <div className="h-4 w-px bg-stone-200" />

              {/* User Avatar Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-stone-100 transition-colors text-left">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#F97316] to-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                      MC
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-bold text-stone-900 leading-tight">
                        Chef Marcus
                      </p>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        Restaurant Owner
                      </p>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-stone-400 hidden sm:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 rounded-xl p-1 shadow-lg"
                >
                  <DropdownMenuItem
                    asChild
                    className="p-2 text-xs font-medium cursor-pointer rounded-lg"
                  >
                    <Link to="/dashboard/owner/profile">Owner Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 text-xs font-medium cursor-pointer rounded-lg">
                    Billing & Plan
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 text-xs font-medium text-rose-600 cursor-pointer rounded-lg">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Workspace Area */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
