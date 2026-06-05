import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button.jsx';
import { useAuthStore } from '../../store/authStore';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    // Aquí iría la carga del producto si es edición
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-text tracking-tight mb-8">
        {isEditing ? 'Editar' : 'Crear'} Producto
      </h1>
      <div className="bg-surface border border-subtle rounded-xl p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="label">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="input" required />
          </div>
          <div className="space-y-1.5">
            <label className="label">Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="input min-h-24 resize-none" />
          </div>
          <div className="space-y-1.5">
            <label className="label">Precio</label>
            <input type="number" name="precio" value={formData.precio} onChange={handleChange} className="input" required />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="disponible" name="disponible" checked={formData.disponible} onChange={handleChange} className="w-4 h-4 rounded border-subtle bg-surface text-primary focus:ring-primary/20" />
            <label htmlFor="disponible" className="text-sm text-text">Disponible para la venta</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-subtle">
            <Button type="button" variant="ghost" onClick={() => navigate('/business/catalog')}>Cancelar</Button>
            <Button type="submit" variant="primary">{isEditing ? 'Actualizar' : 'Crear'} Producto</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
