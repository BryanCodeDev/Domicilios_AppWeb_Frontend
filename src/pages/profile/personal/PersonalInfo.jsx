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

  const inputClasses = "w-full px-4 py-2.5 bg-surface border border-subtle rounded-lg text-text placeholder-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-text tracking-tight">Información personal</h1>
          <p className="text-muted text-sm mt-1">Actualiza tus datos personales</p>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="label">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputClasses + " pl-10"}
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="label">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses + " pl-10"}
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="label">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={inputClasses + " pl-10"}
                  placeholder="+57 300 000 0000"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-subtle">
              <Button variant="ghost" onClick={() => navigate('/profile')}>
                Cancelar
              </Button>
              <Button variant="primary" icon={Save}>
                Guardar cambios
              </Button>
            </div>
          </form>
</div>
    </div>
  );
};

export default PersonalInfo;
