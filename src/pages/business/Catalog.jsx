import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';

const BusinessCatalog = () => {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-dark">Mi Catálogo</h1>
          <Link
            to="/business/products/new"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryDark"
          >
            + Nuevo Producto
          </Link>
        </div>

        <div className="space-y-4">
          {/* Sample product card */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Producto 1</h3>
                <p className="text-gray-500 text-sm">Descripción del producto</p>
                <p className="font-bold text-primary mt-1">$25.000</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                Disponible
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <Link
                to="/business/products/1/edit"
                className="px-3 py-1 bg-secondary text-white rounded text-sm hover:bg-secondaryDark"
              >
                Editar
              </Link>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                Desactivar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCatalog;