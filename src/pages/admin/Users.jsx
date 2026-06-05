import React, { useEffect, useState } from 'react';
import Button from '../../components/shared/Button.jsx';
import { UsersIcon, RefreshCw } from 'lucide-react';
import { getAllUsers } from '../../services/api/admin';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleBadge = (rol) => {
    const colors = {
      admin: 'bg-primary-light text-primary',
      cliente: 'bg-info-light text-info',
      repartidor: 'bg-success-light text-success',
      negocio: 'bg-warning-light text-warning',
    };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[rol] || 'bg-secondary-light text-muted'}`}>{rol}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted text-sm mt-1">Administra todos los usuarios de la plataforma</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm rounded-full px-3 py-1.5 text-muted bg-surface border border-subtle">
            {users.length} usuarios
          </span>
          <button onClick={fetchUsers} className="p-2 rounded-lg text-muted hover:text-text hover:bg-secondary-light transition-colors">
            <RefreshCw size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div> {/* <-- Aquí terminaba correctamente el encabezado */}

      {/* Contenido Principal: Loading o Tabla */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-secondary-light rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-surface border border-subtle rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-subtle bg-secondary-light/50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Usuario</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Rol</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Estado</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {users.map(user => (
                  <tr key={user.id} className="transition-colors hover:bg-secondary-light/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{user.nombre?.charAt(0) || '?'}</span>
                        </div>
                        <span className="font-medium text-text">{user.nombre}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted font-mono">{user.email}</td>
                    <td className="px-5 py-4">{getRoleBadge(user.rol)}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.activo ? 'bg-success-light text-success' : 'bg-error-light text-error'}`}>
                        {user.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-secondary-light transition-colors">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;