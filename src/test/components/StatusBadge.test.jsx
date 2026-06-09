import { render, screen } from '@testing-library/react';
import StatusBadge from '../../components/orders/StatusBadge.jsx';

describe('StatusBadge', () => {
  it('renders PENDING status correctly', () => {
    render(<StatusBadge status='PENDING' />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('renders IN_TRANSIT status correctly', () => {
    render(<StatusBadge status='IN_TRANSIT' />);
    expect(screen.getByText('En camino')).toBeInTheDocument();
  });

  it('renders DELIVERED status correctly', () => {
    render(<StatusBadge status='DELIVERED' />);
    expect(screen.getByText('Entregado')).toBeInTheDocument();
  });

  it('renders CANCELLED status correctly', () => {
    render(<StatusBadge status='CANCELLED' />);
    expect(screen.getByText('Cancelado')).toBeInTheDocument();
  });
});

