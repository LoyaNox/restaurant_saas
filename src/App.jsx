import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import OwnerRegister from "./pages/auth/OwnerRegister";
import OwnerLogin from "./pages/auth/OwnerLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import DashboardLayout from "./pages/dashboard/owner/DashboardLayout";
import OwnerDashboardOverview from "./pages/dashboard/owner/OwnerDashboardOverview";
import OrdersModule from "./pages/dashboard/owner/modules/OrdersModule";
import TablesModule from "./pages/dashboard/owner/modules/TablesModule";
import MenuModule from "./pages/dashboard/owner/modules/MenuModule";
import InventoryModule from "./pages/dashboard/owner/modules/InventoryModule";
import CustomersModule from "./pages/dashboard/owner/modules/CustomersModule";
import StaffModule from "./pages/dashboard/owner/modules/StaffModule";
import ProfileModule from "./pages/dashboard/owner/modules/ProfileModule";

import RestaurantSettings from "./pages/dashboard/owner/settings/RestaurantSettings";
import SettingsLayout from "./pages/dashboard/owner/settings/SettingsLayout";
import BusinessSettings from "./pages/dashboard/owner/settings/BusinessSettings";
import DigitalMenuSettings from "./pages/dashboard/owner/settings/DigitalMenuSettings";
import SecuritySettings from "./pages/dashboard/owner/settings/SecuritySettings";
import SystemSettingsPage from "./pages/dashboard/owner/settings/SystemModule";
import OrdersSettingsPage from "./pages/dashboard/owner/modules/OrderModule";
import MenuSettingsPage from "./pages/dashboard/owner/settings/MenuSettingsPage";
import TablesSettingsPage from "./pages/dashboard/owner/settings/TablesSettingsPage";
import PaymentSettingsPage from "./pages/dashboard/owner/settings/PaymentSettingsPage";
import NotificationSettingsPage from "./pages/dashboard/owner/settings/NotificationSettingsPage";
import StaffPermissionsSettingsPage from "./pages/dashboard/owner/settings/StaffPermissionsSettingsPage";
import SecuritySettingsPage from "./pages/dashboard/owner/settings/SecuritySettingsPage";

// Simple Home page component
function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-6 p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-[#F97316] flex items-center justify-center font-extrabold text-2xl shadow-lg">
          🍽️
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          DineFlow SaaS
        </h1>
      </div>
      <p className="text-slate-400 text-sm max-w-md text-center">
        Complete restaurant management system: live POS, digital menus,
        real-time table tracking & kitchen automation.
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <Link
          to="/dashboard/owner"
          className="px-6 py-3 rounded-xl bg-[#F97316] text-white font-bold hover:bg-orange-600 transition-all shadow-md"
        >
          Open Owner Dashboard →
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing & Auth Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<OwnerRegister />} />
        <Route path="/login" element={<OwnerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Redirect aliases for fallback compatibility */}
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/owner" replace />}
        />
        <Route
          path="/owner/dashboard"
          element={<Navigate to="/dashboard/owner" replace />}
        />

        {/* Main Owner Dashboard Shell */}
        <Route path="/dashboard/owner" element={<DashboardLayout />}>
          <Route index element={<OwnerDashboardOverview />} />
          <Route path="orders" element={<OrdersModule />} />
          <Route path="tables" element={<TablesModule />} />
          <Route path="menu" element={<MenuModule />} />
          <Route path="digital-menu" element={<DigitalMenuSettings />} />
          <Route path="inventory" element={<InventoryModule />} />
          <Route path="customers" element={<CustomersModule />} />
          <Route path="staff" element={<StaffModule />} />
          <Route path="profile" element={<ProfileModule />} />

          {/* Nested Settings Module */}
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="restaurant" replace />} />
            <Route path="restaurant" element={<RestaurantSettings />} />
            <Route path="business" element={<BusinessSettings />} />
            <Route path="digital-menu" element={<DigitalMenuSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="system" element={<SystemSettingsPage />} />
            <Route path="orders" element={<OrdersSettingsPage />} />
            <Route path="menu" element={<MenuSettingsPage />} />
            <Route path="tables" element={<TablesSettingsPage />} />
            <Route path="payments" element={<PaymentSettingsPage />} />
            <Route
              path="notifications"
              element={<NotificationSettingsPage />}
            />
            <Route path="staff" element={<StaffPermissionsSettingsPage />} />
            <Route path="security" element={<SecuritySettingsPage />} />
            <Route
              path="*"
              element={
                <div className="text-stone-500 text-sm">
                  Module coming soon in Phase 2.
                </div>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
