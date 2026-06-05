import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { updateProduct, getProductsByBusiness } from "../../services/api/products";
import Button from "../../components/shared/Button.jsx";
import Loader from "../../components/shared/Loader.jsx";
import { Plus, Edit3, Power, Package as PackageIcon, AlertCircle } from "lucide-react";

const Catalog = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const businessId = user?.negocio?.id;

  useEffect(() => {
    if (businessId) {
      fetchProducts();
    }
  }, [businessId]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductsByBusiness(businessId);
      setProducts(response.products || []);
    } catch (err) {
      setError("Error al cargar productos. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (product) => {
    try {
      await updateProduct(product.id, { disponible: !product.disponible });
      setProducts(products.map(p => p.id === product.id ? { ...p, disponible: !p.disponible } : p));
    } catch (err) {
      alert("Error al actualizar producto");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center py-20">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text tracking-tight">Mi Catalogo</h1>
          <p className="text-muted text-sm mt-1">Gestiona tus productos</p>
        </div>
        <Button 
          icon={Plus} 
          onClick={() => navigate("/business/products/new")}
          aria-label="Crear nuevo producto"
        >
          Nuevo Producto
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg bg-error-light border border-error text-error text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-16 bg-surface border border-subtle rounded-xl">
          <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageIcon size={28} className="text-subtle" />
          </div>
          <p className="text-text font-medium mb-1">No tienes productos</p>
          <p className="text-sm text-muted mb-4">Crea tu primer producto para empezar</p>
          <Button variant="primary" icon={Plus} onClick={() => navigate("/business/products/new")}>
            Crear producto
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(product => (
            <div key={product.id} className="bg-surface border border-subtle rounded-xl p-5 transition-all duration-200 hover:border-primary/30">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-base text-text">{product.nombre}</h3>
                    <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + (product.disponible ? "bg-success-light text-success" : "bg-error-light text-error")}>
                      {product.disponible ? "Disponible" : "Agotado"}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{product.descripcion}</p>
                  <p className="font-bold text-primary mt-2">{"$" + (product.precio || 0).toLocaleString("es-CO")}</p>
                </div>
                <div className="flex gap-2 sm:self-center">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    icon={Edit3}
                    onClick={() => navigate("/business/products/" + product.id + "/edit")}
                    aria-label={"Editar " + product.nombre}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant={product.disponible ? "ghost" : "secondary"}
                    size="sm" 
                    icon={Power}
                    onClick={() => handleToggleAvailability(product)}
                    className={product.disponible ? "text-error hover:text-error" : ""}
                    aria-label={product.disponible ? "Desactivar producto" : "Activar producto"}
                  >
                    {product.disponible ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;

