import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  if (isAuthenticated && user && roles && !roles.includes(user.rol)) {
    // Redirect to appropriate dashboard based on role
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

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default PrivateRoute;