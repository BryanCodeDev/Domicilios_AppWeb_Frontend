import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBusinesses } from '../../services/api/businesses';
import Navbar from '../../components/shared/Navbar.jsx';

const categories = [
  'Comida rápida',
  'Italiana',
  'Japonesa',
  'Colombiana',
  'Postres',
  'Cafetería',
  'Saludable'
];

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, [selectedCategory]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await getBusinesses(selectedCategory || undefined);
      setBusinesses(response.businesses || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="relative h-64 bg-gradient-to-r from-primary to-secondary mb-6">
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            ¡Pide lo que quieras!<br />
            <span className="text-lg font-normal">Entregamos en minutos</span>
          </h1>
        </div>
      </div>

      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-dark">Categorías</h2>
        <div className="flex overflow-x-auto gap-3 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-xl font-bold mb-4 text-dark">Negocios cercanos</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map(business => (
              <Link
                key={business.id}
                to={`/business/${business.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-40 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {business.nombre.charAt(0)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-dark">{business.nombre}</h3>
                  <p className="text-sm text-primary font-medium">{business.categoria}</p>
                  <p className="text-sm text-gray-500 mt-1">{business.direccion}</p>
                  {business.horario && (
                    <p className="text-xs text-gray-400 mt-2">🕒 {business.horario}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;