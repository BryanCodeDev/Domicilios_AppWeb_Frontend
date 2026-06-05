import React from 'react';
import Button from '../../components/shared/Button.jsx';
import { Users, Building2, TrendingUp, Download, FileText } from 'lucide-react';

const AdminReports = () => {
  const stats = [
    { label: 'Usuarios activos', value: '247', icon: Users },
    { label: 'Pedidos mes', value: '1.234', icon: FileText },
    { label: 'Ingresos mes', value: '$45.2M', icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text tracking-tight">Reportes</h1>
        <p className="text-muted text-sm mt-1">Métricas y exportaciones de la plataforma</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200">
            <stat.icon size={20} className="text-primary mb-3" strokeWidth={1.75} />
            <p className="text-2xl font-bold text-text font-display">{stat.value}</p>
            <p className="text-sm text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-subtle rounded-xl p-5 sm:p-6">
        <h2 className="text-base font-semibold text-text mb-5">Exportar reportes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-secondary-light rounded-lg p-5 border border-subtle transition-colors hover:border-primary/30">
            <h3 className="font-semibold text-text mb-1">Reporte de ventas</h3>
            <p className="text-sm text-muted mb-4">Todas las transacciones del periodo</p>
            <Button variant="primary" icon={Download} size="sm">Descargar CSV</Button>
          </div>
          <div className="bg-secondary-light rounded-lg p-5 border border-subtle transition-colors hover:border-primary/30">
            <h3 className="font-semibold text-text mb-1">Reporte de usuarios</h3>
            <p className="text-sm text-muted mb-4">Usuarios registrados y actividad</p>
            <Button variant="primary" icon={Download} size="sm">Descargar CSV</Button>
          </div>
          <div className="bg-secondary-light rounded-lg p-5 border border-subtle transition-colors hover:border-primary/30">
            <h3 className="font-semibold text-text mb-1">Top negocios</h3>
            <p className="text-sm text-muted mb-4">Ranking por ventas y pedidos</p>
            <Button variant="outline" icon={Download} size="sm">Descargar Excel</Button>
          </div>
          <div className="bg-secondary-light rounded-lg p-5 border border-subtle transition-colors hover:border-primary/30">
            <h3 className="font-semibold text-text mb-1">Calificaciones</h3>
            <p className="text-sm text-muted mb-4">Ratings de clientes y repartidores</p>
            <Button variant="outline" icon={Download} size="sm">Descargar Excel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
