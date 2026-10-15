import { useState, useCallback } from 'react'

const CASOS_EVALUACION = [
  {
    id: 1,
    tag: 'Bloque 0 & Bloque 2 · Vistas de Base de Datos',
    titulo: 'Situación 1: La semana de entregas múltiples',
    contexto:
      'Llegó mayo y tenés 3 entregas de trabajos prácticos y 2 parciales en un lapso de 6 días. Necesitás ver con urgencia qué vence primero, qué está pendiente y en qué materia enfocarte hoy mismo.',
    pregunta:
      'En tu sistema de Notion, ¿cuál es la mejor configuración para resolver esto sin duplicar información ni perder tiempo?',
    opciones: [
      {
        op: 'a',
        texto:
          'Crear una página nueva por cada día de la semana y copiar el texto de los parciales a mano desde el calendario del celular.',
      },
      {
        op: 'b',
        texto:
          'En tu base de datos de Tareas, usar la vista de Tablero (Board) agrupada por Estado ("Por hacer", "Haciendo", "Listo") con un filtro "Fecha: Esta semana" y ordenar por fecha ascendente.',
      },
      {
        op: 'c',
        texto:
          'Pasar todo a una tabla simple sin propiedades para poder pintar las celdas de colores con resaltador.',
      },
    ],
    correcta: 'b',
    feedback:
      '¡Exacto! La vista de Tablero con filtro de "Esta semana" te da visibilidad del flujo de trabajo inmediato. Al arrastrar una tarjeta de "Por hacer" a "Listo", la misma tarea ya queda registrada en el calendario y en la tabla general.',
  },
  {
    id: 2,
    tag: 'Bloque 1 · Jerarquía & Toggles',
    titulo: 'Situación 2: El resumen de apuntes inmanejable',
    contexto:
      'Para una materia teórica tenés 15 páginas de apuntes de clase con bibliografía obligatoria. Cada vez que abrís tu página en Notion, tenés que scrollear 2 minutos para encontrar lo que viste en la última clase.',
    pregunta:
      '¿Qué herramienta nativa de bloques de Notion te permite mantener tu página compacta y visualmente ordenada?',
    opciones: [
      {
        op: 'a',
        texto:
          'Toggles lists (>): metés el contenido extenso de cada unidad dentro de un toggle, dejando a la vista solo los títulos principales.',
      },
      {
        op: 'b',
        texto:
          'Achicar el tamaño de la letra de toda la computadora para que quepa más texto en pantalla.',
      },
      {
        op: 'c',
        texto:
          'Crear una cuenta de Notion diferente para cada clase de la materia.',
      },
    ],
    correcta: 'a',
    feedback:
      '¡Correcto! Los toggles son esenciales para la jerarquía visual: colapsan lo denso y te permiten desplegar solo la unidad o tema que estás estudiando en ese momento.',
  },
  {
    id: 3,
    tag: 'Bloque 2 · Sincronización en Bases de Datos',
    titulo: 'Situación 3: Postergación de una entrega en vivo',
    contexto:
      'El docente avisa en clase que el Trabajo Práctico Integrador se posterga una semana: pasa del jueves 12 al jueves 19.',
    pregunta:
      'Si modificás la fecha en la vista de Calendario arrastrando la tarjeta al nuevo casillero, ¿qué ocurre en la vista de Tabla y en tus filtros?',
    opciones: [
      {
        op: 'a',
        texto:
          'Tenés que acordarte de entrar a la tabla y al tablero para cambiar la fecha manualmente en cada vista.',
      },
      {
        op: 'b',
        texto:
          'Se actualiza automáticamente en todas las vistas: es la misma base de datos consultada con distintas perspectivas.',
      },
      {
        op: 'c',
        texto:
          'Se genera una copia duplicada de la tarea en la nueva fecha y la vieja queda guardada como borrador.',
      },
    ],
    correcta: 'b',
    feedback:
      '¡Ese es el corazón de Notion! La base de datos guarda los datos una sola vez. Cada vista (tabla, tablero, calendario) es solo una ventana hacia esa información compartida.',
  },
  {
    id: 4,
    tag: 'Bloque 3 · Bases Relacionadas',
    titulo: 'Situación 4: Información centralizada por materia',
    contexto:
      'Tenés 5 materias este cuatrimestre. Querés que cada materia tenga su información (profesores, aula, horario de consulta, links a drives) y además ver dentro de cada materia únicamente los trabajos prácticos que le corresponden.',
    pregunta:
      '¿Cuál es la arquitectura correcta de Notion para lograr esto de manera escalable?',
    opciones: [
      {
        op: 'a',
        texto:
          'Crear 5 bases de datos de tareas distintas, una por cada materia, sin conexión entre ellas.',
      },
      {
        op: 'b',
        texto:
          'Crear una base "Materias" y relacionarla con la base general "Tareas" mediante una propiedad de relación.',
      },
      {
        op: 'c',
        texto:
          'Pegar capturas de pantalla de los cronogramas en el escritorio de la computadora.',
      },
    ],
    correcta: 'b',
    feedback:
      '¡Excelente! Relacionar Materias con Tareas te permite tener un Hub por materia (donde ves solo lo de esa materia) y al mismo tiempo un Calendario maestro global que reúne las entregas de todas las materias.',
  },
  {
    id: 5,
    tag: 'Cierre & Mantenimiento · Hábitos de Estudio',
    titulo: 'Situación 5: Arranque del nuevo cuatrimestre',
    contexto:
      'Aprobaste todas las materias del primer cuatrimestre y arrancás cuatro materias nuevas en agosto.',
    pregunta:
      '¿Qué conviene hacer con tu sistema para no mezclar lo nuevo con lo viejo pero sin perder tu historial?',
    opciones: [
      {
        op: 'a',
        texto:
          'Borrar la base de datos de tareas entera para empezar desde una hoja en blanco.',
      },
      {
        op: 'b',
        texto:
          'Mantener la misma base de datos de Tareas, agregando las nuevas materias a la base de Materias y archivando o filtrando las materias ya finalizadas.',
      },
      {
        op: 'c',
        texto:
          'Dejar de usar Notion porque requiere volver a configurar todo de cero.',
      },
    ],
    correcta: 'b',
    feedback:
      '¡Impecable! Un buen sistema en Notion se reutiliza cuatrimestre tras cuatrimestre. Filtrar por cuatrimestre o estado de cursada te permite mantener el orden activo sin perder tus apuntes ni tu historial.',
  },
]

