import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { getBusinessById } from '../../services/api/businesses';
import { getProductsByBusiness } from '../../services/api/products';
import { useCartStore } from '../../store/cartStore';
import Button from '../../components/shared/Button.jsx';
import Loader from '../../components/shared/Loader.jsx';
import BusinessMap from '../../components/maps/BusinessMap.jsx';
import { Star, Clock, MapPin, ShoppingCart, Plus, ChevronLeft } from 'lucide-react';

const ClientBusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const items = useCartStore(state => state.items);
  const businessId = useCartStore(state => state.businessId);

  // No longer needed with Leaflet({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '' });

  useEffect(() => {
    Promise.all([getBusinessById(id), getProductsByBusiness(id)])
      .then(([biz, prods]) => {
        setBusiness(biz.business);
        setProducts(prods.products || []);
      })
      .catch(err => console.error('Error fetching business detail:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const cartCount = items.length;

  if (loading) return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center min-h-screen'>
      <Loader size='lg' />
    </div>
  );

  if (!business) return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center'>
      <p className='text-muted'>Negocio no encontrado</p>
      <Link to='/' className='block mt-4'>
        <Button variant='primary'>Volver al inicio</Button>
      </Link>
    </div>
  );

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='relative h-40 sm:h-48 bg-primary rounded-xl overflow-hidden'>
        <div className='absolute inset-0 flex items-end p-5 sm:p-8 bg-gradient-to-t from-black/40 to-transparent'>
          <div>
            <Link to='/' className='inline-flex items-center gap-1 text-white/80 hover:text-white mb-2 text-sm transition-colors' aria-label='Volver al inicio'>
              <ChevronLeft size={14} /> Volver
            </Link>
            <h1 className='text-2xl sm:text-3xl font-bold text-white tracking-tight'>{business.nombre}</h1>
            <span className='inline-block text-sm font-medium text-white/90 bg-white/20 px-2.5 py-1 rounded-full mt-2 backdrop-blur-sm'>
              {business.categoria}
            </span>
          </div>
        </div>
      </div>

      {cartCount > 0 && (
        <div className='fixed bottom-6 right-6 z-40'>
          <Button
            variant='primary'
            onClick={() => navigate('/checkout/' + (businessId || id))}
            className='rounded-full px-5 shadow-lg'
            aria-label={'Ver carrito (' + cartCount + ' productos)'}
          >
            <ShoppingCart size={18} /> {cartCount}
          </Button>
        </div>
      )}

      <div className='pt-8'>
        <p className='text-muted mb-8'>{business.descripcion}</p>

        {(business.lat || business.lng) && (
          <div className='mb-6'>
            <BusinessMap lat={business.lat} lng={business.lng} nombre={business.nombre} direccion={business.direccion} />
          </div>
        )}

        <h2 className='text-xl font-semibold text-text tracking-tight mb-6'>Menu</h2>

        {products.length === 0 ? (
          <div className='text-center py-16 bg-surface border border-subtle rounded-xl'>
            <div className='w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4'>
              <ShoppingCart size={28} className='text-subtle' />
            </div>
            <p className='text-muted'>No hay productos disponibles</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {products.map(product => (
              <div key={product.id} className='bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30'>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-base text-text'>{product.nombre}</h3>
                    <p className='text-sm text-muted mt-1'>{product.descripcion}</p>
                    <p className='text-lg font-bold text-primary mt-2'>
                      {"$" + (product.precio || 0).toLocaleString('es-CO')}
                    </p>
                  </div>
                  <Button
                    variant='primary'
                    size='sm'
                    icon={Plus}
                    onClick={() => handleAddToCart(product)}
                    aria-label={'Agregar ' + product.nombre + ' al carrito'}
                  >
                    Agregar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientBusinessDetail;

