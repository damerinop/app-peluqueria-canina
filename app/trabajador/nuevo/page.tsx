'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoTrabajadorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    domicilio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/trabajador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          celular: Number(formData.celular)
        })
      });

      if (response.ok) {
        alert('¡Trabajador registrado con éxito!');
        router.push('/trabajador');
      } else {
        alert('Hubo un error al guardar el trabajador.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '25px', color: '#0d6efd', fontWeight: 'bold', textAlign: 'center' }}>Registrar Nuevo Trabajador</h2>
        
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
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Apellido</label>
            <input 
              type="text" 
              name="apellido" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.apellido} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Celular *</label>
            <input 
              type="number" 
              name="celular" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.celular} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Correo Electrónico</label>
            <input 
              type="email" 
              name="correo" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.correo} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Domicilio *</label>
            <input 
              type="text" 
              name="domicilio" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.domicilio} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Guardar Trabajador
            </button>
            <button 
              type="button" 
              style={{ flex: 1, padding: '12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => router.push('/trabajador')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}