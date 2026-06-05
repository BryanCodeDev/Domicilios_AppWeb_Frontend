import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import { getMyOrders } from '../../services/api/orders';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { ClipboardList } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.orders || []))
      .catch(err => console.error('Error fetching orders:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text tracking-tight">Mis Pedidos</h1>
        <p className="text-muted mt-1 text-sm">Historial de todos tus pedidos</p>
      </div>

      {/* Condicional de Carga / Lista de Pedidos */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size="lg" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-surface border border-subtle rounded-xl">
          <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList size={28} className="text-subtle" />
          </div>
          <p className="text-text font-medium mb-1">No tienes pedidos aún</p>
          <p className="text-sm text-muted mb-4">Explora negocios y realiza tu primer pedido</p>
          <Link to="/">
            <Button variant="primary">Ver negocios</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, idx) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-sm animate-in"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                    {/* Añadido safe-navigation operator por si order.id tarda en resolver */}
                    <span className="font-mono text-xs text-muted">#{order.id?.slice(0, 6)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-text">{order.business?.nombre || 'Negocio'}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('es-CO', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <StatusBadge status={order.estado} showIcon={false} />
                  <span className="font-bold font-display text-text">
                    ${order.total?.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;