import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const AdminReports = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Reportes</h1>
        <p>Exportar estadísticas de la plataforma</p>
      </div>
    </div>
  );
};

export default AdminReports;