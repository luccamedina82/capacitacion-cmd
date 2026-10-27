import { motion, AnimatePresence } from 'motion/react'
import { MiniTabla, MiniTablero, MiniCalendario, MiniToggle } from './MiniBloques.jsx'
import { OPCIONES, AVISOS, VUELO } from './guion.js'

const RESORTE = { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }

// Alto fijo de cada opción del menú: permite desplazar la lista como el menú real de Notion
const ALTO_OPCION = 46
const PADDING_MENU = 8

function Bloque({ opcion }) {
  if (opcion === 'tablero') return <MiniTablero />
  if (opcion === 'calendario') return <MiniCalendario />
  if (opcion === 'toggle') return <MiniToggle />
  return <MiniTabla />
}

/**
 * Ventana de página de Notion recreada en vidrio. Decorativa (aria-hidden en el padre).
 * @param {object}  guion    - { fase, idx, aviso } de useGuion
 * @param {boolean} vuelo    - el bloque viaja desde/hacia su flotante (layoutId compartido)
 * @param {boolean} compacto - menú más bajo en pantallas chicas
 * @param {boolean} estatico - sin animación: muestra el estado final
 * @param {object}  brillo   - { x, y } motion values del destello que sigue al puntero
 */
export default function VentanaNotion({ guion, vuelo, compacto, estatico, brillo }) {
  const { fase, idx, aviso } = guion
  const opcion = OPCIONES[idx]?.id
  const datosAviso = aviso ? AVISOS[opcion] : null

  // El resalte queda en la segunda fila visible; la lista no se pasa del final
  const filasVisibles = compacto ? 2.5 : 3.5
  const desplazamiento = Math.min(
    Math.max(0, idx - 1) * ALTO_OPCION,
    (OPCIONES.length - filasVisibles) * ALTO_OPCION,
  )

  const bloque = fase === 'bloque' && (
    <motion.div
      key={opcion}
      className="vn-bloque"
      {...(vuelo
        ? { layoutId: `bloque-${opcion}`, transition: VUELO }
        : {
            initial: estatico ? false : { opacity: 0, scale: 0.9, y: 10 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.97 },
            transition: { type: 'spring', stiffness: 260, damping: 22 },
          })}
    >
      <Bloque opcion={opcion} />
    </motion.div>
  )

  return (
    <div className="vn-ventana glass glass--chrome glass-lens">
      {brillo && (
        <div className="vn-brillo-capa">
          <motion.div className="vn-brillo" style={{ x: brillo.x, y: brillo.y }} />
        </div>
      )}

      <div className="ventana-barra">
        <span className="ventana-puntos"><i /><i /><i /></span>
        <span className="vn-ruta">📚 Organizá tu cursada / Mi cursada 2026</span>
      </div>

      <AnimatePresence>
        {datosAviso && (
          <motion.div
            key={opcion}
            className="vn-aviso glass glass--chrome"
            initial={estatico ? false : { opacity: 0, y: -28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <span className="vn-aviso-icono">{datosAviso.icono}</span>
            <span className="vn-aviso-texto">
              <span className="vn-aviso-cab"><span>Recordatorio</span><span>ahora</span></span>
              <strong>{datosAviso.titulo}</strong>
              <em>{datosAviso.detalle}</em>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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

          {vuelo ? bloque : <AnimatePresence mode="wait">{bloque}</AnimatePresence>}

          <AnimatePresence>
            {fase === 'menu' && (
              <motion.div
                className="vn-menu glass glass--chrome"
                style={{ maxHeight: PADDING_MENU * 2 + filasVisibles * ALTO_OPCION }}
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.16 } }}
                transition={RESORTE}
              >
                <motion.ul className="vn-menu-lista" animate={{ y: -desplazamiento }} transition={RESORTE}>
                  {OPCIONES.map((op, i) => (
                    <li key={op.id} className={idx === i ? 'activa' : undefined}>
                      {idx === i && <motion.span layoutId="vn-resalte" className="vn-resalte" transition={RESORTE} />}
                      <span className="vn-op-icono">{op.icono}</span>
                      <span className="vn-op-texto"><strong>{op.nombre}</strong><em>{op.desc}</em></span>
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
