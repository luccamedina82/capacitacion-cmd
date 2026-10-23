import { useState, useEffect, useRef } from 'react'
import RepasoModal from './RepasoModal.jsx'
import { PUNTAJE_MAXIMO, PUNTAJE_MINIMO } from '../data/tally.js'

const NOMBRES_CAMPO_PUNTAJE  = ['score', 'puntaje']
const TALLY_ORIGIN           = 'https://tally.so'

/** Normaliza e.data: Tally envía un string JSON, pero aceptamos también un objeto. */
function parsearMensaje(data) {
  if (typeof data === 'string') {
    try { return JSON.parse(data) } catch { return null }
  }
  return data && typeof data === 'object' ? data : null
}

/**
 * Lee el campo calculado de puntaje del payload de Tally.FormSubmitted.
 * Busca un campo calculado llamado "score" (o "puntaje"); si el formulario
 * tiene un único campo calculado, usa ese. Devuelve null si no encuentra ninguno.
 */
function leerPuntaje(payload) {
  const calculados = (payload?.fields ?? []).filter(f => f.type === 'CALCULATED_FIELDS')
  const campo =
    calculados.find(f => NOMBRES_CAMPO_PUNTAJE.includes(f.title?.trim().toLowerCase())) ??
    (calculados.length === 1 ? calculados[0] : null)
  if (!campo) return null
  const valor = Number(campo.answer?.value ?? campo.answer?.raw)
  return Number.isFinite(valor) ? valor : null
}

/**
 * Formulario Tally embebido con corrección por puntaje.
 * Escucha el evento Tally.FormSubmitted, lee el campo calculado "score"
 * y aprueba si alcanza PUNTAJE_MINIMO; si no, ofrece repasar el material.
 *
 * @param {string}   formId     - ID del formulario (tally.so/r/<formId>)
 * @param {string}   titulo     - título accesible del iframe
 * @param {boolean}  aprobado   - si el cuestionario ya fue aprobado
 * @param {boolean}  [bloqueado] - bloqueo suave: falta aprobar el cuestionario del módulo anterior
 * @param {function} [onIrAnterior] - lleva al cuestionario que hay que aprobar primero
 * @param {function} [onDesbloquearDev] - atajo solo para desarrollo
 * @param {string}   [meta]     - qué se obtiene al aprobar (frase tras "para")
 * @param {string}   [exito]    - mensaje al aprobar
 * @param {function} onAprobado
 * @param {string}   [videoId]  - id del elemento de video al que lleva el modal
 * @param {string}   [pdfId]    - id del elemento de PDF al que lleva el modal
 */
export default function TallyQuiz({
  formId, titulo, aprobado, onAprobado, videoId, pdfId,
  bloqueado = false, onIrAnterior, onDesbloquearDev,
  meta = 'habilitar el siguiente cuestionario',
  exito = 'se habilitó el siguiente cuestionario.',
}) {
  const [puntaje, setPuntaje]       = useState(null)
  const [modalAbierto, setModal]    = useState(false)
  const [intento, setIntento]       = useState(0) // cambia la key del iframe para reiniciar el formulario
  const [sinPuntaje, setSinPuntaje] = useState(false) // se envió, pero el formulario no expone un puntaje
  const onAprobadoRef               = useRef(onAprobado)
  const iframeRef                   = useRef(null)

  useEffect(() => { onAprobadoRef.current = onAprobado }, [onAprobado])

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== TALLY_ORIGIN) return
      // Solo atender mensajes de ESTE iframe (puede haber varios formularios en la página)
      if (e.source !== iframeRef.current?.contentWindow) return

      const mensaje = parsearMensaje(e.data)
      if (import.meta.env.DEV) console.debug('[TallyQuiz]', formId, mensaje?.event, mensaje?.payload)
      if (mensaje?.event !== 'Tally.FormSubmitted') return

      const valor = leerPuntaje(mensaje.payload)
      if (valor === null) {
        console.warn(`[TallyQuiz] El formulario ${formId} no tiene un campo calculado de puntaje ("score").`)
        setSinPuntaje(true)
        return
      }

      setSinPuntaje(false)
      setPuntaje(valor)
      if (valor >= PUNTAJE_MINIMO) {
        onAprobadoRef.current?.()
      } else {
        setModal(true)
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [formId])

  const reintentar = () => {
    setModal(false)
    setPuntaje(null)
    setSinPuntaje(false)
    setIntento(n => n + 1)
  }

  const src = `${TALLY_ORIGIN}/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1`

  return (
    <div className="quiz tally-quiz">
      <h3>¿Pasaste el nivel?</h3>
      <p className="tiempo">
        Necesitás {PUNTAJE_MINIMO} de {PUNTAJE_MAXIMO} puntos (80 %) para {meta}.
      </p>

      {bloqueado ? (
        <div className="quiz-bloqueado">
          <span className="quiz-bloqueado-icono" aria-hidden="true">🔒</span>
          <div className="quiz-bloqueado-texto">
            <strong>Cuestionario bloqueado</strong>
            <span>
              Aprobá el cuestionario del módulo anterior para habilitar este.
              Mientras tanto podés leer el contenido y ver el video de este módulo.
            </span>
            <div className="quiz-bloqueado-acciones">
              {onIrAnterior && (
                <button type="button" className="saltear" onClick={onIrAnterior}>
                  Ir al cuestionario del módulo anterior
                </button>
              )}
              {/* Atajo solo para desarrollo: no se incluye en el build de producción */}
              {import.meta.env.DEV && onDesbloquearDev && (
                <button type="button" className="saltear" onClick={onDesbloquearDev}>
                  Habilitar para explorar (dev)
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="tally-wrapper">
          <iframe ref={iframeRef} key={intento} src={src} title={titulo} loading="lazy" />
        </div>
      )}

      {/* Región viva persistente: anuncia el resultado a lectores de pantalla */}
      <div role="status" aria-live="polite">
      {aprobado && (
        <p className="veredicto aprobado">
          <span aria-hidden="true">✅</span> Nivel aprobado{puntaje !== null && puntaje >= PUNTAJE_MINIMO ? ` con ${puntaje}/${PUNTAJE_MAXIMO}` : ''}: {exito}
        </p>
      )}
      {!aprobado && puntaje !== null && puntaje < PUNTAJE_MINIMO && (
        <div className="veredicto error">
          Obtuviste {puntaje}/{PUNTAJE_MAXIMO}. Necesitás {PUNTAJE_MINIMO} o más para avanzar.{' '}
          <button type="button" className="saltear" onClick={reintentar}>Reintentar</button>
        </div>
      )}
      {!aprobado && sinPuntaje && (
        <div className="veredicto error">
          Recibimos tus respuestas, pero no pudimos leer el puntaje de este cuestionario.
          Avisale al equipo de la capacitación.{' '}
          <button type="button" className="saltear" onClick={reintentar}>Reintentar</button>
        </div>
      )}
      </div>

      <RepasoModal
        abierto={modalAbierto}
        puntaje={puntaje}
        videoId={videoId}
        pdfId={pdfId}
        onReintentar={reintentar}
        onCerrar={() => setModal(false)}
      />
    </div>
  )
}
