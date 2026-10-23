import { ArrowRight } from 'lucide-react'

/** Llamado a la accion: diagnostico (principal) y retomar progreso (secundario). */
export default function Cta({ onIrA, destinoProgreso = 'sec1' }) {
  return (
    <div className="intro-cta">
      <a className="intro-btn" href="#encuesta" onClick={e => onIrA?.('encuesta', e)}>
        Empezar el curso <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a className="intro-enlace" href={`#${destinoProgreso}`} onClick={e => onIrA?.(destinoProgreso, e)}>Ya empecé: ir a mi progreso</a>
    </div>
  )
}
