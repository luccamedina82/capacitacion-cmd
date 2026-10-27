import { ArrowLeft, ArrowRight } from 'lucide-react'

/**
 * Una etapa del curso (diagnóstico, módulo o cierre). Se muestra de a una: las demás
 * quedan montadas pero ocultas, así los cuestionarios embebidos conservan las respuestas en curso.
 *
 * @param {string}  id       - ancla de la etapa (#sec3); el h1 recibe el foco al llegar
 * @param {boolean} visible
 * @param {React.ReactNode} kicker - línea superior, ej. "Módulo 3 de 6 · Base de datos"
 * @param {string}  titulo
 * @param {React.ReactNode} [estado] - un único chip de estado
 * @param {React.ReactNode} [icono]  - ícono grande de la etapa (ancla visual de "estás acá")
 * @param {boolean} [compacta] - cabecera mínima (lección en curso: el contenido queda arriba)
 * @param {React.ReactNode} [volver] - control para volver, al inicio de la cabecera compacta
 * @param {{id: string, etiqueta: string}} [anterior]
 * @param {{id: string, etiqueta: string}} [siguiente]
 * @param {function} onIr    - (id, evento) navega a otra etapa
 */
export default function Etapa({
  id, visible, kicker, titulo, estado, icono, compacta = false, volver, anterior, siguiente, onIr, children,
}) {
  const tituloId = `${id}-titulo`
  const clases = ['etapa-cab', icono && 'etapa-cab--con-icono', compacta && 'etapa-cab--compacta'].filter(Boolean).join(' ')

  return (
    <section id={id} className="etapa" hidden={!visible} aria-labelledby={tituloId}>
      {compacta && volver}
      <header className={clases}>
        {icono && <span className="etapa-icono" aria-hidden="true">{icono}</span>}
        <div className="etapa-kicker">
          <span>{kicker}</span>
          {estado}
        </div>
        <h1 id={tituloId} className="etapa-titulo" tabIndex={-1}>{titulo}</h1>
      </header>

      {children}

      {(anterior || siguiente) && (
        <nav className="etapa-nav" aria-label="Etapas vecinas">
          {anterior ? (
            <a href={`#${anterior.id}`} className="etapa-nav-link" onClick={e => onIr(anterior.id, e)}>
              <ArrowLeft size={18} aria-hidden="true" />
              <span><small>Anterior</small>{anterior.etiqueta}</span>
            </a>
          ) : <span />}
          {siguiente && (
            <a href={`#${siguiente.id}`} className="etapa-nav-link etapa-nav-link--siguiente" onClick={e => onIr(siguiente.id, e)}>
              <span><small>Siguiente</small>{siguiente.etiqueta}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          )}
        </nav>
      )}
    </section>
  )
}
