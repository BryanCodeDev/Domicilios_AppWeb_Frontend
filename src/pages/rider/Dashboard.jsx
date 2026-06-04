import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';
import Button from '../../components/shared/Button.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { Bike, MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react';

const RiderDashboard = () => {
  const stats = {
    entregasHoy: 12,
    gananciasHoy: 145000,
    calificacion: 4.8,
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Dashboard</h1>
            <p className="text-brand-muted mt-1">Bienvenido, repartidor</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-muted bg-brand-surface px-3 py-1.5 rounded-full border border-brand-subtle">
            <Clock size={14} />
            {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card group hover:border-brand-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-muted mb-1">Entregas hoy</p>
                <p className="text-3xl font-bold font-display text-brand-text">{stats.entregasHoy}</p>
              </div>
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bike size={24} className="text-brand-primary" />
              </div>
            </div>
          </div>

          <div className="card group hover:border-brand-secondary/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-muted mb-1">Ganancias hoy</p>
                <p className="text-3xl font-bold font-display text-brand-text">${stats.gananciasHoy.toLocaleString('es-CO')}</p>
              </div>
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign size={24} className="text-brand-secondary" />
              </div>
            </div>
          </div>

          <div className="card group hover:border-green-500/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-muted mb-1">Calificación</p>
                <div className="flex items-center gap-1">
                  <p className="text-3xl font-bold font-display text-brand-text">{stats.calificacion}</p>
                  <span className="text-brand-secondary text-lg">★</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold font-display mb-1">¿Listo para cortar?</h3>
              <p className="text-sm text-brand-muted">Comienza a recibir pedidos disponibles</p>
            </div>
            <Button variant="primary" size="lg" icon={ChevronRight}>
              Ir a pedidos activos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
