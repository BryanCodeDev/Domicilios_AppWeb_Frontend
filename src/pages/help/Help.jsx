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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-text tracking-tight">Centro de ayuda</h1>
          <p className="text-muted text-sm mt-1">Guías, manuales y soporte</p>
        </div>

        <div className="bg-surface border border-subtle rounded-xl divide-y divide-subtle">
          {faqs.map((faq, index) => (
            <div key={index} className={index !== faqs.length - 1 ? 'border-b border-subtle' : ''}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-secondary-light"
              >
                <span className="font-medium text-text">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronDown size={18} className="text-muted shrink-0 ml-4" />
                ) : (
                  <ChevronRight size={18} className="text-muted shrink-0 ml-4" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5">
                  <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
</div>
    </div>
  );
};

export default Help;
