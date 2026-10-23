import { motion, useTransform } from 'motion/react'
import { MiniTabla, MiniTablero, MiniCalendario, MiniToggle } from './MiniBloques.jsx'

const BLOQUES = [
  { id: 'toggle',  clase: 'pos-toggle',        prof: 26, Pieza: MiniToggle },
  { id: 'tabla',   clase: 'pos-tabla',         prof: 38, Pieza: MiniTabla },
  { id: 'tablero', clase: 'pos-tablero extra', prof: 18, Pieza: MiniTablero },
  { id: 'cal',     clase: 'pos-cal extra',     prof: 44, Pieza: MiniCalendario },
]

function Flotante({ clase, prof, Pieza, indice, px, py, estatico }) {
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
      <div className="flotante-flota" style={{ animationDelay: `${indice * -1.7}s` }}>
        <div className="glass glass--chrome flotante-vidrio">
          <Pieza />
        </div>
      </div>
    </motion.div>
  )
}

/** Bloques de Notion flotantes alrededor de la ventana, con profundidad por puntero. */
export default function Flotantes({ px, py, estatico }) {
  return BLOQUES.map((b, i) => (
    <Flotante key={b.id} {...b} indice={i} px={px} py={py} estatico={estatico} />
  ))
}
