import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';
import { getMyOrders } from '../../services/api/orders';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-blue-100 text-blue-800',
  ASSIGNED: 'bg-purple-100 text-purple-800',
  PICKED_UP: 'bg-orange-100 text-orange-800',
  IN_TRANSIT: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800'
};

const statusLabels = {
  PENDING: 'Pendiente',
  ACCEPTED: 'Aceptado',
  ASSIGNED: 'Asignado',
  PICKED_UP: 'Recogido',
  IN_TRANSIT: 'En camino',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado'
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(res => setOrders(res.orders || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-dark">Mis Pedidos</h1>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No tienes pedidos aún</p>
            <Link to="/" className="text-primary font-semibold hover:underline">
              Ver negocios
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-500">{statusLabels[order.estado]}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[order.estado]}`}>
                    {statusLabels[order.estado]}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-gray-600">
                    {order.business?.nombre || 'Negocio'}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ${order.total?.toLocaleString('es-CO')}
                  </p>
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