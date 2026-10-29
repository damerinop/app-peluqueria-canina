'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaCitaPage() {
  const router = useRouter();
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [tutores, setTutores] = useState<any[]>([]);
  const [trabajadores, setTrabajadores] = useState<any[]>([]);
  const [servicios, setServicios] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    mascota_id: '',
    trabajador_id: '',
    servicio_id: ''
  });

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/mascota').then((res) => res.json()),
      fetch('http://localhost:4000/tutor').then((res) => res.json()),
      fetch('http://localhost:4000/trabajador').then((res) => res.json()),
      fetch('http://localhost:4000/servicios').then((res) => res.json())
    ])
      .then(([mascData, tutorData, trabData, servData]) => {
        if (Array.isArray(mascData)) setMascotas(mascData);
        if (Array.isArray(tutorData)) setTutores(tutorData);
        if (Array.isArray(trabData)) setTrabajadores(trabData);
        if (Array.isArray(servData)) setServicios(servData);
      })
      .catch((err) => console.error('Error al cargar datos:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: formData.fecha,
          hora: formData.hora,
          mascota_id: Number(formData.mascota_id),
          trabajador_id: Number(formData.trabajador_id),
          servicio_id: Number(formData.servicio_id)
        })
      });

      if (response.ok) {
        alert('¡Cita agendada con éxito!');
        router.push('/agenda');
      } else {
        alert('Hubo un error al guardar la cita.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '25px', color: '#0d6efd', fontWeight: 'bold', textAlign: 'center' }}>Agendar Nueva Cita</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Fecha *</label>
            <input 
              type="date" 
              name="fecha" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.fecha} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Hora *</label>
            <input 
              type="time" 
              name="hora" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.hora} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Mascota y Dueño *</label>
            <select 
              name="mascota_id" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.mascota_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione una mascota</option>
              {mascotas.map((m: any) => {
                const tutorEncontrado = tutores.find(
                  (t) => 
                    String(t.id) === String(m.tutor_id) || 
                    String(t.celular) === String(m.tutor_id)
                );

                const celularDueno = tutorEncontrado ? tutorEncontrado.celular : 'Sin teléfono';

                return (
                  <option key={m.id} value={m.id}>
                    🐶 {m.nombre} (Dueño: {tutorEncontrado ? `${tutorEncontrado.nombre} ${tutorEncontrado.apellido}` : 'Desconocido'} — Cel: {celularDueno})
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Trabajador (Groomer) *</label>
            <select 
              name="trabajador_id" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.trabajador_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione un trabajador</option>
              {trabajadores.map((t: any) => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Servicio *</label>
            <select 
              name="servicio_id" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.servicio_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione un servicio</option>
              {servicios.map((s: any) => (
                <option key={s.id} value={s.id}>{s.descripcion || s.nombre} (${s.precio})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Guardar Cita
            </button>
            <button 
              type="button" 
              style={{ flex: 1, padding: '12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => router.push('/agenda')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}