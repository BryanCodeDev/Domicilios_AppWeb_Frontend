import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const BusinessStats = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Estadísticas</h1>
        <p>Ventas y ganancias del negocio</p>
      </div>
    </div>
  );
};

export default BusinessStats;