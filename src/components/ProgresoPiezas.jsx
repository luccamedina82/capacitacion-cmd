import { Check } from 'lucide-react'
import { PIEZAS_DASHBOARD } from '../data/piezas.js'

/**
 * Progreso del curso contado como lo que estás construyendo: las 6 piezas del dashboard.
 * Cada segmento es un módulo, se enciende al aprobar su cuestionario y lleva a ese módulo.
 * Debajo explica cuál es la próxima pieza y qué hace falta para encenderla.
 *
 * @param {Record<string, boolean>} aprobados
 * @param {function} onIr - (id, evento) navega al módulo
 */
export default function ProgresoPiezas({ aprobados, onIr }) {
  const total = PIEZAS_DASHBOARD.length
  const cantidad = PIEZAS_DASHBOARD.filter(p => aprobados[p.id]).length
  const proxima = PIEZAS_DASHBOARD.find(p => !aprobados[p.id])

  return (
    <section className="progreso-piezas" aria-labelledby="progreso-piezas-titulo">
      <div className="progreso-piezas-cab">
        <h2 id="progreso-piezas-titulo">Tu dashboard</h2>
        <span className="progreso-piezas-cuenta">{cantidad} de {total} piezas encendidas</span>
      </div>

      <ol className="progreso-piezas-lista">
        {PIEZAS_DASHBOARD.map((p, i) => {
          const encendida = Boolean(aprobados[p.id])
          const esProxima = p === proxima
          return (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className={`pieza${encendida ? ' encendida' : ''}${esProxima ? ' proxima' : ''}`}
                onClick={e => onIr(p.id, e)}
              >
                <span className="pieza-barra" aria-hidden="true" />
                <span className="pieza-cuerpo">
                  {/* El ✓ evita que "encendida" dependa solo del color */}
                  {encendida && <Check size={13} strokeWidth={3} className="pieza-check" aria-hidden="true" />}
                  <span className="pieza-icono" aria-hidden="true">{p.icono}</span>
                  <span className="pieza-nombre">{i + 1}. {p.etiqueta}</span>
                </span>
                <span className="sr-only">
                  {encendida ? ': encendida' : esProxima ? ': próxima pieza' : ': pendiente'}
                </span>
              </a>
            </li>
          )
        })}
      </ol>

      <p className="progreso-piezas-proxima">
        {proxima ? (
          <>
            Próxima pieza: <strong><span aria-hidden="true">{proxima.icono}</span> {proxima.etiqueta}</strong>
            {' '}· se enciende al aprobar el cuestionario del módulo {PIEZAS_DASHBOARD.indexOf(proxima) + 1}.
          </>
        ) : (
          'Dashboard completo: ya podés hacer el cierre y obtener tu certificado.'
        )}
      </p>
    </section>
  )
}
