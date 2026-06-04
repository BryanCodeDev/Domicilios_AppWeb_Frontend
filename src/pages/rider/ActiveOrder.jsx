import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { MapPin, Phone, Clock, Navigation, ArrowLeft } from 'lucide-react';

const statusSteps = [
  { id: 'PICKED_UP', label: 'Recogido', icon: Clock },
  { id: 'IN_TRANSIT', label: 'En camino', icon: Navigation },
  { id: 'DELIVERED', label: 'Entregado', icon: Clock },
];

const RiderActiveOrder = () => {
  const delivery = null;

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/rider" className="p-2 rounded-lg transition" style={{ color: '#A0A0A0' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Pedido Activo</h1>
            <p className="text-sm mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Sigue el progreso de tu entrega</p>
          </div>
        </div>

        {delivery ? (
          <div className="space-y-6">
            <div className="rounded-2xl p-4 animate-fade-in" style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,77,0,0.08)' }}>
                  <span className="text-lg font-bold" style={{ color: '#FF4D00', fontFamily: 'Syne, sans-serif' }}>CN</span>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>Cliente: Juan Pérez</p>
                  <p className="text-sm flex items-center gap-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>
                    <Phone size={12} style={{ color: '#FF4D00' }} /> +57 300 123 4567
                  </p>
                </div>
              </div>

              <div className="rounded-xl p-4 mb-6" style={{ background: '#1F1F1F' }}>
                <p className="text-sm mb-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Dirección de entrega</p>
                <p className="font-medium flex items-center gap-2" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>
                  <MapPin size={16} style={{ color: '#FF4D00' }} />
                  Cra. 15 #85-32, Bogotá
                </p>
              </div>

              <h3 className="font-semibold font-display mb-4" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>Progreso del pedido</h3>
              <div className="flex justify-between mb-6">
                {statusSteps.map((step, idx) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{
                      background: idx === 1 ? '#FF4D00' : '#1F1F1F',
                      color: idx === 1 ? '#FFFFFF' : '#A0A0A0',
                      border: idx !== 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                    }}>
                      <step.icon size={16} />
                    </div>
                    <span className="text-xs mt-2" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{step.label}</span>
                  </div>
                ))}
              </div>

              <div className="h-48 rounded-xl flex items-center justify-center mb-6" style={{ background: '#1F1F1F' }}>
                <span className="text-sm" style={{ color: '#5A5A5A', fontFamily: 'DM Sans, sans-serif' }}>Mapa del repartidor</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-4 py-2" style={{
                  background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)',
                  color: '#FFFFFF',
                  fontFamily: 'DM Sans, sans-serif'
                }}>Llamar cliente</button>
                <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-4 py-2" style={{
                  background: '#1F1F1F',
                  color: '#F5F5F5',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'DM Sans, sans-serif'
                }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = '#1F1F1F'}>Chat</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl p-4" style={{
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#1F1F1F' }}>
              <Navigation size={28} style={{ color: '#5A5A5A' }} />
            </div>
            <p className="font-medium mb-2" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>No tienes pedidos activos</p>
            <p className="text-sm mb-4" style={{ color: '#5A5A5A', fontFamily: 'DM Sans, sans-serif' }}>Los pedidos disponibles aparecerán aquí</p>
            <Link to="/rider"><button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-4 py-2" style={{
              background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)',
              color: '#FFFFFF',
              fontFamily: 'DM Sans, sans-serif'
            }}>Volver al dashboard</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderActiveOrder;