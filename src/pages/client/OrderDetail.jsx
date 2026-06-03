import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Detalle del Pedido</h1>
        <p>ID: {id}</p>
      </div>
    </div>
  );
};

export default OrderDetail;