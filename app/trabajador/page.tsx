'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrabajadorPage() {
  const router = useRouter();
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/trabajador')
      .then((res) => res.json())
      .then((data) => {
        setTrabajadores(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error al cargar los trabajadores:', error));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>Listado de Trabajadores (Groomers)</h2>
          <button 
            onClick={() => router.push('/trabajador/nuevo')}
            style={{ padding: '10px 20px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            + Registrar Nuevo Trabajador
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando trabajadores...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#212529', color: '#fff' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>ID</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Nombre</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Apellido</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Celular</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Correo</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Domicilio</th>
                </tr>
              </thead>
              <tbody>
                {trabajadores.map((trabajador: any) => (
                  <tr key={trabajador.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{trabajador.id}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{trabajador.nombre}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{trabajador.apellido || 'N/A'}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{trabajador.celular}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{trabajador.correo || 'N/A'}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{trabajador.domicilio}</td>
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