export default function EvaluacionFinal() {
  const [tab, setTab] = useState('situaciones') // 'situaciones' | 'tally'
  const [respuestas, setRespuestas] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [tallyUrl, setTallyUrl] = useState('https://tally.so/embed/placeholder')
  const [nombreAlumno, setNombreAlumno] = useState('')

  const handleSeleccionar = useCallback((casoId, op) => {
    if (enviado) return
    setRespuestas(prev => ({ ...prev, [casoId]: op }))
  }, [enviado])

  const totalPreguntas = CASOS_EVALUACION.length
  const respondidas = Object.keys(respuestas).length
  const correctas = CASOS_EVALUACION.filter(c => respuestas[c.id] === c.correcta).length
  const porcentaje = Math.round((correctas / totalPreguntas) * 100)
  const aprobado = enviado && porcentaje >= 80

  const corregir = () => {
    if (respondidas < totalPreguntas) {
      alert(`Por favor responde todas las situaciones antes de evaluar (${respondidas}/${totalPreguntas} respondidas).`)
      return
    }
    setEnviado(true)
  }

  const reiniciar = () => {
    setRespuestas({})
    setEnviado(false)
  }

  return (
    <div className="evaluacion-integradora-card">
      <div className="eval-header-tabs">
        <button
          type="button"
          className={`eval-tab-btn${tab === 'situaciones' ? ' active' : ''}`}
          onClick={() => setTab('situaciones')}
        >
          <span>🎯</span> Situaciones Reales de Estudio ({respondidas}/{totalPreguntas})
        </button>
        <button
          type="button"
          className={`eval-tab-btn${tab === 'tally' ? ' active' : ''}`}
          onClick={() => setTab('tally')}
        >
          <span>📋</span> Formulario Tally.so
        </button>
      </div>

      {tab === 'situaciones' && (
        <div className="eval-casos-container">
          <div className="eval-intro-box">
            <span className="eval-intro-icon">💡</span>
            <div>
              <p className="eval-intro-title">Evaluación General Integradora</p>
              <p className="eval-intro-desc">
                Poné a prueba tu criterio frente a 5 situaciones cotidianas de cursada universitaria.
                Leé con atención cada escenario y seleccioná la mejor decisión de diseño y organización en Notion.
              </p>
            </div>
          </div>

          <div className="casos-lista">
            {CASOS_EVALUACION.map((caso, index) => {
              const elegida = respuestas[caso.id]
              const esCorrecta = elegida === caso.correcta
              const mostrarFeedback = enviado

              return (
                <div
                  key={caso.id}
                  className={`caso-item${mostrarFeedback ? (esCorrecta ? ' caso-acierto' : ' caso-error') : ''}`}
                >
                  <div className="caso-head">
                    <span className="caso-tag">{caso.tag}</span>
                    <span className="caso-num">Caso {index + 1} de {totalPreguntas}</span>
                  </div>

                  <h3 className="caso-titulo">{caso.titulo}</h3>
                  <div className="caso-contexto">
                    <p>{caso.contexto}</p>
                  </div>

                  <p className="caso-pregunta">👉 {caso.pregunta}</p>

                  <div className="caso-opciones">
                    {caso.opciones.map(op => {
                      const seleccionada = elegida === op.op
                      let estiloOpcion = ''
                      if (mostrarFeedback) {
                        if (op.op === caso.correcta) estiloOpcion = ' opcion-correcta'
                        else if (seleccionada) estiloOpcion = ' opcion-fallada'
                      }

                      return (
                        <button
                          key={op.op}
                          type="button"
                          className={`caso-opcion-btn${seleccionada ? ' seleccionada' : ''}${estiloOpcion}`}
                          onClick={() => handleSeleccionar(caso.id, op.op)}
                          disabled={enviado}
                        >
                          <span className="opcion-badge">{op.op.toUpperCase()}</span>
                          <span className="opcion-texto">{op.texto}</span>
                        </button>
                      )
                    })}
                  </div>

                  {mostrarFeedback && (
                    <div className={`caso-feedback ${esCorrecta ? 'feedback-ok' : 'feedback-error'}`}>
                      <span className="feedback-icon">{esCorrecta ? '✅' : 'ℹ️'}</span>
                      <p>{caso.feedback}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Botones de acción y resultado */}
          <div className="eval-actions-bar">
            {!enviado ? (
              <button
                type="button"
                className="corregir eval-submit-btn"
                onClick={corregir}
              >
                Evaluar mis respuestas ({respondidas}/{totalPreguntas})
              </button>
            ) : (
              <div className="eval-resultado-panel">
                <div className={`eval-score-badge ${aprobado ? 'score-aprobado' : 'score-reintentar'}`}>
                  <span className="score-number">{porcentaje}%</span>
                  <span className="score-label">{correctas} de {totalPreguntas} correctas</span>
                </div>

                <div className="eval-resultado-texto">
                  {aprobado ? (
                    <>
                      <h4>🎉 ¡Excelente! Aprobaste la evaluación integradora</h4>
                      <p>Demostraste un dominio sólido del modelo mental de bloques, bases de datos y vistas de Notion.</p>
                    </>
                  ) : (
                    <>
                      <h4>Necesitás 80% o más para certificar (actual: {porcentaje}%)</h4>
                      <p>Revisá las situaciones marcadas en rojo, leé la explicación sugerida y volvé a intentar.</p>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  className="saltear eval-retry-btn"
                  onClick={reiniciar}
                >
                  {aprobado ? 'Repetir evaluación' : 'Reintentar cuestionario'}
                </button>
              </div>
            )}
          </div>

          {/* Certificado Notion cuando aprueba */}
          {aprobado && (
            <div className="certificado-notion-card">
              <div className="cert-header">
                <span className="cert-emoji">🎓</span>
                <div>
                  <span className="cert-kicker">Capacitación Comunicación Multimedial · 2026</span>
                  <h3>Certificado de Finalización de Sistema en Notion</h3>
                </div>
              </div>
              <p className="cert-body">
                Este certificado avala que has completado el diseño de tu sistema académico personal
                en Notion: configuración de página, bases de datos con vistas cruzadas (calendario, tablero, tabla),
                filtros inteligentes y relaciones entre asignaturas y entregas.
              </p>
              <div className="cert-footer">
                <input
                  type="text"
                  className="cert-input-name"
                  placeholder="Escribí tu nombre completo..."
                  value={nombreAlumno}
                  onChange={e => setNombreAlumno(e.target.value)}
                />
                <span className="cert-date">{new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'tally' && (
        <div className="eval-tally-container">
          <div className="tally-config-bar">
            <span className="tally-config-icon">🔗</span>
            <input
              type="text"
              className="tally-url-input"
              value={tallyUrl}
              onChange={e => setTallyUrl(e.target.value)}
              placeholder="Pegá tu URL de Tally.so (ej: https://tally.so/embed/...)"
            />
            <button
              type="button"
              className="saltear"
              onClick={() => setTallyUrl('https://tally.so/embed/placeholder')}
            >
              Restablecer
            </button>
          </div>

          <div className="tally-wrapper">
            <iframe
              src={tallyUrl}
              title="Evaluación integradora — Formulario Tally.so"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
