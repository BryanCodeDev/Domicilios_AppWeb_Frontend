import React from 'react';
import Button from '../../components/shared/Button.jsx';
import { Building2, TrendingUp, Users, FileText, Download } from 'lucide-react';

const AdminReports = () => {
  const stats = [
    { label: 'Usuarios activos', value: '247', icon: Users },
    { label: 'Pedidos mes', value: '1.234', icon: FileText },
    { label: 'Ingresos mes', value: '$45.2M', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Reportes</h1>
          <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Métricas y exportaciones de la plataforma</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="rounded-2xl p-4 transition-all duration-300" style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}>
              <stat.icon size={22} className="mb-3" style={{ color: '#FF4D00' }} />
              <p className="text-2xl font-bold font-display" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-4" style={{
          background: '#161616',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <h2 className="text-lg font-semibold font-display mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Exportar reportes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-4 transition-all duration-300" style={{
              background: '#1F1F1F',
              border: '1px solid rgba(255,255,255,0.06)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'}>
              <h3 className="font-semibold mb-1" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>Reporte de ventas</h3>
              <p className="text-sm mb-4" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Todas las transacciones del periodo</p>
              <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)',
                color: '#FFFFFF',
                fontFamily: 'DM Sans, sans-serif'
              }}><Download size={14} /> Descargar CSV</button>
            </div>
            <div className="rounded-xl p-4 transition-all duration-300" style={{
              background: '#1F1F1F',
              border: '1px solid rgba(255,255,255,0.06)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'}>
              <h3 className="font-semibold mb-1" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>Reporte de usuarios</h3>
              <p className="text-sm mb-4" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Usuarios registrados y actividad</p>
              <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)',
                color: '#FFFFFF',
                fontFamily: 'DM Sans, sans-serif'
              }}><Download size={14} /> Descargar CSV</button>
            </div>
            <div className="rounded-xl p-4 transition-all duration-300" style={{
              background: '#1F1F1F',
              border: '1px solid rgba(255,255,255,0.06)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'}>
              <h3 className="font-semibold mb-1" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>Top negocios</h3>
              <p className="text-sm mb-4" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Ranking por ventas y pedidos</p>
              <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                background: '#1F1F1F',
                color: '#F5F5F5',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'DM Sans, sans-serif'
              }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = '#1F1F1F'}>
                <Download size={14} /> Descargar Excel
              </button>
            </div>
            <div className="rounded-xl p-4 transition-all duration-300" style={{
              background: '#1F1F1F',
              border: '1px solid rgba(255,255,255,0.06)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'}>
              <h3 className="font-semibold mb-1" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>Calificaciones</h3>
              <p className="text-sm mb-4" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Ratings de clientes y repartidores</p>
              <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                background: '#1F1F1F',
                color: '#F5F5F5',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'DM Sans, sans-serif'
              }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = '#1F1F1F'}>
                <Download size={14} /> Descargar Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;