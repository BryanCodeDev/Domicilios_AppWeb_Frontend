import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
};

const colors = {
  success: { border: '#22C55E', icon: '#22C55E' },
  error: { border: '#EF4444', icon: '#EF4444' },
  warning: { border: '#FFB800', icon: '#FFB800' },
  info: { border: '#3B82F6', icon: '#3B82F6' }
};

export const Toast = ({ toast }) => {
  const { id, type, message } = toast;
  const Icon = icons[type] || Info;
  const color = colors[type] || colors.info;

  return (
    <div className="bg-surface border-y-0 border-r-0 border-l-4 rounded-lg px-4 py-3 mb-2 min-w-72 max-w-xs shadow-lg animate-slide-in"
         style={{ borderLeftColor: color.border }}>
      <div className="flex items-start gap-3">
        <Icon size={18} style={{ color: color.icon }} strokeWidth={2} className="mt-0.5 shrink-0" />
        <p className="text-sm text-text flex-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>{message}</p>
      </div>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '@keyframes slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .animate-slide-in { animation: slide-in 0.3s ease-out; }';
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse items-end" aria-live="polite" aria-atomic="true">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
