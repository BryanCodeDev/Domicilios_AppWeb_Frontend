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
      admin: 'rgba(168,85,247,0.1)',
      cliente: 'rgba(59,130,246,0.1)',
      repartidor: 'rgba(34,197,94,0.1)',
      negocio: 'rgba(255,184,0,0.1)',
    };
    const textColors = {
      admin: '#C084FC',
      cliente: '#60A5FA',
      repartidor: '#4ADE80',
      negocio: '#FFB800',
    };
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{
        background: colors[rol] || '#1F1F1F',
        color: textColors[rol] || '#A0A0A0',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        {rol}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display" style={{ fontFamily: 'Syne, sans-serif', color: '#F5F5F5' }}>Gestión de Usuarios</h1>
            <p className="mt-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Administra todos los usuarios de la plataforma</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm rounded-full px-3 py-1.5" style={{
              color: '#A0A0A0',
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              {users.length} usuarios
            </span>
            <button onClick={fetchUsers} className="p-2 rounded-lg transition" style={{ color: '#A0A0A0' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: '#1F1F1F' }} />)}</div>
        ) : (
          <div className="rounded-2xl overflow-hidden p-0" style={{
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Usuario</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Rol</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Estado</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {users.map(user => (
                  <tr key={user.id} className="transition-colors" onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,77,0,0.08)' }}>
                          <span className="text-sm font-bold" style={{ color: '#FF4D00', fontFamily: 'Syne, sans-serif' }}>{user.nombre?.charAt(0) || '?'}</span>
                        </div>
                        <span className="font-medium" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>{user.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono" style={{ color: '#A0A0A0' }}>{user.email}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.rol)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium`} style={{
                        background: user.activo ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        color: user.activo ? '#4ADE80' : '#F87171',
                        fontFamily: 'DM Sans, sans-serif'
                      }}>
                        {user.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 px-3 py-1.5 text-sm" style={{
                        color: '#A0A0A0',
                        background: 'transparent',
                        fontFamily: 'DM Sans, sans-serif'
                      }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Editar</button>
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