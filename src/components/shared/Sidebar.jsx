import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../context/ThemeContext';
import {
  Home,
  ClipboardList,
  LayoutDashboard,
  Bike,
  DollarSign,
  ShoppingBag,
  Package as PackageIcon,
  TrendingUp,
  BarChart3,
  Users,
  Building2,
  FileText,
  LogOut,
  Truck,
  Sun,
  Moon,
} from 'lucide-react';

const menuItems = {
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

const Sidebar = ({ collapsed, onToggleCollapse, mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuthStore();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const items = user ? menuItems[user.rol] || [] : [];

  const isActive = (to, exact) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const getRoleName = () => {
    const names = { cliente: 'Cliente', repartidor: 'Repartidor', negocio: 'Negocio', admin: 'Admin' };
    return names[user?.rol] || '';
  };

  const navContent = (
    <>
      <div className="flex items-center h-14 px-4 border-b border-subtle shrink-0">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-base text-text tracking-tight">DomiRapid</span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {items.map(item => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  title={collapsed ? item.label : undefined}
                  className={
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ` +
                    (active
                      ? 'bg-primary-light text-primary'
                      : 'text-muted hover:text-text hover:bg-secondary-light')
                  }
                >
                  <Icon size={18} strokeWidth={1.75} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-subtle p-3 space-y-0.5 shrink-0">
        {user && (
          <div className={`px-3 py-2 mb-1 ${collapsed ? 'text-center' : ''}`}>
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{user.nombre?.charAt(0) || '?'}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text truncate">{user.nombre}</p>
                  <p className="text-xs text-muted">{getRoleName()}</p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-primary">{user.nombre?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={toggle}
          title={collapsed ? (isDark ? 'Modo claro' : 'Modo oscuro') : (isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-secondary-light transition-colors w-full"
        >
          {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
          {!collapsed && <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>}
        </button>

        <button
          onClick={logout}
          title={collapsed ? 'Cerrar sesión' : undefined}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-error hover:bg-error-light transition-colors w-full"
        >
          <LogOut size={18} strokeWidth={1.75} />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={
          `fixed top-0 left-0 h-screen bg-surface border-r border-subtle z-50 flex flex-col ` +
          `transition-all duration-300 ease-in-out ` +
          `${collapsed ? 'w-20' : 'w-64'} ` +
          `hidden lg:flex`
        }
      >
        {navContent}
      </aside>

      <aside
        className={
          `fixed inset-0 z-50 lg:hidden ` +
          `transition-all duration-300 ease-in-out ` +
          `${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`
        }
      >
        <div
          className={`
            absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300
            ${mobileOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={onMobileClose}
        />
        <div
          className={`
            absolute top-0 left-0 h-full w-64 bg-surface border-r border-subtle flex flex-col
            transform transition-all duration-300 ease-in-out
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {navContent}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
