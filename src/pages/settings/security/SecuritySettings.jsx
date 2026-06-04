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

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-text">Preferencias y seguridad</h1>
          <p className="text-brand-muted mt-1">Gestiona tu seguridad y privacidad</p>
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={24} className="text-brand-primary" />
            <h2 className="text-xl font-semibold font-display text-brand-text">Cambiar contraseña</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Contraseña actual</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-elevated border border-brand-subtle rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Nueva contraseña</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-elevated border border-brand-subtle rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Confirmar nueva contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-elevated border border-brand-subtle rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" variant="primary">
                Guardar cambios
              </Button>
            </div>
          </form>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={24} className="text-brand-muted" />
            <h2 className="text-xl font-semibold font-display text-brand-text">Autenticación de dos factores</h2>
          </div>
          <p className="text-brand-muted">Próximamente</p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;