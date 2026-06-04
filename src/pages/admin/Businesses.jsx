import React, { useEffect, useState } from 'react';
import Button from '../../components/shared/Button.jsx';
import { Building2, MapPin, Phone, Clock, Eye } from 'lucide-react';

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
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Gestión de Negocios</h1>
            <p className="text-brand-muted mt-1">Administra los negocios registrados</p>
          </div>
          <span className="text-sm text-brand-muted bg-brand-surface px-3 py-1.5 rounded-full border border-brand-subtle">
            {businesses.length} negocios
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businesses.map((business, idx) => (
            <div key={business.id} className="card hover:border-brand-primary/40 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold font-display text-white">{business.nombre.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-brand-text">{business.nombre}</h3>
                  <span className="inline-block text-xs font-medium text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full mt-1">
                    {business.categoria}
                  </span>
                  <div className="flex flex-col gap-1 mt-3 text-sm text-brand-muted">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {business.direccion}</span>
                    {business.phone && <span className="flex items-center gap-1"><Phone size={12} /> {business.phone}</span>}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-brand-subtle">
                <Button variant="ghost" size="sm" icon={Eye}>Ver detalle</Button>
                <Button variant="primary" size="sm">Editar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Businesses;
