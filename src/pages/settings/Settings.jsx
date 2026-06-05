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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text tracking-tight">Configuración</h1>
          <p className="text-muted text-sm mt-1">Personaliza tu experiencia</p>
        </div>

        <div className="bg-surface border border-subtle rounded-xl divide-y divide-subtle">
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                <Bell size={18} className="text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-medium text-text">Notificaciones push</p>
                <p className="text-sm text-muted">Recibe alertas en tu dispositivo</p>
              </div>
            </div>
            <ToggleSwitch checked={settings.pushNotifications} onChange={() => handleToggle('pushNotifications')} />
          </div>

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                <Bell size={18} className="text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-medium text-text">Notificaciones email</p>
                <p className="text-sm text-muted">Recibe actualizaciones por correo</p>
              </div>
            </div>
            <ToggleSwitch checked={settings.emailNotifications} onChange={() => handleToggle('emailNotifications')} />
          </div>

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                <Moon size={18} className="text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-medium text-text">Modo oscuro</p>
                <p className="text-sm text-muted">Tema oscuro para la aplicación</p>
              </div>
            </div>
            <ToggleSwitch checked={isDark} onChange={toggle} />
          </div>

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                <Ruler size={18} className="text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-medium text-text">Unidad de medida</p>
                <p className="text-sm text-muted">Kilómetros o millas</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-secondary-light rounded-lg p-1">
              <button
                onClick={() => handleUnitChange('km')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  settings.unit === 'km' ? 'bg-primary text-white' : 'text-muted hover:text-text'
                }`}
              >
                km
              </button>
              <button
                onClick={() => handleUnitChange('mi')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  settings.unit === 'mi' ? 'bg-primary text-white' : 'text-muted hover:text-text'
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

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
      checked ? 'bg-primary' : 'bg-secondary-light'
    }`}
  >
    <span
      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
        checked ? 'translate-x-5.5' : 'translate-x-1'
      }`}
      style={{ left: '2px' }}
    />
  </button>
);

export default Settings;
