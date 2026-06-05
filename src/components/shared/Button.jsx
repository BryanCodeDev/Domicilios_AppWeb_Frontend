import React, { forwardRef } from 'react';

const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 select-none';
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(({ children, variant = 'primary', size = 'md', className = '', disabled, loading, icon: Icon, ...props }, ref) => {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md disabled:shadow-none',
    secondary: 'bg-transparent text-primary border border-subtle hover:border-primary hover:bg-primary-light',
    outline: 'bg-transparent text-muted border border-subtle hover:border-muted hover:text-text',
    ghost: 'bg-transparent text-muted hover:text-text hover:bg-secondary-light border border-transparent',
    danger: 'bg-error text-white hover:bg-error/90 shadow-sm hover:shadow-md',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {Icon && !loading && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} strokeWidth={1.75} />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
