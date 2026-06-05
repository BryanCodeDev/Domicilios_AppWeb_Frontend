import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Loader from '../shared/Loader.jsx';

const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader size="lg" />
      </div>
    );
  }

  if (isAuthenticated && user && roles && !roles.includes(user.rol)) {
    const roleDashboard = {
      cliente: '/',
      repartidor: '/rider',
      negocio: '/business',
      admin: '/admin'
    };
    return <Navigate to={roleDashboard[user.rol] || '/'} replace />;
  }

  return children;
};

export default PrivateRoute;
