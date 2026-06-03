import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';

const BusinessCatalog = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <Link to="/business/products/new" className="bg-blue-600 text-white px-4 py-2 rounded">
            Nuevo Producto
          </Link>
        </div>
        <p>Lista de productos</p>
      </div>
    </div>
  );
};

export default BusinessCatalog;