import React from 'react';
import { CheckCircle, Clock, Truck, Package, Navigation, CheckCircle2, XCircle, UserCheck } from 'lucide-react';

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    className: 'status-pending',
    icon: Clock,
  },
  ACCEPTED: {
    label: 'Aceptado',
    className: 'status-accepted',
    icon: CheckCircle,
  },
  ASSIGNED: {
    label: 'Asignado',
    className: 'status-assigned',
    icon: UserCheck,
  },
  PICKED_UP: {
    label: 'Recogido',
    className: 'status-picked-up',
    icon: Package,
  },
  IN_TRANSIT: {
    label: 'En camino',
    className: 'status-in-transit',
    icon: Navigation,
  },
  DELIVERED: {
    label: 'Entregado',
    className: 'status-delivered',
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: 'Cancelado',
    className: 'status-cancelled',
    icon: XCircle,
  },
};

const StatusBadge = ({ status, showIcon = true }) => {
  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}>
      {showIcon && <Icon size={12} />}
      {config.label}
    </span>
  );
};

export default StatusBadge;
