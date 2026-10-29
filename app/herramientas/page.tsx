'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HerramientasPage() {
  const router = useRouter();
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [tutores, setTutores] = useState<any[]>([]);
  const [herramientas, setHerramientas] = useState<any[]>([]);
  const [alzadores, setAlzadores] = useState<any[]>([]);
  const [cuchillas, setCuchillas] = useState<any[]>([]);
  const [fragancias, setFragancias] = useState<any[]>([]);
  const [detalleCosmetica, setDetalleCosmetica] = useState<any[]>([]);
  const [acabados, setAcabados] = useState<any[]>([]);
  const [higieneEspecifica, setHigieneEspecifica] = useState<any[]>([]);
  const [higieneGeneral, setHigieneGeneral] = useState<any[]>([]);
  const [tratamientos, setTratamientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/mascota').then((res) => res.json()),
      fetch('http://localhost:4000/tutor').then((res) => res.json()),
      fetch('http://localhost:4000/detalle_herramienta').then((res) => res.json()),
      fetch('http://localhost:4000/alzador').then((res) => res.json()),
      fetch('http://localhost:4000/cuchilla').then((res) => res.json()),
      fetch('http://localhost:4000/fragancia').then((res) => res.json()),
      fetch('http://localhost:4000/detalle_cosmetica').then((res) => res.json()),
      fetch('http://localhost:4000/acabado').then((res) => res.json()),
      fetch('http://localhost:4000/higiene_especifica').then((res) => res.json()),
      fetch('http://localhost:4000/higiene_general').then((res) => res.json()),
      fetch('http://localhost:4000/tratamiento').then((res) => res.json())
    ])
      .then(([masc, tuts, herr, alz, cuch, frag, dCos, acab, hEsp, hGen, trat]) => {
        if (Array.isArray(masc)) setMascotas(masc);
        if (Array.isArray(tuts)) setTutores(tuts);
        if (Array.isArray(herr)) setHerramientas(herr);
        if (Array.isArray(alz)) setAlzadores(alz);
        if (Array.isArray(cuch)) setCuchillas(cuch);
        if (Array.isArray(frag)) setFragancias(frag);
        if (Array.isArray(dCos)) setDetalleCosmetica(dCos);
        if (Array.isArray(acab)) setAcabados(acab);
        if (Array.isArray(hEsp)) setHigieneEspecifica(hEsp);
        if (Array.isArray(hGen)) setHigieneGeneral(hGen);
        if (Array.isArray(trat)) setTratamientos(trat);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      });
  }, []);

  const actualizarCampo = async (mascotaId: number, tipo: 'herramienta' | 'cosmetica', campo: string, valor: string) => {
    const valorNumerico = valor === "" ? null : Number(valor);
    const herr = herramientas.find((h) => String(h.mascota_id) === String(mascotaId));

    try {
      if (tipo === 'herramienta') {
        if (!herr) {
          const res = await fetch('http://localhost:4000/detalle_herramienta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mascota_id: Number(mascotaId),
              alzador_id: campo === 'alzador_id' ? valorNumerico : null,
              cuchilla_id: campo === 'cuchilla_id' ? valorNumerico : null,
              fragancia_id: campo === 'fragancia_id' ? valorNumerico : null,
              detalle_cosmetica_id: null
            })
          });
          const nuevaHerr = await res.json();
          setHerramientas([...herramientas, nuevaHerr]);
        } else {
          const body = { ...herr, [campo]: valorNumerico };
          await fetch(`http://localhost:4000/detalle_herramienta/${herr.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          setHerramientas(herramientas.map((h) => (h.id === herr.id ? body : h)));
        }
      } else if (tipo === 'cosmetica') {
        let dCos = detalleCosmetica.find((d) => String(d.id) === String(herr?.detalle_cosmetica_id));

        if (!dCos) {
          const resCos = await fetch('http://localhost:4000/detalle_cosmetica', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              higiene_especifica_id: campo === 'higiene_especifica_id' ? valorNumerico : null,
              higiene_general_id: campo === 'higiene_general_id' ? valorNumerico : null,
              tratamiento_id: campo === 'tratamiento_id' ? valorNumerico : null,
              acabado_id: campo === 'acabado_id' ? valorNumerico : null
            })
          });
          const nuevoCos = await resCos.json();
          setDetalleCosmetica([...detalleCosmetica, nuevoCos]);

          if (!herr) {
            const resHerr = await fetch('http://localhost:4000/detalle_herramienta', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                mascota_id: Number(mascotaId),
                alzador_id: null,
                cuchilla_id: null,
                fragancia_id: null,
                detalle_cosmetica_id: nuevoCos.id
              })
            });
            const nuevaHerr = await resHerr.json();
            setHerramientas([...herramientas, nuevaHerr]);
          } else {
            const bodyHerr = { ...herr, detalle_cosmetica_id: nuevoCos.id };
            await fetch(`http://localhost:4000/detalle_herramienta/${herr.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bodyHerr)
            });
            setHerramientas(herramientas.map((h) => (h.id === herr.id ? bodyHerr : h)));
          }
        } else {
          const bodyCos = { ...dCos, [campo]: valorNumerico };
          await fetch(`http://localhost:4000/detalle_cosmetica/${dCos.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyCos)
          });
          setDetalleCosmetica(detalleCosmetica.map((d) => (d.id === dCos.id ? bodyCos : d)));
        }
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px', color: '#212529' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>Inventario y Configuración Interactiva</h2>
            <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
              Modifica los campos directamente seleccionando en las listas desplegables.
            </p>
          </div>
          <button 
            onClick={() => router.push('/mascota')}
            style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ← Volver a Mascotas
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando inventario interactivo...</p>
        ) : mascotas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
            <p>No hay mascotas registradas.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#212529', color: '#fff' }}>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Mascota y Tutor</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Alzador</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Cuchilla</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Shampoo / Higiene Esp.</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Higiene General</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Tratamiento</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Acabado</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Fragancia</th>
                </tr>
              </thead>
              <tbody>
                {mascotas.map((m: any) => {
                  const herrEncontrada = herramientas.find((h) => String(h.mascota_id) === String(m.id));
                  const dCos = detalleCosmetica.find((d) => String(d.id) === String(herrEncontrada?.detalle_cosmetica_id));
                  
                  const tutorObj = tutores.find(
                    (t) => String(t.celular) === String(m.tutor_id) || String(t.id) === String(m.tutor_id)
                  );

                  const selectStyle = {
                    width: '100%',
                    padding: '6px',
                    borderRadius: '4px',
                    border: '1px solid #ced4da',
                    backgroundColor: '#fff',
                    color: '#212529',
                    fontSize: '12px'
                  };

                  return (
                    <tr key={m.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#0d6efd', fontSize: '14px' }}>🐶 {m.nombre}</strong> <br />
                        <span style={{ fontSize: '12px', color: '#212529' }}>
                          👤 {tutorObj ? `${tutorObj.nombre} ${tutorObj.apellido || ''}` : 'Sin tutor'}
                        </span> <br />
                        <span style={{ fontSize: '11px', color: '#6c757d' }}>
                          📞 Cel: {tutorObj ? tutorObj.celular : m.tutor_id}
                        </span>
                      </td>

                      {/* Alzador */}
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <select 
                          style={selectStyle}
                          value={herrEncontrada?.alzador_id || ''}
                          onChange={(e) => actualizarCampo(m.id, 'herramienta', 'alzador_id', e.target.value)}
                        >
                          <option value="">-- Sin asignar --</option>
                          {alzadores.map((a: any) => (
                            <option key={a.id} value={a.id}>{a.descripcion}</option>
                          ))}
                        </select>
                      </td>

                      {/* Cuchilla */}
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <select 
                          style={selectStyle}
                          value={herrEncontrada?.cuchilla_id || ''}
                          onChange={(e) => actualizarCampo(m.id, 'herramienta', 'cuchilla_id', e.target.value)}
                        >
                          <option value="">-- Sin asignar --</option>
                          {cuchillas.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.descripcion}</option>
                          ))}
                        </select>
                      </td>

                      {/* Higiene Específica (Shampoo) */}
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <select 
                          style={selectStyle}
                          value={dCos?.higiene_especifica_id || ''}
                          onChange={(e) => actualizarCampo(m.id, 'cosmetica', 'higiene_especifica_id', e.target.value)}
                        >
                          <option value="">-- Sin asignar --</option>
                          {higieneEspecifica.map((he: any) => (
                            <option key={he.id} value={he.id}>{he.descripcion}</option>
                          ))}
                        </select>
                      </td>

                      {/* Higiene General */}
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <select 
                          style={selectStyle}
                          value={dCos?.higiene_general_id || ''}
                          onChange={(e) => actualizarCampo(m.id, 'cosmetica', 'higiene_general_id', e.target.value)}
                        >
                          <option value="">-- Sin asignar --</option>
                          {higieneGeneral.map((hg: any) => (
                            <option key={hg.id} value={hg.id}>{hg.descripcion}</option>
                          ))}
                        </select>
                      </td>

                      {/* Tratamiento */}
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <select 
                          style={selectStyle}
                          value={dCos?.tratamiento_id || ''}
                          onChange={(e) => actualizarCampo(m.id, 'cosmetica', 'tratamiento_id', e.target.value)}
                        >
                          <option value="">-- Sin asignar --</option>
                          {tratamientos.map((t: any) => (
                            <option key={t.id} value={t.id}>{t.descripcion}</option>
                          ))}
                        </select>
                      </td>

                      {/* Acabado */}
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <select 
                          style={selectStyle}
                          value={dCos?.acabado_id || ''}
                          onChange={(e) => actualizarCampo(m.id, 'cosmetica', 'acabado_id', e.target.value)}
                        >
                          <option value="">-- Sin asignar --</option>
                          {acabados.map((ac: any) => (
                            <option key={ac.id} value={ac.id}>{ac.descripcion}</option>
                          ))}
                        </select>
                      </td>

                      {/* Fragancia */}
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <select 
                          style={selectStyle}
                          value={herrEncontrada?.fragancia_id || ''}
                          onChange={(e) => actualizarCampo(m.id, 'herramienta', 'fragancia_id', e.target.value)}
                        >
                          <option value="">-- Sin asignar --</option>
                          {fragancias.map((f: any) => (
                            <option key={f.id} value={f.id}>{f.descripcion}</option>
                          ))}
                        </select>
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