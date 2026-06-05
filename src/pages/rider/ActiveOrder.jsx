import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { MapPin, Phone, Navigation, ArrowLeft } from 'lucide-react';

const statusSteps = [
  { id: 'PICKED_UP', label: 'Recogido' },
  { id: 'IN_TRANSIT', label: 'En camino' },
  { id: 'DELIVERED', label: 'Entregado' },
];

const RiderActiveOrder = () => {
  const delivery = null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/rider" className="p-2 rounded-lg text-muted hover:text-text hover:bg-secondary-light transition">
            <ArrowLeft size={20} strokeWidth={1.75} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text tracking-tight">Pedido Activo</h1>
            <p className="text-sm text-muted mt-1">Sigue el progreso de tu entrega</p>
          </div>
        </div>

        {delivery ? (
          <div className="space-y-6">
            <div className="bg-surface border border-subtle rounded-xl p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">CN</span>
                </div>
                <div>
                  <p className="font-semibold text-text">Cliente: Juan Pérez</p>
                  <p className="text-sm text-muted flex items-center gap-1.5">
                    <Phone size={12} className="text-primary" /> +57 300 123 4567
                  </p>
                </div>
              </div>

              <div className="bg-secondary-light rounded-lg p-4 mb-6">
                <p className="text-xs text-muted mb-1">Dirección de entrega</p>
                <p className="font-medium text-text flex items-center gap-2">
                  <MapPin size={16} className="text-primary shrink-0" />
                  Cra. 15 #85-32, Bogotá
                </p>
              </div>

              <h3 className="text-sm font-semibold text-text mb-5">Progreso del pedido</h3>
              <div className="flex justify-between mb-6">
                {statusSteps.map((step, idx) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx === 1 ? 'bg-primary text-white' : 'bg-secondary-light text-muted border border-subtle'}`}>
                      <step.icon size={16} strokeWidth={1.75} />
                    </div>
                    <span className="text-xs mt-2 text-muted">{step.label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-secondary-light rounded-lg h-48 flex items-center justify-center mb-6">
                <span className="text-sm text-subtle">Mapa del repartidor</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="primary">Llamar cliente</Button>
                <Button variant="secondary">Chat</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-surface border border-subtle rounded-xl">
            <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation size={28} className="text-subtle" />
            </div>
            <p className="text-text font-medium mb-1">No tienes pedidos activos</p>
            <p className="text-sm text-muted mb-4">Los pedidos disponibles aparecerán aquí</p>
            <Link to="/rider"><Button variant="primary">Volver al dashboard</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderActiveOrder;
