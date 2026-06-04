import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../../services/api/orders';
import Loader from '../../components/shared/Loader.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import { ArrowLeft, MapPin, Phone, Clock, Package } from 'lucide-react';

const ClientOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id).then(res => setOrder(res.order)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-brand-background">
      <div className="flex justify-center py-20"><Loader size="lg" /></div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-brand-elevated rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={32} className="text-brand-subtle" />
        </div>
        <p className="text-brand-muted font-medium mb-2">Pedido no encontrado</p>
        <Link to="/orders"><Button variant="primary">Volver a mis pedidos</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <Link to="/orders" className="p-2 rounded-lg hover:bg-brand-surface transition text-brand-muted hover:text-brand-text">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-display">Pedido #{order.id.slice(0, 8)}</h1>
            <p className="text-brand-muted text-sm mt-1">
              {new Date(order.created_at).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card animate-slide-up" style={{ animationDelay: '50ms' }}>
              <h2 className="text-lg font-semibold font-display mb-4">Estado del pedido</h2>
              <div className="flex items-center justify-between">
                <StatusBadge status={order.estado} showIcon />
                <span className="text-sm text-brand-muted">#{order.id.slice(0, 8)}</span>
              </div>
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-lg font-semibold font-display mb-4">Items del pedido</h2>
              <div className="space-y-3">
                {(order.orderItems || []).map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-brand-subtle last:border-b-0">
                    <div>
                      <p className="font-medium text-brand-text">{item.product?.nombre || 'Producto'}</p>
                      <p className="text-xs text-brand-muted">Cantidad: {item.cantidad}</p>
                    </div>
                    <p className="font-semibold text-brand-text">${(item.precio_unitario * item.cantidad)?.toLocaleString('es-CO')}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-subtle mt-4 pt-4 flex justify-between items-center">
                <span className="font-medium text-brand-muted">Total</span>
                <span className="text-xl font-bold font-display text-brand-primary">${order.total?.toLocaleString('es-CO')}</span>
              </div>
            </div>

            {order.delivery && (
              <div className="card animate-slide-up" style={{ animationDelay: '150ms' }}>
                <h2 className="text-lg font-semibold font-display mb-4">Información de entrega</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-brand-muted">
                    <MapPin size={16} className="text-brand-primary" />
                    <span>{order.direccion_entrega}</span>
                  </div>
                  {order.delivery.repartidor && (
                    <div className="flex items-center gap-3 text-brand-muted">
                      <Phone size={16} className="text-brand-primary" />
                      <span>{order.delivery.repartidor.phone || order.delivery.repartidor.nombre}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-lg font-semibold font-display mb-4">Negocio</h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold font-display text-lg">
                    {order.business?.nombre?.charAt(0) || 'N'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-brand-text">{order.business?.nombre}</p>
                  <p className="text-xs text-brand-muted">Negocio</p>
                </div>
              </div>
              {order.business?.user?.phone && (
                <div className="flex items-center gap-2 text-sm text-brand-muted">
                  <Phone size={14} />
                  {order.business.user.phone}
                </div>
              )}
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: '250ms' }}>
              <h2 className="text-lg font-semibold font-display mb-4">Seguimiento</h2>
              <div className="space-y-4">
                {['PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'].map((status, idx) => {
                  const orderStatuses = ['PENDING', 'ACCEPTED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
                  const currentIdx = orderStatuses.indexOf(order.estado);
                  const isCompleted = idx <= (currentIdx >= 4 ? 3 : idx < currentIdx ? idx : -1);
                  return (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-brand-primary' : 'bg-brand-subtle'}`} />
                      <span className={`text-sm ${isCompleted ? 'text-brand-text' : 'text-brand-muted'}`}>
                        {status === 'PENDING' ? 'Pedido creado' : status === 'ASSIGNED' ? 'Repartidor asignado' : status === 'IN_TRANSIT' ? 'En camino' : 'Entregado'}
                      </span>
                      {isCompleted && <Clock size={12} className="text-brand-muted ml-auto" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderDetail;
