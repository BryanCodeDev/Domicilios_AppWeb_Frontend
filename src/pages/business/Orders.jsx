import React, { useEffect, useState } from 'react';
import Button from '../../components/shared/Button.jsx';
import { getBusinessOrders } from '../../services/api/orders';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { ChevronRight, MapPin, Phone, Package } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBusinessOrders().then(res => {
      setOrders(res.orders || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Pedidos Recibidos</h1>
            <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Gestiona los pedidos de tu negocio</p>
          </div>
          <span className="text-sm rounded-full px-3 py-1" style={{
            color: '#A0A0A0',
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'DM Sans, sans-serif'
          }}>
            {orders.length} pedidos
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 rounded-2xl p-4" style={{
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#1F1F1F' }}>
              <Package size={28} style={{ color: '#5A5A5A' }} />
            </div>
            <p className="font-medium" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>No hay pedidos pendientes</p>
            <p className="text-sm mt-1" style={{ color: '#5A5A5A', fontFamily: 'DM Sans, sans-serif' }}>Los nuevos pedidos aparecerán aquí</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div
                key={order.id}
                className="rounded-2xl p-4 transition-all duration-300 animate-fade-in"
                style={{
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animationDelay: `${idx * 50}ms`
                }}
                onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'}
                onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#1F1F1F' }}>
                      <Package size={22} style={{ color: '#FF4D00' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>{order.client?.nombre || 'Cliente'}</h3>
                        <StatusBadge status={order.estado} />
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>
                        {order.client?.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} />
                            {order.client.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {order.direccion_entrega}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className="text-lg font-bold font-display" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>
                      ${order.total?.toLocaleString('es-CO')}
                    </span>
                    <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                      color: '#A0A0A0',
                      background: 'transparent',
                      fontFamily: 'DM Sans, sans-serif'
                    }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      Detalle <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;