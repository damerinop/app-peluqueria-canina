'use client';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const navLinks = [
    { name: '🏠 Inicio', path: '/' },
    { name: '👤 Tutores', path: '/tutor' },
    { name: '🐶 Mascotas', path: '/mascota' },
    { name: '✂️ Trabajadores', path: '/trabajador' },
    { name: '📅 Agenda', path: '/agenda' },
    { name: '📋 Asistencias', path: '/asistencias' },
  ];

  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#f8f9fa' }}>
        
        {/* Menú Superior Global */}
        <header style={{ 
          background: '#212529', 
          color: '#fff', 
          padding: '15px 30px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h2 
            onClick={() => router.push('/')} 
            style={{ margin: 0, fontSize: '18px', cursor: 'pointer', color: '#0dcaf0' }}
          >
            🐾 Bienvenido...
          </h2>

          <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => router.push(link.path)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </header>

        {/* Contenido de la página */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}