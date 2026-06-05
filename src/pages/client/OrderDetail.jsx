import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../../services/api/orders';
import Loader from '../../components/shared/Loader.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Button from '../../components/shared/Button.jsx';
import { ArrowLeft, MapPin, Phone, Clock, Package } from 'lucide-react';

const ClientOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id).then(res => setOrder(res.order)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-center py-20"><Loader size="lg" /></div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={32} className="text-subtle" />
        </div>
        <p className="text-muted font-medium mb-2">Pedido no encontrado</p>
        <Link to="/orders"><Button variant="primary">Volver a mis pedidos</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/orders" className="p-2 rounded-lg text-muted hover:text-text hover:bg-secondary-light transition">
            <ArrowLeft size={20} strokeWidth={1.75} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text tracking-tight">Pedido #{order.id.slice(0, 8)}</h1>
            <p className="text-sm text-muted mt-1">
              {new Date(order.created_at).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-surface border border-subtle rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-text">Estado del pedido</h2>
                <span className="text-xs text-muted font-mono">#{order.id.slice(0, 8)}</span>
              </div>
              <div className="flex items-center justify-between">
                <StatusBadge status={order.estado} showIcon />
              </div>
            </div>

            <div className="bg-surface border border-subtle rounded-xl p-5">
              <h2 className="text-base font-semibold text-text mb-4">Items del pedido</h2>
              <div className="space-y-3">
                {(order.orderItems || []).map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2.5 border-b border-subtle last:border-b-0">
                    <div>
                      <p className="font-medium text-text">{item.product?.nombre || 'Producto'}</p>
                      <p className="text-xs text-muted">Cantidad: {item.cantidad}</p>
                    </div>
                    <p className="font-semibold text-text">${(item.precio_unitario * item.cantidad)?.toLocaleString('es-CO')}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-subtle mt-4 pt-4 flex justify-between items-center">
                <span className="font-medium text-muted">Total</span>
                <span className="text-lg font-bold text-primary">${order.total?.toLocaleString('es-CO')}</span>
              </div>
            </div>

            {order.delivery && (
              <div className="bg-surface border border-subtle rounded-xl p-5">
                <h2 className="text-base font-semibold text-text mb-4">Información de entrega</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <span>{order.direccion_entrega}</span>
                  </div>
                  {order.delivery.repartidor && (
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <Phone size={16} className="text-primary shrink-0" />
                      <span>{order.delivery.repartidor.phone || order.delivery.repartidor.nombre}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-surface border border-subtle rounded-xl p-5">
              <h2 className="text-base font-semibold text-text mb-4">Negocio</h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold font-display">{order.business?.nombre?.charAt(0) || 'N'}</span>
                </div>
                <div>
                  <p className="font-semibold text-text">{order.business?.nombre}</p>
                  <p className="text-xs text-muted">Negocio</p>
                </div>
              </div>
              {order.business?.user?.phone && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Phone size={14} className="shrink-0" />
                  {order.business.user.phone}
                </div>
              )}
            </div>

            <div className="bg-surface border border-subtle rounded-xl p-5">
              <h2 className="text-base font-semibold text-text mb-4">Seguimiento</h2>
              <div className="space-y-4">
                {['PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'].map((status) => {
                  const orderStatuses = ['PENDING', 'ACCEPTED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
                  const currentIdx = orderStatuses.indexOf(order.estado);
                  const idx = ['PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'].indexOf(status);
                  const isCompleted = currentIdx >= 4 ? idx <= 3 : idx < currentIdx;
                  return (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isCompleted ? 'bg-primary' : 'bg-subtle'}`} />
                      <span className={`text-sm ${isCompleted ? 'text-text' : 'text-muted'}`}>
                        {status === 'PENDING' ? 'Pedido creado' : status === 'ASSIGNED' ? 'Repartidor asignado' : status === 'IN_TRANSIT' ? 'En camino' : 'Entregado'}
                      </span>
                      {isCompleted && <Clock size={12} className="text-muted ml-auto" />}
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
