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
            <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Dashboard</h1>
            <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Métricas generales de la plataforma</p>
          </div>
          <button onClick={refetchStats} className="p-2 rounded-lg transition" style={{ color: '#A0A0A0' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <RefreshCw size={18} />
          </button>
        </div>

        {statsLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#FF4D00' }}></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="rounded-2xl p-4 transition-all duration-300 group" style={{
                background: '#161616',
                border: '1px solid rgba(255,255,255,0.08)'
              }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}>
                <stat.icon size={22} className={`mb-3 group-hover:scale-110 transition-transform`} style={{ color: stat.color === 'primary' ? '#FF4D00' : '#FFB800' }} />
                <p className="text-2xl font-bold font-display" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>{stat.value}</p>
                <p className="text-sm mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl p-4" style={{
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <h2 className="text-lg font-semibold font-display mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Pedidos Recientes</h2>
            {ordersLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: '#1F1F1F' }} />)}</div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-b-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <p className="font-medium" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>#{order.id.slice(0, 8)}</p>
                      <p className="text-xs" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{order.client?.nombre} → {order.business?.nombre}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>${(order.total || 0).toLocaleString('es-CO')}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full`} style={{
                        background: order.estado === 'IN_TRANSIT' ? 'rgba(6,182,212,0.1)' : order.estado === 'DELIVERED' ? 'rgba(34,197,94,0.1)' : 'rgba(255,184,0,0.1)',
                        color: order.estado === 'IN_TRANSIT' ? '#06B6D4' : order.estado === 'DELIVERED' ? '#4ADE80' : '#FBBF24',
                        fontFamily: 'DM Sans, sans-serif'
                      }}>{order.estado}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl p-4" style={{
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <h2 className="text-lg font-semibold font-display mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Top Negocios</h2>
            {ordersLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: '#1F1F1F' }} />)}</div>
            ) : recentOrders.length === 0 ? (
              <p className="text-sm" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>No hay pedidos recientes</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.filter(o => o.business).slice(0, 3).map((order, idx) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-b-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,77,0,0.08)' }}>
                        <Building2 size={18} style={{ color: '#FF4D00' }} />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>{order.business?.nombre}</p>
                        <p className="text-xs" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{order.business?.user?.nombre}</p>
                      </div>
                    </div>
                    <p className="font-semibold" style={{ color: '#FFB800', fontFamily: 'Syne, sans-serif' }}>${(order.total || 0).toLocaleString('es-CO')}</p>
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