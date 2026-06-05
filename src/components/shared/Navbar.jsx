import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Bell,
  Shield,
  Sun,
  Moon,
  Search,
} from 'lucide-react';

const ROL_CONFIG = {
  cliente:    { label: 'Cliente',     color: 'text-info' },
  repartidor: { label: 'Repartidor',  color: 'text-success' },
  negocio:    { label: 'Negocio',     color: 'text-warning' },
  admin:      { label: 'Admin',       color: 'text-primary' },
};

const menuItems = [
  {
    icon: User,
    title: 'Mi perfil',
    desc: 'Información personal y cuenta',
    route: '/profile',
  },
  {
    icon: Settings,
    title: 'Configuración',
    desc: 'Preferencias y seguridad',
    route: '/settings',
  },
  {
    icon: HelpCircle,
    title: 'Centro de ayuda',
    desc: 'Guías y soporte',
    route: '/help',
  },
];

const Navbar = ({ onToggleSidebar, sidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (!user?.nombre) return 'U';
    const parts = user.nombre.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const rolConfig = ROL_CONFIG[user?.rol] || ROL_CONFIG.cliente;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 bg-surface border-b border-subtle ` +
        (isDark ? 'bg-background/80' : 'bg-white/80')}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-lg transition-colors duration-150 lg:hidden ` +
                (isDark ? 'text-muted hover:bg-secondary-light' : 'text-muted hover:bg-secondary-light')}
            >
              {sidebarOpen
                ? <X size={20} strokeWidth={1.75} />
                : <Menu size={20} strokeWidth={1.75} />
              }
            </button>

            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap size={16} strokeWidth={2.5} className="text-white" />
              </div>
              <span className="text-lg font-display font-bold tracking-tight text-text hidden sm:block">
                DomiRapid
              </span>
            </Link>
          </div>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="px-3 py-1.5 text-sm font-medium text-text dark:text-text hover:text-primary dark:hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-medium text-text dark:text-text hover:text-primary dark:hover:text-primary transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 text-sm font-medium bg-primary dark:bg-primary text-white rounded-lg hover:bg-primary-hover dark:hover:bg-primary-hover transition-colors"
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1" ref={menuRef}>

              <div className={`flex items-center ${searchOpen ? 'w-64' : 'w-10'} transition-all duration-200 mr-2`}>
                {searchOpen ? (
                  <div className="flex items-center gap-2 w-full">
                    <Search size={16} strokeWidth={1.75} className="text-muted shrink-0" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="w-full bg-transparent text-sm text-text placeholder-muted outline-none"
                      autoFocus
                      onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                    />
                    <button onClick={() => setSearchOpen(false)} className="p-1 rounded hover:bg-secondary-light text-muted">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg text-muted hover:text-text hover:bg-secondary-light transition-colors">
                    <Search size={18} strokeWidth={1.75} />
                  </button>
                )}
              </div>

              <div className="hidden md:block w-px h-5 bg-subtle mx-1" />

              <button
                className="relative p-2 rounded-lg text-muted hover:text-text hover:bg-secondary-light transition-colors"
              >
                <Bell size={18} strokeWidth={1.75} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>

              <div className="hidden md:block w-px h-5 bg-subtle mx-1" />

              <button
                onClick={toggle}
                className="p-2 rounded-lg text-muted hover:text-text hover:bg-secondary-light transition-colors"
                title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
              </button>

              <div className="hidden md:block w-px h-5 bg-subtle mx-1" />

              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors duration-150 hover:bg-secondary-light`}
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {getUserInitials()}
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-text leading-tight">
                    {user.nombre || 'Usuario'}
                  </p>
                  <p className={`text-xs leading-tight ${rolConfig.color}`}>
                    {rolConfig.label}
                  </p>
                </div>

                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`transition-transform duration-200 text-muted ${open ? 'rotate-180' : ''}`}
                />
              </button>

              {open && (
                <div
                  className="absolute right-4 top-[52px] w-72 rounded-xl overflow-hidden z-50 animate-in bg-surface border border-subtle shadow-lg"
                >
                  <div className="px-5 py-3.5 border-b border-subtle bg-secondary-light/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
                        {getUserInitials()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text truncate">
                          {user.nombre || 'Usuario'}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {user.email || ''}
                        </p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full mt-1.5 ${rolConfig.color}`}>
                          <Shield size={9} strokeWidth={2.5} />
                          {rolConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-1.5">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => { navigate(item.route); setOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors duration-100 hover:bg-secondary-light text-muted hover:text-text"
                        >
                          <Icon size={15} strokeWidth={1.75} className="text-muted" />
                          <div>
                            <p className="text-sm font-medium text-text">
                              {item.title}
                            </p>
                            <p className="text-xs text-muted">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-subtle py-1.5">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors duration-100 hover:bg-error-light text-muted hover:text-error"
                    >
                      <LogOut size={15} strokeWidth={1.75} />
                      <div>
                        <p className="text-sm font-medium text-error">
                          Cerrar sesión
                        </p>
                        <p className="text-xs text-muted">
                          Finalizar sesión actual
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
