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
    getMyOrders().then(res => setOrders(res.orders || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-display text-brand-text mb-2">Mis Pedidos</h1>
        <p className="text-brand-muted mb-8">Historial de todos tus pedidos</p>

        {loading ? (
          <div className="flex justify-center py-20"><Loader size="lg" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 card">
            <div className="w-16 h-16 bg-brand-elevated rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={28} className="text-brand-subtle" />
            </div>
            <p className="text-brand-muted font-medium mb-1">No tienes pedidos aún</p>
            <Link to="/"><Button variant="primary" className="mt-4">Ver negocios</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <Link key={order.id} to={`/orders/${order.id}`}
                className="card block transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-elevated rounded-xl flex items-center justify-center shrink-0">
                      <span className="font-mono text-xs text-brand-muted">#{order.id.slice(0, 6)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-text mb-1">{order.business?.nombre || 'Negocio'}</p>
                      <p className="text-sm text-brand-muted">
                        {new Date(order.created_at).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <StatusBadge status={order.estado} showIcon={false} />
                    <span className="font-bold font-display text-brand-text">${order.total?.toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
