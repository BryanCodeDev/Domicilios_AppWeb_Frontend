import React from 'react';
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Estadísticas</h1>
          <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Ventas y ganancias del negocio</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="rounded-2xl p-4 transition-all duration-300 group" style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}>
              <stat.icon size={22} className="mb-3 group-hover:scale-110 transition-transform" style={{ color: stat.color === 'primary' ? '#FF4D00' : '#FFB800' }} />
              <p className="text-2xl font-bold font-display" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-4" style={{
          background: '#161616',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <h2 className="text-lg font-semibold font-display mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Rendimiento semanal</h2>
          <div className="h-64 rounded-lg flex items-center justify-center" style={{ background: '#1F1F1F' }}>
            <p className="text-sm" style={{ color: '#5A5A5A', fontFamily: 'DM Sans, sans-serif' }}>Gráfico de ventas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessStats;