import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import Button from '../../../components/shared/Button.jsx';
import { Lock, Shield, CheckCircle } from 'lucide-react';

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputClasses = "w-full px-4 py-2.5 bg-surface border border-subtle rounded-lg text-text placeholder-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text tracking-tight">Seguridad</h1>
          <p className="text-muted text-sm mt-1">Gestiona tu seguridad y privacidad</p>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
              <Lock size={18} className="text-primary" strokeWidth={1.75} />
            </div>
            <h2 className="text-lg font-semibold text-text">Cambiar contraseña</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="label">Contraseña actual</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={inputClasses}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label className="label">Nueva contraseña</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={inputClasses}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label className="label">Confirmar nueva contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClasses}
                placeholder="••••••••"
              />
            </div>

            <div className="pt-3">
              <Button variant="primary">Guardar cambios</Button>
            </div>
          </form>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
              <Shield size={18} className="text-primary" strokeWidth={1.75} />
            </div>
            <h2 className="text-lg font-semibold text-text">Autenticación de dos factores</h2>
          </div>
          <p className="text-sm text-muted pl-[52px]">Próximamente</p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
