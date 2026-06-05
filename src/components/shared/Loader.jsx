import React from 'react';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const Loader = ({ size = 'md', className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-subtle border-t-primary`} />
    </div>
  );
};

export default Loader;
