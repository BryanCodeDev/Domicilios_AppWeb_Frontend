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
          <Link to="/rider" className="p-2 rounded-lg hover:bg-brand-surface transition text-brand-muted hover:text-brand-text">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-display">Pedido Activo</h1>
            <p className="text-brand-muted text-sm mt-1">Sigue el progreso de tu entrega</p>
          </div>
        </div>

        {delivery ? (
          <div className="space-y-6">
            <div className="card animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-brand-primary">CN</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-text">Cliente: Juan Pérez</p>
                  <p className="text-sm text-brand-muted flex items-center gap-1">
                    <Phone size={12} /> +57 300 123 4567
                  </p>
                </div>
              </div>

              <div className="bg-brand-elevated rounded-xl p-4 mb-6">
                <p className="text-sm text-brand-muted mb-1">Dirección de entrega</p>
                <p className="font-medium text-brand-text flex items-center gap-2">
                  <MapPin size={16} className="text-brand-primary" />
                  Cra. 15 #85-32, Bogotá
                </p>
              </div>

              <h3 className="font-semibold font-display mb-4">Progreso del pedido</h3>
              <div className="flex justify-between mb-6">
                {statusSteps.map((step, idx) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx === 1 ? 'bg-brand-primary text-white' : 'bg-brand-elevated text-brand-muted border border-brand-subtle'}`}>
                      <step.icon size={16} />
                    </div>
                    <span className="text-xs mt-2 text-brand-muted">{step.label}</span>
                  </div>
                ))}
              </div>

              <div className="h-48 bg-brand-elevated rounded-xl flex items-center justify-center mb-6">
                <span className="text-brand-subtle text-sm">Mapa del repartidor</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="primary">Llamar cliente</Button>
                <Button variant="secondary">Chat</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 card">
            <div className="w-16 h-16 bg-brand-elevated rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation size={28} className="text-brand-subtle" />
            </div>
            <p className="text-brand-muted font-medium mb-2">No tienes pedidos activos</p>
            <p className="text-sm text-brand-subtle mb-4">Los pedidos disponibles aparecerán aquí</p>
            <Link to="/rider"><Button variant="primary">Volver al dashboard</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderActiveOrder;
