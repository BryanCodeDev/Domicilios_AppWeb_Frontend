import React from 'react';
import { useQuery } from '../../hooks/useQuery';
import { getDashboardStats, getAllOrders } from '../../services/api/admin';
import { Users as UsersIcon, Building2, ShoppingBag, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const { data: statsData, loading: statsLoading } = useQuery(
    () => getDashboardStats().then(res => res.stats),
    []
  );
  const { data: ordersData, loading: ordersLoading } = useQuery(
    () => getAllOrders().then(res => res.orders),
    []
  );

  const stats = statsData ? [
    { label: 'Usuarios', value: String(statsData.totalUsers || 0), icon: UsersIcon },
    { label: 'Negocios', value: String(statsData.totalBusinesses || 0), icon: Building2 },
    { label: 'Pedidos', value: String(statsData.totalOrders || 0), icon: ShoppingBag },
    { label: 'Ingresos', value: `$${(statsData.totalRevenue || 0).toLocaleString('es-CO')}`, icon: DollarSign },
  ] : [];

  const recentOrders = ordersData ? ordersData.slice(0, 5) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-text tracking-tight">Dashboard</h1>
          <p className="text-muted text-sm mt-1">Métricas generales de la plataforma</p>
        </div>

        {statsLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-2 border-subtle border-t-primary"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30">
                <stat.icon size={20} className="text-primary mb-3" strokeWidth={1.75} />
                <p className="text-2xl font-bold text-text font-display">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-subtle rounded-xl p-5">
            <h2 className="text-base font-semibold text-text mb-5">Pedidos Recientes</h2>
            {ordersLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 bg-secondary-light rounded-lg animate-pulse" />)}</div>
            ) : (
              <div className="space-y-0 divide-y divide-subtle">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-text text-sm">#{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted">{order.client?.nombre} → {order.business?.nombre}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text text-sm">${(order.total || 0).toLocaleString('es-CO')}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        order.estado === 'IN_TRANSIT' ? 'bg-info-light text-info' :
                        order.estado === 'DELIVERED' ? 'bg-success-light text-success' :
                        'bg-warning-light text-warning'
                      }`}>{order.estado}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface border border-subtle rounded-xl p-5">
            <h2 className="text-base font-semibold text-text mb-5">Top Negocios</h2>
            {ordersLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 bg-secondary-light rounded-lg animate-pulse" />)}</div>
            ) : recentOrders.length === 0 ? (
              <p className="text-sm text-muted">No hay pedidos recientes</p>
            ) : (
              <div className="space-y-0 divide-y divide-subtle">
                {recentOrders.filter(o => o.business).slice(0, 3).map((order, idx) => (
                  <div key={order.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center">
                        <Building2Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text text-sm">{order.business?.nombre}</p>
                        <p className="text-xs text-muted">{order.business?.user?.nombre}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-text text-sm">${(order.total || 0).toLocaleString('es-CO')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

const Building2Icon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
  </svg>
);

export default AdminDashboard;
