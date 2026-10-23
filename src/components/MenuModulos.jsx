import { useState, useEffect, useRef } from 'react'
import { Menu, X, Lock } from 'lucide-react'

/**
 * Navegación compacta para pantallas angostas (< 900px).
 * Botón con el avance ("2/6") que abre un panel con todos los módulos y su estado.
 *
 * @param {Array}    items    - [{ id, etiqueta, estado?: 'aprobado'|'en-curso'|'bloqueado'|'cierre-listo' }]
 * @param {string}   activa   - id de la sección visible actualmente
 * @param {string}   resumen  - texto del botón, ej. "2/6"
 * @param {function} onIr     - (id, evento) navega a la sección
 */
export default function MenuModulos({ items, activa, resumen, onIr }) {
  const [abierto, setAbierto] = useState(false)
  const botonRef = useRef(null)
  const panelRef = useRef(null)

  // Escape cierra el panel y devuelve el foco al botón; tocar fuera también lo cierra
  useEffect(() => {
    if (!abierto) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setAbierto(false)
        botonRef.current?.focus()
      }
    }
    const onClickFuera = (e) => {
      if (panelRef.current?.contains(e.target) || botonRef.current?.contains(e.target)) return
      setAbierto(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClickFuera)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClickFuera)
    }
  }, [abierto])

  return (
    <div className="menu-modulos">
      <button
        ref={botonRef}
        type="button"
        className="menu-modulos-btn"
        aria-expanded={abierto}
        aria-controls="menu-modulos-panel"
        onClick={() => setAbierto(v => !v)}
      >
        {abierto ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
        <span>Módulos</span>
        <span className="menu-modulos-resumen">{resumen}</span>
      </button>

      {abierto && (
        <nav id="menu-modulos-panel" ref={panelRef} className="menu-modulos-panel" aria-label="Módulos del curso">
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activa === item.id ? 'location' : undefined}
                  onClick={(e) => { setAbierto(false); onIr(item.id, e) }}
                >
                  <span className="menu-item-icono" aria-hidden="true">
                    {item.icono === 'encuesta' && '📋'}
                    {item.icono === 'cierre' && '🏁'}
                  </span>
                  <span className="menu-item-texto">{item.etiqueta}</span>
                  <span className="menu-item-estado">
                    {item.estado === 'aprobado' && (
                      <><span aria-hidden="true">✓</span> Aprobado</>
                    )}
                    {item.estado === 'en-curso' && 'En curso'}
                    {item.estado === 'bloqueado' && (
                      <><Lock size={12} aria-hidden="true" /> Cuestionario bloqueado</>
                    )}
                    {item.estado === 'cierre-bloqueado' && (
                      <><Lock size={12} aria-hidden="true" /> Bloqueado</>
                    )}
                    {item.estado === 'cierre-listo' && 'Disponible'}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
