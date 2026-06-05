import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useTheme } from './context/ThemeContext';
import PrivateRoute from './components/shared/PrivateRoute.jsx';
import Sidebar from './components/shared/Sidebar.jsx';
import Navbar from './components/shared/Navbar.jsx';

import ClientHome from './pages/client/Home.jsx';
import ClientBusinessDetail from './pages/client/BusinessDetail.jsx';
import ClientCheckout from './pages/client/Checkout.jsx';
import ClientTracking from './pages/client/Tracking.jsx';
import ClientOrderHistory from './pages/client/OrderHistory.jsx';
import ClientOrderDetail from './pages/client/OrderDetail.jsx';

import RiderDashboard from './pages/rider/Dashboard.jsx';
import RiderActiveOrder from './pages/rider/ActiveOrder.jsx';
import RiderEarnings from './pages/rider/Earnings.jsx';

import BusinessOrders from './pages/business/Orders.jsx';
import BusinessCatalog from './pages/business/Catalog.jsx';
import BusinessProductForm from './pages/business/ProductForm.jsx';
import BusinessStats from './pages/business/Stats.jsx';

import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminUsers from './pages/admin/Users.jsx';
import AdminBusinesses from './pages/admin/Businesses.jsx';
import AdminReports from './pages/admin/Reports.jsx';

import Profile from './pages/profile/Profile.jsx';
import PersonalInfo from './pages/profile/personal/PersonalInfo.jsx';
import Settings from './pages/settings/Settings.jsx';
import SecuritySettings from './pages/settings/security/SecuritySettings.jsx';
import Help from './pages/help/Help.jsx';
import Guides from './pages/help/guides/Guides.jsx';

import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';

function App() {
  const { user } = useAuthStore();
  const { isDark } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  const sidebarWidth = sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64';

  return (
    <div className={`min-h-screen w-full overflow-x-hidden bg-background text-text`}>
      {user && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
      )}
      <div className={`transition-all duration-300 ${user ? sidebarWidth : ''}`}>
        {user && (
          <Navbar
            onToggleSidebar={toggleMobileSidebar}
            sidebarOpen={mobileSidebarOpen}
          />
        )}
        <main className={`min-h-screen p-4 md:p-6 lg:p-8 ${user ? 'pt-20' : ''}`}>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

            <Route path="/" element={<PrivateRoute roles={['cliente']}><ClientHome /></PrivateRoute>} />
            <Route path="/business/:id" element={<PrivateRoute roles={['cliente']}><ClientBusinessDetail /></PrivateRoute>} />
            <Route path="/checkout/:businessId" element={<PrivateRoute roles={['cliente']}><ClientCheckout /></PrivateRoute>} />
            <Route path="/tracking/:orderId" element={<PrivateRoute roles={['cliente']}><ClientTracking /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute roles={['cliente']}><ClientOrderHistory /></PrivateRoute>} />
            <Route path="/orders/:id" element={<PrivateRoute roles={['cliente']}><ClientOrderDetail /></PrivateRoute>} />

            <Route path="/rider" element={<PrivateRoute roles={['repartidor']}><RiderDashboard /></PrivateRoute>} />
            <Route path="/rider/active" element={<PrivateRoute roles={['repartidor']}><RiderActiveOrder /></PrivateRoute>} />
            <Route path="/rider/earnings" element={<PrivateRoute roles={['repartidor']}><RiderEarnings /></PrivateRoute>} />

            <Route path="/business" element={<PrivateRoute roles={['negocio']}><BusinessOrders /></PrivateRoute>} />
            <Route path="/business/catalog" element={<PrivateRoute roles={['negocio']}><BusinessCatalog /></PrivateRoute>} />
            <Route path="/business/products/new" element={<PrivateRoute roles={['negocio']}><BusinessProductForm /></PrivateRoute>} />
            <Route path="/business/products/:id/edit" element={<PrivateRoute roles={['negocio']}><BusinessProductForm /></PrivateRoute>} />
            <Route path="/business/stats" element={<PrivateRoute roles={['negocio']}><BusinessStats /></PrivateRoute>} />

            <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />
            <Route path="/admin/businesses" element={<PrivateRoute roles={['admin']}><AdminBusinesses /></PrivateRoute>} />
            <Route path="/admin/reports" element={<PrivateRoute roles={['admin']}><AdminReports /></PrivateRoute>} />

            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/profile/personal" element={<PrivateRoute><PersonalInfo /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/settings/security" element={<PrivateRoute><SecuritySettings /></PrivateRoute>} />
            <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
            <Route path="/help/guides" element={<PrivateRoute><Guides /></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;