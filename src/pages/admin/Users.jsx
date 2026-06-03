import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const AdminUsers = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <p>Lista y administración de usuarios</p>
      </div>
    </div>
  );
};

export default AdminUsers;