import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessById } from '../../services/api/businesses';
import { getProductsByBusiness } from '../../services/api/products';
import Navbar from '../../components/shared/Navbar.jsx';

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBusinessById(id), getProductsByBusiness(id)]).then(([biz, prods]) => {
      setBusiness(biz.business);
      setProducts(prods.products || []);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </div>
  );

  if (!business) return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <p className="p-4 text-center">Negocio no encontrado</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="relative h-48 bg-gradient-to-r from-primary to-secondary mb-4">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <h1 className="text-3xl font-bold text-white">{business.nombre}</h1>
        </div>
      </div>

      <div className="px-4">
        <p className="text-secondary font-medium mb-2">{business.categoria}</p>
        <p className="text-gray-600 mb-4">{business.descripcion}</p>
        
        <h2 className="text-xl font-bold mb-4 text-dark">Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-lg">{product.nombre}</h3>
              <p className="text-sm text-gray-500">{product.descripcion}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-primary">${product.precio.toLocaleString('es-CO')}</span>
                <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark text-sm">
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;