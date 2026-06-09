import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';

const ROL_OPTIONS = [
  { value: 'cliente', label: 'Cliente', desc: 'Realiza pedidos en tu barrio' },
  { value: 'repartidor', label: 'Repartidor', desc: 'Entrega pedidos y gana dinero' },
  { value: 'negocio', label: 'Negocio', desc: 'Vende tus productos en la app' },
];

const registerSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres').min(1, 'Nombre requerido'),
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').min(1, 'Contraseña requerida'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  rol: z.enum(['cliente', 'repartidor', 'negocio'])
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

const Register = () => {
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, setError, clearErrors } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { rol: 'cliente' }
  });

  const selectedRol = ROL_OPTIONS.find(r => r.value === watch('rol')) || ROL_OPTIONS[0];

  const onSubmit = async (data) => {
    try {
      await registerUser({ ...data, rol: data.rol });
      navigate('/');
    } catch (err) {
      setError('root', { message: err.response?.data?.message || 'Error al registrarse' });
    }
  };

  const inputClass = (error) => 'input pl-10 w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (error ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60';

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4 py-12 w-full h-full'>
      <div className='w-full max-w-[460px] space-y-6'>
        <div className='text-center space-y-3'>
          <div className='inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-1'>
            <Mail className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-text tracking-tight font-display'>Crea tu cuenta</h1>
            <p className='text-muted text-sm mt-1'>Únete a la plataforma</p>
          </div>
        </div>

        <div className='bg-surface border border-subtle rounded-xl p-6 space-y-5'>
          {errors.root && (
            <div className='flex items-center gap-2.5 px-4 py-3 rounded-lg bg-error-light/60 border border-error/30 text-error text-sm'>
              <AlertCircle size={15} />
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
            <div>
              <label htmlFor='nombre' className='block text-sm font-medium text-text mb-1.5'>Nombre completo</label>
              <div className='relative'>
                <User className='absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle' />
                <input
                  id='nombre'
                  type='text'
                  placeholder='Camila Rodríguez'
                  {...register('nombre')}
                  className={inputClass(errors.nombre)}
                />
              </div>
              {errors.nombre && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-text mb-1.5'>Email</label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle' />
                <input
                  id='email'
                  type='email'
                  placeholder='tu@email.com'
                  {...register('email')}
                  className={inputClass(errors.email)}
                />
              </div>
              {errors.email && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-text mb-1.5'>Contraseña</label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle' />
                <input
                  id='password'
                  type='password'
                  placeholder='Mínimo 8 caracteres'
                  {...register('password')}
                  className={inputClass(errors.password)}
                />
              </div>
              {errors.password && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-text mb-1.5'>Confirmar contraseña</label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle' />
                <input
                  id='confirmPassword'
                  type='password'
                  placeholder='Repite tu contraseña'
                  {...register('confirmPassword')}
                  className={inputClass(errors.confirmPassword)}
                />
              </div>
              {errors.confirmPassword && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-text mb-1.5'>Tipo de cuenta</label>
              <div className='grid grid-cols-3 gap-2'>
                {ROL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type='button'
                    onClick={() => { setValue('rol', opt.value); clearErrors('rol'); }}
                    className={'flex flex-col items-center gap-1 px-2 py-3 rounded-lg border text-center transition-all duration-200 ' + (watch('rol') === opt.value ? 'bg-primary-light border-primary text-primary' : 'bg-surface border-subtle text-muted hover:border-muted hover:text-text')}
                  >
                    <span className='text-sm font-semibold'>{opt.label}</span>
                  </button>
                ))}
              </div>
              <p className='text-xs text-muted pl-1'>{selectedRol?.desc}</p>
            </div>

            <div>
              <label htmlFor='phone' className='block text-sm font-medium text-text mb-1.5'>Teléfono (opcional)</label>
              <div className='relative'>
                <Phone className='absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle' />
                <input
                  id='phone'
                  type='tel'
                  placeholder='+57 300 000 0000'
                  {...register('phone')}
                  className={inputClass(errors.phone)}
                />
              </div>
              {errors.phone && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.phone.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-lg py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 bg-primary hover:bg-primary-hover mt-2'
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        </div>

        <p className='text-center text-sm text-muted'>
          ¿Ya tienes cuenta?{' '}
          <Link to='/login' className='font-semibold text-text hover:text-primary transition-colors'>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
