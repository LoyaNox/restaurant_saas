import { Outlet, NavLink } from "react-router-dom";
import {
  Store,
  Briefcase,
  ShoppingBag,
  UtensilsCrossed,
  QrCode,
  Grid2X2,
  Bell,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingsNav = [
  {
    group: "General",
    items: [
      {
        title: "Restaurant",
        href: "/dashboard/owner/settings/restaurant",
        icon: Store,
      },
      {
        title: "Business",
        href: "/dashboard/owner/settings/business",
        icon: Briefcase,
      },
      {
        title: "System",
        href: "/dashboard/owner/settings/system",
        icon: Sliders,
      },
    ],
  },
  {
    group: "Operations",
    items: [
      {
        title: "Orders",
        href: "/dashboard/owner/settings/orders",
        icon: ShoppingBag,
      },
      {
        title: "Menu",
        href: "/dashboard/owner/settings/menu",
        icon: UtensilsCrossed,
      },
      {
        title: "Digital Menu",
        href: "/dashboard/owner/settings/digital-menu",
        icon: QrCode,
      },
      {
        title: "Tables",
        href: "/dashboard/owner/settings/tables",
        icon: Grid2X2,
      },
    ],
  },
  {
    group: "Finance",
    items: [
      {
        title: "Payments",
        href: "/dashboard/owner/settings/payments",
        icon: CreditCard,
      },
    ],
  },
  {
    group: "Communication",
    items: [
      {
        title: "Notifications",
        href: "/dashboard/owner/settings/notifications",
        icon: Bell,
      },
    ],
  },
  {
    group: "Team & Access",
    items: [
      {
        title: "Staff & Permissions",
        href: "/dashboard/owner/settings/staff",
        icon: UserCheck,
      },
      {
        title: "Security",
        href: "/dashboard/owner/settings/security",
        icon: ShieldCheck,
      },
    ],
  },
];

export default function SettingsLayout() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-4 sm:space-y-6 bg-white min-h-screen">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Manage your restaurant details, operations, business configuration,
          and system security.
        </p>
      </div>

      {/* Horizontal Nav Bar with Explicit Visible Scrollbar Overrides */}
      <div className="border-b border-stone-200">
        <nav
          className={cn(
            "flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 touch-pan-x",
            // Firefox scrollbar override
            "[scrollbar-thin] [scrollbar-color:#d6d3d1_#f5f5f4]",
            // Webkit (Chrome/Safari/Edge) scrollbar overrides
            "[&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-1.5",
            "[&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-track]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-stone-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-stone-400",
          )}
        >
          {settingsNav.flatMap((section) =>
            section.items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-t-lg transition-all shrink-0 border-b-2 whitespace-nowrap select-none",
                    isActive
                      ? "bg-stone-100/70 text-stone-900 border-stone-900"
                      : "bg-stone-50/60 text-stone-500 border-transparent hover:text-stone-900 hover:bg-stone-100/40",
                  )
                }
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            )),
          )}
        </nav>
      </div>

      {/* Dynamic Route Content */}
      <main className="pt-2">
        <Outlet />
      </main>
    </div>
  );
}
