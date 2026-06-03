import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const AdminBusinesses = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Gestión de Negocios</h1>
        <p>Lista y administración de negocios</p>
      </div>
    </div>
  );
};

export default AdminBusinesses;