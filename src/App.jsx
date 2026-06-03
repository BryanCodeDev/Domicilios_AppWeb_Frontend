import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import PrivateRoute from './components/shared/PrivateRoute.jsx';

// Client pages
import ClientHome from './pages/client/Home.jsx';
import ClientBusinessDetail from './pages/client/BusinessDetail.jsx';
import ClientCheckout from './pages/client/Checkout.jsx';
import ClientTracking from './pages/client/Tracking.jsx';
import ClientOrderHistory from './pages/client/OrderHistory.jsx';
import ClientOrderDetail from './pages/client/OrderDetail.jsx';

// Rider pages
import RiderDashboard from './pages/rider/Dashboard.jsx';
import RiderActiveOrder from './pages/rider/ActiveOrder.jsx';
import RiderEarnings from './pages/rider/Earnings.jsx';

// Business pages
import BusinessOrders from './pages/business/Orders.jsx';
import BusinessCatalog from './pages/business/Catalog.jsx';
import BusinessProductForm from './pages/business/ProductForm.jsx';
import BusinessStats from './pages/business/Stats.jsx';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminUsers from './pages/admin/Users.jsx';
import AdminBusinesses from './pages/admin/Businesses.jsx';
import AdminReports from './pages/admin/Reports.jsx';

// Auth pages
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';

function App() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

        {/* Client routes */}
        <Route path="/" element={<PrivateRoute roles={['cliente']}><ClientHome /></PrivateRoute>} />
        <Route path="/business/:id" element={<PrivateRoute roles={['cliente']}><ClientBusinessDetail /></PrivateRoute>} />
        <Route path="/checkout/:businessId" element={<PrivateRoute roles={['cliente']}><ClientCheckout /></PrivateRoute>} />
        <Route path="/tracking/:orderId" element={<PrivateRoute roles={['cliente']}><ClientTracking /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute roles={['cliente']}><ClientOrderHistory /></PrivateRoute>} />
        <Route path="/orders/:id" element={<PrivateRoute roles={['cliente']}><ClientOrderDetail /></PrivateRoute>} />

        {/* Rider routes */}
        <Route path="/rider" element={<PrivateRoute roles={['repartidor']}><RiderDashboard /></PrivateRoute>} />
        <Route path="/rider/active" element={<PrivateRoute roles={['repartidor']}><RiderActiveOrder /></PrivateRoute>} />
        <Route path="/rider/earnings" element={<PrivateRoute roles={['repartidor']}><RiderEarnings /></PrivateRoute>} />

        {/* Business routes */}
        <Route path="/business" element={<PrivateRoute roles={['negocio']}><BusinessOrders /></PrivateRoute>} />
        <Route path="/business/catalog" element={<PrivateRoute roles={['negocio']}><BusinessCatalog /></PrivateRoute>} />
        <Route path="/business/products/new" element={<PrivateRoute roles={['negocio']}><BusinessProductForm /></PrivateRoute>} />
        <Route path="/business/products/:id/edit" element={<PrivateRoute roles={['negocio']}><BusinessProductForm /></PrivateRoute>} />
        <Route path="/business/stats" element={<PrivateRoute roles={['negocio']}><BusinessStats /></PrivateRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/businesses" element={<PrivateRoute roles={['admin']}><AdminBusinesses /></PrivateRoute>} />
        <Route path="/admin/reports" element={<PrivateRoute roles={['admin']}><AdminReports /></PrivateRoute>} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;