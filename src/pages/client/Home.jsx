import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBusinesses } from '../../services/api/businesses';
import Navbar from '../../components/shared/Navbar.jsx';

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, [categoria]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await getBusinesses(categoria || undefined);
      setBusinesses(response.businesses || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Negocios</h1>
        <input
          type="text"
          placeholder="Filtrar por categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="p-2 border rounded mb-4 w-full"
        />
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map(business => (
              <Link
                key={business.id}
                to={`/business/${business.id}`}
                className="block p-4 border rounded hover:shadow-lg"
              >
                <h3 className="font-bold text-lg">{business.nombre}</h3>
                <p className="text-gray-600">{business.categoria}</p>
                <p className="text-sm text-gray-500">{business.direccion}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;