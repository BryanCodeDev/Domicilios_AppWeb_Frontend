import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const RiderDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard Repartidor</h1>
        <p>Estadísticas y resumen</p>
      </div>
    </div>
  );
};

export default RiderDashboard;