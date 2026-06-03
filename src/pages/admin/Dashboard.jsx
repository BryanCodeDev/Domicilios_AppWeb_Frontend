import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p>Métricas globales de la plataforma</p>
      </div>
    </div>
  );
};

export default AdminDashboard;