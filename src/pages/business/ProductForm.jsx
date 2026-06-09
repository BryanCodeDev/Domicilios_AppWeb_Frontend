import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../components/shared/Button.jsx';
import { AlertCircle } from 'lucide-react';

const productSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres').max(150, 'Máximo 150 caracteres').min(1, 'Nombre requerido'),
  descripcion: z.string().max(300, 'Máximo 300 caracteres').optional(),
  precio: z.number().min(1, 'Precio debe ser mayor a 0').min(1, 'Precio requerido'),
  disponible: z.boolean().default(true)
});

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: { disponible: true }
  });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-2xl font-bold text-text tracking-tight mb-8'>
        {isEditing ? 'Editar' : 'Crear'} Producto
      </h1>
      <div className='bg-surface border border-subtle rounded-xl p-5 sm:p-6'>
        <form onSubmit={handleSubmit((data) => console.log(data))} className='space-y-5' noValidate>
          <div className='space-y-1.5'>
            <label htmlFor='nombre' className='block text-sm font-medium text-text mb-1.5'>Nombre</label>
            <input
              id='nombre'
              type='text'
              placeholder='Nombre del producto'
              {...register('nombre')}
              className={'input w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.nombre ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
            />
            {errors.nombre && (
              <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                <AlertCircle size={12} strokeWidth={2} />
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div className='space-y-1.5'>
            <label htmlFor='descripcion' className='block text-sm font-medium text-text mb-1.5'>Descripción</label>
            <textarea
              id='descripcion'
              placeholder='Descripción del producto'
              {...register('descripcion')}
              className={'input min-h-24 resize-none w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.descripcion ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
            />
            {errors.descripcion && (
              <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                <AlertCircle size={12} strokeWidth={2} />
                {errors.descripcion.message}
              </p>
            )}
          </div>
          <div className='space-y-1.5'>
            <label htmlFor='precio' className='block text-sm font-medium text-text mb-1.5'>Precio</label>
            <input
              id='precio'
              type='number'
              placeholder='0'
              {...register('precio', { valueAsNumber: true })}
              className={'input w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.precio ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
            />
            {errors.precio && (
              <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                <AlertCircle size={12} strokeWidth={2} />
                {errors.precio.message}
              </p>
            )}
          </div>
          <div className='flex items-center gap-3'>
            <input
              type='checkbox'
              id='disponible'
              {...register('disponible')}
              className='w-4 h-4 rounded border-subtle bg-surface text-primary focus:ring-primary/20'
            />
            <label htmlFor='disponible' className='text-sm text-text'>Disponible para la venta</label>
          </div>
          <div className='flex justify-end gap-3 pt-4 border-t border-subtle'>
            <Button type='button' variant='ghost' onClick={() => navigate('/business/catalog')}>Cancelar</Button>
            <Button type='submit' variant='primary' disabled={isSubmitting}>{isEditing ? 'Actualizar' : 'Crear'} Producto</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
