import React from 'react';
import { CheckCircle, Clock, Truck, Package, Navigation, CheckCircle2, XCircle, UserCheck } from 'lucide-react';

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    className: 'bg-warning-light text-warning',
    icon: Clock,
  },
  ACCEPTED: {
    label: 'Aceptado',
    className: 'bg-info-light text-info',
    icon: CheckCircle,
  },
  ASSIGNED: {
    label: 'Asignado',
    className: 'bg-primary-light text-primary',
    icon: UserCheck,
  },
  PICKED_UP: {
    label: 'Recogido',
    className: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
    icon: Package,
  },
  IN_TRANSIT: {
    label: 'En camino',
    className: 'bg-info-light text-info',
    icon: Navigation,
  },
  DELIVERED: {
    label: 'Entregado',
    className: 'bg-success-light text-success',
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: 'Cancelado',
    className: 'bg-error-light text-error',
    icon: XCircle,
  },
};

const StatusBadge = ({ status, showIcon = true }) => {
  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {showIcon && <Icon size={12} strokeWidth={2} />}
      {config.label}
    </span>
  );
};

export default StatusBadge;
