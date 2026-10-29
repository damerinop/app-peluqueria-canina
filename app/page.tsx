'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [stats, setStats] = useState({ mascotas: 0, tutores: 0, trabajadores: 0, citas: 0 });

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/mascota').then((res) => res.json()).catch(() => []),
      fetch('http://localhost:4000/tutor').then((res) => res.json()).catch(() => []),
      fetch('http://localhost:4000/trabajador').then((res) => res.json()).catch(() => []),
      fetch('http://localhost:4000/citas').then((res) => res.json()).catch(() => [])
    ]).then(([mascotas, tutores, trabajadores, citas]) => {
      setStats({
        mascotas: Array.isArray(mascotas) ? mascotas.length : 0,
        tutores: Array.isArray(tutores) ? tutores.length : 0,
        trabajadores: Array.isArray(trabajadores) ? trabajadores.length : 0,
        citas: Array.isArray(citas) ? citas.length : 0
      });
    });
  }, []);

  const cards = [
    { title: 'Tutores', desc: 'Dueños, contactos y registros', icon: '👤', path: '/tutor', color: '#ffc107' },
    { title: 'Mascotas', desc: 'Pacientes y fichas caninas', icon: '🐶', path: '/mascota', color: '#198754' },
    { title: 'Trabajadores', desc: 'Groomers y personal a cargo', icon: '✂️', path: '/trabajador', color: '#0dcaf0' },
    { title: 'Agenda', desc: 'Horarios, citas y reservas', icon: '📅', path: '/agenda', color: '#0d6efd' },
    { title: 'Asistencias', desc: 'Control de atenciones y caja', icon: '📋', path: '/asistencias', color: '#6f42c1' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Banner de Bienvenida */}
        <div style={{ background: 'linear-gradient(135deg, #0d6efd, #6f42c1)', color: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px', fontWeight: 'bold' }}>🐾 Peluquería Canina App</h1>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>Sistema de gestión de agenda para servicios de peluquería canina.</p>
        </div>

        {/* Estadísticas rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '14px' }}>Mascotas</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#198754', margin: 0 }}>{stats.mascotas}</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '14px' }}>Tutores</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107', margin: 0 }}>{stats.tutores}</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '14px' }}>Trabajadores</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0dcaf0', margin: 0 }}>{stats.trabajadores}</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '14px' }}>Citas</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0d6efd', margin: 0 }}>{stats.citas}</p>
          </div>
        </div>

        {/* Módulos Principales Centrados */}
        <h2 style={{ fontSize: '20px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>Módulos del Sistema</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {cards.map((card, index) => (
            <div 
              key={index}
              onClick={() => router.push(card.path)}
              style={{ 
                background: '#fff', 
                padding: '25px', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
                cursor: 'pointer', 
                transition: 'transform 0.2s',
                borderTop: `4px solid ${card.color}`,
                width: '230px',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#212529' }}>{card.title}</h3>
              <p style={{ fontSize: '14px', color: '#6c757d', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}