import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import { Plus, Edit3, Power } from 'lucide-react';

const BusinessCatalog = () => {
  const products = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto', precio: 25000, disponible: true },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto', precio: 18000, disponible: false },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Mi Catálogo</h1>
            <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Gestiona tus productos</p>
          </div>
          <Link to="/business/products/new"><button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-4 py-2" style={{
            background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)',
            color: '#FFFFFF',
            fontFamily: 'DM Sans, sans-serif'
          }}><Plus size={16} /> Nuevo Producto</button></Link>
        </div>

        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="rounded-2xl p-4 transition-all duration-300" style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)'
            }} onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,77,0,0.4)'} onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg" style={{ color: '#F5F5F5', fontFamily: 'Syne, sans-serif' }}>{product.nombre}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium`} style={{
                      background: product.disponible ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      color: product.disponible ? '#4ADE80' : '#F87171',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      {product.disponible ? 'Disponible' : 'Agotado'}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>{product.descripcion}</p>
                  <p className="font-bold mt-2" style={{ color: '#FF4D00', fontFamily: 'Syne, sans-serif' }}>${product.precio.toLocaleString('es-CO')}</p>
                </div>
                <div className="flex gap-2 sm:self-center">
                  <Link to={`/business/products/${product.id}/edit`} className="flex-1 sm:flex-none">
                    <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm w-full sm:w-auto" style={{
                      background: '#1F1F1F',
                      color: '#F5F5F5',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'DM Sans, sans-serif'
                    }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = '#1F1F1F'}>
                      <Edit3 size={14} /> Editar
                    </button>
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                    color: '#F87171',
                    background: 'transparent',
                    fontFamily: 'DM Sans, sans-serif'
                  }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <Power size={14} /> Desactivar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessCatalog;