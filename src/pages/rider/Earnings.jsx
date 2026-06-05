import React from 'react';
import Button from '../../components/shared/Button.jsx';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text tracking-tight">Ganancias</h1>
        <p className="text-muted text-sm mt-1">Historial y estadísticas de ingresos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {periods.map((period, idx) => (
          <div key={idx} className="bg-surface border border-subtle rounded-xl p-5">
            <p className="text-sm text-muted mb-1">{period.label}</p>
            <p className="text-2xl font-bold text-text font-display">{period.value}</p>
            <span className="inline-flex items-center mt-2 text-xs font-medium text-success bg-success-light px-2 py-0.5 rounded-full">
              {period.percent}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-subtle rounded-xl p-5">
        <h2 className="text-base font-semibold text-text mb-5">Transacciones recientes</h2>
        <div className="space-y-0">
          {transactions.map((txn, idx) => (
            <div key={idx} className={`flex items-center justify-between py-4 ${idx !== transactions.length - 1 ? 'border-b border-subtle' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                  <DollarSign size={18} className="text-muted" />
                </div>
                <div>
                  <p className="font-medium text-text">{txn.order}</p>
                  <p className="text-xs text-muted">{txn.id} · {txn.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text">{txn.amount}</p>
                <span className="text-xs text-success font-medium">{txn.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiderEarnings;
