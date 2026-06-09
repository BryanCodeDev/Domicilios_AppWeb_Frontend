import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import Button from '../../components/shared/Button.jsx';
import { ArrowLeft, AlertCircle, MapPin } from 'lucide-react';

const checkoutSchema = z.object({
  direccion: z.string().min(10, 'Dirección mínimo 10 caracteres').min(1, 'Dirección requerida'),
  lat: z.number().min(-90).max(90, 'Latitud inválida').min(1, 'Latitud requerida'),
  lng: z.number().min(-180).max(180, 'Longitud inválida').min(1, 'Longitud requerida'),
  notas: z.string().max(200, 'Máximo 200 caracteres').optional()
});

const Checkout = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { items, businessId: cartBusinessId, total, clearCart } = useCartStore();
  const { placeOrder, isLoading } = useOrderStore();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { lat: 4.7110, lng: -74.0721 }
  });

  React.useEffect(() => {
    if (!cartBusinessId && items.length === 0) {
      navigate('/');
    }
  }, [cartBusinessId, items, navigate]);

  const onSubmit = async (data) => {
    try {
      const orderData = {
        negocio_id: cartBusinessId || businessId,
        productos: items.map(item => ({
          producto_id: item.id,
          cantidad: item.quantity
        })),
        direccion: data.direccion,
        lat: data.lat,
        lng: data.lng,
        notas: data.notas
      };
      const order = await placeOrder(orderData);
      clearCart();
      navigate('/orders/' + order.id);
    } catch (err) {
      setError('root', { message: err.response?.data?.message || 'Error al realizar el pedido' });
    }
  };

  if (items.length === 0) return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <p className='text-muted'>No hay productos en el carrito</p>
    </div>
  );

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='flex items-center gap-3 mb-8'>
        <button onClick={() => navigate(-1)} className='p-2 rounded-lg hover:bg-secondary-light transition text-muted hover:text-text' aria-label='Volver'>
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <h1 className='text-2xl font-bold text-text tracking-tight'>Completar Pedido</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
        <div className='bg-surface border border-subtle rounded-xl p-5 mb-5'>
          <h2 className='text-base font-semibold text-text mb-5'>Dirección de entrega</h2>
          {errors.root && (
            <div className='flex items-center gap-2.5 px-4 py-3 rounded-lg bg-error-light/60 border border-error/30 text-error text-sm mb-4'>
              <AlertCircle size={15} />
              {errors.root.message}
            </div>
          )}
          <div className='space-y-5'>
            <div>
              <label htmlFor='direccion' className='block text-sm font-medium text-text mb-1.5'>Dirección</label>
              <div className='relative'>
                <input
                  id='direccion'
                  type='text'
                  placeholder='Calle 123 #45-67'
                  {...register('direccion')}
                  className={'input pl-10 w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.direccion ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
                />
              </div>
              {errors.direccion && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.direccion.message}
                </p>
              )}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='lat' className='block text-sm font-medium text-text mb-1.5'>Latitud</label>
                <input
                  id='lat'
                  type='number'
                  step='any'
                  placeholder='4.7110'
                  {...register('lat', { valueAsNumber: true })}
                  className={'input w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.lat ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
                />
                {errors.lat && (
                  <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                    <AlertCircle size={12} strokeWidth={2} />
                    {errors.lat.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor='lng' className='block text-sm font-medium text-text mb-1.5'>Longitud</label>
                <input
                  id='lng'
                  type='number'
                  step='any'
                  placeholder='-74.0721'
                  {...register('lng', { valueAsNumber: true })}
                  className={'input w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.lng ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
                />
                {errors.lng && (
                  <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                    <AlertCircle size={12} strokeWidth={2} />
                    {errors.lng.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor='notas' className='block text-sm font-medium text-text mb-1.5'>Notas (opcional)</label>
              <textarea
                id='notas'
                placeholder='Apartamento 302, timbre verde...'
                {...register('notas')}
                className={'input min-h-24 resize-none w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.notas ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
              />
              {errors.notas && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.notas.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='bg-surface border border-subtle rounded-xl p-5 mb-5'>
          <h2 className='text-base font-semibold text-text mb-5'>Productos</h2>
          <div className='space-y-3'>
            {items.map(item => (
              <div key={item.id} className='flex justify-between items-center'>
                <div>
                  <p className='font-medium text-text'>{item.nombre}</p>
                  <p className='text-xs text-muted'>Cantidad: {item.quantity}</p>
                </div>
                <p className='font-semibold text-primary'>{"$" + (item.precio * item.quantity).toLocaleString('es-CO')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-surface border border-subtle rounded-xl p-5 mb-5'>
          <h2 className='text-base font-semibold text-text mb-5'>Resumen del pedido</h2>
          <div className='space-y-3'>
            <div className='flex justify-between text-sm text-muted'>
              <span>Subtotal</span>
              <span>{"$" + total().toLocaleString('es-CO')}</span>
            </div>
            <div className='flex justify-between text-sm text-muted'>
              <span>Domicilio</span>
              <span>.000</span>
            </div>
            <div className='border-t border-subtle pt-3 flex justify-between text-text font-semibold text-base'>
              <span>Total</span>
              <span>{"$" + (total() + 3000).toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>

        <button type='submit' className='w-full rounded-lg py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 bg-primary hover:bg-primary-hover' disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? 'Realizando pedido...' : 'Realizar Pedido'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
