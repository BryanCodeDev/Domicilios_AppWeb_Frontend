import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBusinesses: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Fetch admin stats
  }, []);

  const statCards = [
    { label: 'Usuarios', value: stats.totalUsers, icon: '👥', color: 'primary' },
    { label: 'Negocios', value: stats.totalBusinesses, icon: '🏪', color: 'secondary' },
    { label: 'Pedidos', value: stats.totalOrders, icon: '📦', color: 'accent' },
    { label: 'Ingresos', value: `$${stats.totalRevenue?.toLocaleString('es-CO')}`, icon: '💰', color: 'primary' }
  ];

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-dark">Dashboard Administrador</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{card.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-dark">{card.value}</p>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-4">Pedidos Activos en Tiempo Real</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Mapa de monitoreo de pedidos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;