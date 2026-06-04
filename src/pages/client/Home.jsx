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
    <div className="min-h-screen bg-brand-background">
      <div className="relative h-72 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)' }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black font-display text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>¡Pide lo que quieras!</h1>
            <p className="text-lg text-white/80 mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>Entregamos en minutos</p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search size={20} style={{ color: '#A0A0A0' }} className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar negocios o categorías..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={18} style={{ color: '#FF4D00' }} />
            <h2 className="text-lg font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Categorías</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: selectedCategory === '' ? 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)' : 'var(--color-elevated)',
                color: selectedCategory === '' ? '#FFFFFF' : 'var(--color-muted)',
                border: selectedCategory === '' ? 'none' : '1px solid var(--color-subtle)'
              }}
            >Todos</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)' : 'var(--color-elevated)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-muted)',
                  border: selectedCategory === cat ? 'none' : '1px solid var(--color-subtle)'
                }}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pb-16">
        <h2 className="text-2xl font-bold font-display mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>
          Negocios cercanos
          <span className="text-brand-muted text-lg font-normal ml-2" style={{ color: '#A0A0A0' }}>({filtered.length})</span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-20"><Loader size="lg" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 card">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-elevated)' }}>
              <Store size={32} style={{ color: 'var(--color-subtle)' }} />
            </div>
            <p className="font-medium mb-1" style={{ color: 'var(--color-muted)', fontFamily: 'DM Sans, sans-serif' }}>No se encontraron negocios</p>
            <Button variant="ghost" onClick={() => { setSelectedCategory(''); setSearchQuery(''); }} className="mt-4">Limpiar filtros</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((business, idx) => (
              <Link key={business.id} to={`/business/${business.id}`}
                className="group rounded-2xl p-4 transition-all duration-300 animate-slide-up card"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative h-32 rounded-t-lg -mx-4 -mt-4 mb-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)' }}>
                  <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold font-display" style={{
                      fontFamily: 'Syne, sans-serif',
                      color: 'rgba(255,255,255,0.9)'
                    }}>{business.nombre.charAt(0)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg transition-colors" style={{
                      fontFamily: 'Syne, sans-serif',
                      color: 'var(--color-text)'
                    }}>{business.nombre}</h3>
                    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1" style={{
                      color: '#FFB800',
                      background: 'rgba(255,184,0,0.1)',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>{business.categoria}</span>
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--color-muted)', fontFamily: 'DM Sans, sans-serif' }}>{business.descripcion}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                    {business.horario && <span className="flex items-center gap-1"><Clock size={12} />{business.horario}</span>}
                    {business.direccion && <span className="flex items-center gap-1"><MapPin size={12} />{business.direccion.split(',')[0]}</span>}
                  </div>
                  <div className="pt-2">
                    <Button variant="primary" className="w-full" size="sm">Ver menú</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientHome;
