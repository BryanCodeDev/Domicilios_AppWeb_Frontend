import React, { useEffect, useState } from 'react';
import Button from '../../components/shared/Button.jsx';
import { Building2, MapPin, Phone, Eye } from 'lucide-react';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBusinesses([
      { id: '1', nombre: 'El Fogón Casero', categoria: 'Comida colombiana', direccion: 'Cra. 15 #85-32, Bogotá', phone: '+57 315 555 5555', activo: true },
      { id: '2', nombre: 'Pizza Express Bogotá', categoria: 'Italiana', direccion: 'Av. Calle 72 #10-45, Bogotá', phone: '+57 316 666 6666', activo: true },
      { id: '3', nombre: 'Sushi Nakama', categoria: 'Japonesa', direccion: 'Calle 93 #11-27, Bogotá', phone: '+57 317 777 7777', activo: true },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text tracking-tight">Gestión de Negocios</h1>
            <p className="text-muted text-sm mt-1">Administra los negocios registrados</p>
          </div>
          <span className="text-sm text-muted bg-surface border border-subtle px-3 py-1.5 rounded-full">
            {businesses.length} negocios
          </span>
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-32 bg-secondary-light rounded-lg animate-pulse" />)}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businesses.map((business, idx) => (
              <div key={business.id} className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-bold font-display text-lg">{business.nombre.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text">{business.nombre}</h3>
                    <span className="inline-block text-xs font-medium text-muted bg-secondary-light px-2.5 py-0.5 rounded-full mt-1">
                      {business.categoria}
                    </span>
                    <div className="flex flex-col gap-1.5 mt-3 text-sm text-muted">
                      <span className="flex items-center gap-1.5"><MapPin size={12} className="shrink-0" /> {business.direccion}</span>
                      {business.phone && <span className="flex items-center gap-1.5"><Phone size={12} className="shrink-0" /> {business.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-subtle">
                  <Button variant="ghost" size="sm" icon={Eye}>Ver detalle</Button>
                  <Button variant="primary" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Businesses;
