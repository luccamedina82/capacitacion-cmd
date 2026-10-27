import { useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { CLAVES, leerProgreso, guardarProgreso } from '../lib/progreso.js'

// Resorte de la pastilla del control segmentado (como el segmented control de iOS)
const RESORTE_PASTILLA = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }

/**
 * Pasos de un módulo como pestañas: se ve un paso a la vez, así no hay scroll largo.
 * Todos los paneles quedan montados (solo se ocultan): el cuestionario conserva las respuestas en curso.
 * Recuerda qué pasos ya recorriste y, al volver, abre el primero pendiente.
 * Otro componente puede pedir mostrar un panel despachando el evento "activar-paso" desde adentro de él
 * (lo usa el modal de repaso para llevar al video o a la guía).
 *
 * @param {string} moduloId
 * @param {Array<{id: string, etiqueta: string, titulo: string, contenido: React.ReactNode, hecho?: boolean}>} pasos
 *   hecho: si se pasa, define solo él cuándo el paso está completo (no alcanza con visitarlo)
 * @param {{id: string, n: number}} [foco] - pide abrir ese paso (n cambia en cada pedido)
 */
export default function PasosModulo({ moduloId, pasos, foco }) {
  const base = useId()
  const raizRef = useRef(null)
  const sinMovimiento = useReducedMotion()
  // El panel solo anima al cambiar de pestaña: al entrar al módulo ya anima la etapa entera
  const [interactuado, setInteractuado] = useState(false)
  const [vistos, setVistos] = useState(() => leerProgreso(CLAVES.pasos, {})[moduloId] ?? [])
  const [activo, setActivo] = useState(() => {
    const previos = leerProgreso(CLAVES.pasos, {})[moduloId] ?? []
    const pendiente = p => (p.hecho !== undefined ? !p.hecho : !previos.includes(p.id))
    return (pasos.find(pendiente) ?? pasos[pasos.length - 1]).id
  })

  // Desde la portada del módulo: "Empezar" / "Continuar" abre el paso indicado (ajuste durante el render)
  const [focoPrevio, setFocoPrevio] = useState(foco)
  if (foco !== focoPrevio) {
    setFocoPrevio(foco)
    if (foco) setActivo(foco.id)
  }

  useEffect(() => {
    const raiz = raizRef.current
    const alPedir = (e) => {
      const paso = e.target.closest?.('[data-paso]')?.dataset.paso
      if (paso) setActivo(paso)
    }
    raiz.addEventListener('activar-paso', alPedir)
    return () => raiz.removeEventListener('activar-paso', alPedir)
  }, [])

  // Al dejar un paso, queda marcado como recorrido
  const ir = (id, enfocar = false) => {
    if (id === activo) return
    const nuevos = vistos.includes(activo) ? vistos : [...vistos, activo]
    setVistos(nuevos)
    guardarProgreso(CLAVES.pasos, { ...leerProgreso(CLAVES.pasos, {}), [moduloId]: nuevos })
    setInteractuado(true)
    setActivo(id)
    if (enfocar) requestAnimationFrame(() => document.getElementById(`${base}-tab-${id}`)?.focus())
  }

  // Patrón de pestañas: flechas, Inicio y Fin mueven y activan
  const alTeclear = (e) => {
    const i = pasos.findIndex(p => p.id === activo)
    const destino = {
      ArrowRight: (i + 1) % pasos.length,
      ArrowLeft: (i - 1 + pasos.length) % pasos.length,
      Home: 0,
      End: pasos.length - 1,
    }[e.key]
    if (destino === undefined) return
    e.preventDefault()
    ir(pasos[destino].id, true)
  }

  return (
    <div className={`pasos-modulo${interactuado ? ' interactuado' : ''}`} ref={raizRef}>
      <div className="pasos-tabs" role="tablist" aria-label="Pasos del módulo" onKeyDown={alTeclear}>
        {pasos.map(p => {
          const seleccionado = p.id === activo
          // Un paso con criterio propio (el cuestionario: aprobado) no se marca solo por haberlo visitado
          const listo = p.hecho !== undefined ? p.hecho : vistos.includes(p.id)
          return (
            <button
              key={p.id}
              id={`${base}-tab-${p.id}`}
              type="button"
              role="tab"
              aria-selected={seleccionado}
              aria-controls={`${base}-panel-${p.id}`}
              tabIndex={seleccionado ? 0 : -1}
              className={`pasos-tab${listo ? ' listo' : ''}`}
              onClick={() => ir(p.id)}
            >
              {seleccionado && (
                <motion.span
                  layoutId={`${base}-pastilla`}
                  className="pasos-tab-pastilla"
                  aria-hidden="true"
                  transition={sinMovimiento ? { duration: 0 } : RESORTE_PASTILLA}
                />
              )}
              <span>{p.etiqueta}</span>
              {listo && <Check size={14} strokeWidth={2.75} className="pasos-tab-check" aria-hidden="true" />}
              {listo && <span className="sr-only"> (hecho)</span>}
            </button>
          )
        })}
      </div>

      {pasos.map((p, i) => {
        const siguiente = pasos[i + 1]
        return (
          <div
            key={p.id}
            id={`${base}-panel-${p.id}`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${p.id}`}
            data-paso={p.id}
            className="pasos-panel"
            hidden={p.id !== activo}
          >
            <h3 className="pasos-panel-titulo">{p.titulo}</h3>
            {p.contenido}
            {siguiente && (
              <div className="pasos-panel-pie">
                <button type="button" className="pasos-siguiente" onClick={() => ir(siguiente.id, true)}>
                  Siguiente: {siguiente.etiqueta}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
