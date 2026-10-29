'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AgendaPage() {
  const router = useRouter();
  const [citas, setCitas] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [servicios, setServicios] = useState<any[]>([]);
  const [trabajadores, setTrabajadores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/citas').then((res) => res.json()),
      fetch('http://localhost:4000/mascota').then((res) => res.json()),
      fetch('http://localhost:4000/servicios').then((res) => res.json()),
      fetch('http://localhost:4000/trabajador').then((res) => res.json())
    ])
      .then(([citasData, mascData, servData, trabData]) => {
        if (Array.isArray(citasData)) setCitas(citasData);
        if (Array.isArray(mascData)) setMascotas(mascData);
        if (Array.isArray(servData)) setServicios(servData);
        if (Array.isArray(trabData)) setTrabajadores(trabData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar la agenda:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>Agenda de Citas</h2>
            <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>Control de horarios, mascotas y groomers</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => router.push('/agenda/nuevo')}
              style={{ padding: '10px 20px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              + Nueva Cita
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
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando agenda...</p>
        ) : citas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
            <p>No hay citas programadas.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#212529', color: '#fff' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>ID</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Fecha y Hora</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Mascota</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Servicio</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Trabajador</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((c: any) => {
                  const mascotaObj = mascotas.find((m) => String(m.id) === String(c.mascota_id));
                  const servicioObj = servicios.find((s) => String(s.id) === String(c.servicio_id));
                  const trabajadorObj = trabajadores.find((t) => String(t.id) === String(c.trabajador_id));

                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{c.id}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <strong>{c.fecha}</strong> <br />
                        <span style={{ color: '#6c757d', fontSize: '12px' }}>{c.hora}</span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold', color: '#0d6efd' }}>
                        🐶 {mascotaObj ? mascotaObj.nombre : `ID #${c.mascota_id}`}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {servicioObj ? servicioObj.descripcion : 'Servicio general'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        👤 {trabajadorObj ? trabajadorObj.nombre : `ID #${c.trabajador_id}`}
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