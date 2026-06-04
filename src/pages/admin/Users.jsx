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
      admin: 'bg-purple-500/10 text-purple-400',
      cliente: 'bg-blue-500/10 text-blue-400',
      repartidor: 'bg-green-500/10 text-green-400',
      negocio: 'bg-orange-500/10 text-orange-400',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[rol] || ''}`}>{rol}</span>;
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Gestión de Usuarios</h1>
            <p className="text-brand-muted mt-1">Administra todos los usuarios de la plataforma</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-brand-muted bg-brand-surface px-3 py-1.5 rounded-full border border-brand-subtle">
              {users.length} usuarios
            </span>
            <button onClick={fetchUsers} className="p-2 rounded-lg hover:bg-brand-surface transition text-brand-muted">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-16 bg-brand-elevated rounded-xl animate-pulse" />)}</div>
        ) : (
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
                          <span className="text-sm font-bold text-brand-primary">{user.nombre?.charAt(0) || '?'}</span>
                        </div>
                        <span className="font-medium text-brand-text">{user.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-muted font-mono">{user.email}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.rol)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.activo ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {user.activo ? 'Activo' : 'Inactivo'}
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
        )}
      </div>
    </div>
  );
};

export default Users;
