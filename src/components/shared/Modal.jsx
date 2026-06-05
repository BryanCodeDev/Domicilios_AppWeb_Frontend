import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} bg-surface border border-subtle rounded-xl shadow-lg animate-in`}>
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-subtle">
            {title && <h3 className="text-lg font-semibold text-text">{title}</h3>}
            {onClose && (
              <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-secondary-light transition-colors">
                <X size={20} strokeWidth={1.75} />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
