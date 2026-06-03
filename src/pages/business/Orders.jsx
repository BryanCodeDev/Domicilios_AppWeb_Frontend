import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar.jsx';
import { getBusinessOrders } from '../../services/api/orders';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-blue-100 text-blue-800',
  ASSIGNED: 'bg-purple-100 text-purple-800'
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBusinessOrders().then(res => setOrders(res.orders || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-dark">Pedidos Recibidos</h1>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No hay pedidos pendientes</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{order.client?.nombre}</p>
                    <p className="text-sm text-gray-500">{order.client?.phone}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[order.estado] || 'bg-gray-100'}`}>
                    {order.estado}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{order.direccion_entrega}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-primary">${order.total?.toLocaleString('es-CO')}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                      Aceptar
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                      Rechazar
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