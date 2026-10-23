import { m, useReducedMotion } from 'motion/react'
import { Slash, BookOpen, Table, Columns3, Funnel, LayoutDashboard } from 'lucide-react'
import { SECCIONES } from '../../data/modulos.js'

const MODULOS = [
  { icono: Slash, aporta: 'La página de tu materia' },
  { icono: BookOpen, aporta: 'Toggles de Active Recall' },
  { icono: Table, aporta: 'La tabla de entregas' },
  { icono: Columns3, aporta: 'Tablero y calendario' },
  { icono: Funnel, aporta: 'La vista “Esta semana”' },
  { icono: LayoutDashboard, aporta: 'El hub que lo reúne todo' },
]

export default function MapaCurso({ onIrA }) {
  const reducido = Boolean(useReducedMotion())

  return (
    <section className="intro-mapa" aria-labelledby="intro-mapa-titulo">
      <div className="intro-bloque-cab">
        <h2 id="intro-mapa-titulo">Seis módulos, una pieza cada uno</h2>
        <p className="intro-sub">Elegí por dónde seguir o recorrelos en orden.</p>
      </div>
      <ol className="intro-mapa-lista">
        {SECCIONES.map((sec, i) => {
          const { icono: Icono, aporta } = MODULOS[i]
          const animacion = reducido
            ? {}
            : {
                initial: { opacity: 0, y: 12 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-40px' },
                transition: { duration: 0.25, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] },
              }
          return (
            <m.li key={sec.id} {...animacion}>
              <a className="intro-modulo" href={`#${sec.id}`} onClick={e => onIrA?.(sec.id, e)}>
                <span className="intro-modulo-cab">
                  <span className="intro-modulo-num">Módulo {i + 1}</span>
                  <Icono size={18} aria-hidden="true" />
                </span>
                <span className="intro-modulo-titulo">{sec.titulo}</span>
                <span className="intro-modulo-suma">Suma: {aporta}</span>
              </a>
            </m.li>
          )
        })}
      </ol>
    </section>
  )
}
