import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar.jsx';
import Button from '../../components/shared/Button.jsx';
import { Users as UsersIcon } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers([
      { id: '1', nombre: 'Bryan Admin', email: 'admin@domiapp.co', rol: 'admin', estado: 'Activo' },
      { id: '2', nombre: 'Camila Torres', email: 'camila@cliente.co', rol: 'cliente', estado: 'Activo' },
      { id: '3', nombre: 'Andrés Roa', email: 'andres@rider.co', rol: 'repartidor', estado: 'Activo' },
      { id: '4', nombre: 'El Fogón Casero', email: 'elfogon@negocio.co', rol: 'negocio', estado: 'Activo' },
    ]);
    setLoading(false);
  }, []);

  const getRoleBadge = (rol) => {
    const colors = {
      admin: 'bg-purple-500/10 text-purple-400',
      cliente: 'bg-blue-500/10 text-blue-400',
      repartidor: 'bg-green-500/10 text-green-400',
      negocio: 'bg-orange-500/10 text-orange-400',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[rol] || ''}`}>{rol}</span>;
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Gestión de Usuarios</h1>
            <p className="text-brand-muted mt-1">Administra todos los usuarios de la plataforma</p>
          </div>
          <span className="text-sm text-brand-muted bg-brand-surface px-3 py-1.5 rounded-full border border-brand-subtle">
            {users.length} usuarios
          </span>
        </div>

        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-subtle">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-brand-muted">Usuario</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-brand-muted">Email</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-brand-muted">Rol</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-brand-muted">Estado</th>
                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-brand-muted">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-subtle">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-brand-elevated/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-primary">{user.nombre.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-brand-text">{user.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-muted font-mono">{user.email}</td>
                  <td className="px-6 py-4">{getRoleBadge(user.rol)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                      {user.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
