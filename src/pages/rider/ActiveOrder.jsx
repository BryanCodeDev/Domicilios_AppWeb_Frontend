import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const ActiveOrder = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Pedido Activo</h1>
        <p>Gestión del pedido actual</p>
      </div>
    </div>
  );
};

export default ActiveOrder;