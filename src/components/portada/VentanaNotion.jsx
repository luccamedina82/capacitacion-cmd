import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MiniTabla, MiniTablero, MiniCalendario, MiniToggle } from './MiniBloques.jsx'

const OPCIONES = [
  { id: 'texto',      icono: 'Aa',  nombre: 'Texto',         desc: 'Párrafo simple' },
  { id: 'titulo',     icono: 'H1',  nombre: 'Encabezado',    desc: 'Título de sección' },
  { id: 'toggle',     icono: '▸',   nombre: 'Toggle',        desc: 'Contenido desplegable' },
  { id: 'bd',         icono: '🗃️', nombre: 'Base de datos', desc: 'Tabla con propiedades' },
  { id: 'tablero',    icono: '📋',  nombre: 'Tablero',       desc: 'Vista Kanban' },
  { id: 'calendario', icono: '📅',  nombre: 'Calendario',    desc: 'Vista mensual' },
]

// Índices de las opciones que el guion elige, una por vuelta
const METAS = [3, 4, 5]

const RESORTE = { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }

/**
 * Guion de la demo: el cursor escribe "/", se abre el menú, el resalte baja
 * hasta una opción y el bloque se materializa. Se repite con otra opción.
 * En modo estático (reduced motion) queda el estado final compuesto.
 */
function useGuion(estatico) {
  const [estado, setEstado] = useState({ fase: 'cursor', idx: 0 })

  useEffect(() => {
    if (estatico) return undefined
    let activo = true
    const timers = []
    const esperar = ms => new Promise(res => { timers.push(setTimeout(res, ms)) })

    const correr = async () => {
      let vuelta = 0
      while (activo) {
        const meta = METAS[vuelta % METAS.length]
        vuelta += 1
        setEstado({ fase: 'cursor', idx: 0 })
        await esperar(1000)
        setEstado({ fase: 'menu', idx: 0 })
        await esperar(750)
        for (let i = 1; i <= meta; i += 1) {
          setEstado({ fase: 'menu', idx: i })
          await esperar(430)
        }
        await esperar(380)
        setEstado({ fase: 'bloque', idx: meta })
        await esperar(3800)
      }
    }
    correr()

    return () => {
      activo = false
      timers.forEach(clearTimeout)
    }
  }, [estatico])

  return estatico ? { fase: 'bloque', idx: 3 } : estado
}

function Bloque({ opcion }) {
  if (opcion === 'tablero') return <MiniTablero />
  if (opcion === 'calendario') return <MiniCalendario />
  if (opcion === 'toggle') return <MiniToggle />
  return <MiniTabla />
}

/**
 * Ventana de página de Notion recreada en vidrio. Decorativa (aria-hidden en el padre).
 * @param {boolean} estatico - sin animación: muestra el estado final
 * @param {object}  brillo   - { x, y } motion values del destello que sigue al puntero
 */
export default function VentanaNotion({ estatico, brillo }) {
  const { fase, idx } = useGuion(estatico)
  const opcion = OPCIONES[idx]?.id

  return (
    <div className="vn-ventana glass glass--chrome glass-lens">
      {brillo && <motion.div className="vn-brillo" style={{ x: brillo.x, y: brillo.y }} />}

      <div className="vn-barra">
        <span className="vn-puntos"><i /><i /><i /></span>
        <span className="vn-ruta">📚 Organizá tu cursada / Mi cursada 2026</span>
      </div>

      <div className="vn-pagina">
        <div className="vn-icono">📚</div>
        <div className="vn-titulo">Mi cursada 2026</div>
        <div className="vn-texto">Entregas, parciales y apuntes en un solo lugar.</div>

        <div className="vn-editor">
          {fase !== 'bloque' && (
            <div className="vn-comando">
              <span>{fase === 'menu' ? '/' : ''}</span>
              <span className="vn-cursor" />
              {fase === 'cursor' && <span className="vn-pista">Escribí “/” para ver los bloques</span>}
            </div>
          )}

          <AnimatePresence mode="wait">
            {fase === 'bloque' && (
              <motion.div
                key={opcion}
                className="vn-bloque"
                initial={estatico ? false : { opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <Bloque opcion={opcion} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {fase === 'menu' && (
              <motion.ul
                className="vn-menu glass glass--chrome"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.16 } }}
                transition={RESORTE}
              >
                {OPCIONES.map((op, i) => (
                  <li key={op.id} className={idx === i ? 'activa' : undefined}>
                    {idx === i && <motion.span layoutId="vn-resalte" className="vn-resalte" transition={RESORTE} />}
                    <span className="vn-op-icono">{op.icono}</span>
                    <span className="vn-op-texto"><strong>{op.nombre}</strong><em>{op.desc}</em></span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
