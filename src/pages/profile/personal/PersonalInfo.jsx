import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import Button from '../../../components/shared/Button.jsx';
import { User, Mail, Phone, Save } from 'lucide-react';

const PersonalInfo = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
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
          <h1 className="text-3xl font-bold font-display text-brand-text">Información personal y cuenta</h1>
          <p className="text-brand-muted mt-1">Actualiza tus datos personales</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                <User size={16} className="text-brand-primary" />
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-elevated border border-brand-subtle rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                <Mail size={16} className="text-brand-primary" />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-elevated border border-brand-subtle rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-brand-text mb-2">
                <Phone size={16} className="text-brand-primary" />
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-elevated border border-brand-subtle rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                placeholder="+57 300 000 0000"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary" icon={Save}>
                Guardar cambios
              </Button>
              <Button variant="ghost" onClick={() => navigate('/profile')}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;