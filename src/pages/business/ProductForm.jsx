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
        <h1 className="text-3xl font-bold font-display mb-8" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>
          {isEditing ? 'Editar' : 'Crear'} Producto
        </h1>
        <form onSubmit={handleSubmit} className="rounded-2xl p-4 space-y-4" style={{
          background: '#161616',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Nombre</label>
            <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="input w-full px-4 py-3 rounded-lg transition" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Descripción</label>
            <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className="input w-full min-h-24 resize-none rounded-lg transition" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Precio</label>
            <input type="number" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })} className="input w-full px-4 py-3 rounded-lg transition" required />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="disponible" checked={formData.disponible} onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })} className="w-4 h-4 rounded" style={{
              borderColor: '#5A5A5A',
              background: '#1F1F1F',
              accentColor: '#FF4D00'
            }} />
            <label htmlFor="disponible" className="text-sm" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Disponible para la venta</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-4 py-2" style={{
              color: '#A0A0A0',
              background: 'transparent',
              fontFamily: 'DM Sans, sans-serif'
            }} onClick={() => navigate('/business/catalog')} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Cancelar</button>
            <button type="submit" className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-4 py-2" style={{
              background: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 100%)',
              color: '#FFFFFF',
              fontFamily: 'DM Sans, sans-serif'
            }}>{isEditing ? 'Actualizar' : 'Crear'} Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;