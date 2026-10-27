import { Check, ClipboardList, Flag, LayoutGrid, Star } from 'lucide-react'

const ICONOS = { inicio: LayoutGrid, encuesta: ClipboardList, cierre: Flag }

/**
 * Recorrido del curso (barra lateral en pantallas anchas): dónde estás, qué completaste y qué sigue.
 * Usa los mismos ítems que MenuModulos, que cubre la navegación en pantallas angostas.
 *
 * @param {Array}    items   - [{ id, etiqueta, num?, icono?, hecho, detalle, recomendado? }]
 * @param {string}   actual  - id de la etapa visible
 * @param {string}   resumen - ej. "2 de 6"
 * @param {function} onIr    - (id, evento) navega a la etapa
 */
export default function Recorrido({ items, actual, resumen, onIr }) {
  return (
    <nav className="recorrido" aria-label="Recorrido del curso">
      <div className="recorrido-cab">
        <span className="recorrido-titulo">Tu recorrido</span>
        <span className="recorrido-resumen">{resumen}</span>
      </div>
      <ol>
        {items.map(item => {
          const Icono = ICONOS[item.icono]
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`recorrido-item${item.hecho ? ' hecho' : ''}`}
                aria-current={actual === item.id ? 'step' : undefined}
                onClick={e => onIr(item.id, e)}
              >
                <span className="recorrido-marca" aria-hidden="true">
                  {item.hecho
                    ? <Check size={14} strokeWidth={3} />
                    : Icono ? <Icono size={14} strokeWidth={2.25} /> : item.num}
                </span>
                <span className="recorrido-texto">
                  <span className="recorrido-nombre">{item.nombre}</span>
                  <span className="recorrido-detalle">
                    {item.detalle}
                    {item.recomendado && (
                      <span className="recorrido-reco"> · <Star size={10} aria-hidden="true" /> Para vos</span>
                    )}
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
