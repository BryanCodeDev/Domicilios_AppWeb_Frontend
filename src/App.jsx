import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useTheme } from "./context/ThemeContext";
import PrivateRoute from "./components/shared/PrivateRoute.jsx";
import Sidebar from "./components/shared/Sidebar.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import Loader from "./components/shared/Loader.jsx";

const ClientHome = lazy(() => import("./pages/client/Home.jsx"));
const ClientBusinessDetail = lazy(() => import("./pages/client/BusinessDetail.jsx"));
const ClientCheckout = lazy(() => import("./pages/client/Checkout.jsx"));
const ClientTracking = lazy(() => import("./pages/client/Tracking.jsx"));
const ClientOrderHistory = lazy(() => import("./pages/client/OrderHistory.jsx"));
const ClientOrderDetail = lazy(() => import("./pages/client/OrderDetail.jsx"));

const RiderDashboard = lazy(() => import("./pages/rider/Dashboard.jsx"));
const RiderActiveOrder = lazy(() => import("./pages/rider/ActiveOrder.jsx"));
const RiderEarnings = lazy(() => import("./pages/rider/Earnings.jsx"));

const BusinessOrders = lazy(() => import("./pages/business/Orders.jsx"));
const BusinessCatalog = lazy(() => import("./pages/business/Catalog.jsx"));
const BusinessProductForm = lazy(() => import("./pages/business/ProductForm.jsx"));
const BusinessStats = lazy(() => import("./pages/business/Stats.jsx"));

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminUsers = lazy(() => import("./pages/admin/Users.jsx"));
const AdminBusinesses = lazy(() => import("./pages/admin/Businesses.jsx"));
const AdminReports = lazy(() => import("./pages/admin/Reports.jsx"));

const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const PersonalInfo = lazy(() => import("./pages/profile/personal/PersonalInfo.jsx"));
const Settings = lazy(() => import("./pages/settings/Settings.jsx"));
const SecuritySettings = lazy(() => import("./pages/settings/security/SecuritySettings.jsx"));
const Help = lazy(() => import("./pages/help/Help.jsx"));
const Guides = lazy(() => import("./pages/help/guides/Guides.jsx"));

const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));

function App() {
  const { user } = useAuthStore();
  const { isDark } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  const sidebarWidth = sidebarCollapsed ? "lg:ml-20" : "lg:ml-64";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-text">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      {user && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
      )}
      <div className={"transition-all duration-300 " + (user ? sidebarWidth : "")}>
        {user && (
          <Navbar
            onToggleSidebar={toggleMobileSidebar}
            sidebarOpen={mobileSidebarOpen}
          />
        )}
        <main id="main-content" className="min-h-screen p-4 md:p-6 lg:p-8">
          <Suspense fallback={
            <div className="flex justify-center py-20">
              <Loader size="lg" />
            </div>
          }>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

              <Route path="/" element={<PrivateRoute roles={["cliente"]}><ClientHome /></PrivateRoute>} />
              <Route path="/business/:id" element={<PrivateRoute roles={["cliente"]}><ClientBusinessDetail /></PrivateRoute>} />
              <Route path="/checkout/:businessId" element={<PrivateRoute roles={["cliente"]}><ClientCheckout /></PrivateRoute>} />
              <Route path="/tracking/:orderId" element={<PrivateRoute roles={["cliente"]}><ClientTracking /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute roles={["cliente"]}><ClientOrderHistory /></PrivateRoute>} />
              <Route path="/orders/:id" element={<PrivateRoute roles={["cliente"]}><ClientOrderDetail /></PrivateRoute>} />

              <Route path="/rider" element={<PrivateRoute roles={["repartidor"]}><RiderDashboard /></PrivateRoute>} />
              <Route path="/rider/active" element={<PrivateRoute roles={["repartidor"]}><RiderActiveOrder /></PrivateRoute>} />
              <Route path="/rider/earnings" element={<PrivateRoute roles={["repartidor"]}><RiderEarnings /></PrivateRoute>} />

              <Route path="/business" element={<PrivateRoute roles={["negocio"]}><BusinessOrders /></PrivateRoute>} />
              <Route path="/business/catalog" element={<PrivateRoute roles={["negocio"]}><BusinessCatalog /></PrivateRoute>} />
              <Route path="/business/products/new" element={<PrivateRoute roles={["negocio"]}><BusinessProductForm /></PrivateRoute>} />
              <Route path="/business/products/:id/edit" element={<PrivateRoute roles={["negocio"]}><BusinessProductForm /></PrivateRoute>} />
              <Route path="/business/stats" element={<PrivateRoute roles={["negocio"]}><BusinessStats /></PrivateRoute>} />

              <Route path="/admin" element={<PrivateRoute roles={["admin"]}><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute roles={["admin"]}><AdminUsers /></PrivateRoute>} />
              <Route path="/admin/businesses" element={<PrivateRoute roles={["admin"]}><AdminBusinesses /></PrivateRoute>} />
              <Route path="/admin/reports" element={<PrivateRoute roles={["admin"]}><AdminReports /></PrivateRoute>} />

              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/profile/personal" element={<PrivateRoute><PersonalInfo /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              <Route path="/settings/security" element={<PrivateRoute><SecuritySettings /></PrivateRoute>} />
              <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
              <Route path="/help/guides" element={<PrivateRoute><Guides /></PrivateRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;

