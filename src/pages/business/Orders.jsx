import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';
import { getBusinessOrders } from '../../services/api/orders';

const BusinessOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBusinessOrders().then(res => setOrders(res.orders || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Pedidos Recibidos</h1>
        {loading ? <p>Cargando...</p> : orders.length === 0 ? <p>No hay pedidos</p> : (
          orders.map(order => (
            <div key={order.id} className="p-4 border rounded mb-2">
              <p>Cliente: {order.client?.nombre}</p>
              <p>Estado: {order.estado}</p>
              <p>Total: ${order.total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusinessOrders;