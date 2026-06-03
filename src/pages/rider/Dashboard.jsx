import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';

const RiderDashboard = () => {
  const [stats, setStats] = useState({
    entregasHoy: 0,
    gananciasHoy: 0,
    calificacion: 0
  });

  useEffect(() => {
    // Fetch rider stats
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-dark">Dashboard Repartidor</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-primary">{stats.entregasHoy}</p>
            <p className="text-gray-600">Entregas hoy</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-secondary">${stats.gananciasHoy.toLocaleString('es-CO')}</p>
            <p className="text-gray-600">Ganancias hoy</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.calificacion}</p>
            <p className="text-gray-600">⭐ Calificación</p>
          </div>
        </div>

        <Link
          to="/rider/active"
          className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primaryDark mb-4"
        >
          Ver Pedido Activo
        </Link>
      </div>
    </div>
  );
};

export default RiderDashboard;