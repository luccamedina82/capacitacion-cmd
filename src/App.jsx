import { useState, useCallback } from 'react'
import MetaCheck        from './components/MetaCheck.jsx'
import Quiz             from './components/Quiz.jsx'
import BloqueSeccion    from './components/BloqueSeccion.jsx'
import VideoPlaceholder from './components/VideoPlaceholder.jsx'
import RecursoPdf       from './components/RecursoPdf.jsx'
import HandsOn          from './components/HandsOn.jsx'
import Acordeon         from './components/Acordeon.jsx'
import NotionLogo       from './components/NotionLogo.jsx'
import EvaluacionFinal  from './components/EvaluacionFinal.jsx'
import { SECCIONES }    from './data/modulos.js'

const METAS_INICIALES = {
  meta_bloques:   false, // Sec 1
  meta_apuntes:   false, // Sec 2
  meta_bd:        false, // Sec 3
  meta_vistas:    false, // Sec 4
  meta_filtros:   false, // Sec 5
  meta_dashboard: false, // Sec 6
}

export default function App() {
  const [metas,        setMetas]        = useState(METAS_INICIALES)
  const [aprobados,    setAprobados]    = useState({})
  const [encuesta,     setEncuesta]     = useState({ e1: null, e2: null, e3: null })
  const [globalExpand, setGlobalExpand] = useState(null)
  const [forzarCierre, setForzarCierre] = useState(false)

  // Métricas de progreso
  const totalMetas          = Object.keys(METAS_INICIALES).length
  const metasMarcadas       = Object.values(metas).filter(Boolean).length
  const totalSecciones      = SECCIONES.length
  const seccionesAprobadas  = SECCIONES.filter(s => aprobados[s.id]).length
  const progresoPorcentaje  = Math.round((seccionesAprobadas / totalSecciones) * 100)

  const toggleMeta  = useCallback(k  => setMetas(p => ({ ...p, [k]: !p[k] })), [])
  const aprobarQuiz = useCallback(id => setAprobados(p => ({ ...p, [id]: true })), [])
  const toggleEnc   = useCallback((p, op) =>
    setEncuesta(prev => ({ ...prev, [p]: prev[p] === op ? null : op })), [])
  const expandAll   = useCallback(() => setGlobalExpand({ cmd: 'all',  ts: Date.now() }), [])
  const collapseAll = useCallback(() => setGlobalExpand({ cmd: 'none', ts: Date.now() }), [])

  const OpEnc = ({ preg, ops }) => (
    <div className="ops">
      {ops.map(op => (
        <button
          key={op}
          type="button"
          aria-pressed={String(encuesta[preg] === op)}
          onClick={() => toggleEnc(preg, op)}
        >
          {op}
        </button>
      ))}
    </div>
  )

  const cierreDesbloqueado = Boolean(aprobados.sec6 || forzarCierre)

  return (
    <>
      {/* ══════════ HEADER NOTION STICKY ══════════ */}
      <header>
        <div className="barra">
          <span className="marca">
            <span className="marca-icon">
              <NotionLogo size={18} color="white" />
            </span>
            Organizá tu cursada
          </span>

          <span className="notion-workspace-tag">
            💡 Comunicación Multimedial · 6 Módulos
          </span>

          <nav className="pasos-nav">
            <a href="#encuesta">Antes de empezar</a>
            {SECCIONES.map((sec, i) => (
              <a key={sec.id} href={`#${sec.id}`}>
                Sec {i + 1} {aprobados[sec.id] ? '✓' : ''}
              </a>
            ))}
            <a href="#cierre">Cierre {cierreDesbloqueado ? '✓' : ''}</a>
          </nav>
        </div>
        <div className="medidor">
          <span style={{ width: `${Math.max(4, progresoPorcentaje)}%` }} />
        </div>
      </header>

      {/* ══════════ HERO PAGE NOTION ══════════ */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <span className="hero-emoji">📚</span>
            <h1>Dejá de enterarte<br />tarde de las entregas</h1>
            <p className="bajada">
              Capacitación práctica intensiva para armar en Notion el sistema definitivo con el que
              vas a gestionar tus materias, apuntes, fechas de parciales y entregas en un solo lugar.
            </p>

            <div className="notion-page-meta">
              <div className="notion-property">
                <span className="notion-property-label"><span>⏱️</span> Duración</span>
                <span className="notion-property-value tag">6 Módulos prácticos</span>
              </div>
              <div className="notion-property">
                <span className="notion-property-label"><span>🧑‍💻</span> Nivel</span>
                <span className="notion-property-value tag">De cero a avanzado</span>
              </div>
              <div className="notion-property">
                <span className="notion-property-label"><span>✅</span> Módulos listos</span>
                <span className="notion-property-value tag">
                  {seccionesAprobadas} de {totalSecciones} ({progresoPorcentaje}%)
                </span>
              </div>
            </div>

            <div className="notion-callout">
              <span className="notion-callout-emoji">🎯</span>
              <div className="notion-callout-body">
                <h3>Objetivos de aprendizaje del programa</h3>
                <p className="nota">
                  Marcá lo que ya sabés hacer. El resto es lo que vas a dominar módulo a módulo a lo largo de la capacitación:
                </p>
                <MetaCheck
                  texto="Módulo 1: Dominar el menú de bloques con la barra invertida (/) y anidar páginas limpiamente"
                  marcado={metas.meta_bloques}
                  onChange={() => toggleMeta('meta_bloques')}
                />
                <MetaCheck
                  texto="Módulo 2: Estructurar materias con Toggles para aplicar Active Recall y embeber PDFs de cátedra"
                  marcado={metas.meta_apuntes}
                  onChange={() => toggleMeta('meta_apuntes')}
                />
                <MetaCheck
                  texto="Módulo 3: Crear una base de datos con propiedades clave (Materia, Estado, Fecha de entrega)"
                  marcado={metas.meta_bd}
                  onChange={() => toggleMeta('meta_bd')}
                />
                <MetaCheck
                  texto="Módulo 4: Visualizar las mismas tareas en Tablero Kanban y Calendario mensual sincronizado"
                  marcado={metas.meta_vistas}
                  onChange={() => toggleMeta('meta_vistas')}
                />
                <MetaCheck
                  texto="Módulo 5: Configurar filtros dinámicos ('Esta semana') y ordenamiento por urgencia"
                  marcado={metas.meta_filtros}
                  onChange={() => toggleMeta('meta_filtros')}
                />
                <MetaCheck
                  texto="Módulo 6: Diseñar un Dashboard principal en columnas con bases vinculadas (Linked DB)"
                  marcado={metas.meta_dashboard}
                  onChange={() => toggleMeta('meta_dashboard')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ STACK DE TARJETAS FLOTANTES ══════════ */}
      <div className="wrap">
        <div className="sections-stack">

          {/* ── Encuesta Inicial (Diagnóstico) ── */}
          <section id="encuesta" className="bloque-wrapper">
            <div className="section-card is-open">
              <div className="section-card-header">
                <div className="cab-txt">
                  <span className="num">📋 Diagnóstico Inicial · 3 minutos</span>
                  <h2>¿Dónde se te escapan las cosas hoy?</h2>
                  <p className="intro">
                    Tus respuestas nos ayudan a entender tu punto de partida antes de comenzar los 6 módulos.
                  </p>
                </div>
                <div className="cab-lado">
                  <span className="chip ok">Diagnóstico</span>
                </div>
              </div>
              <div className="section-card-divider" />
              <div className="section-card-body">
                <div className="pregunta">
                  <p>¿Dónde anotás hoy las fechas de parciales y entregas?</p>
                  <OpEnc preg="e1" ops={['Papel o agenda', 'Calendario del celular', 'No las anoto', 'Otra app']} />
                </div>
                <div className="pregunta">
                  <p>En el último mes, ¿cuántas veces te enteraste tarde de una entrega o examen?</p>
                  <OpEnc preg="e2" ops={['Ninguna', 'Una o dos veces', 'Varias veces', 'Perdí la cuenta']} />
                </div>
                <div className="pregunta">
                  <p>¿Usaste Notion alguna vez?</p>
                  <OpEnc preg="e3" ops={['Nunca', 'La abrí y me abrumó', 'La uso para notas simples', 'Nivel intermedio']} />
                </div>
              </div>
            </div>
          </section>

          {/* ── Barra de controles globales ── */}
          <div className="barra-plan">
            <div className="barra-plan-info">
              <span className="barra-plan-label">Programa académico secuencial:</span>
              <span className="barra-plan-pill">
                {seccionesAprobadas} de {totalSecciones} secciones desbloqueadas
              </span>
            </div>
            <div className="barra-plan-actions">
              <button type="button" onClick={expandAll}>▾ Desplegar todo</button>
              <button type="button" onClick={collapseAll}>▸ Plegar todo</button>
            </div>
          </div>

          {/* ── 6 SECCIONES OFICIALES ── */}
          {SECCIONES.map((sec, index) => {
            // Lógica secuencial:
            // La sección 1 (index 0) siempre está desbloqueada.
            // Las secciones siguientes se desbloquean si el quiz de la anterior fue aprobado.
            const bloqueado = index === 0 ? false : !aprobados[SECCIONES[index - 1].id]
            const completado = Boolean(aprobados[sec.id])

            return (
              <BloqueSeccion
                key={sec.id}
                id={sec.id}
                num={sec.num}
                titulo={sec.titulo}
                bloqueado={bloqueado}
                completado={completado}
                defaultAbierto={index === 0}
                globalExpand={globalExpand}
                onDesbloquear={() => {
                  if (index > 0) {
                    aprobarQuiz(SECCIONES[index - 1].id)
                  }
                }}
              >
                <div className="bloque">
                  <div className="bloque-principal">
                    {/* 1. Explicación breve visible por defecto */}
                    <div className="seccion-intro-box">
                      <div className="seccion-intro-badge">
                        <span>💡</span>
                        <span>Explicación Breve</span>
                      </div>
                      <p className="seccion-explicacion-breve">{sec.explicacionBreve}</p>
                    </div>

                    {/* 2. Contenedor para el video */}
                    <VideoPlaceholder
                      src={sec.videoSrc}
                      titulo={sec.videoTitulo}
                      duracion={sec.videoDuracion}
                    />

                    {/* 3. Acordeón / desplegable para Explicación Detallada */}
                    <Acordeon summary="📖 Explicación Detallada (Paso a paso)">
                      {Array.isArray(sec.explicacionDetallada) ? (
                        sec.explicacionDetallada.map((parrafo, pIdx) => (
                          <p key={pIdx}>{parrafo}</p>
                        ))
                      ) : (
                        <p>{sec.explicacionDetallada}</p>
                      )}
                    </Acordeon>

                    {/* 4. Botón de descarga para el Recurso PDF */}
                    <RecursoPdf
                      titulo={sec.pdf.titulo}
                      url={sec.pdf.url}
                    />

                    {/* 5. Quiz interactivo con 2 preguntas para desbloquear siguiente sección */}
                    <Quiz
                      quizId={sec.id}
                      preguntas={sec.quiz}
                      onAprobado={() => aprobarQuiz(sec.id)}
                    />
                  </div>

                  {/* Aside lateral con resumen de recursos y estado */}
                  <aside className="lateral">
                    <div className="caja-lat">
                      <div className="caja-lat-header">
                        <h3>Recursos del módulo</h3>
                        <span className={`caja-lat-badge ${completado ? 'ok' : bloqueado ? 'lock' : 'active'}`}>
                          {completado ? 'Aprobado' : bloqueado ? 'Bloqueado' : 'En curso'}
                        </span>
                      </div>
                      <ul>
                        {sec.recursosAside.map((rec, rIdx) => (
                          <li key={rIdx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              </BloqueSeccion>
            )
          })}

          {/* ── CIERRE INTEGRADOR ── */}
          <section id="cierre" className="bloque-wrapper">
            <div className={`section-card${!cierreDesbloqueado ? ' is-locked' : ' is-open'}`}>
              <div className="section-card-header">
                <div className="cab-txt">
                  <span className="num">🏁 Cierre Integrador · Proyecto Final</span>
                  <h2>La prueba de que dominás tu cursada en Notion</h2>
                  <p className="intro">
                    Aplicá todo lo visto en los 6 módulos: poné a prueba tu sistema y realizá la evaluación
                    general integradora para obtener tu certificado.
                  </p>
                </div>

                <div className="cab-lado">
                  {cierreDesbloqueado ? (
                    <span className="chip ok">✓ Desbloqueado</span>
                  ) : (
                    <span className="chip cerrado">🔒 Bloqueado</span>
                  )}
                </div>
              </div>

              {!cierreDesbloqueado ? (
                <div className="desbloqueo-banner">
                  <div className="desbloqueo-content">
                    <span className="desbloqueo-icon">🔒</span>
                    <div className="desbloqueo-texto">
                      <strong>Cierre y Evaluación Final bloqueados</strong>
                      <span>Esta sección final se habilita al completar y aprobar los quizzes de los 6 módulos.</span>
                    </div>
                  </div>
                  <button
                    className="saltear"
                    type="button"
                    onClick={() => setForzarCierre(true)}
                  >
                    Desbloquear Cierre para explorar
                  </button>
                </div>
              ) : (
                <>
                  <div className="section-card-divider" />
                  <div className="section-card-body">
                    <div className="cuerpo-cierre">
                      <HandsOn
                        titulo="Checklist para tu Dashboard de cursada"
                        tiempo="⏱ Proyecto integrador en tu cuenta de Notion"
                        pasos={[
                          'Creá la página principal <em>Hub Cursada 2026</em> y dividila en columnas.',
                          'Enlazá tu base de datos de tareas (/linked database) aplicando el filtro "Date is Today" o "Date is This week".',
                          'Agregá una vista de Calendario mensual para tener visibilidad de los parciales que se aproximan.',
                          'Creá los toggles de Active Recall dentro de la página de cada materia.',
                        ]}
                      >
                        <div>
                          <p className="rot">Confirmación de sistema listo</p>
                          <MetaCheck
                            texto="Tengo mi Dashboard armado con mis materias reales y vistas sincronizadas"
                            marcado={metas.meta_dashboard}
                            onChange={() => toggleMeta('meta_dashboard')}
                          />
                        </div>
                      </HandsOn>

                      <p style={{ marginTop: 24, marginBottom: 12 }} className="intro">
                        ¡Felicitaciones por llegar al final de los 6 módulos! A continuación podés realizar la
                        evaluación integradora de situaciones teóricas o responder mediante el formulario de Tally.
                      </p>

                      {/* Evaluación Integradora */}
                      <EvaluacionFinal />
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

        </div>{/* /sections-stack */}
      </div>{/* /wrap */}

      {/* ══════════ FOOTER NOTION ══════════ */}
      <footer>
        <div className="wrap">
          <span className="footer-sep" />
          <div className="footer-inner">
            <NotionLogo size={15} color="var(--n-text-muted)" />
            <span>Capacitación Notion · 6 Módulos Prácticos · Comunicación Multimedial · 2026</span>
            <span style={{ marginLeft: 'auto' }}>
              <span className="notion-badge">
                <NotionLogo size={12} color="currentColor" />
                Hecho con estética oficial de Notion
              </span>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
