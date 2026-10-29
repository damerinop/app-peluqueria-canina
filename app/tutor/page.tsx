'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TutorPage() {
  const router = useRouter();
  const [tutores, setTutores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/tutor')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTutores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar tutores:', error);
        setLoading(false);
      });
  }, []);

  const eliminarTutor = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este tutor?')) {
      try {
        const res = await fetch(`http://localhost:4000/tutor/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setTutores(tutores.filter((t) => t.id !== id));
        } else {
          alert('No se pudo eliminar el tutor.');
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>Listado de Tutores</h2>
            <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>Gestión y control de dueños de mascotas</p>
          </div>
          <button 
            onClick={() => router.push('/tutor/nuevo')}
            style={{ padding: '10px 20px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            + Nuevo Tutor
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando tutores...</p>
        ) : tutores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
            <p>No hay tutores registrados.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#212529', color: '#fff' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>ID</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Nombre y Apellido</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Celular</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Correo</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Domicilio</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tutores.map((t: any) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{t.id}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold' }}>
                      👤 {t.nombre} {t.apellido || ''}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{t.celular}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{t.correo || 'Sin correo'}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{t.domicilio || 'Sin domicilio'}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => router.push(`/tutor/editar/${t.id}`)}
                          style={{ padding: '6px 12px', background: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => eliminarTutor(t.id)}
                          style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                        >
                          Eliminar
                        </button>
                      </div>
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
}