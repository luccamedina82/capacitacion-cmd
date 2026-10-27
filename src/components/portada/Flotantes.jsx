import { motion, useTransform } from 'motion/react'
import { MiniTabla, MiniTablero, MiniCalendario, MiniToggle } from './MiniBloques.jsx'
import { VUELO } from './guion.js'

// Los id coinciden con las opciones del menú: comparten layoutId con el bloque de la ventana
const BLOQUES = [
  { id: 'toggle',     clase: 'pos-toggle',        prof: 26, Pieza: MiniToggle },
  { id: 'bd',         clase: 'pos-tabla',         prof: 38, Pieza: MiniTabla },
  { id: 'tablero',    clase: 'pos-tablero extra', prof: 18, Pieza: MiniTablero },
  { id: 'calendario', clase: 'pos-cal extra',     prof: 44, Pieza: MiniCalendario },
]

function Flotante({ id, clase, prof, Pieza, indice, px, py, estatico, enUso, vuelo }) {
  // Cada bloque se desplaza según su profundidad: solo transform
  const x = useTransform(px, v => v * prof)
  const y = useTransform(py, v => v * prof)

  return (
    <motion.div
      className={`flotante ${clase}`}
      style={{ x, y }}
      initial={estatico ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 130, damping: 16, delay: 0.5 + indice * 0.14 }}
    >
      {/* Mientras su bloque está en la ventana, el lugar queda vacío */}
      {!enUso && (
        <div className="flotante-flota" style={{ animationDelay: `${indice * -1.7}s` }}>
          <motion.div
            className="glass glass--chrome flotante-vidrio"
            layoutId={vuelo ? `bloque-${id}` : undefined}
            transition={VUELO}
          >
            <Pieza />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

/**
 * Bloques de Notion flotantes alrededor de la ventana, con profundidad por puntero.
 * @param {string|null} enUso - id del bloque que está ahora dentro de la ventana
 * @param {boolean}     vuelo - viaje compartido con la ventana (solo escritorio con movimiento)
 */
export default function Flotantes({ px, py, estatico, enUso, vuelo }) {
  return BLOQUES.map((b, i) => (
    <Flotante
      key={b.id}
      {...b}
      indice={i}
      px={px}
      py={py}
      estatico={estatico}
      enUso={vuelo && enUso === b.id}
      vuelo={vuelo}
    />
  ))
}
