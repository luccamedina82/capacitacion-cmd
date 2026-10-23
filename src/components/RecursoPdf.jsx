import { Download, ExternalLink } from 'lucide-react'

/**
 * Componente de descarga para Recurso PDF estilo bloque de archivo Notion (/file).
 * Ofrece descargar el archivo o abrirlo en una pestaña nueva para leerlo en línea.
 *
 * @param {string} titulo - título del PDF
 * @param {string} url    - enlace al archivo (ej: "/pdfs/guia-1.pdf")
 * @param {string} [id]   - ancla para navegar al recurso (ej: desde el modal de repaso)
 */
export default function RecursoPdf({ titulo, url, id }) {
  return (
    <div className="recurso-pdf-wrapper" id={id} tabIndex={id ? -1 : undefined}>
      <a
        href={url}
        download
        className="recurso-pdf-btn"
        title={`Descargar ${titulo}`}
      >
        <div className="recurso-pdf-left">
          <span className="recurso-pdf-icon" aria-hidden="true">
            📄
          </span>
          <div className="recurso-pdf-info">
            <span className="recurso-pdf-label">Recurso descargable</span>
            <span className="recurso-pdf-title">{titulo}</span>
          </div>
        </div>
        <div className="recurso-pdf-action">
          <span>Descargar PDF</span>
          <span className="recurso-pdf-arrow" aria-hidden="true">
            <Download size={16} />
          </span>
        </div>
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="recurso-pdf-abrir"
      >
        <ExternalLink size={14} aria-hidden="true" />
        Abrir en una pestaña nueva
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </div>
  )
}
