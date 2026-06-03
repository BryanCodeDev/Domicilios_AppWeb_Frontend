import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar.jsx';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch businesses
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-dark">Gestión de Negocios</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-2">Negocio Ejemplo</h3>
            <p className="text-gray-600 mb-2">Categoria: Restaurante</p>
            <p className="text-gray-500 text-sm mb-3">Dirección del negocio</p>
            <button className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primaryDark">
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Businesses;