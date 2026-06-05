import React from 'react';
import Button from '../../components/shared/Button.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-secondary-light transition text-muted hover:text-text">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-2xl font-bold text-text tracking-tight">Completar Pedido</h1>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 mb-5">
          <h2 className="text-base font-semibold text-text mb-5">Dirección de entrega</h2>
          <div className="space-y-5">
            <div>
              <label className="label">Dirección</label>
              <input type="text" className="input" placeholder="Calle 123 #45-67" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Latitud</label>
                <input type="number" className="input" placeholder="4.7110" />
              </div>
              <div>
                <label className="label">Longitud</label>
                <input type="number" className="input" placeholder="-74.0721" />
              </div>
            </div>
            <div>
              <label className="label">Notas (opcional)</label>
              <textarea className="input min-h-24 resize-none" placeholder="Apartamento 302, timbre verde..." />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 mb-5">
          <h2 className="text-base font-semibold text-text mb-5">Resumen del pedido</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between text-sm text-muted">
              <span>Domicilio</span>
              <span>$0</span>
            </div>
            <div className="border-t border-subtle pt-3 flex justify-between text-text font-semibold text-base">
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

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export default Checkout;
