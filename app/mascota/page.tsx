'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MascotasPage() {
  const router = useRouter();
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [tutores, setTutores] = useState<any[]>([]);
  const [razas, setRazas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/mascota').then((res) => res.json()),
      fetch('http://localhost:4000/tutor').then((res) => res.json()),
      fetch('http://localhost:4000/raza').then((res) => res.json()).catch(() => [])
    ])
      .then(([mascData, tutorData, razaData]) => {
        if (Array.isArray(mascData)) setMascotas(mascData);
        if (Array.isArray(tutorData)) setTutores(tutorData);
        if (Array.isArray(razaData)) setRazas(razaData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar datos de mascotas:', error);
        setLoading(false);
      });
  }, []);

  const eliminarMascota = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        await fetch(`http://localhost:4000/mascota/${id}`, { method: 'DELETE' });
        setMascotas(mascotas.filter((m) => m.id !== id));
      } catch (error) {
        console.error('Error al eliminar mascota:', error);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ color: '#198754', fontWeight: 'bold', margin: 0 }}>Gestión de Mascotas</h2>
            <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>Pacientes caninos, razas y relación con sus tutores</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => router.push('/herramientas')}
              style={{ padding: '10px 20px', background: '#10099a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Herramientas
            </button>
            <button 
              onClick={() => router.push('/mascota/nuevo')}
              style={{ padding: '10px 20px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              + Nueva Mascota
            </button>
            <button 
              onClick={() => router.push('/')}
              style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ← Volver
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando mascotas...</p>
        ) : mascotas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
            <p>No hay mascotas registradas.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#212529', color: '#fff' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>ID</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Nombre / Peso</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Raza</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Tutor y Contacto</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Carácter / Antecedentes</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mascotas.map((m: any) => {
                  const tutorObj = tutores.find(
                    (t) => String(t.id) === String(m.tutor_id) || String(t.celular) === String(m.tutor_id)
                  );
                  const razaObj = razas.find((r) => String(r.id) === String(m.raza_id));

                  return (
                    <tr key={m.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold' }}>#{m.id}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#198754', fontSize: '15px' }}>🐶 {m.nombre}</strong> <br />
                        <small style={{ color: '#6c757d' }}>⚖️ {m.peso} kg</small>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {razaObj ? razaObj.nombre : `Raza ID: ${m.raza_id}`}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {tutorObj ? (
                          <>
                            <strong>👤 {tutorObj.nombre} {tutorObj.apellido || ''}</strong> <br />
                            <span style={{ color: '#6c757d', fontSize: '12px' }}>📞 Cel: {tutorObj.celular} (ID Tutor: {tutorObj.id})</span>
                          </>
                        ) : (
                          <span style={{ color: '#dc3545', fontSize: '12px' }}>Tutor no encontrado (ID: {m.tutor_id})</span>
                        )}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6', fontSize: '13px' }}>
                        <div><strong>Carácter:</strong> {m.caracter || 'N/A'}</div>
                        <div style={{ color: m.antecedentes_medicos ? '#dc3545' : '#6c757d', marginTop: '3px' }}>
                          <strong>Médico:</strong> {m.antecedentes_medicos || 'Sin antecedentes'}
                        </div>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => router.push(`/mascota/editar/${m.id}`)}
                            style={{ padding: '6px 12px', background: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarMascota(m.id)}
                            style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}