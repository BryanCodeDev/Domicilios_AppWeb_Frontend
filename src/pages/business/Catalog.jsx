import React from 'react';
import Button from '../../components/shared/Button.jsx';
import { Plus, Edit3, Power, Package as PackageIcon } from 'lucide-react';

const Catalog = () => {
  const products = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto', precio: 25000, disponible: true },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto', precio: 18000, disponible: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text tracking-tight">Mi Catálogo</h1>
            <p className="text-muted text-sm mt-1">Gestiona tus productos</p>
          </div>
          <Button icon={Plus}>Nuevo Producto</Button>
        </div>

        <div className="space-y-3">
          {products.map(product => (
            <div key={product.id} className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-base text-text">{product.nombre}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.disponible ? 'bg-success-light text-success' : 'bg-error-light text-error'}`}>
                      {product.disponible ? 'Disponible' : 'Agotado'}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{product.descripcion}</p>
                  <p className="font-bold text-primary mt-2">${product.precio.toLocaleString('es-CO')}</p>
                </div>
                <div className="flex gap-2 sm:self-center">
                  <Button variant="secondary" size="sm" icon={Edit3}>Editar</Button>
                  <Button variant="ghost" size="sm" icon={Power} className="text-error hover:text-error">Desactivar</Button>
                </div>
              </div>
            </div>
          ))}
</div>
    </div>
  );
};

export default Catalog;
