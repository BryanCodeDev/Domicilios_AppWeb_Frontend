import React from 'react';
import Button from '../../components/shared/Button.jsx';
import { DollarSign, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const RiderEarnings = () => {
  const periods = [
    { label: 'Hoy', value: '$54.000', percent: '+12%' },
    { label: 'Esta semana', value: '$380.000', percent: '+8%' },
    { label: 'Este mes', value: '$1.450.000', percent: '+15%' },
  ];

  const transactions = [
    { id: 'TXN-001', order: 'Pizza Express', amount: '$32.000', time: 'Hoy, 12:30 PM', status: 'Pagado' },
    { id: 'TXN-002', order: 'Sushi Nakama', amount: '$45.000', time: 'Hoy, 10:15 AM', status: 'Pagado' },
    { id: 'TXN-003', order: 'El Fogón', amount: '$28.000', time: 'Ayer, 8:45 PM', status: 'Pagado' },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display">Ganancias</h1>
          <p className="text-brand-muted mt-1">Historial y estadísticas de ingresos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {periods.map((period, idx) => (
            <div key={idx} className="card hover:border-brand-secondary/40 transition-all duration-300 group">
              <p className="text-sm text-brand-muted mb-1">{period.label}</p>
              <p className="text-2xl font-bold font-display text-brand-text">{period.value}</p>
              <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
                {period.percent}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold font-display mb-4">Transacciones recientes</h2>
          <div className="space-y-3">
            {transactions.map((txn, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-brand-subtle last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                    <DollarSign size={18} className="text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-text">{txn.order}</p>
                    <p className="text-xs text-brand-muted">{txn.id} · {txn.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-text">{txn.amount}</p>
                  <span className="text-xs text-green-400">{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderEarnings;
