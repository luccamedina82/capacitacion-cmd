import { useEffect, useId, useRef, useState } from 'react'
import { Check, Moon, Sun, Sunset } from 'lucide-react'
import { useTema } from '../lib/tema.js'

const OPCIONES = [
  { id: 'claro',  nombre: 'Claro',  desc: 'Para el día o con mucha luz',            Icono: Sun },
  { id: 'oscuro', nombre: 'Oscuro', desc: 'Estilo Notion, para ambientes con poca luz', Icono: Moon },
  { id: 'noche',  nombre: 'Noche',  desc: 'Tonos cálidos y menos brillo para leer de noche', Icono: Sunset },
]

/**
 * Selector de tema: botón cápsula que abre un menú con los tres modos visibles,
 * cada uno con una muestra de su color. Semántica de radio: flechas para moverse, Esc para cerrar.
 * El estado vive en <html data-tema>, así que varias instancias siempre coinciden.
 *
 * @param {string} [className] - clases extra de posicionamiento según el contexto
 */
export default function BotonTema({ className = '' }) {
  const [tema, elegir] = useTema()
  const [abierto, setAbierto] = useState(false)
  const raizRef = useRef(null)
  const botonRef = useRef(null)
  const panelId = useId()
  const actual = OPCIONES.find(o => o.id === tema) ?? OPCIONES[0]
  const IconoActual = actual.Icono

  useEffect(() => {
    if (!abierto) return undefined
    // Al abrir, el foco va a la opción activa
    raizRef.current?.querySelector('[aria-checked="true"]')?.focus()

    const alTocarFuera = (e) => { if (!raizRef.current?.contains(e.target)) setAbierto(false) }
    const alTecla = (e) => {
      if (e.key !== 'Escape') return
      setAbierto(false)
      botonRef.current?.focus()
    }
    document.addEventListener('pointerdown', alTocarFuera)
    document.addEventListener('keydown', alTecla)
    return () => {
      document.removeEventListener('pointerdown', alTocarFuera)
      document.removeEventListener('keydown', alTecla)
    }
  }, [abierto])

  const cerrarCon = (id) => {
    elegir(id)
    setAbierto(false)
    botonRef.current?.focus()
  }

  // Flechas: eligen la opción vecina y la enfocan (patrón radiogroup)
  const moverConFlechas = (e) => {
    const paso = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!paso) return
    e.preventDefault()
    const i = OPCIONES.findIndex(o => o.id === tema)
    const siguiente = OPCIONES[(i + paso + OPCIONES.length) % OPCIONES.length]
    elegir(siguiente.id)
    requestAnimationFrame(() => raizRef.current?.querySelector(`[data-tema-opcion="${siguiente.id}"]`)?.focus())
  }

  return (
    <div className={`selector-tema ${className}`.trim()} ref={raizRef}>
      <button
        ref={botonRef}
        type="button"
        className="boton-tema"
        aria-expanded={abierto}
        aria-controls={panelId}
        aria-label={`Tema: ${actual.nombre}. Cambiar tema`}
        title="Cambiar tema"
        onClick={() => setAbierto(a => !a)}
      >
        <IconoActual size={18} aria-hidden="true" />
      </button>

      {abierto && (
        <div
          id={panelId}
          className="selector-tema-panel"
          role="radiogroup"
          aria-label="Tema de la página"
          onKeyDown={moverConFlechas}
        >
          {OPCIONES.map(({ id, nombre, desc, Icono }) => {
            const activo = tema === id
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={activo}
                tabIndex={activo ? 0 : -1}
                data-tema-opcion={id}
                className="selector-tema-opcion"
                onClick={() => cerrarCon(id)}
              >
                <span className={`selector-tema-muestra selector-tema-muestra--${id}`} aria-hidden="true">
                  <Icono size={17} />
                </span>
                <span className="selector-tema-texto">
                  <strong>{nombre}</strong>
                  <span>{desc}</span>
                </span>
                {activo && <Check size={16} className="selector-tema-check" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
