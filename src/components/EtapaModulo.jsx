import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Star, Target } from 'lucide-react'
import Etapa from './Etapa.jsx'
import PasosModulo from './PasosModulo.jsx'
import { CLAVES, leerProgreso } from '../lib/progreso.js'

/**
 * Un módulo en dos momentos:
 * - Portada: de qué trata, qué vas a poder hacer, sus pasos y el botón Empezar / Continuar.
 * - Lección: cabecera mínima y los pasos en pestañas, con el contenido arriba de todo.
 * Cada vez que llegás al módulo se muestra la portada. La lección queda montada aunque no se vea,
 * así el cuestionario conserva las respuestas en curso.
 *
 * @param {object}   sec         - módulo de SECCIONES
 * @param {number}   numero      - 1..6
 * @param {number}   total
 * @param {string}   icono       - emoji de la pieza del dashboard
 * @param {React.ReactNode} estado - chip de estado
 * @param {boolean}  recomendado
 * @param {Array}    pasos       - pasos de PasosModulo
 * @param {object}   vecinos     - { anterior, siguiente } para la navegación entre etapas
 * @param {boolean}  visible
 * @param {function} onIr
 */
export default function EtapaModulo({ sec, numero, total, icono, estado, recomendado, pasos, vecinos, visible, onIr }) {
  const [enLeccion, setEnLeccion] = useState(false)
  const [foco, setFoco] = useState(null)

  // Al llegar al módulo, siempre su portada (ajuste durante el render, sin effect)
  const [visiblePrevio, setVisiblePrevio] = useState(visible)
  if (visible !== visiblePrevio) {
    setVisiblePrevio(visible)
    if (visible) setEnLeccion(false)
  }

  const vistos = leerProgreso(CLAVES.pasos, {})[sec.id] ?? []
  const listo = p => (p.hecho !== undefined ? p.hecho : vistos.includes(p.id))
  const pendiente = pasos.find(p => !listo(p))
  const empezado = vistos.length > 0 || pasos.some(p => p.hecho)
  const textoBoton = !empezado ? 'Empezar' : pendiente ? `Continuar: ${pendiente.etiqueta}` : 'Repasar el módulo'

  // Abre la lección en el primer paso pendiente y lleva la vista y el foco a las pestañas
  const empezar = () => {
    setFoco({ id: (pendiente ?? pasos[0]).id, n: Date.now() })
    setEnLeccion(true)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.getElementById(sec.id)
      const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el?.scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth', block: 'start' })
      el?.querySelector('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true })
    }))
  }

  const volverAPortada = () => {
    setEnLeccion(false)
    requestAnimationFrame(() => document.getElementById(`${sec.id}-titulo`)?.focus())
  }

  return (
    <Etapa
      id={sec.id}
      visible={visible}
      icono={icono}
      kicker={`Módulo ${numero} de ${total} · ${sec.corto}`}
      titulo={sec.titulo}
      estado={estado}
      compacta={enLeccion}
      volver={(
        <button type="button" className="etapa-volver" onClick={volverAPortada}>
          <ArrowLeft size={16} aria-hidden="true" /> Intro del módulo
        </button>
      )}
      {...vecinos}
      onIr={onIr}
    >
      <div className="modulo-portada" hidden={enLeccion}>
        <p className="etapa-logro">
          <Target size={18} className="etapa-logro-icono" aria-hidden="true" />
          <span>
            <strong>Al terminar vas a poder</strong>{' '}
            {sec.logro.charAt(0).toLowerCase() + sec.logro.slice(1)}
          </span>
        </p>
        {recomendado && (
          <p className="etapa-reco"><Star size={13} aria-hidden="true" /> Recomendado según tu diagnóstico</p>
        )}
        <p className="etapa-bajada">{sec.explicacionBreve}</p>

        <ol className="modulo-temario" aria-label="Pasos del módulo">
          {pasos.map((p, i) => (
            <li key={p.id} className={listo(p) ? 'listo' : undefined}>
              <span className="modulo-temario-num" aria-hidden="true">
                {listo(p) ? <Check size={14} strokeWidth={3} /> : i + 1}
              </span>
              <span className="modulo-temario-txt">
                {p.etiqueta}
                {p.id === 'video' && <small> · {sec.videoDuracion}</small>}
              </span>
              {listo(p) && <span className="sr-only"> (hecho)</span>}
            </li>
          ))}
        </ol>

        <button
          type="button"
          className="boton-primario boton-primario--chico glass glass--chrome glass-sheen modulo-empezar"
          onClick={empezar}
        >
          <span>{textoBoton}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="modulo-leccion" hidden={!enLeccion}>
        <PasosModulo moduloId={sec.id} pasos={pasos} foco={foco} />
      </div>
    </Etapa>
  )
}
