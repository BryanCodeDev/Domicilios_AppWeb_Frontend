import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessById } from '../../services/api/businesses';
import { getProductsByBusiness } from '../../services/api/products';
import Navbar from '../../components/shared/Navbar.jsx';
import Button from '../../components/shared/Button.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { Star, Clock, MapPin, ShoppingCart, Plus, ChevronLeft } from 'lucide-react';

const ClientBusinessDetail = () => {
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
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="flex justify-center py-20"><Loader size="lg" /></div>
    </div>
  );

  if (!business) return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-brand-muted">Negocio no encontrado</p>
        <Link to="/"><Button variant="primary" className="mt-4">Volver al inicio</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />

      <div className="relative h-48 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="absolute inset-0 bg-black/30 flex items-end p-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-2 text-sm transition-colors">
              <ChevronLeft size={14} /> Volver
            </Link>
            <h1 className="text-3xl font-bold font-display text-white">{business.nombre}</h1>
            <span className="inline-block text-sm font-medium text-white/90 bg-black/20 px-2.5 py-1 rounded-full mt-2">
              {business.categoria}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-brand-muted mb-8">{business.descripcion}</p>

        <h2 className="text-2xl font-bold font-display mb-6 text-brand-text">Menú</h2>

        {products.length === 0 ? (
          <div className="text-center py-16 card">
            <div className="w-16 h-16 bg-brand-elevated rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={28} className="text-brand-subtle" />
            </div>
            <p className="text-brand-muted">No hay productos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(product => (
              <div key={product.id} className="card hover:border-brand-primary/40 transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-brand-text">{product.nombre}</h3>
                    <p className="text-sm text-brand-muted mt-1">{product.descripcion}</p>
                    <p className="text-xl font-bold text-brand-primary mt-2">
                      ${product.precio.toLocaleString('es-CO')}
                    </p>
                  </div>
                  <Button variant="primary" size="sm" icon={Plus} className="sm:self-end shrink-0">
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
