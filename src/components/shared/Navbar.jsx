import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    if (!user) return [];
    const items = {
      cliente: [
        { to: '/', label: 'Inicio', icon: '🏠' },
        { to: '/orders', label: 'Pedidos', icon: '📦' }
      ],
      repartidor: [
        { to: '/rider', label: 'Dashboard', icon: '📊' },
        { to: '/rider/active', label: 'Activo', icon: '🚴' },
        { to: '/rider/earnings', label: 'Ganancias', icon: '💰' }
      ],
      negocio: [
        { to: '/business', label: 'Pedidos', icon: '📦' },
        { to: '/business/catalog', label: 'Catálogo', icon: '🍔' },
        { to: '/business/stats', label: 'Estadísticas', icon: '📊' }
      ],
      admin: [
        { to: '/admin', label: 'Dashboard', icon: '📊' },
        { to: '/admin/users', label: 'Usuarios', icon: '👥' },
        { to: '/admin/businesses', label: 'Negocios', icon: '🏪' },
        { to: '/admin/reports', label: 'Reportes', icon: '📈' }
      ]
    };
    return items[user.rol] || [];
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Domicilios
            </span>
          </Link>

          {user && (
            <div className="flex items-center space-x-2">
              {getMenuItems().map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600 mr-3">{user.nombre}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-white bg-primary rounded hover:bg-primaryDark"
                >
                  Salir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;