import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
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
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-text">Guías, manuales y soporte</h1>
          <p className="text-brand-muted mt-1">Aprende a usar la plataforma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <a
              key={guide.title}
              href={guide.to}
              className="card flex items-center justify-between group hover:border-brand-primary/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <guide.icon size={24} className="text-brand-primary" />
                </div>
                <span className="font-medium text-brand-text">{guide.title}</span>
              </div>
              <ChevronRight size={18} className="text-brand-muted group-hover:text-brand-primary transition" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides;