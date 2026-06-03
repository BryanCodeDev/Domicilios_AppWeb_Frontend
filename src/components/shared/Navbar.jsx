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
    if (!user) return null;
    const items = {
      cliente: [
        { to: '/', label: 'Inicio' },
        { to: '/orders', label: 'Mis Pedidos' }
      ],
      repartidor: [
        { to: '/rider', label: 'Dashboard' },
        { to: '/rider/active', label: 'Pedido Activo' },
        { to: '/rider/earnings', label: 'Ganancias' }
      ],
      negocio: [
        { to: '/business', label: 'Pedidos' },
        { to: '/business/catalog', label: 'Catálogo' },
        { to: '/business/stats', label: 'Estadísticas' }
      ],
      admin: [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/users', label: 'Usuarios' },
        { to: '/admin/businesses', label: 'Negocios' },
        { to: '/admin/reports', label: 'Reportes' }
      ]
    };
    return items[user.rol] || [];
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Domicilios</Link>
      <div className="flex space-x-4">
        {getMenuItems()?.map(item => (
          <Link key={item.to} to={item.to} className="text-gray-600 hover:text-blue-600">
            {item.label}
          </Link>
        ))}
        {user && (
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">
            Salir
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;