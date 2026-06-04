import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/shared/Button.jsx';
import { User, Mail, Settings, HelpCircle, ChevronRight, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const getUserInitial = () => {
    if (!user?.nombre) return 'U';
    const parts = user.nombre.trim().split(' ');
    return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0][0].toUpperCase();
  };

  const getRoleName = () => {
    const names = { cliente: 'Cliente', repartidor: 'Repartidor', negocio: 'Negocio', admin: 'Admin' };
    return names[user?.rol] || '';
  };

  const menuItems = [
    { title: 'Información personal y cuenta', icon: User, to: '/profile/personal' },
    { title: 'Configuración', icon: Settings, to: '/settings' },
    { title: 'Centro de ayuda', icon: HelpCircle, to: '/help' },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-text">Mi perfil</h1>
          <p className="text-brand-muted mt-1">Gestiona tu cuenta y preferencias</p>
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-2xl">
              {getUserInitial()}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-brand-text">{user?.nombre || 'Usuario'}</h2>
              <p className="text-brand-muted flex items-center gap-2 mt-1">
                <Mail size={16} />
                {user?.email || ''}
              </p>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full mt-2">
                {getRoleName()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center justify-between p-4 bg-brand-surface border border-brand-subtle rounded-xl hover:bg-brand-elevated transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-elevated rounded-lg flex items-center justify-center">
                  <item.icon size={20} className="text-brand-muted group-hover:text-brand-primary transition" />
                </div>
                <span className="font-medium text-brand-text">{item.title}</span>
              </div>
              <ChevronRight size={18} className="text-brand-muted group-hover:text-brand-primary transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;