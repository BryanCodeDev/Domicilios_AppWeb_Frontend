import React from 'react';
import { useQuery } from '../../hooks/useQuery';
import Button from '../../components/shared/Button.jsx';
import { Users as UsersIcon, Building2, ShoppingBag, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import { getDashboardStats, getAllOrders } from '../../services/api/admin';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard = () => {
  const { data: statsData, loading: statsLoading, refetch: refetchStats } = useQuery(
    () => getDashboardStats().then(res => res.stats),
    []
  );
  const { data: ordersData, loading: ordersLoading } = useQuery(
    () => getAllOrders().then(res => res.orders),
    []
  );

  const stats = statsData ? [
    { label: 'Usuarios', value: String(statsData.totalUsers || 0), icon: UsersIcon, color: 'primary' },
    { label: 'Negocios', value: String(statsData.totalBusinesses || 0), icon: Building2, color: 'secondary' },
    { label: 'Pedidos', value: String(statsData.totalOrders || 0), icon: ShoppingBag, color: 'primary' },
    { label: 'Ingresos', value: `$${(statsData.totalRevenue || 0).toLocaleString('es-CO')}`, icon: DollarSign, color: 'secondary' },
  ] : [];

  const recentOrders = ordersData ? ordersData.slice(0, 5) : [];

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Dashboard</h1>
            <p className="text-brand-muted mt-1">Métricas generales de la plataforma</p>
          </div>
          <button onClick={refetchStats} className="p-2 rounded-lg hover:bg-brand-surface transition text-brand-muted">
            <RefreshCw size={18} />
          </button>
        </div>

        {statsLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="card hover:border-brand-primary/40 transition-all duration-300 group">
                <stat.icon size={22} className={`text-brand-${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                <p className="text-2xl font-bold font-display text-brand-text">{stat.value}</p>
                <p className="text-sm text-brand-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold font-display mb-4">Pedidos Recientes</h2>
            {ordersLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 bg-brand-elevated rounded animate-pulse" />)}</div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-brand-subtle last:border-b-0">
                    <div>
                      <p className="font-medium text-brand-text">#{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-brand-muted">{order.client?.nombre} → {order.business?.nombre}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-brand-text">${(order.total || 0).toLocaleString('es-CO')}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.estado === 'IN_TRANSIT' ? 'bg-cyan-500/10 text-cyan-500' : order.estado === 'DELIVERED' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{order.estado}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold font-display mb-4">Top Negocios</h2>
            {ordersLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 bg-brand-elevated rounded animate-pulse" />)}</div>
            ) : recentOrders.length === 0 ? (
              <p className="text-brand-muted text-sm">No hay pedidos recientes</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.filter(o => o.business).slice(0, 3).map((order, idx) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-brand-subtle last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 size={18} className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-text">{order.business?.nombre}</p>
                        <p className="text-xs text-brand-muted">{order.business?.user?.nombre}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-brand-secondary">${(order.total || 0).toLocaleString('es-CO')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
