'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RazaPage() {
  const router = useRouter();
  const [razas, setRazas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/raza')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRazas(data);
        } else {
          setRazas([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar razas:', error);
        setRazas([]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>Listado de Razas</h2>
          <button 
            onClick={() => router.push('/raza/nuevo')}
            style={{ padding: '10px 20px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            + Nueva Raza
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando razas...</p>
        ) : razas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
            <p>No hay razas registradas.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#212529', color: '#fff' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>ID</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Nombre de la Raza</th>
                </tr>
              </thead>
              <tbody>
                {razas.map((raza: any) => (
                  <tr key={raza.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{raza.id}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{raza.nombre || raza.descripcion}</td>
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