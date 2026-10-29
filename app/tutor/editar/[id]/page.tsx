'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarTutorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    domicilio: '',
    numero_opcional: '',
    veterinario_de_confianza: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/tutor/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setFormData({
              nombre: data.nombre || '',
              apellido: data.apellido || '',
              celular: data.celular || '',
              correo: data.correo || '',
              domicilio: data.domicilio || '',
              numero_opcional: data.numero_opcional || '',
              veterinario_de_confianza: data.veterinario_de_confianza || ''
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error al cargar tutor:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/tutor/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Number(id),
          nombre: formData.nombre,
          apellido: formData.apellido || null,
          celular: Number(formData.celular),
          correo: formData.correo || null,
          domicilio: formData.domicilio || null,
          numero_opcional: formData.numero_opcional ? Number(formData.numero_opcional) : null,
          veterinario_de_confianza: formData.veterinario_de_confianza || null
        })
      });

      if (response.ok) {
        alert('¡Tutor actualizado con éxito!');
        router.push('/tutor');
      } else {
        alert('Hubo un error al actualizar el tutor.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando datos del tutor...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '25px', color: '#ffc107', fontWeight: 'bold', textAlign: 'center' }}>Editar Tutor</h2>
        
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
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Correo</label>
            <input 
              type="email" 
              name="correo" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.correo} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Domicilio</label>
            <input 
              type="text" 
              name="domicilio" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.domicilio} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Número Opcional</label>
            <input 
              type="number" 
              name="numero_opcional" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.numero_opcional} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Veterinario de Confianza</label>
            <input 
              type="text" 
              name="veterinario_de_confianza" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }} 
              value={formData.veterinario_de_confianza} 
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
              onClick={() => router.push('/tutor')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}