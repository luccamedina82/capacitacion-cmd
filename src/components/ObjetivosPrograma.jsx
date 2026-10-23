import { Check } from 'lucide-react'

const OBJETIVOS = [
  { id: 'sec1', texto: 'Dominar el menú de bloques con el atajo / (barra) y anidar páginas limpiamente' },
  { id: 'sec2', texto: 'Estructurar materias con Toggles para aplicar Active Recall y embeber PDFs de cátedra' },
  { id: 'sec3', texto: 'Crear una base de datos con propiedades clave (Materia, Estado, Fecha de entrega)' },
  { id: 'sec4', texto: 'Visualizar las mismas tareas en Tablero Kanban y Calendario mensual sincronizado' },
  { id: 'sec5', texto: "Configurar filtros dinámicos ('Esta semana') y ordenamiento por urgencia" },
  { id: 'sec6', texto: 'Diseñar un Dashboard principal en columnas con bases vinculadas (Linked DB)' },
]

/**
 * Lista de solo lectura: cada objetivo se marca solo al aprobar el cuestionario de su módulo.
 * @param {Record<string, boolean>} aprobados
 */
export default function ObjetivosPrograma({ aprobados }) {
  const logrados = OBJETIVOS.filter(o => aprobados[o.id]).length

  return (
    <>
      <h2>Objetivos del programa</h2>
      <p className="nota">
        Se marcan solos cuando aprobás el cuestionario de cada módulo.{' '}
        <strong>{logrados} de {OBJETIVOS.length} logrados</strong>
      </p>
      <ul className="objetivos">
        {OBJETIVOS.map((o, i) => {
          const logrado = Boolean(aprobados[o.id])
          return (
            <li key={o.id} className={logrado ? 'logrado' : undefined}>
              <span className="objetivo-check" aria-hidden="true">
                {logrado && <Check size={12} strokeWidth={3} />}
              </span>
              <span className="objetivo-txt">Módulo {i + 1}: {o.texto}</span>
              <span className="sr-only">{logrado ? ' — logrado' : ' — pendiente'}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
