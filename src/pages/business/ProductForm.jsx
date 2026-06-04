import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import { createProduct, updateProduct } from '../../services/api/products';
import { useAuthStore } from '../../store/authStore';

const ProductForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    disponible: true
  });
  const navigate = useNavigate();
  const isEditing = !!id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, precio: Number(formData.precio), business_id: useAuthStore.getState().user?.business?.id };
      if (id) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }
      navigate('/business/catalog');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-display mb-8">
          {isEditing ? 'Editar' : 'Crear'} Producto
        </h1>
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-1.5">Nombre</label>
            <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-1.5">Descripción</label>
            <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className="input min-h-24 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-1.5">Precio</label>
            <input type="number" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })} className="input" required />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="disponible" checked={formData.disponible} onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })} className="w-4 h-4 rounded border-brand-subtle bg-brand-surface text-brand-primary focus:ring-brand-primary" />
            <label htmlFor="disponible" className="text-sm text-brand-muted">Disponible para la venta</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => navigate('/business/catalog')}>Cancelar</Button>
            <Button type="submit" variant="primary">{isEditing ? 'Actualizar' : 'Crear'} Producto</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
