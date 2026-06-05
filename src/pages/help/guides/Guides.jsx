import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/Button.jsx';
import { ShoppingBag, Store, Star, HelpCircle, ChevronRight } from 'lucide-react';

const Guides = () => {
  const guides = [
    { title: 'Cómo hacer un pedido', icon: ShoppingBag, to: '#' },
    { title: 'Cómo registrarte como negocio', icon: Store, to: '#' },
    { title: 'Guía de calificaciones', icon: Star, to: '#' },
    { title: 'Preguntas frecuentes', icon: HelpCircle, to: '/help' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text tracking-tight">Guías y soporte</h1>
          <p className="text-muted text-sm mt-1">Aprende a usar la plataforma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <a
                key={guide.title}
                href={guide.to}
                className="flex items-center justify-between p-5 bg-surface border border-subtle rounded-xl transition-all duration-200 hover:border-primary/30 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-secondary-light rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <span className="font-medium text-text">{guide.title}</span>
                </div>
                <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Guides;
