import { useState, useCallback } from 'react'

/**
 * Quiz de nivel con corrección inline.
 * Diseño 100% Notion: botones tipo select-option, veredicto con color semántico.
 *
 * @param {string}   quizId    - identificador del quiz ("q0", "q1"...)
 * @param {Array}    preguntas - [{ texto, opciones: [{op, texto}], ok }]
 * @param {function} onAprobado
 */
export default function Quiz({ quizId, preguntas, onAprobado }) {
  const [respuestas, setRespuestas] = useState({})
  const [estado, setEstado]         = useState({})
  const [veredicto, setVeredicto]   = useState('')
  const [tipoVeredicto, setTipo]    = useState('') // 'aprobado' | 'error' | ''

  const elegir = useCallback((pIdx, op) => {
    setRespuestas(prev => ({ ...prev, [pIdx]: op }))
    setEstado(prev => { const n = { ...prev }; delete n[pIdx]; return n })
    setVeredicto('')
    setTipo('')
  }, [])

  const corregir = useCallback(() => {
    let correctas = 0
    let sinResponder = 0
    const nuevoEstado = {}

    preguntas.forEach((p, i) => {
      const elegida = respuestas[i]
      if (!elegida) { sinResponder++; return }
      const ok = elegida === p.ok
      nuevoEstado[i] = ok ? 'bien' : 'mal'
      if (ok) correctas++
    })

    setEstado(nuevoEstado)

    if (sinResponder) {
      setVeredicto(`Falta responder ${sinResponder} ${sinResponder === 1 ? 'pregunta' : 'preguntas'}.`)
      setTipo('error')
      return
    }
    if (correctas === preguntas.length) {
      setVeredicto('✓ Nivel aprobado — se abrió el siguiente bloque.')
      setTipo('aprobado')
      onAprobado?.()
    } else {
      const incorrectas = preguntas.length - correctas
      setVeredicto(`${incorrectas} ${incorrectas === 1 ? 'respuesta incorrecta' : 'respuestas incorrectas'}. Revisá las marcadas en rojo y volvé a intentar.`)
      setTipo('error')
    }
  }, [preguntas, respuestas, onAprobado])

  return (
    <div className="quiz" data-quiz={quizId}>
      <h3>¿Pasaste el nivel?</h3>
      <p className="tiempo">
        {preguntas.length} {preguntas.length === 1 ? 'pregunta' : 'preguntas'} — hay que acertar todas para desbloquear lo siguiente.
      </p>

      {preguntas.map((p, i) => (
        <div key={i} className={`q${estado[i] ? ` ${estado[i]}` : ''}`}>
          <p>{p.texto}</p>
          <div className="ops-q">
            {p.opciones.map(({ op, texto }) => (
              <button
                key={op}
                data-op={op}
                type="button"
                aria-pressed={String(respuestas[i] === op)}
                onClick={() => elegir(i, op)}
              >
                {texto}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="corregir" type="button" onClick={corregir}>
        Corregir respuestas
      </button>

      {veredicto && (
        <p className={`veredicto ${tipoVeredicto}`} role="status">
          {veredicto}
        </p>
      )}
    </div>
  )
}
