'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarMascotaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [tutores, setTutores] = useState<any[]>([]);
  const [razas, setRazas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nombre: '',
    fecha_de_nacimiento: '',
    peso: '',
    caracter: '',
    estructura: '',
    antecedentes_medicos: '',
    tutor_id: '',
    raza_id: ''
  });

  useEffect(() => {
    if (id) {
      Promise.all([
        fetch(`http://localhost:4000/mascota/${id}`).then((res) => res.json()),
        fetch('http://localhost:4000/tutor').then((res) => res.json()),
        fetch('http://localhost:4000/raza').then((res) => res.json())
      ])
        .then(([mascData, tutorData, razaData]) => {
          if (mascData) {
            setFormData({
              nombre: mascData.nombre || '',
              fecha_de_nacimiento: mascData.fecha_de_nacimiento || '',
              peso: mascData.peso || '',
              caracter: mascData.caracter || '',
              estructura: mascData.estructura || '',
              antecedentes_medicos: mascData.antecedentes_medicos || '',
              tutor_id: mascData.tutor_id || '',
              raza_id: mascData.raza_id || ''
            });
          }
          if (Array.isArray(tutorData)) setTutores(tutorData);
          if (Array.isArray(razaData)) setRazas(razaData);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error al cargar datos:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/mascota/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Number(id),
          nombre: formData.nombre,
          fecha_de_nacimiento: formData.fecha_de_nacimiento || null,
          peso: formData.peso ? Number(formData.peso) : null,
          caracter: formData.caracter || null,
          estructura: formData.estructura || null,
          antecedentes_medicos: formData.antecedentes_medicos || null,
          tutor_id: Number(formData.tutor_id) || formData.tutor_id,
          raza_id: Number(formData.raza_id)
        })
      });

      if (response.ok) {
        alert('¡Mascota actualizada con éxito!');
        router.push('/mascota');
      } else {
        alert('Hubo un error al actualizar la mascota.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando datos de la mascota...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '25px', color: '#ffc107', fontWeight: 'bold', textAlign: 'center' }}>Editar Mascota</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Nombre de la Mascota *</label>
            <input 
              type="text" 
              name="nombre" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Fecha de Nacimiento</label>
            <input 
              type="date" 
              name="fecha_de_nacimiento" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.fecha_de_nacimiento} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Peso (kg)</label>
            <input 
              type="number" 
              step="0.1" 
              name="peso" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.peso} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Tutor / Dueño *</label>
            <select 
              name="tutor_id" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.tutor_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione un tutor</option>
              {tutores.map((t: any) => (
                <option key={t.id} value={t.id}>
                  👤 {t.nombre} {t.apellido || ''} (Celular: {t.celular})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Raza *</label>
            <select 
              name="raza_id" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.raza_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione una raza</option>
              {razas.map((r: any) => (
                <option key={r.id} value={r.id}>{r.nombre}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Carácter</label>
            <input 
              type="text" 
              name="caracter" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.caracter} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Estructura / Descripción física</label>
            <input 
              type="text" 
              name="estructura" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.estructura} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Antecedentes Médicos</label>
            <input 
              type="text" 
              name="antecedentes_medicos" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.antecedentes_medicos} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Guardar Cambios
            </button>
            <button 
              type="button" 
              style={{ flex: 1, padding: '12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => router.push('/mascota')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}