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
            <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Gestión de Negocios</h1>
            <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Administra los negocios registrados</p>
          </div>
          <span className="text-sm rounded-full px-3 py-1.5" style={{
            color: '#A0A0A0',
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'DM Sans, sans-serif'
          }}>
            {businesses.length} negocios
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businesses.map((business, idx) => (
            <div key={business.id} className="rounded-2xl p-4 transition-all duration-300 animate-fade-in" style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)',
              animationDelay: `${idx * 50}ms`
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)' }}>
                  <span className="text-white font-bold font-display text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>{business.nombre.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>{business.nombre}</h3>
                  <span className="inline-block text-xs font-medium bg-brand-secondary/10 px-2 py-0.5 rounded-full mt-1" style={{
                    color: '#FFB800',
                    background: 'rgba(255,184,0,0.1)',
                    fontFamily: 'DM Sans, sans-serif'
                  }}>
                    {business.categoria}
                  </span>
                  <div className="flex flex-col gap-1 mt-3 text-sm" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {business.direccion}</span>
                    {business.phone && <span className="flex items-center gap-1"><Phone size={12} /> {business.phone}</span>}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                  color: '#A0A0A0',
                  background: 'transparent',
                  fontFamily: 'DM Sans, sans-serif'
                }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Eye size={14} /> Ver detalle
                </button>
                <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-4 py-2" style={{
                  background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)',
                  color: '#FFFFFF',
                  fontFamily: 'DM Sans, sans-serif'
                }}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Businesses;