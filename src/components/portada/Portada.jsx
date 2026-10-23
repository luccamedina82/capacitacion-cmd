import { useEffect, useRef, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import VentanaNotion from './VentanaNotion.jsx'
import Flotantes from './Flotantes.jsx'
import './portada.css'

const MQ_COMPACTO = '(max-width: 720px), (pointer: coarse)'
const RESORTE_PUNTERO = { stiffness: 90, damping: 18, mass: 0.6 }

function suscribirMq(cb) {
  const mq = window.matchMedia(MQ_COMPACTO)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/** true en pantallas angostas o táctiles: sin parallax ni destello. */
function useCompacto() {
  return useSyncExternalStore(
    suscribirMq,
    () => window.matchMedia(MQ_COMPACTO).matches,
    () => false,
  )
}

/** El filtro de refracción solo se activa en Chromium de escritorio (Safari y Firefox usan blur). */
function soportaLente() {
  const datos = navigator.userAgentData
  return Boolean(datos?.brands?.some(b => /Chromium/i.test(b.brand))) && !datos.mobile
}

/**
 * Pantalla 1: portada a viewport completo con una ventana de Notion en vidrio donde
 * se teclea "/" y se abre el menú de bloques, rodeada de bloques flotantes con parallax.
 *
 * @param {function} onEntrar         - pasa al curso
 * @param {function} [onContinuar]    - pasa al curso en el módulo pendiente (si hay progreso)
 * @param {string}   [textoContinuar] - detalle de dónde se continúa
 */
export default function Portada({ onEntrar, onContinuar, textoContinuar }) {
  const sinMovimiento = Boolean(useReducedMotion())
  const compacto = useCompacto()
  const conPuntero = !sinMovimiento && !compacto
  const raizRef = useRef(null)

  // Posición normalizada del puntero (-0.5..0.5) suavizada con resorte
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, RESORTE_PUNTERO)
  const py = useSpring(my, RESORTE_PUNTERO)
  const brilloX = useTransform(px, v => v * -140)
  const brilloY = useTransform(py, v => v * -140)
  const ventanaX = useTransform(px, v => v * 8)
  const ventanaY = useTransform(py, v => v * 8)

  useEffect(() => {
    if (!conPuntero) return undefined
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [conPuntero, mx, my])

  useEffect(() => {
    if (soportaLente()) raizRef.current?.classList.add('con-lente')
  }, [])

  // Destello del botón: posición del puntero en variables CSS (sin layout)
  const moverBrillo = (e) => {
    if (!conPuntero) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }

  const entrada = (retraso) => (sinMovimiento
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { type: 'spring', stiffness: 140, damping: 20, delay: retraso },
      })

  return (
    <motion.section
      ref={raizRef}
      id="portada"
      className="portada"
      aria-labelledby="portada-titulo"
      exit={{ opacity: 0, transition: { duration: sinMovimiento ? 0 : 0.4 } }}
    >
      {/* Filtro SVG de refracción: solo se referencia desde .con-lente */}
      <svg className="portada-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="liquid-glass" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="4" result="ruido" />
          <feGaussianBlur in="ruido" stdDeviation="2" result="mapa" />
          <feDisplacementMap in="SourceGraphic" in2="mapa" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="portada-fondo" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>

      <div className="portada-contenido">
        <div className="portada-texto">
          <motion.span className="portada-kicker" {...entrada(0.05)}>
            <span aria-hidden="true">📚</span> Comunicación Multimedial · Capacitación Notion
          </motion.span>
          <motion.h1 id="portada-titulo" {...entrada(0.12)}>
            Dejá de enterarte<br />tarde de las entregas
          </motion.h1>
          <motion.p className="portada-sub" {...entrada(0.2)}>
            Armá en Notion, en 6 módulos prácticos, el sistema donde viven tus materias,
            apuntes, parciales y fechas de entrega.
          </motion.p>

          <motion.div className="portada-cta" {...entrada(0.28)}>
            <motion.button
              type="button"
              className="portada-boton glass glass--chrome glass-lens glass-sheen"
              onPointerMove={moverBrillo}
              style={{ borderRadius: 999 }}
              whileTap={{ scale: 0.97 }}
              whileHover={sinMovimiento ? undefined : { scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              onClick={onEntrar}
            >
              <span>Entrar a la capacitación</span>
              <ArrowRight size={18} aria-hidden="true" />
            </motion.button>
            {onContinuar && (
              <button type="button" className="portada-continuar" onClick={onContinuar}>
                Continuar donde dejaste
                {textoContinuar && <small>{textoContinuar}</small>}
              </button>
            )}
          </motion.div>

          <ul className="portada-datos" aria-label="Datos del curso">
            <li><span aria-hidden="true">🧱</span> 6 módulos prácticos</li>
            <li><span aria-hidden="true">⏱️</span> Unas 2 horas</li>
            <li><span aria-hidden="true">🧑‍💻</span> De cero a avanzado</li>
          </ul>
        </div>

        <div className="portada-escena" aria-hidden="true">
          <motion.div className="portada-ventana-pos" style={conPuntero ? { x: ventanaX, y: ventanaY } : undefined}>
            <VentanaNotion estatico={sinMovimiento} brillo={conPuntero ? { x: brilloX, y: brilloY } : null} />
          </motion.div>
          <Flotantes px={px} py={py} estatico={sinMovimiento} />
        </div>
      </div>
    </motion.section>
  )
}
