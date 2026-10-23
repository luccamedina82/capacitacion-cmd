import { useEffect, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import {
  Type, Heading1, ChevronRight, Table, Columns3, CalendarDays,
} from 'lucide-react'
import NotionLogo from '../NotionLogo.jsx'
import Cta from './Cta.jsx'

const ITEMS = [
  { icono: Type, nombre: 'Texto', desc: 'Párrafo simple' },
  { icono: Heading1, nombre: 'Encabezado', desc: 'Título de sección' },
  { icono: ChevronRight, nombre: 'Toggle', desc: 'Contenido desplegable' },
  { icono: Table, nombre: 'Base de datos', desc: 'Tabla con propiedades' },
  { icono: Columns3, nombre: 'Tablero', desc: 'Vista Kanban' },
  { icono: CalendarDays, nombre: 'Calendario', desc: 'Vista mensual' },
]

// Pasos de la animacion (ms desde el montaje). El ultimo es el estado final.
const LINEA_DE_TIEMPO = [450, 800, 1250, 1550, 1850]
const PASO_FINAL = LINEA_DE_TIEMPO.length

const DESCRIPCION =
  'Ilustración: una página en blanco de Notion donde se escribe una barra "/" y se abre el menú de ' +
  'bloques con Texto, Encabezado, Toggle, Base de datos, Tablero y Calendario.'

/**
 * Pasos: 0 pagina vacia, 1 "/" escrita, 2 menu abierto (resalta Texto),
 * 3 Encabezado, 4 Toggle, 5 Base de datos (final).
 */
function useSecuencia(reducido) {
  const [paso, setPaso] = useState(0)

  useEffect(() => {
    if (reducido) return undefined
    const timers = LINEA_DE_TIEMPO.map((t, i) => setTimeout(() => setPaso(i + 1), t))
    const saltar = () => {
      timers.forEach(clearTimeout)
      setPaso(PASO_FINAL)
    }
    const eventos = ['pointerdown', 'keydown', 'wheel', 'touchstart']
    eventos.forEach(e => window.addEventListener(e, saltar, { once: true, passive: true }))
    return () => {
      timers.forEach(clearTimeout)
      eventos.forEach(e => window.removeEventListener(e, saltar))
    }
  }, [reducido])

  return reducido ? PASO_FINAL : paso
}

function VentanaNotion({ paso, reducido }) {
  const menuAbierto = paso >= 2
  const activo = menuAbierto ? paso - 2 : -1

  return (
    <div className="intro-ventana" role="img" aria-label={DESCRIPCION}>
      <div className="intro-v-barra" aria-hidden="true">
        <NotionLogo size={14} color="currentColor" />
        <span>Cursada 2026</span>
        <span className="intro-v-sep">/</span>
        <span className="intro-v-actual">Sin título</span>
      </div>
      <div className="intro-v-cuerpo" aria-hidden="true">
        <div className="intro-v-lateral">
          <span className="intro-v-item is-on" />
          <span className="intro-v-item" />
          <span className="intro-v-item" />
          <span className="intro-v-item corto" />
        </div>
        <div className="intro-v-pagina">
          <p className="intro-v-titulo">Sin título</p>
          <p className="intro-v-linea">
            {paso === 0 ? (
              <span className="intro-v-hint">Escribí “/” para ver los comandos</span>
            ) : (
              <span className="intro-v-barra-tipeada">/</span>
            )}
            <span className={`intro-caret${reducido ? ' is-quieto' : ''}`} />
          </p>

          <m.ul
            className="intro-menu"
            initial={false}
            animate={
              menuAbierto
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={{ duration: reducido ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <li className="intro-menu-titulo">Bloques básicos</li>
            {ITEMS.map((it, i) => {
              const Icono = it.icono
              return (
                <li key={it.nombre} className={`intro-menu-item${i === activo ? ' is-activo' : ''}`}>
                  <span className="intro-menu-icono"><Icono size={16} /></span>
                  <span className="intro-menu-texto">
                    <span className="intro-menu-nombre">{it.nombre}</span>
                    <span className="intro-menu-desc">{it.desc}</span>
                  </span>
                </li>
              )
            })}
          </m.ul>
        </div>
      </div>
    </div>
  )
}

export default function Apertura() {
  const reducido = Boolean(useReducedMotion())
  const paso = useSecuencia(reducido)

  return (
    <div className="intro-apertura">
      <div className="intro-apertura-texto">
        <p className="intro-eyebrow">Curso práctico · 6 módulos</p>
        <h1 id="intro-titulo">Armá tu sistema de cursada en Notion, bloque a bloque</h1>
        <p className="intro-sub">
          Empezás con una página en blanco y terminás con un dashboard donde ves materias,
          apuntes y fechas de entrega en un solo lugar.
        </p>
        <Cta />
      </div>
      <VentanaNotion paso={paso} reducido={reducido} />
    </div>
  )
}
