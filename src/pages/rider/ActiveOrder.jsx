import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const statusSteps = [
  { id: 'ASSIGNED', label: 'Asignado', icon: '📋' },
  { id: 'PICKED_UP', label: 'Recogido', icon: '🏪' },
  { id: 'IN_TRANSIT', label: 'En camino', icon: '🚴' },
  { id: 'DELIVERED', label: 'Entregado', icon: '✅' }
];

const ActiveOrder = () => {
  const [delivery, setDelivery] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(2);

  useEffect(() => {
    // Fetch active delivery
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-dark">Pedido Activo</h1>
        
        {delivery ? (
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <p className="font-semibold mb-2">Cliente: {delivery.client?.nombre}</p>
            <p className="text-gray-600 mb-2">{delivery.client?.phone}</p>
            <p className="text-gray-600 mb-4">{delivery.direccion_entrega}</p>
            
            <div className="mb-4">
              <p className="font-semibold mb-2">Progreso del pedido</p>
              <div className="flex justify-between">
                {statusSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStatus ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.icon}
                    </div>
                    <span className="text-xs mt-1">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-48 bg-gray-200 rounded mb-4">
              <p className="text-center py-16 text-gray-500">Mapa del repartidor</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="bg-primary text-white py-2 rounded hover:bg-primaryDark">
                Llamar cliente
              </button>
              <button className="bg-secondary text-white py-2 rounded hover:bg-secondaryDark">
                Chat
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">No tienes pedidos activos</p>
            <Link to="/rider" className="text-primary font-semibold hover:underline">
              Volver al dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveOrder;