import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketStore } from '../../store/socketStore';
import { useOrderStore } from '../../store/orderStore';
import { getOrder } from '../../services/api/orders';
import Button from '../../components/shared/Button.jsx';
import StatusBadge from '../../components/orders/StatusBadge.jsx';
import Loader from '../../components/shared/Loader.jsx';
import TrackingMap from '../../components/maps/TrackingMap.jsx';
import { MapPin, Clock, Navigation, ArrowLeft } from 'lucide-react';

const Tracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const riderLocation = useSocketStore(state => state.riderLocation);
  const listenRiderLocation = useSocketStore(state => state.listenRiderLocation);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(orderId);
        setOrder(data.order || data);
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
    listenRiderLocation(() => {});
  }, [orderId, listenRiderLocation]);

  if (loading) {
    return (
      <div className='flex justify-center py-12'>
        <Loader size='lg' />
      </div>
    );
  }

  if (!order) {
    return <p className='text-center py-12 text-muted'>Pedido no encontrado</p>;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='flex items-center gap-3 mb-8'>
        <button onClick={() => window.history.back()} className='p-2 rounded-lg hover:bg-secondary-light transition text-muted hover:text-text'>
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <div>
          <h1 className='text-2xl font-bold text-text tracking-tight'>Rastreo del Pedido</h1>
          <p className='text-sm text-muted mt-1'>Sigue al repartidor en tiempo real</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <div className='bg-surface border border-subtle rounded-xl overflow-hidden h-64 sm:h-80'>
            <TrackingMap
              orderId={orderId}
              destinationLat={order.lat}
              destinationLng={order.lng}
            />
          </div>
        </div>

        <div className='space-y-5'>
          <div className='bg-surface border border-subtle rounded-xl p-5'>
            <h3 className='text-sm font-semibold text-text mb-4'>Estado del pedido</h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-sm text-muted'>
                <Navigation size={16} className='text-primary shrink-0' />
                <span>En camino</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-muted'>
                <Clock size={16} className='text-primary shrink-0' />
                <span>Tiempo estimado: 15 min</span>
              </div>
            </div>
          </div>

          <div className='bg-surface border border-subtle rounded-xl p-5'>
            <h3 className='text-sm font-semibold text-text mb-4'>Repartidor</h3>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>{(order.rider?.nombre || '?').charAt(0)}</span>
              </div>
              <div>
                <p className='font-medium text-text'>{order.rider?.nombre || 'Asignando...'}</p>
                <p className='text-xs text-muted'>Repartidor</p>
              </div>
            </div>
          </div>

          <div className='bg-surface border border-subtle rounded-xl p-5'>
            <h3 className='text-sm font-semibold text-text mb-3'>Ubicación del repartidor</h3>
            {riderLocation ? (
              <p className='text-sm text-text font-mono'>
                {riderLocation.lat.toFixed(4)}, {riderLocation.lng.toFixed(4)}
              </p>
            ) : (
              <p className='text-sm text-muted'>Esperando ubicación...</p>
            )}
          </div>

          <Button variant='primary' className='w-full'>Contactar repartidor</Button>
        </div>
      </div>
    </div>
  );
};

export default Tracking;

