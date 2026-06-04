import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, User, Phone, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../../components/shared/Button.jsx';
import Loader from '../../components/shared/Loader.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'cliente',
    phone: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary/20 via-brand-background to-brand-primary/20 flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full card animate-slide-up">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold font-display text-gradient">
            Domicilios
          </h1>
          <p className="text-brand-muted mt-2">Crea tu cuenta</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-500 mb-4 text-center animate-fade-in">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-brand-muted mb-1">Nombre completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted size-5" />
              <input
                type="text"
                id="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="input pl-10"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-brand-muted mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted size-5" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input pl-10"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-brand-muted mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted size-5" />
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input pl-10"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="rol" className="block text-sm font-medium text-brand-muted mb-1">Rol</label>
            <select
              id="rol"
              value={formData.rol}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
              className="input"
            >
              <option value="cliente">Cliente</option>
              <option value="repartidor">Repartidor</option>
              <option value="negocio">Negocio</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-brand-muted mb-1">Teléfono (opcional)</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted size-5" />
              <input
                type="tel"
                id="phone"
                placeholder="Teléfono (opcional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrarse'}
          </Button>
        </form>

        <p className="mt-6 text-center text-brand-muted">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-brand-primary font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;