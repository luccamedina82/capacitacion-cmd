import { Lock, ChevronRight } from 'lucide-react'

/**
 * Sección plegable (tarjeta plana). El estado abierto/cerrado lo controla App
 * para poder abrirla desde "Continuar", la navegación y los enlaces con #ancla.
 *
 * El contenido siempre queda montado (solo se oculta con `hidden`): así el
 * cuestionario embebido conserva las respuestas en curso al plegar la sección.
 *
 * Bloqueo suave: el contenido de todos los módulos está disponible; lo que se
 * bloquea es el cuestionario (lo resuelve el contenido hijo con `estado`).
 *
 * @param {'aprobado'|'en-curso'|'bloqueado'} estado
 * @param {boolean}  recomendado - módulo sugerido por el plan personalizado
 * @param {boolean}  abierto
 * @param {function} onToggle
 */
export default function BloqueSeccion({
  id,
  num,
  titulo,
  intro,
  estado,
  recomendado = false,
  abierto,
  onToggle,
  children,
}) {
  const completado = estado === 'aprobado'

  return (
    <section id={id} className="bloque-wrapper">
      <div
        className={`section-card${completado ? ' is-completed' : ''}${abierto ? ' is-open' : ''}`}
      >
        <button
          className="section-card-header cabecera"
          aria-expanded={abierto}
          aria-controls={`cuerpo-${id}`}
          onClick={onToggle}
          type="button"
        >
          <div className="cab-txt">
            <span className="num">{num}</span>
            <h2>{titulo}</h2>
            {intro && <p className="intro">{intro}</p>}
          </div>

          <div className="cab-lado">
            {recomendado && (
              <span className="chip recomendado"><span aria-hidden="true">★</span> Recomendado para vos</span>
            )}
            {estado === 'aprobado' && (
              <span className="chip completado"><span aria-hidden="true">✓</span> Aprobado</span>
            )}
            {estado === 'en-curso' && (
              <span className="chip ok">En curso</span>
            )}
            {estado === 'bloqueado' && (
              <span className="chip cerrado">
                <span aria-hidden="true">📖</span> Disponible
                <span className="sr-only">; cuestionario bloqueado</span>
                <Lock size={12} aria-hidden="true" />
              </span>
            )}
            <span
              className={`flecha${abierto ? ' expandido' : ''}`}
              aria-hidden="true"
            >
              <ChevronRight size={16} />
            </span>
          </div>
        </button>

        <div hidden={!abierto}>
          <div className="section-card-divider" />
          <div className="section-card-body cuerpo-bloque" id={`cuerpo-${id}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
