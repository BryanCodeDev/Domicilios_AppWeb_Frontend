import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { MapPin, Clock, Navigation, ArrowLeft } from 'lucide-react';

const Tracking = () => {
  const { orderId } = useParams();
  const riderLocation = null;

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <button onClick={() => window.history.back()} className="p-2 rounded-lg hover:bg-brand-surface transition text-brand-muted hover:text-brand-text">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold font-display">Rastreo del Pedido</h1>
            <p className="text-brand-muted text-sm mt-1">Sigue al repartidor en tiempo real</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card h-80 bg-brand-elevated flex items-center justify-center animate-slide-up">
              <div className="text-center">
                <MapPin size={40} className="text-brand-primary mx-auto mb-3" />
                <StatusBadge status="IN_TRANSIT" />
                <p className="text-sm text-brand-muted mt-3">Pedido #{orderId?.slice(0, 8)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card animate-slide-up">
              <h3 className="font-semibold font-display mb-4">Estado del pedido</h3>
              <div className="flex items-center gap-3 text-brand-muted">
                <Navigation size={16} className="text-brand-primary" />
                <span>En camino</span>
              </div>
              <div className="flex items-center gap-3 text-brand-muted mt-2">
                <Clock size={16} className="text-brand-primary" />
                <span>Tiempo estimado: 15 min</span>
              </div>
            </div>

            <div className="card animate-slide-up">
              <h3 className="font-semibold font-display mb-4">Repartidor</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-brand-primary">AR</span>
                </div>
                <div>
                  <p className="font-medium text-brand-text">Andrés Roa</p>
                  <p className="text-xs text-brand-muted">Repartidor</p>
                </div>
              </div>
            </div>

            <div className="card animate-slide-up">
              <h3 className="font-semibold font-display mb-4">Ubicación del repartidor</h3>
              {riderLocation ? (
                <p className="text-sm text-brand-text font-mono">
                  {riderLocation.lat.toFixed(4)}, {riderLocation.lng.toFixed(4)}
                </p>
              ) : (
                <p className="text-sm text-brand-muted">Esperando ubicación...</p>
              )}
            </div>

            <Button variant="primary" className="w-full">Contactar repartidor</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
