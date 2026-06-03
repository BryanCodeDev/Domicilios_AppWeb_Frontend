import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';
import { useAuthStore } from '../../store/authStore';
import { getMyOrders } from '../../services/api/orders';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders().then(res => setOrders(res.orders || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
        {loading ? <p>Cargando...</p> : orders.length === 0 ? (
          <p>No tienes pedidos</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="p-4 border rounded mb-2 cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
              <p className="font-semibold">Pedido #{order.id.slice(0, 8)}</p>
              <p>Estado: {order.estado}</p>
              <p>Total: ${order.total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;