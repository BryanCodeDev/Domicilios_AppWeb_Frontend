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
    return names[user.rol] || '';
  };

  const navContent = (
    <>
      <div className="flex items-center justify-between h-16 px-4 border-b border-brand-subtle shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold font-display text-gradient">Domicilios</span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        <ul className="space-y-1">
          {items.map(item => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-brand-primary/10 text-brand-primary'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-elevated'
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-brand-subtle p-3 space-y-1 shrink-0">
        {user && (
          <div className={`px-3 py-2 mb-2 ${collapsed ? 'text-center' : ''}`}>
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand-primary">{user.nombre?.charAt(0) || '?'}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-brand-text truncate">{user.nombre}</p>
                  <p className="text-xs text-brand-muted">{getRoleName()}</p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-sm font-bold text-brand-primary">{user.nombre?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={toggle}
          title={collapsed ? (isDark ? 'Modo claro' : 'Modo oscuro') : (isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-muted hover:text-brand-text hover:bg-brand-elevated transition w-full"
        >
          {isDark ? <Sun size={20} className="shrink-0" /> : <Moon size={20} className="shrink-0" />}
          {!collapsed && <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>}
        </button>
        <button
          onClick={logout}
          title={collapsed ? 'Cerrar sesión' : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-muted hover:text-red-400 hover:bg-red-500/10 transition w-full"
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-brand-surface border-r border-brand-subtle z-50 flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          hidden lg:flex
        `}
      >
        {navContent}
      </aside>

      <aside
        className={`
          fixed inset-0 z-50 lg:hidden
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onMobileClose}
        />
        <div
          className={`
            absolute top-0 left-0 h-full w-64 bg-brand-surface border-r border-brand-subtle flex flex-col
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
