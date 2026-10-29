'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaMascotaPage() {
  const router = useRouter();
  const [tutores, setTutores] = useState([]);
  const [razas, setRazas] = useState([]);
  
  const [formData, setFormData] = useState({
    nombre: '',
    peso: '',
    caracter: '',
    antecedentes_medicos: '',
    estructura: '',
    fecha_de_nacimiento: '',
    tutor_id: '',
    raza_id: ''
  });

  // Cargamos los tutores y razas disponibles para los selectores
  useEffect(() => {
    fetch('http://localhost:4000/tutor')
      .then((res) => res.json())
      .then((data) => setTutores(data))
      .catch((err) => console.error('Error cargando tutores:', err));

    fetch('http://localhost:4000/raza')
      .then((res) => res.json())
      .then((data) => setRazas(data))
      .catch((err) => console.error('Error cargando razas:', err));
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
      const response = await fetch('http://localhost:4000/mascota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          peso: Number(formData.peso),
          tutor_id: Number(formData.tutor_id),
          raza_id: Number(formData.raza_id),
          antecedentes_medicos: formData.antecedentes_medicos || null
        })
      });

      if (response.ok) {
        alert('¡Mascota registrada con éxito!');
        router.push('/mascota');
      } else {
        alert('Hubo un error al guardar la mascota.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '25px', color: '#0d6efd', fontWeight: 'bold', textAlign: 'center' }}>Registrar Nueva Mascota</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Nombre *</label>
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
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Peso (kg) *</label>
            <input 
              type="number" 
              step="0.1"
              name="peso" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.peso} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Tutor *</label>
            <select 
              name="tutor_id" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.tutor_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione un tutor</option>
              {tutores.map((tutor: any) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.nombre} {tutor.apellido || ''}
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
              {razas.map((raza: any) => (
                <option key={raza.id} value={raza.id}>
                  {raza.nombre} ({raza.tamano})
                </option>
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
              placeholder="Ej: Juguetón y tranquilo" 
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
              placeholder="Ej: Pequeño, pelaje largo color blanco" 
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

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Antecedentes Médicos</label>
            <textarea 
              name="antecedentes_medicos" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000', minHeight: '80px' }} 
              value={formData.antecedentes_medicos} 
              onChange={handleChange} 
              placeholder="Ej: Problema con la pata izquierda" 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Guardar Mascota
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