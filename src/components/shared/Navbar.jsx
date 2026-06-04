import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Home, ClipboardList, LayoutDashboard, Bike, Map, DollarSign, ShoppingBag, BarChart3, Users, Building2, FileText, Settings, LogOut, Store, Package as PackageIcon, TrendingUp, Phone, Truck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    if (!user) return [];
    const items = {
      cliente: [
        { to: '/', label: 'Inicio', icon: Home, exact: true },
        { to: '/orders', label: 'Pedidos', icon: ClipboardList },
      ],
      repartidor: [
        { to: '/rider', label: 'Dashboard', icon: LayoutDashboard, exact: true },
        { to: '/rider/active', label: 'Activo', icon: Bike },
        { to: '/rider/earnings', label: 'Ganancias', icon: DollarSign },
      ],
      negocio: [
        { to: '/business', label: 'Pedidos', icon: ShoppingBag, exact: true },
        { to: '/business/catalog', label: 'Catálogo', icon: PackageIcon },
        { to: '/business/stats', label: 'Estadísticas', icon: TrendingUp },
      ],
      admin: [
        { to: '/admin', label: 'Dashboard', icon: BarChart3, exact: true },
        { to: '/admin/users', label: 'Usuarios', icon: Users },
        { to: '/admin/businesses', label: 'Negocios', icon: Building2 },
        { to: '/admin/reports', label: 'Reportes', icon: FileText },
      ],
    };
    return items[user.rol] || [];
  };

  const isActive = (to, exact) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const getRoleName = () => {
    const names = {
      cliente: 'Cliente',
      repartidor: 'Repartidor',
      negocio: 'Negocio',
      admin: 'Admin',
    };
    return names[user.rol] || '';
  };

  return (
    <nav className="bg-brand-surface/80 backdrop-blur-md border-b border-brand-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-gradient hidden sm:block">
              Domicilios
            </span>
          </Link>

          {user && (
            <div className="flex items-center gap-1">
              {getMenuItems().map(item => {
                const Icon = item.icon;
                const active = isActive(item.to, item.exact);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-brand-primary/10 text-brand-primary'
                        : 'text-brand-muted hover:text-brand-text hover:bg-brand-elevated'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden md:inline">{item.label}</span>
                  </Link>
                );
              })}
              <div className="flex items-center ml-2 pl-2 border-l border-brand-subtle gap-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-brand-text">{user.nombre}</p>
                  <p className="text-xs text-brand-muted">{getRoleName()}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-brand-muted hover:text-red-400 hover:bg-red-500/10 transition"
                  title="Cerrar sesión"
                >
                  <LogOut size={18} />
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
