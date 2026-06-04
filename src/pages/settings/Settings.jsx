import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Bell, Moon, Ruler } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [settings, setSettings] = React.useState({
    pushNotifications: true,
    emailNotifications: false,
    darkMode: true,
    unit: 'km',
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUnitChange = (unit) => {
    setSettings((prev) => ({ ...prev, unit }));
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-text">Configuración</h1>
          <p className="text-brand-muted mt-1">Personaliza tu experiencia</p>
        </div>

        <div className="card space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-brand-subtle">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-brand-primary" />
              <div>
                <p className="font-medium text-brand-text">Notificaciones push</p>
                <p className="text-sm text-brand-muted">Recibe alertas en tu dispositivo</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`relative w-12 h-6 rounded-full transition ${
                settings.pushNotifications ? 'bg-brand-primary' : 'bg-brand-elevated'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-brand-subtle">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-brand-primary" />
              <div>
                <p className="font-medium text-brand-text">Notificaciones email</p>
                <p className="text-sm text-brand-muted">Recibe actualizaciones por correo</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative w-12 h-6 rounded-full transition ${
                settings.emailNotifications ? 'bg-brand-primary' : 'bg-brand-elevated'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-brand-subtle">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-brand-primary" />
              <div>
                <p className="font-medium text-brand-text">Modo oscuro</p>
                <p className="text-sm text-brand-muted">Tema oscuro para la aplicación</p>
              </div>
            </div>
            <button
              onClick={toggle}
              className={`relative w-12 h-6 rounded-full transition ${
                isDark ? 'bg-brand-primary' : 'bg-brand-elevated'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Ruler size={20} className="text-brand-primary" />
              <div>
                <p className="font-medium text-brand-text">Unidad de medida</p>
                <p className="text-sm text-brand-muted">Kilómetros o millas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-brand-elevated rounded-lg p-1">
              <button
                onClick={() => handleUnitChange('km')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  settings.unit === 'km' ? 'bg-brand-primary text-white' : 'text-brand-muted'
                }`}
              >
                km
              </button>
              <button
                onClick={() => handleUnitChange('mi')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  settings.unit === 'mi' ? 'bg-brand-primary text-white' : 'text-brand-muted'
                }`}
              >
                mi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;