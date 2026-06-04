import React, { useState } from 'react';
import Button from '../../components/shared/Button.jsx';
import { HelpCircle, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: '¿Cómo hago un pedido?',
      answer: 'Selecciona un negocio, elige los productos que deseas, agrega al carrito y completa el proceso de pago.',
    },
    {
      question: '¿Puedo cancelar un pedido?',
      answer: 'Sí, puedes cancelar un pedido mientras está en estado pendiente. Ve a Mis pedidos y selecciona cancelar.',
    },
    {
      question: '¿Cómo contacto al repartidor?',
      answer: 'Una vez asignado un repartidor, podrás ver su información de contacto en la pantalla de seguimiento.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-text">Centro de ayuda</h1>
          <p className="text-brand-muted mt-1">Guías, manuales y soporte</p>
        </div>

        <div className="card">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-brand-subtle last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-brand-elevated rounded-lg transition"
                >
                  <span className="font-medium text-brand-text">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronDown size={18} className="text-brand-muted" />
                  ) : (
                    <ChevronRight size={18} className="text-brand-muted" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-brand-muted">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;