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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-text tracking-tight">Mi perfil</h1>
          <p className="text-muted text-sm mt-1">Gestiona tu cuenta y preferencias</p>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shrink-0">
              {getUserInitial()}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-text">{user?.nombre || 'Usuario'}</h2>
              <p className="text-sm text-muted flex items-center gap-2 mt-1">
                <Mail size={14} />
                {user?.email || ''}
              </p>
              <span className="inline-block text-xs font-medium text-primary bg-primary-light px-2.5 py-0.5 rounded-full mt-2">
                {getRoleName()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => navigate(item.to)}
                className="w-full flex items-center justify-between p-4 bg-surface border border-subtle rounded-xl transition-colors hover:bg-secondary-light group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.75} className="text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-medium text-text">{item.title}</span>
                </div>
                <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
              </button>
            );
          })}
</div>
    </div>
  );
};

export default Profile;
