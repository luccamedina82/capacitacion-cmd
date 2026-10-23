import { Check } from 'lucide-react'
import { PIEZAS_DASHBOARD } from '../data/piezas.js'

/**
 * Dashboard que se arma pieza por pieza: cada pieza se enciende cuando se aprueba su módulo.
 *
 * @param {Object<string, boolean>} aprobados - mapa { [idModulo]: true } de módulos aprobados
 * @param {Array<{id: string, etiqueta: string, Icono: Component}>} [piezas] - piezas a mostrar
 * @param {'normal'|'compacto'|'certificado'} [variante] - tamaño visual
 * @param {string} [etiqueta] - nombre accesible de la lista
 */
export default function DashboardProgreso({
  aprobados,
  piezas = PIEZAS_DASHBOARD,
  variante = 'normal',
  etiqueta = 'Piezas de tu dashboard',
}) {
  return (
    <ol className={`dash-progreso dash-${variante}`} aria-label={etiqueta}>
      {piezas.map(({ id, etiqueta: nombre, Icono }) => {
        const lista = Boolean(aprobados?.[id])
        return (
          <li key={id} className={`dash-pieza${lista ? ' encendida' : ''}`}>
            <span className="dash-pieza-icono" aria-hidden="true">
              <Icono size={variante === 'compacto' ? 18 : 22} />
            </span>
            <span className="dash-pieza-nombre">{nombre}</span>
            <span className="dash-pieza-estado">
              {lista && <Check size={14} aria-hidden="true" />}
              <span className="sr-only">{lista ? 'completada' : 'pendiente'}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}
