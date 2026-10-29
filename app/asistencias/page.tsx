'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AsistenciasPage() {
  const router = useRouter();
  const [asistencias, setAsistencias] = useState<any[]>([]);
  const [citas, setCitas] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [tutores, setTutores] = useState<any[]>([]);
  const [servicios, setServicios] = useState<any[]>([]);
  const [pagos, setPagos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/detalle_asistencia').then((res) => res.json()),
      fetch('http://localhost:4000/citas').then((res) => res.json()),
      fetch('http://localhost:4000/mascota').then((res) => res.json()),
      fetch('http://localhost:4000/tutor').then((res) => res.json()),
      fetch('http://localhost:4000/servicios').then((res) => res.json()),
      fetch('http://localhost:4000/pago').then((res) => res.json())
    ])
      .then(([asistData, citasData, mascData, tutorData, servData, pagoData]) => {
        if (Array.isArray(asistData)) setAsistencias(asistData);
        if (Array.isArray(citasData)) setCitas(citasData);
        if (Array.isArray(mascData)) setMascotas(mascData);
        if (Array.isArray(tutorData)) setTutores(tutorData);
        if (Array.isArray(servData)) setServicios(servData);
        if (Array.isArray(pagoData)) setPagos(pagoData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar asistencias:', error);
        setLoading(false);
      });
  }, []);

  const totalRecaudado = pagos
    .filter((p) => !p.pendiente)
    .reduce((acc, curr) => acc + (Number(curr.costo) || 0), 0);

  const totalPendiente = pagos
    .filter((p) => p.pendiente)
    .reduce((acc, curr) => acc + (Number(curr.costo) || 0), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>Resumen de Asistencias y Caja</h2>
            <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
              Control de atenciones realizadas, observaciones y cobranza
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => router.push('/asistencias/nuevo')}
              style={{ padding: '10px 20px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              + Nueva Asistencia
            </button>
            <button 
              onClick={() => router.push('/')}
              style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ← Volver
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#d1e7dd', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #198754' }}>
            <span style={{ fontSize: '13px', color: '#0f5132', fontWeight: 'bold' }}>TOTAL COBRADO</span>
            <h3 style={{ margin: '5px 0 0 0', color: '#0f5132', fontSize: '24px', fontWeight: 'bold' }}>
              ${totalRecaudado.toLocaleString()}
            </h3>
          </div>
          <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ffc107' }}>
            <span style={{ fontSize: '13px', color: '#856404', fontWeight: 'bold' }}>POR COBRAR (PENDIENTE)</span>
            <h3 style={{ margin: '5px 0 0 0', color: '#856404', fontSize: '24px', fontWeight: 'bold' }}>
              ${totalPendiente.toLocaleString()}
            </h3>
          </div>
          <div style={{ background: '#e2e3e5', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #6c757d' }}>
            <span style={{ fontSize: '13px', color: '#41464b', fontWeight: 'bold' }}>ATENCIONES REGISTRADAS</span>
            <h3 style={{ margin: '5px 0 0 0', color: '#41464b', fontSize: '24px', fontWeight: 'bold' }}>
              {asistencias.length}
            </h3>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando resumen de asistencias...</p>
        ) : asistencias.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
            <p>No hay registros de asistencia.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#212529', color: '#fff' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>ID</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Fecha / Hora Cita</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Mascota y Tutor</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Servicio</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Observaciones</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Monto</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Estado Pago</th>
                </tr>
              </thead>
              <tbody>
                {asistencias.map((a: any) => {
                  const citaObj = citas.find((c) => String(c.id) === String(a.cita_id));
                  const mascotaObj = mascotas.find((m) => String(m.id) === String(citaObj?.mascota_id));
                  const tutorObj = tutores.find(
                    (t) => String(t.celular) === String(mascotaObj?.tutor_id) || String(t.id) === String(mascotaObj?.tutor_id)
                  );
                  const servicioObj = servicios.find((s) => String(s.id) === String(citaObj?.servicio_id));
                  const pagoObj = pagos.find((p) => String(p.id) === String(a.pago_id));

                  return (
                    <tr key={a.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold' }}>#{a.id}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {citaObj ? (
                          <>
                            <strong>{citaObj.fecha}</strong> <br />
                            <small style={{ color: '#6c757d' }}>{citaObj.hora}</small>
                          </>
                        ) : (
                          'Cita N/A'
                        )}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#0d6efd' }}>🐶 {mascotaObj ? mascotaObj.nombre : 'Mascota N/A'}</strong> <br />
                        <small style={{ color: '#6c757d' }}>
                          👤 {tutorObj ? `${tutorObj.nombre} (${tutorObj.celular})` : 'Tutor N/A'}
                        </small>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {servicioObj ? servicioObj.descripcion : 'Servicio N/A'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6', fontStyle: a.observaciones ? 'normal' : 'italic', color: a.observaciones ? '#212529' : '#6c757d' }}>
                        {a.observaciones || 'Sin observaciones'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold' }}>
                        {pagoObj ? `$${pagoObj.costo.toLocaleString()}` : '$0'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {pagoObj ? (
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '12px', 
                            fontWeight: 'bold',
                            backgroundColor: pagoObj.pendiente ? '#fff3cd' : '#d1e7dd',
                            color: pagoObj.pendiente ? '#856404' : '#0f5132'
                          }}>
                            {pagoObj.pendiente ? `Pendiente (${pagoObj.tipo_pago})` : `Pagado (${pagoObj.tipo_pago})`}
                          </span>
                        ) : (
                          <span style={{ color: '#6c757d', fontSize: '12px' }}>Sin pago registrado</span>
                        )}
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