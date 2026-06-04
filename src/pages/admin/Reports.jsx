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
          <h1 className="text-3xl font-bold font-display">Reportes</h1>
          <p className="text-brand-muted mt-1">Métricas y exportaciones de la plataforma</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="card hover:border-brand-primary/40 transition-all duration-300">
              <stat.icon size={22} className="text-brand-primary mb-3" />
              <p className="text-2xl font-bold font-display text-brand-text">{stat.value}</p>
              <p className="text-sm text-brand-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold font-display mb-6">Exportar reportes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-elevated border border-brand-subtle rounded-xl p-4 hover:border-brand-primary/40 transition-all duration-300">
              <h3 className="font-semibold text-brand-text mb-1">Reporte de ventas</h3>
              <p className="text-sm text-brand-muted mb-4">Todas las transacciones del periodo</p>
              <Button variant="primary" icon={Download} size="sm">Descargar CSV</Button>
            </div>
            <div className="bg-brand-elevated border border-brand-subtle rounded-xl p-4 hover:border-brand-primary/40 transition-all duration-300">
              <h3 className="font-semibold text-brand-text mb-1">Reporte de usuarios</h3>
              <p className="text-sm text-brand-muted mb-4">Usuarios registrados y actividad</p>
              <Button variant="primary" icon={Download} size="sm">Descargar CSV</Button>
            </div>
            <div className="bg-brand-elevated border border-brand-subtle rounded-xl p-4 hover:border-brand-primary/40 transition-all duration-300">
              <h3 className="font-semibold text-brand-text mb-1">Top negocios</h3>
              <p className="text-sm text-brand-muted mb-4">Ranking por ventas y pedidos</p>
              <Button variant="outline" icon={Download} size="sm">Descargar Excel</Button>
            </div>
            <div className="bg-brand-elevated border border-brand-subtle rounded-xl p-4 hover:border-brand-primary/40 transition-all duration-300">
              <h3 className="font-semibold text-brand-text mb-1">Calificaciones</h3>
              <p className="text-sm text-brand-muted mb-4">Ratings de clientes y repartidores</p>
              <Button variant="outline" icon={Download} size="sm">Descargar Excel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
