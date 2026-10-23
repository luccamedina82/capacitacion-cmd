import { useState, useCallback, useEffect } from 'react'

/**
 * Sección plegable con diseño de tarjeta flotante estilo Notion.
 * - Bordes redondeados y sombras suaves (card-based UI)
 * - Triángulo rotante y chip de estado interactivo
 * - Estado bloqueado con banner de aviso y opción de desbloqueo
 * - Estado completado con feedback visual positivo
 */
export default function BloqueSeccion({
  id,
  num,
  titulo,
  intro,
  bloqueado,
  completado = false,
  defaultAbierto = false,
  globalExpand,
  onDesbloquear,
  children,
}) {
  const [abierto, setAbierto] = useState(defaultAbierto)
  const [forzado, setForzado] = useState(false)

  const estaBloqueado = bloqueado && !forzado

  // Escuchar comandos globales de desplegar/plegar todo
  useEffect(() => {
    if (!globalExpand) return
    if (globalExpand.cmd === 'all' && !estaBloqueado) setAbierto(true)
    if (globalExpand.cmd === 'none') setAbierto(false)
  }, [globalExpand, estaBloqueado])

  const toggleCabecera = useCallback(() => {
    if (estaBloqueado) return
    setAbierto(v => !v)
  }, [estaBloqueado])

  const saltear = useCallback((e) => {
    e.stopPropagation()
    setForzado(true)
    setAbierto(true)
    onDesbloquear?.()
  }, [onDesbloquear])

  return (
    <section id={id} className="bloque-wrapper">
      <div
        className={`section-card${estaBloqueado ? ' is-locked' : ''}${completado ? ' is-completed' : ''}${abierto ? ' is-open' : ''}`}
      >
        <button
          className={`section-card-header cabecera${estaBloqueado ? ' disabled' : ''}`}
          aria-expanded={String(abierto)}
          aria-controls={`cuerpo-${id}`}
          aria-disabled={estaBloqueado ? 'true' : undefined}
          onClick={toggleCabecera}
          type="button"
        >
          <div className="cab-txt">
            <span className="num">{num}</span>
            <h2>{titulo}</h2>
            {intro && <p className="intro">{intro}</p>}
          </div>

          <div className="cab-lado">
            {completado ? (
              <span className="chip completado">✓ Aprobado</span>
            ) : estaBloqueado ? (
              <span className="chip cerrado">🔒 Bloqueado</span>
            ) : (
              <span className="chip ok">{abierto ? 'Abierto' : 'Listo'}</span>
            )}
            <span
              className={`flecha${abierto && !estaBloqueado ? ' expandido' : ''}`}
              aria-hidden="true"
            >
              ▶
            </span>
          </div>
        </button>

        {/* Banner amigable cuando está bloqueado */}
        {estaBloqueado && (
          <div className="desbloqueo-banner">
            <div className="desbloqueo-content">
              <span className="desbloqueo-icon">🔒</span>
              <div className="desbloqueo-texto">
                <strong>Sección bloqueada</strong>
                <span>Aprobá el cuestionario del módulo anterior (8/10 o más) para desbloquear este contenido.</span>
              </div>
            </div>
            {/* Atajo solo para desarrollo: no se incluye en el build de producción */}
            {import.meta.env.DEV && (
              <button className="saltear" type="button" onClick={saltear}>
                Desbloquear para explorar (dev)
              </button>
            )}
          </div>
        )}

        {/* Contenido si está abierto y no bloqueado */}
        {abierto && !estaBloqueado && (
          <>
            <div className="section-card-divider" />
            <div className="section-card-body cuerpo-bloque" id={`cuerpo-${id}`}>
              {children}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
