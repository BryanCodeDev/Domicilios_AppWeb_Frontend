import React from 'react';
import Navbar from '../../components/shared/Navbar.jsx';
import Button from '../../components/shared/Button.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-brand-surface transition">
            ←
          </button>
          <h1 className="text-3xl font-bold font-display">Completar Pedido</h1>
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4 text-brand-text">Dirección de entrega</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-muted mb-1.5">Dirección</label>
              <input type="text" className="input" placeholder="Calle 123 #45-67" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-1.5">Latitud</label>
                <input type="number" className="input" placeholder="4.7110" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-1.5">Longitud</label>
                <input type="number" className="input" placeholder="-74.0721" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-muted mb-1.5">Notas (opcional)</label>
              <textarea className="input min-h-24 resize-none" placeholder="Apartamento 302, timbre verde..." />
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4 text-brand-text">Resumen del pedido</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-brand-muted">
              <span>Subtotal</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between text-brand-muted">
              <span>Domicilio</span>
              <span>$0</span>
            </div>
            <div className="border-t border-brand-subtle pt-3 flex justify-between text-brand-text font-bold text-lg">
              <span>Total</span>
              <span>$0</span>
            </div>
          </div>
        </div>

        <Button className="w-full" size="lg" variant="secondary">Realizar Pedido</Button>
      </div>
    </div>
  );
};

export default Checkout;
