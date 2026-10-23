import { useState, useCallback } from 'react'
import { ClipboardCheck, Target, ArrowRight, CircleCheck, CircleX, Info } from 'lucide-react'
import TallyQuiz from './TallyQuiz.jsx'
import Callout from './Callout.jsx'
import { TALLY_FORMS } from '../data/tally.js'

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

/**
 * @param {boolean}  tallyAprobado   - si el Tally integrador ya fue aprobado (persistido en App)
 * @param {function} onAprobado      - se llama al aprobar el Tally o las situaciones (>= 80 %)
 */
export default function EvaluacionFinal({ tallyAprobado = false, onAprobado }) {
  const [tab, setTab] = useState('tally') // 'tally' | 'situaciones'
  const [respuestas, setRespuestas] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [aviso, setAviso] = useState('') // feedback accesible cuando faltan respuestas

  const handleSeleccionar = useCallback((casoId, op) => {
    if (enviado) return
    setRespuestas(prev => ({ ...prev, [casoId]: op }))
    setAviso('')
  }, [enviado])

  const totalPreguntas = CASOS_EVALUACION.length
  const respondidas = Object.keys(respuestas).length
  const correctas = CASOS_EVALUACION.filter(c => respuestas[c.id] === c.correcta).length
  const porcentaje = Math.round((correctas / totalPreguntas) * 100)
  const aprobado = enviado && porcentaje >= 80

  const corregir = () => {
    if (respondidas < totalPreguntas) {
      const faltan = totalPreguntas - respondidas
      const pendientes = faltan === 1 ? 'Falta 1 situación' : `Faltan ${faltan} situaciones`
      setAviso(`${pendientes} por responder antes de evaluar (${respondidas} de ${totalPreguntas} respondidas).`)
      return
    }
    setAviso('')
    setEnviado(true)
    if (correctas / totalPreguntas >= 0.8) onAprobado?.()
  }

  const reiniciar = () => {
    setRespuestas({})
    setEnviado(false)
    setAviso('')
  }

  return (
    <div className="evaluacion-integradora-card">
      <div className="eval-header-tabs">
        <button
          type="button"
          className={`eval-tab-btn${tab === 'tally' ? ' active' : ''}`}
          aria-pressed={tab === 'tally'}
          onClick={() => setTab('tally')}
        >
          <ClipboardCheck size={16} aria-hidden="true" /> Evaluación final
          {tallyAprobado && <CircleCheck size={14} role="img" aria-label="aprobada" />}
        </button>
        <button
          type="button"
          className={`eval-tab-btn${tab === 'situaciones' ? ' active' : ''}`}
          aria-pressed={tab === 'situaciones'}
          onClick={() => setTab('situaciones')}
        >
          <Target size={16} aria-hidden="true" /> Situaciones reales de estudio ({respondidas}/{totalPreguntas})
        </button>
      </div>

      {tab === 'situaciones' && (
        <div className="eval-casos-container">
          <Callout variante="idea" className="eval-intro-box">
            <p className="eval-intro-title">Evaluación general integradora</p>
            <p className="eval-intro-desc">
              Poné a prueba tu criterio frente a 5 situaciones cotidianas de cursada universitaria.
              Leé con atención cada escenario y seleccioná la mejor decisión de diseño y organización en Notion.
            </p>
          </Callout>

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

                  <p className="caso-pregunta" id={`caso-pregunta-${caso.id}`}>
                    <ArrowRight size={18} className="ico" aria-hidden="true" />
                    <span>{caso.pregunta}</span>
                  </p>

                  <div className="caso-opciones" role="radiogroup" aria-labelledby={`caso-pregunta-${caso.id}`}>
                    {caso.opciones.map(op => {
                      const seleccionada = elegida === op.op
                      let estiloOpcion = ''
                      if (mostrarFeedback) {
                        if (op.op === caso.correcta) estiloOpcion = ' opcion-correcta'
                        else if (seleccionada) estiloOpcion = ' opcion-fallada'
                      }

                      return (
                        <label
                          key={op.op}
                          className={`caso-opcion-btn${seleccionada ? ' seleccionada' : ''}${estiloOpcion}${enviado ? ' deshabilitada' : ''}`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            name={`caso-${caso.id}`}
                            value={op.op}
                            checked={seleccionada}
                            disabled={enviado}
                            onChange={() => handleSeleccionar(caso.id, op.op)}
                          />
                          <span className="opcion-badge" aria-hidden="true">{op.op.toUpperCase()}</span>
                          <span className="opcion-texto">{op.texto}</span>
                          {estiloOpcion === ' opcion-correcta' && (
                            <>
                              <CircleCheck size={18} className="opcion-estado" aria-hidden="true" />
                              <span className="sr-only">Respuesta correcta</span>
                            </>
                          )}
                          {estiloOpcion === ' opcion-fallada' && (
                            <>
                              <CircleX size={18} className="opcion-estado" aria-hidden="true" />
                              <span className="sr-only">Tu respuesta, incorrecta</span>
                            </>
                          )}
                        </label>
                      )
                    })}
                  </div>

                  {mostrarFeedback && (
                    <Callout variante={esCorrecta ? 'comprobacion' : 'idea'} className="caso-feedback">
                      <p>{caso.feedback}</p>
                    </Callout>
                  )}
                </div>
              )
            })}
          </div>

          {/* Botones de acción y resultado */}
          <div className="eval-actions-bar" aria-live="polite">
            {!enviado ? (
              <>
                <button
                  type="button"
                  className="corregir eval-submit-btn"
                  onClick={corregir}
                  aria-describedby={aviso ? 'eval-aviso' : undefined}
                >
                  Evaluar mis respuestas ({respondidas}/{totalPreguntas})
                </button>
                {aviso && (
                  <p id="eval-aviso" className="eval-aviso" role="alert">
                    <Info size={16} className="ico" aria-hidden="true" /> {aviso}
                  </p>
                )}
              </>
            ) : (
              <div className="eval-resultado-panel">
                <div className={`eval-score-badge ${aprobado ? 'score-aprobado' : 'score-reintentar'}`}>
                  <span className="score-number">{porcentaje}%</span>
                  <span className="score-label">{correctas} de {totalPreguntas} correctas</span>
                </div>

                <div className="eval-resultado-texto">
                  {aprobado ? (
                    <>
                      <h3>
                        <CircleCheck size={20} aria-hidden="true" /> ¡Excelente! Aprobaste la evaluación integradora
                      </h3>
                      <p>Demostraste un dominio sólido del modelo mental de bloques, bases de datos y vistas de Notion.</p>
                    </>
                  ) : (
                    <>
                      <h3>
                        <Info size={20} aria-hidden="true" /> Necesitás 80 % o más para certificar (actual: {porcentaje} %)
                      </h3>
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
        </div>
      )}

      {tab === 'tally' && (
        <div className="eval-tally-container">
          <TallyQuiz
            formId={TALLY_FORMS.final}
            titulo="Evaluación integradora — Formulario Tally.so"
            aprobado={tallyAprobado}
            onAprobado={onAprobado}
            meta="obtener tu certificado"
            exito="ya podés descargar tu certificado."
          />
        </div>
      )}
    </div>
  )
}
