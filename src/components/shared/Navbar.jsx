import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
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
} from 'lucide-react';

const ROL_CONFIG = {
  cliente:    { label: 'Cliente',     color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  repartidor: { label: 'Repartidor',  color: '#22C55E', bg: 'rgba(34,197,94,0.12)'  },
  negocio:    { label: 'Negocio',     color: '#FFB800', bg: 'rgba(255,184,0,0.12)'  },
  admin:      { label: 'Admin',       color: '#FF4D00', bg: 'rgba(255,77,0,0.12)'   },
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
    desc: 'Guías, manuales y soporte',
    route: '/help',
  },
];

const Navbar = ({ onToggleSidebar, sidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuthStore();
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
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      style={{
        background: 'rgba(13,13,13,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
      className="sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT — hamburger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              style={{ color: '#A0A0A0' }}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-150 lg:hidden"
            >
              {sidebarOpen
                ? <X size={20} strokeWidth={1.75} />
                : <Menu size={20} strokeWidth={1.75} />
              }
            </button>

            <div className="flex items-center gap-2.5">
              {/* Logo mark */}
              <div
                style={{ background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)' }}
                className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Zap size={16} strokeWidth={2.5} className="text-white" />
              </div>
              {/* Wordmark */}
              <span
                className="text-lg font-black hidden sm:block"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(135deg, #F5F5F5 0%, #A0A0A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em',
                }}
              >
                Domi<span style={{ WebkitTextFillColor: '#FF4D00', color: '#FF4D00' }}>Rapid</span>
              </span>
            </div>
          </div>

          {/* RIGHT — notifications + user menu */}
          {user && (
            <div className="flex items-center gap-2" ref={menuRef}>

              {/* Notification bell */}
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-xl transition-colors duration-150 hover:bg-white/5"
                style={{ color: '#A0A0A0' }}
              >
                <Bell size={18} strokeWidth={1.75} />
                {/* Unread dot */}
                <span
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{ background: '#FF4D00' }}
                />
              </button>

              {/* Divider */}
              <div
                className="hidden md:block w-px h-6 mx-1"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />

              {/* User button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl transition-colors duration-150 hover:bg-white/5"
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)' }}
                >
                  {getUserInitials()}
                </div>

                {/* Name + email */}
                <div className="hidden md:block text-left">
                  <p
                    className="text-sm font-semibold leading-tight"
                    style={{ fontFamily: 'DM Sans, sans-serif', color: '#F5F5F5' }}
                  >
                    {user.nombre || 'Usuario'}
                  </p>
                  <p className="text-xs leading-tight" style={{ color: '#5A5A5A' }}>
                    {user.email || ''}
                  </p>
                </div>

                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  style={{ color: '#5A5A5A' }}
                  className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="absolute right-4 top-[68px] w-72 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: '#161616',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
                    animation: 'dropdownIn 0.18s ease-out',
                  }}
                >
                  <style>{`
                    @keyframes dropdownIn {
                      from { opacity: 0; transform: translateY(-6px) scale(0.98); }
                      to   { opacity: 1; transform: translateY(0)   scale(1); }
                    }
                  `}</style>

                  {/* Header */}
                  <div
                    className="px-5 py-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,77,0,0.08) 0%, rgba(255,184,0,0.04) 100%)',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #FF4D00, #FFB800)' }}
                      >
                        {getUserInitials()}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-sm font-bold truncate"
                          style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}
                        >
                          {user.nombre || 'Usuario'}
                        </p>
                        <p className="text-xs truncate mt-0.5" style={{ color: '#5A5A5A' }}>
                          {user.email || ''}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1.5"
                          style={{ color: rolConfig.color, background: rolConfig.bg }}
                        >
                          <Shield size={9} strokeWidth={2.5} />
                          {rolConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => { navigate(item.route); setOpen(false); }}
                          className="flex items-center gap-3.5 w-full px-5 py-3 text-left transition-colors duration-100 hover:bg-white/4"
                          style={{ '--tw-bg-opacity': 1 }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                          >
                            <Icon size={15} strokeWidth={1.75} style={{ color: '#A0A0A0' }} />
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>
                              {item.title}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: '#5A5A5A' }}>
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3.5 w-full px-5 py-3 text-left transition-colors duration-100"
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(239,68,68,0.1)' }}
                      >
                        <LogOut size={15} strokeWidth={1.75} style={{ color: '#EF4444' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                          Cerrar sesión
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#5A5A5A' }}>
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