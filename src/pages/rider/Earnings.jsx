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
          <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Ganancias</h1>
          <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Historial y estadísticas de ingresos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {periods.map((period, idx) => (
            <div key={idx} className="rounded-2xl p-4 transition-all duration-300 group" style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,184,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}>
              <p className="text-sm mb-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{period.label}</p>
              <p className="text-2xl font-bold font-display" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>{period.value}</p>
              <span className="text-xs font-medium bg-green-500/10 px-2 py-0.5 rounded-full mt-2 inline-block" style={{
                color: '#4ADE80',
                fontFamily: 'DM Sans, sans-serif'
              }}>
                {period.percent}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-4" style={{
          background: '#161616',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <h2 className="text-lg font-semibold font-display mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Transacciones recientes</h2>
          <div className="space-y-3">
            {transactions.map((txn, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b last:border-b-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,184,0,0.08)' }}>
                    <DollarSign size={18} style={{ color: '#FFB800' }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>{txn.order}</p>
                    <p className="text-xs" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{txn.id} · {txn.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>{txn.amount}</p>
                  <span className="text-xs" style={{ color: '#4ADE80', fontFamily: 'DM Sans, sans-serif' }}>{txn.status}</span>
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