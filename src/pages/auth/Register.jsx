import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';

const ROL_OPTIONS = [
  { value: 'cliente', label: 'Cliente', desc: 'Realiza pedidos en tu barrio' },
  { value: 'repartidor', label: 'Repartidor', desc: 'Entrega pedidos y gana dinero' },
  { value: 'negocio', label: 'Negocio', desc: 'Vende tus productos en la app' },
];

const Register = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: 'cliente', phone: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const selectedRol = ROL_OPTIONS.find(r => r.value === formData.rol);

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

  const InputField = ({ id, label, type = 'text', placeholder, icon: Icon, value, onChange, required }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle" />
        <input
          type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} required={required}
          className="input pl-10"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 w-full h-full">
      <div className="w-full max-w-[460px] space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-1">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text tracking-tight font-display">Crea tu cuenta</h1>
            <p className="text-muted text-sm mt-1">Únete a la plataforma</p>
          </div>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-error-light/60 border border-error/30 text-error text-sm">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField id="nombre" label="Nombre completo" icon={User} placeholder="Camila Rodríguez"
              value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />

            <InputField id="email" label="Email" type="email" icon={Mail} placeholder="tu@email.com"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

            <InputField id="password" label="Contraseña" type="password" icon={Lock} placeholder="Mínimo 8 caracteres"
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

            <div className="space-y-2">
              <label className="label">Tipo de cuenta</label>
              <div className="grid grid-cols-3 gap-2">
                {ROL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, rol: opt.value })}
                    className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg border text-center transition-all duration-200 ${
                      formData.rol === opt.value
                        ? 'bg-primary-light border-primary text-primary'
                        : 'bg-surface border-subtle text-muted hover:border-muted hover:text-text'
                    }`}
                  >
                    <span className="text-sm font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted pl-1">{selectedRol?.desc}</p>
            </div>

            <InputField id="phone" label="Teléfono (opcional)" type="tel" icon={Phone} placeholder="+57 300 000 0000"
              value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 bg-primary hover:bg-primary-hover mt-2"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-text hover:text-primary transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
