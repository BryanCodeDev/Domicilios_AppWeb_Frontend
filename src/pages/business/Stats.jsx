import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';
import Button from '../../components/shared/Button.jsx';
import { TrendingUp, DollarSign, ShoppingBag, Clock } from 'lucide-react';

const BusinessStats = () => {
  const stats = [
    { label: 'Ventas hoy', value: '$245.000', icon: TrendingUp, color: 'primary' },
    { label: 'Pedidos hoy', value: '18', icon: ShoppingBag, color: 'secondary' },
    { label: 'Ingresos mes', value: '$1.850.000', icon: DollarSign, color: 'primary' },
    { label: 'Tiempo promedio', value: '32 min', icon: Clock, color: 'secondary' },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display">Estadísticas</h1>
          <p className="text-brand-muted mt-1">Ventas y ganancias del negocio</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="card hover:border-brand-primary/40 transition-all duration-300 group">
              <stat.icon size={22} className={`text-brand-${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
              <p className="text-2xl font-bold font-display text-brand-text">{stat.value}</p>
              <p className="text-sm text-brand-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold font-display mb-4">Rendimiento semanal</h2>
          <div className="h-64 bg-brand-elevated rounded-lg flex items-center justify-center">
            <p className="text-brand-subtle">Gráfico de ventas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessStats;
