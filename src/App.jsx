import { useState, useCallback, useEffect } from 'react'
import { flushSync } from 'react-dom'
import {
  GraduationCap, BookOpen, Clock, Signal, CircleCheck, Target, ClipboardList,
  ChevronsUpDown, ChevronsDownUp, Flag, Lock, Check, Play,
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
import Intro            from './components/intro/Intro.jsx'
import EvaluacionFinal  from './components/EvaluacionFinal.jsx'
import Certificado      from './components/Certificado.jsx'
import DashboardProgreso from './components/DashboardProgreso.jsx'
import MenuModulos      from './components/MenuModulos.jsx'
import { SECCIONES }    from './data/modulos.js'
import { TALLY_FORMS }  from './data/tally.js'
import {
  CLAVES, leerProgreso, guardarProgreso, estadoModulo, primerPendiente,
} from './lib/progreso.js'

const IDS_NAVEGABLES = ['encuesta', ...SECCIONES.map(s => s.id), 'cierre']
const esModulo = id => SECCIONES.some(s => s.id === id)

/** Id de sección indicado en la URL (#sec3), o null si no corresponde a ninguna. */
function idDesdeHash() {
  const id = window.location.hash.slice(1)
  return IDS_NAVEGABLES.includes(id) ? id : null
}

/** Lleva la vista a la sección y mueve el foco a su cabecera (respeta reduced motion). */
function desplazarA(id) {
  const el = document.getElementById(id)
  if (!el) return
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth', block: 'start' })
  el.querySelector('button.section-card-header')?.focus({ preventScroll: true })
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
  const [metas,        setMetas]        = useState(() => ({ ...METAS_INICIALES, ...leerProgreso(CLAVES.metas, {}) }))
  const [aprobados,    setAprobados]    = useState(() => leerProgreso(CLAVES.aprobados, {}))
  const [encuesta,     setEncuesta]     = useState(() => ({ e1: null, e2: null, e3: null, ...leerProgreso(CLAVES.encuesta, {}) }))
  const [nombre,       setNombre]       = useState(() => leerProgreso(CLAVES.nombre, ''))
  const [ultima,       setUltima]       = useState(() => leerProgreso(CLAVES.ultima, ''))
  const [certificado,  setCertificado]  = useState(() => leerProgreso(CLAVES.certificado, {}))
  // Secciones abiertas: por defecto, la indicada en la URL o el primer módulo pendiente
  const [abiertas,     setAbiertas]     = useState(() => {
    const id = idDesdeHash() ?? primerPendiente(SECCIONES, leerProgreso(CLAVES.aprobados, {}))?.id
    return id && esModulo(id) ? { [id]: true } : {}
  })
  const [activa,       setActiva]       = useState('')
  const [forzarCierre, setForzarCierre] = useState(false)
  const [anuncio,      setAnuncio]      = useState('') // mensaje para la región aria-live

  useEffect(() => { guardarProgreso(CLAVES.aprobados, aprobados) },   [aprobados])
  useEffect(() => { guardarProgreso(CLAVES.metas, metas) },           [metas])
  useEffect(() => { guardarProgreso(CLAVES.encuesta, encuesta) },     [encuesta])
  useEffect(() => { guardarProgreso(CLAVES.nombre, nombre) },         [nombre])
  useEffect(() => { guardarProgreso(CLAVES.ultima, ultima) },         [ultima])
  useEffect(() => { guardarProgreso(CLAVES.certificado, certificado) }, [certificado])

  // Métricas de progreso
  const totalSecciones      = SECCIONES.length
  const seccionesAprobadas  = SECCIONES.filter(s => aprobados[s.id]).length
  const progresoPorcentaje  = Math.round((seccionesAprobadas / totalSecciones) * 100)

  // Abre la sección (si es un módulo), actualiza la URL opcionalmente y lleva la vista hasta ella
  const abrirYDesplazar = useCallback((id) => {
    flushSync(() => {
      if (esModulo(id)) {
        setAbiertas(p => ({ ...p, [id]: true }))
        setUltima(id)
      }
    })
    desplazarA(id)
  }, [])

  const irA = useCallback((id, e) => {
    e?.preventDefault()
    abrirYDesplazar(id)
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
  }, [abrirYDesplazar])

  // Carga con #secN y navegación con el historial del navegador
  useEffect(() => {
    const inicial = idDesdeHash()
    if (inicial) desplazarA(inicial)
    const onHash = () => {
      const id = idDesdeHash()
      if (id) abrirYDesplazar(id)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [abrirYDesplazar])

  // Sección activa para resaltar en la navegación
  useEffect(() => {
    const visibles = new Set()
    const observador = new IntersectionObserver((entradas) => {
      for (const en of entradas) {
        if (en.isIntersecting) visibles.add(en.target.id)
        else visibles.delete(en.target.id)
      }
      const primera = IDS_NAVEGABLES.find(id => visibles.has(id))
      if (primera) setActiva(primera)
    }, { rootMargin: '-72px 0px -60% 0px' })
    IDS_NAVEGABLES.forEach(id => {
      const el = document.getElementById(id)
      if (el) observador.observe(el)
    })
    return () => observador.disconnect()
  }, [])

  const toggleSeccion = (id) => {
    if (!abiertas[id]) setUltima(id)
    setAbiertas(p => ({ ...p, [id]: !p[id] }))
  }

  // "Continuar donde dejaste": la última sección visitada si sigue pendiente; si no, el primer módulo pendiente
  const pendienteUltima = SECCIONES.find(sec => sec.id === ultima && !aprobados[sec.id])
  const siguiente       = pendienteUltima ?? primerPendiente(SECCIONES, aprobados)
  const hayAvance       = seccionesAprobadas > 0 || Boolean(ultima)
  const continuar       = () => irA(siguiente ? siguiente.id : 'cierre')

  const toggleMeta  = useCallback(k  => setMetas(p => ({ ...p, [k]: !p[k] })), [])
  const aprobarQuiz = useCallback(id => {
    setAprobados(p => ({ ...p, [id]: true }))
    const idx = SECCIONES.findIndex(s => s.id === id)
    if (id === 'final') {
      const ahora = new Date().toISOString()
      setCertificado(c => (c.fecha ? c : { fecha: ahora }))
    }
    setAnuncio(idx >= 0
      ? `Módulo ${idx + 1} aprobado.${idx < SECCIONES.length - 1 ? ' Se habilitó el cuestionario del siguiente módulo.' : ' Se desbloqueó el cierre.'}`
      : 'Evaluación final aprobada. Tu certificado está disponible.')
  }, [])
  const toggleEnc   = useCallback((p, op) =>
    setEncuesta(prev => ({ ...prev, [p]: prev[p] === op ? null : op })), [])
  const expandAll   = useCallback(() => setAbiertas(Object.fromEntries(SECCIONES.map(s => [s.id, true]))), [])
  const collapseAll = useCallback(() => setAbiertas({}), [])

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

  const cierreDesbloqueado = Boolean(SECCIONES.every(s => aprobados[s.id]) || forzarCierre)

  const itemsMenu = [
    { id: 'encuesta', etiqueta: 'Antes de empezar', icono: 'encuesta' },
    ...SECCIONES.map((sec, i) => ({
      id: sec.id,
      etiqueta: `${i + 1} · ${sec.corto}`,
      estado: estadoModulo(SECCIONES, aprobados, i),
    })),
    { id: 'cierre', etiqueta: 'Cierre y certificado', icono: 'cierre', estado: cierreDesbloqueado ? 'cierre-listo' : 'cierre-bloqueado' },
  ]

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      {/* Región aria-live: anuncia aprobaciones a lectores de pantalla */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{anuncio}</div>

      {/* ══════════ HEADER NOTION STICKY ══════════ */}
      <header className="app-header">
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

          <nav className="pasos-nav" aria-label="Módulos del curso">
            <a
              href="#encuesta"
              aria-current={activa === 'encuesta' ? 'location' : undefined}
              onClick={e => irA('encuesta', e)}
            >
              Antes de empezar
            </a>
            {SECCIONES.map((sec, i) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                aria-current={activa === sec.id ? 'location' : undefined}
                onClick={e => irA(sec.id, e)}
              >
                <span className="nav-num">{i + 1}</span>
                <span className="nav-txt"> · {sec.corto}</span>
                {aprobados[sec.id] && <Check size={14} role="img" aria-label="aprobado" />}
              </a>
            ))}
            <a
              href="#cierre"
              aria-current={activa === 'cierre' ? 'location' : undefined}
              onClick={e => irA('cierre', e)}
            >
              Cierre
              {cierreDesbloqueado && <Check size={14} role="img" aria-label="desbloqueado" />}
            </a>
          </nav>

          <MenuModulos
            items={itemsMenu}
            activa={activa}
            resumen={`${seccionesAprobadas}/${totalSecciones}`}
            onIr={irA}
          />
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
      <Intro onIrA={irA} destinoProgreso={siguiente ? siguiente.id : 'cierre'} />
      {/* ══════════ HERO PAGE NOTION ══════════ */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <span className="hero-emoji" aria-hidden="true"><BookOpen size={32} /></span>
            <h2 className="hero-titulo">Dejá de enterarte<br />tarde de las entregas</h2>
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

            <div className="progreso-resumen">
              <div className="progreso-resumen-txt">
                <h2>Tu dashboard</h2>
                <p>
                  {seccionesAprobadas} de {totalSecciones} piezas armadas. Cada módulo que aprobás
                  enciende una pieza.
                </p>
                <button type="button" className="corregir continuar-btn" onClick={continuar}>
                  <Play size={16} aria-hidden="true" />
                  {hayAvance ? 'Continuar donde dejaste' : 'Empezar por el módulo 1'}
                </button>
                <p className="progreso-resumen-sig">
                  {siguiente
                    ? `Siguiente: módulo ${SECCIONES.indexOf(siguiente) + 1} · ${siguiente.corto}`
                    : 'Completaste los 6 módulos: te espera el cierre.'}
                </p>
              </div>
              <DashboardProgreso aprobados={aprobados} />
            </div>

            <div className="notion-callout">
              <span className="notion-callout-emoji" aria-hidden="true"><Target size={24} /></span>
              <div className="notion-callout-body">
                <h2>Objetivos de aprendizaje del programa</h2>
                <p className="nota">
                  Marcá lo que ya sabés hacer. El resto es lo que vas a dominar módulo a módulo a lo largo de la capacitación:
                </p>
                <MetaCheck
                  texto="Módulo 1: Dominar el menú de bloques con la barra (/) y anidar páginas limpiamente"
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
              <span className="barra-plan-label">Tu avance:</span>
              <span className="barra-plan-pill">
                {seccionesAprobadas} de {totalSecciones} módulos aprobados
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
            // Bloqueo suave: todo el contenido está disponible; el cuestionario de un módulo
            // se habilita al aprobar el del módulo anterior.
            const estado     = estadoModulo(SECCIONES, aprobados, index)
            const completado = estado === 'aprobado'
            const bloqueado  = estado === 'bloqueado'
            const esUltimo   = index === SECCIONES.length - 1

            return (
              <BloqueSeccion
                key={sec.id}
                id={sec.id}
                num={sec.num}
                titulo={sec.titulo}
                estado={estado}
                abierto={Boolean(abiertas[sec.id])}
                onToggle={() => toggleSeccion(sec.id)}
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

                    {/* 5. Cuestionario Tally: 8/10 o más habilita el cuestionario siguiente */}
                    <TallyQuiz
                      formId={TALLY_FORMS[sec.id]}
                      titulo={`Cuestionario — ${sec.titulo}`}
                      aprobado={completado}
                      bloqueado={bloqueado}
                      onIrAnterior={index > 0 ? () => irA(SECCIONES[index - 1].id) : undefined}
                      onDesbloquearDev={index > 0 ? () => aprobarQuiz(SECCIONES[index - 1].id) : undefined}
                      onAprobado={() => aprobarQuiz(sec.id)}
                      meta={esUltimo ? 'habilitar el cierre del curso' : undefined}
                      exito={esUltimo ? 'se habilitó el cierre del curso.' : undefined}
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
                          {completado ? 'Aprobado' : bloqueado ? 'Cuestionario bloqueado' : 'En curso'}
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
                      <span>Esta sección final se habilita al aprobar los cuestionarios de los 6 módulos.</span>
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
                        onAprobado={() => aprobarQuiz('final')}
                      />

                      {/* Certificado: hijo directo de .cuerpo-cierre (la hoja de impresión lo necesita) */}
                      {aprobados.final && (
                        <Certificado
                          nombre={nombre}
                          onNombre={setNombre}
                          fecha={certificado.fecha}
                          aprobados={aprobados}
                        />
                      )}
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
                Inspirado en la interfaz de Notion · no afiliado a Notion Labs
              </span>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
