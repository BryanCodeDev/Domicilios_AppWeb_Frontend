import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').min(1, 'Contraseña requerida')
});

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError('root', { message: err.response?.data?.message || 'Credenciales inválidas' });
    }
  };

  return (
    <div className='min-h-screen flex w-full'>
      <div className='hidden lg:flex flex-col justify-between w-1/2 bg-slate-900 dark:bg-slate-900 text-white p-12'>
        <div className='relative flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center'>
            <Zap className='w-5 h-5 text-slate-900 dark:text-slate-900' />
          </div>
          <span className='text-lg font-bold tracking-tight font-display'>DomiRapid</span>
        </div>

        <div className='relative space-y-6'>
          <h1 className='text-4xl font-bold leading-tight tracking-tight font-display'>
            La plataforma que<br />
            mueve tu negocio.
          </h1>
          <p className='text-slate-300 dark:text-slate-300 text-lg leading-relaxed max-w-sm'>
            Gestiona pedidos, negocios y repartidores desde un solo panel de control.
          </p>
        </div>

        <p className='text-slate-400 dark:text-slate-400 text-xs'>
          © 2025 DomiRapid. Todos los derechos reservados.
        </p>
      </div>

      <div className='flex-1 flex items-center justify-center px-6 py-12 bg-background'>
        <div className='w-full max-w-[400px] space-y-8'>
          <div className='flex lg:hidden items-center gap-3 mb-2'>
            <div className='w-9 h-9 rounded-lg bg-primary flex items-center justify-center'>
              <Zap className='w-4 h-4 text-white' />
            </div>
            <span className='text-lg font-bold tracking-tight font-display text-text'>DomiRapid</span>
          </div>

          <div>
            <h2 className='text-3xl font-bold text-text tracking-tight font-display'>Bienvenido de vuelta</h2>
            <p className='mt-2 text-muted'>Ingresa tus credenciales para continuar</p>
          </div>

          {errors.root && (
            <div className='flex items-center gap-3 px-4 py-3 rounded-lg bg-error-light border border-error text-error text-sm' role='alert'>
              <AlertCircle size={16} strokeWidth={2} />
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-text mb-1.5'>Email</label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle' aria-hidden='true' />
                <input
                  id='email'
                  type='email'
                  {...register('email')}
                  className={'input pl-10 w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.email ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
                  placeholder='tu@email.com'
                  autoComplete='email'
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
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle' aria-hidden='true' />
                <input
                  id='password'
                  type='password'
                  {...register('password')}
                  className={'input pl-10 pr-12 w-full rounded-lg px-3 py-2.5 text-sm transition-colors border ' + (errors.password ? 'border-[#EF4444]/60' : 'border-[#2A2A2A]') + ' bg-surface text-text placeholder:text-muted focus:outline-none focus:border-[#FF4D00]/60'}
                  placeholder='••••••••'
                  autoComplete='current-password'
                />
              </div>
              {errors.password && (
                <p className='text-xs mt-1.5 flex items-center gap-1' style={{ color: '#EF4444', fontFamily: 'DM Sans, sans-serif' }}>
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-lg py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 bg-primary hover:bg-primary-hover'
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className='pt-2 border-t border-subtle text-center'>
            <p className='text-sm text-muted'>
              ¿No tienes cuenta?{' '}
              <Link to='/register' className='font-semibold text-text hover:text-primary transition-colors'>
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
