import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessById } from '../../services/api/businesses';
import { getProductsByBusiness as fetchProducts } from '../../services/api/products';
import Navbar from '../../components/shared/Navbar.jsx';

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBusinessById(id), fetchProducts(id)]).then(([biz, prods]) => {
      setBusiness(biz.business);
      setProducts(prods.products || []);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div><Navbar /><p className="p-4">Cargando...</p></div>;

  if (!business) return <div><Navbar /><p className="p-4">Negocio no encontrado</p></div>;

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">{business.nombre}</h1>
        <p className="text-gray-600">{business.categoria}</p>
        <p className="mb-4">{business.descripcion}</p>
        <h2 className="text-xl font-semibold mb-2">Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="p-3 border rounded">
              <h3 className="font-bold">{product.nombre}</h3>
              <p className="text-sm text-gray-500">{product.descripcion}</p>
              <p className="text-lg font-semibold">${product.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;