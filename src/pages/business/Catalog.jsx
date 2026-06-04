import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar.jsx';
import Button from '../../components/shared/Button.jsx';
import { Plus, Edit3, Power } from 'lucide-react';

const BusinessCatalog = () => {
  const products = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto', precio: 25000, disponible: true },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto', precio: 18000, disponible: false },
  ];

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Mi Catálogo</h1>
            <p className="text-brand-muted mt-1">Gestiona tus productos</p>
          </div>
          <Link to="/business/products/new"><Button icon={Plus}>Nuevo Producto</Button></Link>
        </div>

        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="card hover:border-brand-primary/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-brand-text">{product.nombre}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.disponible ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {product.disponible ? 'Disponible' : 'Agotado'}
                    </span>
                  </div>
                  <p className="text-sm text-brand-muted">{product.descripcion}</p>
                  <p className="font-bold text-brand-primary mt-2">${product.precio.toLocaleString('es-CO')}</p>
                </div>
                <div className="flex gap-2 sm:self-center">
                  <Link to={`/business/products/${product.id}/edit`} className="flex-1 sm:flex-none">
                    <Button variant="secondary" size="sm" icon={Edit3} className="w-full sm:w-auto">Editar</Button>
                  </Link>
                  <Button variant="ghost" size="sm" icon={Power} className="text-red-400 hover:text-red-300!">Desactivar</Button>
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
