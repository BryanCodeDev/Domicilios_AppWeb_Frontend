import React from 'react';
import Button from '../../components/shared/Button.jsx';
import { TrendingUp, DollarSign, ShoppingBag, Clock } from 'lucide-react';

const BusinessStats = () => {
  const stats = [
    { label: 'Ventas hoy', value: '$245.000', icon: TrendingUp },
    { label: 'Pedidos hoy', value: '18', icon: ShoppingBag },
    { label: 'Ingresos mes', value: '$1.850.000', icon: DollarSign },
    { label: 'Tiempo promedio', value: '32 min', icon: Clock },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text tracking-tight">Estadísticas</h1>
        <p className="text-muted text-sm mt-1">Ventas y ganancias del negocio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200">
            <stat.icon size={20} className="text-primary mb-3" strokeWidth={1.75} />
            <p className="text-2xl font-bold text-text font-display">{stat.value}</p>
            <p className="text-sm text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-subtle rounded-xl p-5">
        <h2 className="text-base font-semibold text-text mb-5">Rendimiento semanal</h2>
        <div className="bg-secondary-light rounded-lg h-64 flex items-center justify-center">
          <p className="text-subtle text-sm">Gráfico de ventas</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessStats;
