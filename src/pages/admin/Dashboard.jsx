import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';
import Button from '../../components/shared/Button.jsx';
import { Users, Building2, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Usuarios', value: '247', icon: Users, color: 'primary' },
    { label: 'Negocios', value: '18', icon: Building2, color: 'secondary' },
    { label: 'Pedidos', value: '1.234', icon: ShoppingBag, color: 'primary' },
    { label: 'Ingresos', value: '$45.2M', icon: DollarSign, color: 'secondary' },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display">Dashboard</h1>
          <p className="text-brand-muted mt-1">Métricas generales de la plataforma</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="card hover:border-brand-primary/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <stat.icon size={22} className={`text-brand-${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
              <p className="text-2xl font-bold font-display text-brand-text">{stat.value}</p>
              <p className="text-sm text-brand-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold font-display mb-4">Pedidos Recientes</h2>
            <div className="space-y-3">
              {[
                { id: 'ORD-001', cliente: 'Camila Torres', negocio: 'El Fogón', total: '$51.000', estado: 'DELIVERED' },
                { id: 'ORD-002', cliente: 'Sebastián Mora', negocio: 'Pizza Express', total: '$70.000', estado: 'DELIVERED' },
                { id: 'ORD-003', cliente: 'Camila Torres', negocio: 'Sushi Nakama', total: '$68.000', estado: 'IN_TRANSIT' },
              ].map(order => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-brand-subtle last:border-b-0">
                  <div>
                    <p className="font-medium text-brand-text">{order.id}</p>
                    <p className="text-xs text-brand-muted">{order.cliente} → {order.negocio}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-brand-text">{order.total}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.estado === 'IN_TRANSIT' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-green-500/10 text-green-400'}`}>
                      {order.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold font-display mb-4">Top Negocios</h2>
            <div className="space-y-3">
              {[
                { nombre: 'El Fogón Casero', ventas: '$1.2M', pedidos: 342 },
                { nombre: 'Pizza Express', ventas: '$980K', pedidos: 289 },
                { nombre: 'Sushi Nakama', ventas: '$750K', pedidos: 198 },
              ].map((negocio, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-brand-subtle last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 size={18} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-text">{negocio.nombre}</p>
                      <p className="text-xs text-brand-muted">{negocio.pedidos} pedidos</p>
                    </div>
                  </div>
                  <p className="font-semibold text-brand-secondary">{negocio.ventas}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
