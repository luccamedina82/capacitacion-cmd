/**
 * Acordeón nativo <details>/<summary> con estilos Notion.
 * El triángulo rotante es CSS puro (::before en summary).
 *
 * @param {string}         summary     - texto del encabezado
 * @param {React.ReactNode} children   - contenido del cuerpo
 * @param {boolean}        defaultOpen - abierto por defecto
 */
export default function Acordeon({ summary, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen || undefined}>
      <summary>{summary}</summary>
      <div className="cuerpo">{children}</div>
    </details>
  )
}
