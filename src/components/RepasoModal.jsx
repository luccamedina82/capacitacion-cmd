import { useEffect, useRef } from 'react'
import { PUNTAJE_MAXIMO, PUNTAJE_MINIMO } from '../data/tally.js'

/**
 * Modal que aparece cuando el puntaje no alcanza el mínimo.
 * Ofrece volver al video o al PDF de la sección, o reintentar directamente.
 * Cualquier opción reinicia el formulario para que el próximo intento arranque de cero.
 */
export default function RepasoModal({ abierto, puntaje, videoId, pdfId, onReintentar, onCerrar }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (abierto && !dialog.open) dialog.showModal()
    if (!abierto && dialog.open) dialog.close()
  }, [abierto])

  const irA = (id) => {
    onReintentar()
    const destino = document.getElementById(id)
    if (!destino) return
    destino.scrollIntoView({ behavior: 'smooth', block: 'center' })
    destino.focus({ preventScroll: true })
  }

  return (
    <dialog
      ref={dialogRef}
      className="repaso-modal"
      aria-labelledby="repaso-modal-titulo"
      onClose={onCerrar}
    >
      <span className="repaso-modal-emoji" aria-hidden="true">📚</span>
      <h3 id="repaso-modal-titulo">¿Te gustaría volver a ver el video o el PDF?</h3>
      <p>
        Obtuviste {puntaje ?? 0}/{PUNTAJE_MAXIMO}. Necesitás {PUNTAJE_MINIMO} o más para desbloquear
        la siguiente sección. Repasá el material y volvé a intentarlo.
      </p>

      <div className="repaso-modal-acciones">
        {videoId && (
          <button type="button" className="corregir" onClick={() => irA(videoId)}>
            🎬 Ver el video
          </button>
        )}
        {pdfId && (
          <button type="button" className="corregir" onClick={() => irA(pdfId)}>
            📄 Ver el PDF
          </button>
        )}
        <button type="button" className="saltear" onClick={onReintentar}>
          Reintentar ahora
        </button>
      </div>
    </dialog>
  )
}
