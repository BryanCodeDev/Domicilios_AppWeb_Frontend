import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { useOrderStore } from "../../store/orderStore";
import Button from "../../components/shared/Button.jsx";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { items, businessId: cartBusinessId, total, clearCart } = useCartStore();
  const { placeOrder, isLoading } = useOrderStore();
  const [isOrdering, setIsOrdering] = useState(false);
  
  useEffect(() => {
    if (!cartBusinessId && items.length === 0) {
      navigate("/");
    }
  }, [cartBusinessId, items, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOrdering(true);
    try {
      const orderData = {
        negocio_id: cartBusinessId || businessId,
        productos: items.map(item => ({
          producto_id: item.id,
          cantidad: item.quantity
        })),
        direccion: e.target.direccion.value,
        lat: parseFloat(e.target.lat.value),
        lng: parseFloat(e.target.lng.value),
        notas: e.target.notas.value
      };
      const order = await placeOrder(orderData);
      clearCart();
      navigate("/orders/" + order.id);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Error al realizar el pedido. Intente nuevamente.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (items.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <p className="text-muted">No hay productos en el carrito</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-secondary-light transition text-muted hover:text-text" aria-label="Volver">
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <h1 className="text-2xl font-bold text-text tracking-tight">Completar Pedido</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-surface border border-subtle rounded-xl p-5 mb-5">
          <h2 className="text-base font-semibold text-text mb-5">Direccion de entrega</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="direccion" className="label">Direccion</label>
              <div className="relative">
                <input id="direccion" name="direccion" type="text" className="input pl-10" placeholder="Calle 123 #45-67" required aria-label="Direccion de entrega" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lat" className="label">Latitud</label>
                <input id="lat" name="lat" type="number" step="any" className="input" placeholder="4.7110" required aria-label="Latitud" />
              </div>
              <div>
                <label htmlFor="lng" className="label">Longitud</label>
                <input id="lng" name="lng" type="number" step="any" className="input" placeholder="-74.0721" required aria-label="Longitud" />
              </div>
            </div>
            <div>
              <label htmlFor="notas" className="label">Notas (opcional)</label>
              <textarea id="notas" name="notas" className="input min-h-24 resize-none" placeholder="Apartamento 302, timbre verde..." aria-label="Notas del pedido" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 mb-5">
          <h2 className="text-base font-semibold text-text mb-5">Productos</h2>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-text">{item.nombre}</p>
                  <p className="text-xs text-muted">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-semibold text-primary">{"$" + (item.precio * item.quantity).toLocaleString("es-CO")}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-subtle rounded-xl p-5 mb-5">
          <h2 className="text-base font-semibold text-text mb-5">Resumen del pedido</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span>{"$" + total().toLocaleString("es-CO")}</span>
            </div>
            <div className="flex justify-between text-sm text-muted">
              <span>Domicilio</span>
              <span>$3.000</span>
            </div>
            <div className="border-t border-subtle pt-3 flex justify-between text-text font-semibold text-base">
              <span>Total</span>
              <span>{"$" + (total() + 3000).toLocaleString("es-CO")}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full rounded-lg py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 bg-primary hover:bg-primary-hover" disabled={isOrdering || isLoading}>
          {isOrdering || isLoading ? "Realizando pedido..." : "Realizar Pedido"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;

