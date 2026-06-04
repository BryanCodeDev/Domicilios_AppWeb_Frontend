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
            <h1 className="text-3xl font-bold font-display">Pedidos Recibidos</h1>
            <p className="text-brand-muted mt-1">Gestiona los pedidos de tu negocio</p>
          </div>
          <span className="text-sm text-brand-muted bg-brand-surface px-3 py-1 rounded-full border border-brand-subtle">
            {orders.length} pedidos
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 card">
            <div className="w-16 h-16 bg-brand-elevated rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-brand-subtle" />
            </div>
            <p className="text-brand-muted font-medium">No hay pedidos pendientes</p>
            <p className="text-sm text-brand-subtle mt-1">Los nuevos pedidos aparecerán aquí</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div
                key={order.id}
                className="card hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-elevated rounded-xl flex items-center justify-center shrink-0">
                      <Package size={22} className="text-brand-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-brand-text">{order.client?.nombre || 'Cliente'}</h3>
                        <StatusBadge status={order.estado} />
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-muted">
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
                    <span className="text-lg font-bold font-display text-brand-text">
                      ${order.total?.toLocaleString('es-CO')}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Detalle <ChevronRight size={14} />
                    </Button>
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
