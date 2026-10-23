import { useRef, useState, useSyncExternalStore } from 'react'
import {
  m, useReducedMotion, useScroll, useTransform, useMotionValueEvent,
} from 'motion/react'
import { LayoutDashboard } from 'lucide-react'
import {
  PiezaPagina, PiezaToggle, PiezaTabla, PiezaKanban, PiezaCalendario,
  DESCRIPCION_DASHBOARD,
} from './piezas.jsx'

const PASOS = [
  { n: 1, nombre: 'Bloques', texto: 'Escribís “/” y armás la página de cada materia.' },
  { n: 2, nombre: 'Apuntes', texto: 'Los toggles esconden la respuesta: practicás Active Recall.' },
  { n: 3, nombre: 'Base de datos', texto: 'Materia, Estado y Fecha: todas tus entregas en una tabla.' },
  { n: 4, nombre: 'Vistas', texto: 'La misma tabla, también en Tablero y en Calendario.' },
  { n: 5, nombre: 'Filtros', texto: 'Filtrás “Esta semana” y ves solo lo urgente.' },
  { n: 6, nombre: 'Dashboard', texto: 'Todo junto en tu hub de cursada.' },
]

// Limites de progreso (0..1) donde empieza cada paso.
const UMBRALES = [0, 0.15, 0.3, 0.5, 0.7, 0.85]

// Estado "apilado/disperso" de cada pieza (porcentajes de su propio tamano).
const PIEZAS = [
  { id: 'pagina', Pieza: PiezaPagina, inicio: 0, desde: { x: '55%', y: '50%', r: -4 } },
  { id: 'toggle', Pieza: PiezaToggle, inicio: 0.12, desde: { x: '-55%', y: '60%', r: 3 } },
  { id: 'tabla', Pieza: PiezaTabla, inicio: 0.28, desde: { x: '0%', y: '-30%', r: -2 } },
  { id: 'kanban', Pieza: PiezaKanban, inicio: 0.45, desde: { x: '55%', y: '-70%', r: 2 } },
  { id: 'calendario', Pieza: PiezaCalendario, inicio: 0.55, desde: { x: '-55%', y: '-70%', r: -3 } },
]
const VENTANA = 0.22

const CONSULTA_COMPACTA = '(max-width: 700px)'
function suscribir(cb) {
  const mq = window.matchMedia(CONSULTA_COMPACTA)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useCompacto = () =>
  useSyncExternalStore(suscribir, () => window.matchMedia(CONSULTA_COMPACTA).matches, () => false)

/** Solo transform/opacity: la pieza se mueve desde `desde` hasta su celda final. */
function Movil({ progreso, inicio, desde, children }) {
  const rango = [inicio, inicio + VENTANA]
  const x = useTransform(progreso, rango, [desde.x, '0%'], { clamp: true })
  const y = useTransform(progreso, rango, [desde.y, '0%'], { clamp: true })
  const rotate = useTransform(progreso, rango, [desde.r, 0], { clamp: true })
  const scale = useTransform(progreso, rango, [0.92, 1], { clamp: true })
  const opacity = useTransform(progreso, [inicio, inicio + VENTANA * 0.5], [0, 1], { clamp: true })
  return <m.div className="intro-celda" style={{ x, y, rotate, scale, opacity }}>{children}</m.div>
}

function Tablero({ children, className = '' }) {
  return (
    <div className={`intro-tablero ${className}`}>
      <div className="intro-tablero-cab">
        <LayoutDashboard size={14} aria-hidden="true" />
        <span>Hub Cursada 2026</span>
      </div>
      <div className="intro-grid">{children}</div>
    </div>
  )
}

function Encabezado() {
  return (
    <header className="intro-bloque-cab">
      <h2 id="intro-ensamblado-titulo">Así queda tu sistema al terminar</h2>
      <p className="intro-sub">
        Cada módulo suma una pieza. Mirá cómo se arma el dashboard mientras bajás.
      </p>
      <p className="intro-sr-only">{DESCRIPCION_DASHBOARD}</p>
    </header>
  )
}

/** Version estatica: reduced motion y pantallas chicas. */
function Estatico({ revelar }) {
  const aparecer = revelar
    ? { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' }, transition: { duration: 0.25 } }
    : {}
  return (
    <Tablero>
      <m.div className="intro-celda" {...aparecer}><PiezaPagina /></m.div>
      <m.div className="intro-celda" {...aparecer}><PiezaToggle /></m.div>
      <m.div className="intro-celda" {...aparecer}><PiezaTabla filtro /></m.div>
      <m.div className="intro-celda" {...aparecer}><PiezaKanban /></m.div>
      <m.div className="intro-celda" {...aparecer}><PiezaCalendario /></m.div>
    </Tablero>
  )
}

function ConScroll() {
  const pista = useRef(null)
  const [paso, setPaso] = useState(0)
  const { scrollYProgress } = useScroll({ target: pista, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', p => {
    let idx = 0
    UMBRALES.forEach((u, i) => { if (p >= u) idx = i })
    setPaso(prev => (prev === idx ? prev : idx))
  })

  const cabOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0.4, 1], { clamp: true })
  const actual = PASOS[paso]

  return (
    <div ref={pista} className="intro-pista">
      <div className="intro-escenario">
        {/* Decorativo: el texto equivalente esta en la descripcion del encabezado. */}
        <div className="intro-pasos" aria-hidden="true">
          <ol className="intro-pasos-lista">
            {PASOS.map((p, i) => (
              <li key={p.n} className={i === paso ? 'is-on' : i < paso ? 'is-hecho' : ''}>
                {p.n}. {p.nombre}
              </li>
            ))}
          </ol>
          <p className="intro-pasos-texto">{actual.texto}</p>
        </div>

        <div className="intro-tablero" aria-hidden="true">
          <m.div className="intro-tablero-cab" style={{ opacity: cabOpacity }}>
            <LayoutDashboard size={14} />
            <span>Hub Cursada 2026</span>
          </m.div>
          <div className="intro-grid">
            {PIEZAS.map(({ id, Pieza, inicio, desde }) => (
              <Movil key={id} progreso={scrollYProgress} inicio={inicio} desde={desde}>
                {id === 'tabla' ? <PiezaTabla filtro={paso >= 4} /> : <Pieza />}
              </Movil>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Ensamblado() {
  const reducido = Boolean(useReducedMotion())
  const compacto = useCompacto()
  const estatico = reducido || compacto

  return (
    <section className="intro-ensamblado" aria-labelledby="intro-ensamblado-titulo">
      <Encabezado />
      {estatico ? (
        <div role="img" aria-label={DESCRIPCION_DASHBOARD}>
          <div aria-hidden="true"><Estatico revelar={!reducido} /></div>
        </div>
      ) : (
        <ConScroll />
      )}
    </section>
  )
}
