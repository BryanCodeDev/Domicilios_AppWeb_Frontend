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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text tracking-tight">Pedidos Recibidos</h1>
          <p className="text-muted text-sm mt-1">Gestiona los pedidos de tu negocio</p>
        </div>
        <span className="text-sm text-muted bg-surface border border-subtle px-3 py-1.5 rounded-full">
          {orders.length} pedidos
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader size="lg" /></div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-surface border border-subtle rounded-xl">
          <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={28} className="text-subtle" />
          </div>
          <p className="text-text font-medium mb-1">No hay pedidos pendientes</p>
          <p className="text-sm text-muted">Los nuevos pedidos aparecerán aquí</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, idx) => (
            <div
              key={order.id}
              className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30 animate-in"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                    <Package size={20} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <h3 className="font-semibold text-text">{order.client?.nombre || 'Cliente'}</h3>
                      <StatusBadge status={order.estado} />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                      {order.client?.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={12} />
                          {order.client.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {order.direccion_entrega}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className="text-lg font-bold text-text font-display">
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
  );
};

export default Orders;
