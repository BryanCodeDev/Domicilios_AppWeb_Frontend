import React from 'react';
import Button from '../../components/shared/Button.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { Bike, DollarSign, Clock, ChevronRight } from 'lucide-react';

const RiderDashboard = () => {
  const stats = {
    entregasHoy: 12,
    gananciasHoy: 145000,
    calificacion: 4.8,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text tracking-tight">Dashboard</h1>
            <p className="text-muted text-sm mt-1">Bienvenido, repartidor</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted bg-surface border border-subtle px-3 py-1.5 rounded-full">
            <Clock size={14} />
            {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">Entregas hoy</p>
                <p className="text-3xl font-bold text-text font-display">{stats.entregasHoy}</p>
              </div>
              <div className="w-11 h-11 bg-primary-light rounded-lg flex items-center justify-center">
                <Bike size={22} className="text-primary" strokeWidth={1.75} />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">Ganancias hoy</p>
                <p className="text-3xl font-bold text-text font-display">${stats.gananciasHoy.toLocaleString('es-CO')}</p>
              </div>
              <div className="w-11 h-11 bg-success-light rounded-lg flex items-center justify-center">
                <DollarSign size={22} className="text-success" strokeWidth={1.75} />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">Calificación</p>
                <div className="flex items-center gap-1">
                  <p className="text-3xl font-bold text-text font-display">{stats.calificacion}</p>
                  <span className="text-warning text-lg">★</span>
                </div>
              </div>
              <div className="w-11 h-11 bg-warning-light rounded-lg flex items-center justify-center">
                <span className="text-lg">⭐</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-light border border-primary/15 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">¿Listo para cortar?</h3>
              <p className="text-sm text-muted">Comienza a recibir pedidos disponibles</p>
            </div>
            <Button variant="primary" size="lg">Ir a pedidos activos</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
