import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';

const Tracking = () => {
  const { orderId } = useParams();
  const [riderLocation, setRiderLocation] = useState(null);

  useEffect(() => {
    // Socket connection for real-time tracking
  }, [orderId]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Rastreo del Pedido</h1>
        <p>Pedido: {orderId}</p>
        <div className="mt-4 h-96 bg-gray-200 rounded">
          Mapa del repartidor aquí
        </div>
      </div>
    </div>
  );
};

export default Tracking;