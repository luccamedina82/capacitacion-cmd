import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Check, ClipboardList, Flag, LayoutGrid, LayoutList, Lock, Star, X } from 'lucide-react'

const ICONOS = { inicio: LayoutGrid, encuesta: ClipboardList, cierre: Flag }

/**
 * Lista de todas las etapas con su estado. Se abre desde la barra inferior (pantallas angostas)
 * como una hoja que sube desde abajo, al estilo de las sheets de iOS, con fondo atenuado.
 *
 * @param {Array}    items    - [{ id, etiqueta, icono?, estado?, recomendado? }]
 * @param {string}   activa   - id de la etapa visible
 * @param {string}   resumen  - texto del botón, ej. "2/6"
 * @param {function} onIr     - (id, evento) navega a la etapa
 */
export default function MenuModulos({ items, activa, resumen, onIr }) {
  const [abierto, setAbierto] = useState(false)
  const botonRef = useRef(null)
  const panelRef = useRef(null)

  // Al abrir, el foco va a la etapa actual; Escape cierra y devuelve el foco; tocar fuera también cierra.
  // Mientras está abierta, la página de atrás no scrollea, y si la pantalla se agranda (ya no hay
  // barra inferior) la hoja se cierra: está en un portal y no se ocultaría sola.
  useEffect(() => {
    if (!abierto) return
    const panel = panelRef.current
    ;(panel?.querySelector('[aria-current]') ?? panel?.querySelector('a, button'))?.focus()
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const mq = window.matchMedia('(max-width: 900px)')
    const alCambiarAncho = (e) => { if (!e.matches) setAbierto(false) }
    mq.addEventListener('change', alCambiarAncho)
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
      document.body.style.overflow = overflowPrevio
      mq.removeEventListener('change', alCambiarAncho)
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
        aria-controls={abierto ? 'menu-modulos-panel' : undefined}
        onClick={() => setAbierto(v => !v)}
      >
        <LayoutList size={18} aria-hidden="true" />
        <span>Módulos</span>
        <span className="menu-modulos-resumen">{resumen}</span>
      </button>

      {/* Portal: la barra inferior tiene backdrop-filter, que volvería "fixed" relativo a ella */}
      {abierto && createPortal(<div className="menu-modulos-velo" aria-hidden="true" />, document.body)}

      {abierto && createPortal(
        <nav id="menu-modulos-panel" ref={panelRef} className="menu-modulos-panel" aria-label="Módulos del curso">
          <div className="menu-modulos-cab">
            <span className="menu-modulos-titulo">Tu recorrido · {resumen}</span>
            <button
              type="button"
              className="menu-modulos-cerrar"
              aria-label="Cerrar"
              onClick={() => { setAbierto(false); botonRef.current?.focus() }}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <ul>
            {items.map(item => {
              const Icono = ICONOS[item.icono]
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={activa === item.id ? 'location' : undefined}
                    onClick={(e) => { setAbierto(false); onIr(item.id, e) }}
                  >
                    <span className="menu-item-icono" aria-hidden="true">
                      {Icono ? <Icono size={16} /> : item.num}
                    </span>
                    <span className="menu-item-texto">{item.etiqueta}</span>
                    <span className="menu-item-estado">
                      {item.recomendado && (
                        <span className="chip recomendado"><Star size={11} aria-hidden="true" /> Para vos</span>
                      )}
                      {item.estado === 'aprobado' && (
                        <><Check size={13} aria-hidden="true" /> Aprobado</>
                      )}
                      {item.estado === 'en-curso' && 'En curso'}
                      {item.estado === 'bloqueado' && 'Más adelante'}
                      {item.estado === 'cierre-bloqueado' && (
                        <><Lock size={12} aria-hidden="true" /> Bloqueado</>
                      )}
                      {item.estado === 'cierre-listo' && 'Disponible'}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>,
        document.body,
      )}
    </div>
  )
}
