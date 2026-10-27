import { ChevronLeft, ChevronRight } from 'lucide-react'
import MenuModulos from './MenuModulos.jsx'

/**
 * Barra inferior flotante para pantallas angostas, al estilo de la tab bar de iOS 26:
 * anterior · módulos (abre una hoja) · siguiente, al alcance del pulgar.
 * En pantallas anchas no se muestra: el recorrido lateral cumple esa función.
 *
 * @param {{id: string, etiqueta: string}} [anterior]
 * @param {{id: string, etiqueta: string}} [siguiente]
 * @param {Array}    items   - ítems de MenuModulos
 * @param {string}   actual  - id de la etapa visible
 * @param {string}   resumen - ej. "2/6"
 * @param {function} onIr    - (id, evento) navega a la etapa
 */
export default function BarraInferior({ anterior, siguiente, items, actual, resumen, onIr }) {
  return (
    <nav className="barra-inferior" aria-label="Navegación entre etapas">
      {anterior ? (
        <a
          href={`#${anterior.id}`}
          className="barra-inferior-paso"
          aria-label={`Anterior: ${anterior.etiqueta}`}
          onClick={e => onIr(anterior.id, e)}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </a>
      ) : <span className="barra-inferior-paso" aria-hidden="true" />}

      <MenuModulos items={items} activa={actual} resumen={resumen} onIr={onIr} />

      {siguiente ? (
        <a
          href={`#${siguiente.id}`}
          className="barra-inferior-paso"
          aria-label={`Siguiente: ${siguiente.etiqueta}`}
          onClick={e => onIr(siguiente.id, e)}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </a>
      ) : <span className="barra-inferior-paso" aria-hidden="true" />}
    </nav>
  )
}
