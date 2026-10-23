import { useState, useCallback, useEffect } from 'react'
import {
  GraduationCap, BookOpen, Clock, Signal, CircleCheck, Target, ClipboardList,
  ChevronsUpDown, ChevronsDownUp, Flag, Lock, Check,
} from 'lucide-react'
import MetaCheck        from './components/MetaCheck.jsx'
import TallyQuiz        from './components/TallyQuiz.jsx'
import BloqueSeccion    from './components/BloqueSeccion.jsx'
import VideoPlaceholder from './components/VideoPlaceholder.jsx'
import RecursoPdf       from './components/RecursoPdf.jsx'
import HandsOn          from './components/HandsOn.jsx'
import Callout          from './components/Callout.jsx'
import Acordeon         from './components/Acordeon.jsx'
import NotionLogo       from './components/NotionLogo.jsx'
import EvaluacionFinal  from './components/EvaluacionFinal.jsx'
import { SECCIONES }    from './data/modulos.js'
import { TALLY_FORMS }  from './data/tally.js'

const STORAGE_APROBADOS = 'capacitacion-cmd:aprobados'

function leerAprobados() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_APROBADOS)) ?? {}
  } catch {
    return {}
  }
}

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
  const [aprobados,    setAprobados]    = useState(leerAprobados)
  const [encuesta,     setEncuesta]     = useState({ e1: null, e2: null, e3: null })
  const [globalExpand, setGlobalExpand] = useState(null)
  const [forzarCierre, setForzarCierre] = useState(false)
  const [anuncio,      setAnuncio]      = useState('') // mensaje para la región aria-live

  useEffect(() => {
    localStorage.setItem(STORAGE_APROBADOS, JSON.stringify(aprobados))
  }, [aprobados])

  // Métricas de progreso
  const totalSecciones      = SECCIONES.length
  const seccionesAprobadas  = SECCIONES.filter(s => aprobados[s.id]).length
  const progresoPorcentaje  = Math.round((seccionesAprobadas / totalSecciones) * 100)

  const toggleMeta  = useCallback(k  => setMetas(p => ({ ...p, [k]: !p[k] })), [])
  const aprobarQuiz = useCallback(id => {
    setAprobados(p => ({ ...p, [id]: true }))
    const idx = SECCIONES.findIndex(s => s.id === id)
    setAnuncio(idx >= 0
      ? `Módulo ${idx + 1} aprobado.${idx < SECCIONES.length - 1 ? ' Se desbloqueó el siguiente.' : ' Se desbloqueó el cierre.'}`
      : 'Evaluación final aprobada.')
  }, [])
  const toggleEnc   = useCallback((p, op) =>
    setEncuesta(prev => ({ ...prev, [p]: prev[p] === op ? null : op })), [])
  const expandAll   = useCallback(() => setGlobalExpand({ cmd: 'all',  ts: Date.now() }), [])
  const collapseAll = useCallback(() => setGlobalExpand({ cmd: 'none', ts: Date.now() }), [])

  // Se invoca como función (no como componente) para no remontar los botones en cada render
  const opcionesEncuesta = (preg, ops, etiqueta) => (
    <div className="ops" role="group" aria-label={etiqueta}>
      {ops.map(op => (
        <button
          key={op}
          type="button"
          aria-pressed={encuesta[preg] === op}
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
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      {/* Región aria-live: anuncia aprobaciones a lectores de pantalla */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{anuncio}</div>

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
            <GraduationCap size={14} aria-hidden="true" />
            Comunicación Multimedial · 6 Módulos
          </span>

          <nav className="pasos-nav">
            <a href="#encuesta">Antes de empezar</a>
            {SECCIONES.map((sec, i) => (
              <a key={sec.id} href={`#${sec.id}`}>
                Sec {i + 1}
                {aprobados[sec.id] && <Check size={14} role="img" aria-label="aprobada" />}
              </a>
            ))}
            <a href="#cierre">
              Cierre
              {cierreDesbloqueado && <Check size={14} role="img" aria-label="desbloqueado" />}
            </a>
          </nav>
        </div>
        <div
          className="medidor"
          role="progressbar"
          aria-label="Progreso del curso"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progresoPorcentaje}
          aria-valuetext={`${seccionesAprobadas} de ${totalSecciones} módulos aprobados`}
        >
          <span style={{ width: `${progresoPorcentaje}%` }} />
        </div>
      </header>

      <main id="contenido" tabIndex={-1}>
      {/* ══════════ HERO PAGE NOTION ══════════ */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <span className="hero-emoji" aria-hidden="true"><BookOpen size={32} /></span>
            <h1>Dejá de enterarte<br />tarde de las entregas</h1>
            <p className="bajada">
              Capacitación práctica intensiva para armar en Notion el sistema definitivo con el que
              vas a gestionar tus materias, apuntes, fechas de parciales y entregas en un solo lugar.
            </p>

            <div className="notion-page-meta">
              <div className="notion-property">
                <span className="notion-property-label"><Clock size={14} aria-hidden="true" /> Duración</span>
                <span className="notion-property-value tag">6 Módulos prácticos</span>
              </div>
              <div className="notion-property">
                <span className="notion-property-label"><Signal size={14} aria-hidden="true" /> Nivel</span>
                <span className="notion-property-value tag">De cero a avanzado</span>
              </div>
              <div className="notion-property">
                <span className="notion-property-label"><CircleCheck size={14} aria-hidden="true" /> Módulos listos</span>
                <span className="notion-property-value tag">
                  {seccionesAprobadas} de {totalSecciones} ({progresoPorcentaje}%)
                </span>
              </div>
            </div>

            <div className="notion-callout">
              <span className="notion-callout-emoji" aria-hidden="true"><Target size={24} /></span>
              <div className="notion-callout-body">
                <h2>Objetivos de aprendizaje del programa</h2>
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
                  <span className="num">
                    <ClipboardList size={14} className="ico" aria-hidden="true" /> Diagnóstico inicial · 3 minutos
                  </span>
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
                  {opcionesEncuesta('e1', ['Papel o agenda', 'Calendario del celular', 'No las anoto', 'Otra app'], 'Dónde anotás las fechas de parciales y entregas')}
                </div>
                <div className="pregunta">
                  <p>En el último mes, ¿cuántas veces te enteraste tarde de una entrega o examen?</p>
                  {opcionesEncuesta('e2', ['Ninguna', 'Una o dos veces', 'Varias veces', 'Perdí la cuenta'], 'Veces que te enteraste tarde de una entrega o examen')}
                </div>
                <div className="pregunta">
                  <p>¿Usaste Notion alguna vez?</p>
                  {opcionesEncuesta('e3', ['Nunca', 'La abrí y me abrumó', 'La uso para notas simples', 'Nivel intermedio'], 'Experiencia previa con Notion')}
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
              <button type="button" onClick={expandAll}>
                <ChevronsUpDown size={16} aria-hidden="true" /> Desplegar todo
              </button>
              <button type="button" onClick={collapseAll}>
                <ChevronsDownUp size={16} aria-hidden="true" /> Plegar todo
              </button>
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
                    <Callout variante="idea" className="seccion-intro-box">
                      <p className="seccion-explicacion-breve">{sec.explicacionBreve}</p>
                    </Callout>

                    {/* 2. Contenedor para el video */}
                    <VideoPlaceholder
                      id={`video-${sec.id}`}
                      src={sec.videoSrc}
                      titulo={sec.videoTitulo}
                      duracion={sec.videoDuracion}
                    />

                    {/* 3. Acordeón / desplegable para Explicación Detallada */}
                    <Acordeon summary="Explicación detallada (paso a paso)">
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
                      id={`pdf-${sec.id}`}
                      titulo={sec.pdf.titulo}
                      url={sec.pdf.url}
                    />

                    {/* 5. Cuestionario Tally: 8/10 o más desbloquea la siguiente sección */}
                    <TallyQuiz
                      formId={TALLY_FORMS[sec.id]}
                      titulo={`Cuestionario — ${sec.titulo}`}
                      aprobado={completado}
                      onAprobado={() => aprobarQuiz(sec.id)}
                      videoId={`video-${sec.id}`}
                      pdfId={`pdf-${sec.id}`}
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
                  <span className="num">
                    <Flag size={14} className="ico" aria-hidden="true" /> Cierre integrador · Proyecto final
                  </span>
                  <h2>La prueba de que dominás tu cursada en Notion</h2>
                  <p className="intro">
                    Aplicá todo lo visto en los 6 módulos: poné a prueba tu sistema y realizá la evaluación
                    general integradora para obtener tu certificado.
                  </p>
                </div>

                <div className="cab-lado">
                  {cierreDesbloqueado ? (
                    <span className="chip ok"><Check size={14} aria-hidden="true" /> Desbloqueado</span>
                  ) : (
                    <span className="chip cerrado"><Lock size={14} aria-hidden="true" /> Bloqueado</span>
                  )}
                </div>
              </div>

              {!cierreDesbloqueado ? (
                <div className="desbloqueo-banner">
                  <div className="desbloqueo-content">
                    <span className="desbloqueo-icon" aria-hidden="true"><Lock size={20} /></span>
                    <div className="desbloqueo-texto">
                      <strong>Cierre y evaluación final bloqueados</strong>
                      <span>Esta sección final se habilita al completar y aprobar los quizzes de los 6 módulos.</span>
                    </div>
                  </div>
                  {/* Atajo solo para desarrollo: no se incluye en el build de producción */}
                  {import.meta.env.DEV && (
                    <button
                      className="saltear"
                      type="button"
                      onClick={() => setForzarCierre(true)}
                    >
                      Desbloquear Cierre para explorar (dev)
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="section-card-divider" />
                  <div className="section-card-body">
                    <div className="cuerpo-cierre">
                      <HandsOn
                        titulo="Checklist para tu Dashboard de cursada"
                        tiempo="Proyecto integrador en tu cuenta de Notion"
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
                      <EvaluacionFinal
                        tallyAprobado={Boolean(aprobados.final)}
                        onTallyAprobado={() => aprobarQuiz('final')}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

        </div>{/* /sections-stack */}
      </div>{/* /wrap */}
      </main>

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
