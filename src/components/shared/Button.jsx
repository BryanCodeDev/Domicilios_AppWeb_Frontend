import React, { forwardRef } from 'react';

const variants = {
  primary: 'text-white',
  secondary: 'text-brand-background',
  outline: 'border hover:border-brand-primary hover:text-brand-primary',
  ghost: 'text-brand-muted hover:text-brand-text',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = forwardRef(({ children, variant = 'primary', size = 'md', className = '', disabled, loading, icon: Icon, ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const getBackground = () => {
    if (variant === 'primary') return 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)';
    if (variant === 'secondary') return 'linear-gradient(135deg, #FFB800 0%, #FF4D00 100%)';
    return '';
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      style={variant === 'primary' || variant === 'secondary' ? { background: getBackground() } : {}}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {Icon && !loading && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;