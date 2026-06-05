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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => window.history.back()} className="p-2 rounded-lg hover:bg-secondary-light transition text-muted hover:text-text">
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-text tracking-tight">Rastreo del Pedido</h1>
          <p className="text-sm text-muted mt-1">Sigue al repartidor en tiempo real</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-surface border border-subtle rounded-xl h-64 sm:h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={40} className="text-primary mx-auto mb-3" strokeWidth={1.25} />
              <StatusBadge status="IN_TRANSIT" />
              <p className="text-sm text-muted mt-3">Pedido #{orderId?.slice(0, 8)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-surface border border-subtle rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-4">Estado del pedido</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Navigation size={16} className="text-primary shrink-0" />
                <span>En camino</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Clock size={16} className="text-primary shrink-0" />
                <span>Tiempo estimado: 15 min</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-subtle rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-4">Repartidor</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <div>
                <p className="font-medium text-text">Andrés Roa</p>
                <p className="text-xs text-muted">Repartidor</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-subtle rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-3">Ubicación del repartidor</h3>
            {riderLocation ? (
              <p className="text-sm text-text font-mono">
                {riderLocation.lat.toFixed(4)}, {riderLocation.lng.toFixed(4)}
              </p>
            ) : (
              <p className="text-sm text-muted">Esperando ubicación...</p>
            )}
          </div>

          <Button variant="primary" className="w-full">Contactar repartidor</Button>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
