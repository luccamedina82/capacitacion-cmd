import { ArrowRight } from 'lucide-react'

/** Llamado a la accion: diagnostico (principal) y retomar progreso (secundario). */
export default function Cta() {
  return (
    <div className="intro-cta">
      <a className="intro-btn" href="#encuesta">
        Empezar el curso <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a className="intro-enlace" href="#sec1">Ya empecé: ir a mi progreso</a>
    </div>
  )
}
