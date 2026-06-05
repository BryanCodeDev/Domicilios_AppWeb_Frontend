import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBusinesses } from '../../services/api/businesses';
import Button from '../../components/shared/Button.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { Store, MapPin, Clock, Star, Search, SlidersHorizontal } from 'lucide-react';

const categories = [
  'Comida rápida', 'Italiana', 'Japonesa', 'Colombiana', 'Postres', 'Cafetería', 'Saludable'
];

const ClientHome = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filtered = businesses.filter(b =>
    b.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 sm:h-72 overflow-hidden bg-primary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Pide lo que quieras
            </h1>
            <p className="text-white/80 text-base sm:text-lg mt-3">
              Entregas rápidas en tu zona
            </p>
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar negocios o categorías..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-subtle rounded-lg text-text placeholder-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-surface border border-subtle rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={18} className="text-primary" />
            <h2 className="text-base font-semibold text-text">Categorías</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={
                `px-3 py-1.5 rounded-full text-sm font-medium transition-all border ` +
                (selectedCategory === ''
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface text-muted border-subtle hover:text-text hover:border-muted')
              }
            >Todas</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={
                  `px-3 py-1.5 rounded-full text-sm font-medium transition-all border ` +
                  (selectedCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-muted border-subtle hover:text-text hover:border-muted')
                }>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text tracking-tight">Negocios cercanos</h2>
            <p className="text-sm text-muted mt-1">{filtered.length} resultados</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader size="lg" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-subtle rounded-xl">
            <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Store size={28} className="text-subtle" />
            </div>
            <p className="text-text font-medium mb-1">No se encontraron negocios</p>
            <p className="text-sm text-muted mb-4">Prueba ajustando los filtros de búsqueda</p>
            <Button variant="secondary" onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((business, idx) => (
              <Link key={business.id} to={`/business/${business.id}`}
                className="group bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary">{business.nombre.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-text group-hover:text-primary transition-colors truncate">{business.nombre}</h3>
                    <span className="inline-block text-xs font-medium text-muted bg-secondary-light px-2 py-0.5 rounded-full mt-1">{business.categoria}</span>
                  </div>
                </div>

                <p className="text-sm text-muted line-clamp-2 mb-4">{business.descripcion}</p>

                <div className="flex items-center gap-4 text-xs text-muted mb-4">
                  {business.horario && <span className="flex items-center gap-1"><Clock size={12} />{business.horario}</span>}
                  {business.direccion && <span className="flex items-center gap-1 truncate"><MapPin size={12} />{business.direccion.split(',')[0]}</span>}
                </div>

                <Button variant="secondary" className="w-full" size="sm">Ver menú</Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientHome;
