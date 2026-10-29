'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaAsistenciaPage() {
  const router = useRouter();
  const [citas, setCitas] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    cita_id: '',
    observaciones: '',
    costo: '',
    tipo_pago: 'Efectivo',
    pendiente: 'true'
  });

  useEffect(() => {
    fetch('http://localhost:4000/citas')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCitas(data);
      })
      .catch((error) => console.error('Error al cargar citas:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Creamos primero el registro de pago en el servidor
      const pagoRes = await fetch('http://localhost:4000/pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          costo: Number(formData.costo),
          pendiente: formData.pendiente === 'true',
          tipo_pago: formData.tipo_pago
        })
      });
      const pagoData = await pagoRes.json();

      // 2. Creamos la asistencia vinculando la cita y el pago generado
      const asistenciaRes = await fetch('http://localhost:4000/detalle_asistencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cita_id: Number(formData.cita_id),
          observaciones: formData.observaciones || null,
          pago_id: pagoData.id
        })
      });

      if (asistenciaRes.ok) {
        alert('¡Asistencia y pago registrado con éxito!');
        router.push('/asistencias');
      } else {
        alert('Error al registrar la asistencia.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '25px', color: '#198754', fontWeight: 'bold', textAlign: 'center' }}>Registrar Nueva Asistencia</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Seleccionar Cita *</label>
            <select 
              name="cita_id" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.cita_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione una cita programada</option>
              {citas.map((c: any) => (
                <option key={c.id} value={c.id}>
                  Cita #{c.id} - Fecha: {c.fecha} ({c.hora})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Costo del Servicio ($) *</label>
            <input 
              type="number" 
              name="costo" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.costo} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Tipo de Pago *</label>
            <select 
              name="tipo_pago" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.tipo_pago} 
              onChange={handleChange}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta - Débito">Tarjeta - Débito</option>
              <option value="Tarjeta - Crédito">Tarjeta - Crédito</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Estado del Pago *</label>
            <select 
              name="pendiente" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.pendiente} 
              onChange={handleChange}
            >
              <option value="false">Pagado</option>
              <option value="true">Pendiente</option>
            </select>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Observaciones</label>
            <textarea 
              name="observaciones" 
              rows={3}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.observaciones} 
              onChange={handleChange} 
              placeholder="Ej: Tutor dejó accesorios o notas especiales..."
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Guardar Asistencia
            </button>
            <button 
              type="button" 
              style={{ flex: 1, padding: '12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => router.push('/asistencias')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}