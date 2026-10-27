import { useState, useCallback, useEffect, useRef } from 'react'
import InicioCurso from './components/InicioCurso.jsx'
import EtapaModulo from './components/EtapaModulo.jsx'
import TallyQuiz        from './components/TallyQuiz.jsx'
import Etapa            from './components/Etapa.jsx'
import Recorrido        from './components/Recorrido.jsx'
import VideoPlaceholder from './components/VideoPlaceholder.jsx'
import RecursoPdf       from './components/RecursoPdf.jsx'
import HandsOn          from './components/HandsOn.jsx'
import PlanPersonalizado from './components/PlanPersonalizado.jsx'
import Callout          from './components/Callout.jsx'
import NotionLogo       from './components/NotionLogo.jsx'
import Portada          from './components/portada/Portada.jsx'
import EvaluacionFinal  from './components/EvaluacionFinal.jsx'
import Certificado      from './components/Certificado.jsx'
import BarraInferior    from './components/BarraInferior.jsx'
import BotonTema        from './components/BotonTema.jsx'
import { SECCIONES }    from './data/modulos.js'
import { calcularPlan } from './lib/plan.js'
import { useBarraAlDesplazar } from './lib/useBarraAlDesplazar.js'
import { ClipboardList, Flag, Lock } from 'lucide-react'
import { PIEZAS_DASHBOARD } from './data/piezas.js'
import { TALLY_FORMS }  from './data/tally.js'
import {
  CLAVES, leerProgreso, guardarProgreso, estadoModulo, primerPendiente,
} from './lib/progreso.js'

const IDS_NAVEGABLES = ['inicio', 'encuesta', ...SECCIONES.map(s => s.id), 'cierre']
const esModulo = id => SECCIONES.some(s => s.id === id)

/** Id de sección indicado en la URL (#sec3), o null si no corresponde a ninguna. */
function idDesdeHash() {
  const id = window.location.hash.slice(1)
  return IDS_NAVEGABLES.includes(id) ? id : null
}

/** Lleva la vista a la etapa y mueve el foco a su título (respeta reduced motion). */
function desplazarA(id) {
  const el = document.getElementById(id)
  if (!el) return
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth', block: 'start' })
  el.querySelector('.etapa-titulo, #curso-titulo')?.focus({ preventScroll: true })
}

/** Nombre corto de cada etapa para la navegación (header, anterior/siguiente). */
function etiquetaDe(id) {
  if (id === 'inicio') return 'Tus módulos'
  if (id === 'encuesta') return 'Antes de empezar'
  if (id === 'cierre') return 'Cierre y certificado'
  const i = SECCIONES.findIndex(s => s.id === id)
  return `Módulo ${i + 1} · ${SECCIONES[i].corto}`
}

/** Etapas anterior y siguiente en el orden del curso. */
function vecinos(id) {
  const i = IDS_NAVEGABLES.indexOf(id)
  const vecina = j => (j >= 0 && j < IDS_NAVEGABLES.length
    ? { id: IDS_NAVEGABLES[j], etiqueta: etiquetaDe(IDS_NAVEGABLES[j]) }
    : undefined)
  return { anterior: vecina(i - 1), siguiente: vecina(i + 1) }
}

// En el recorrido, un cuestionario todavía bloqueado se lee como "Más adelante": el contenido ya está disponible
const DETALLE_ESTADO = { aprobado: 'Aprobado', 'en-curso': 'En curso', bloqueado: 'Más adelante' }

export default function App() {
  const [aprobados,    setAprobados]    = useState(() => leerProgreso(CLAVES.aprobados, {}))
  const [encuesta,     setEncuesta]     = useState(() => ({ e1: null, e2: null, e3: null, ...leerProgreso(CLAVES.encuesta, {}) }))
  const [nombre,       setNombre]       = useState(() => leerProgreso(CLAVES.nombre, ''))
  const [ultima,       setUltima]       = useState(() => leerProgreso(CLAVES.ultima, ''))
  const [certificado,  setCertificado]  = useState(() => leerProgreso(CLAVES.certificado, {}))
  // Etapa visible (una a la vez): la de la URL o, si no hay, la galería de módulos
  const [actual,       setActual]       = useState(() => idDesdeHash() ?? 'inicio')
  const [forzarCierre, setForzarCierre] = useState(false)
  const [anuncio,      setAnuncio]      = useState('') // mensaje para la región aria-live
  // Pantalla actual: portada (pantalla 1) o curso (pantalla 2)
  const [vista,        setVista]        = useState(() => {
    if (idDesdeHash()) return 'curso'
    const guardada = leerProgreso(CLAVES.vista, '')
    if (guardada === 'portada' || guardada === 'curso') return guardada
    const conAvance = Object.keys(leerProgreso(CLAVES.aprobados, {})).length > 0 || Boolean(leerProgreso(CLAVES.ultima, ''))
    return conAvance ? 'curso' : 'portada'
  })
  const headerRef = useRef(null)
  const barra = useBarraAlDesplazar(headerRef, vista === 'curso')
  const destinoPendiente = useRef(null) // sección a la que ir al montar el curso
  const primeraVista = useRef(true)     // evita robar el foco en la carga inicial

  useEffect(() => { guardarProgreso(CLAVES.aprobados, aprobados) },   [aprobados])
  useEffect(() => { guardarProgreso(CLAVES.encuesta, encuesta) },     [encuesta])
  useEffect(() => { guardarProgreso(CLAVES.nombre, nombre) },         [nombre])
  useEffect(() => { guardarProgreso(CLAVES.ultima, ultima) },         [ultima])
  useEffect(() => { guardarProgreso(CLAVES.certificado, certificado) }, [certificado])
  useEffect(() => { guardarProgreso(CLAVES.vista, vista) },           [vista])

  // Métricas de progreso
  const totalSecciones      = SECCIONES.length
  const seccionesAprobadas  = SECCIONES.filter(s => aprobados[s.id]).length

  // Muestra la etapa (y la recuerda si es un módulo) y lleva la vista hasta ella
  // El desplazamiento y el foco esperan dos frames para que la etapa ya esté visible en el DOM
  const abrirYDesplazar = useCallback((id) => {
    setActual(id)
    if (esModulo(id)) setUltima(id)
    requestAnimationFrame(() => requestAnimationFrame(() => desplazarA(id)))
  }, [])

  const irA = useCallback((id, e) => {
    e?.preventDefault()
    abrirYDesplazar(id)
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
  }, [abrirYDesplazar])

  // Navegación con el historial del navegador (#secN)
  useEffect(() => {
    const onHash = () => {
      const id = idDesdeHash()
      if (!id) {
        // Atrás hasta la entrada sin hash: vuelve a la galería en lugar de quedarse en el módulo anterior
        if (vista === 'curso' && !window.location.hash) abrirYDesplazar('inicio')
        return
      }
      if (vista === 'curso') {
        abrirYDesplazar(id)
      } else {
        destinoPendiente.current = id
        setVista('curso')
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [abrirYDesplazar, vista])

  // Al mostrarse el curso: lleva la vista al destino (o arriba) y enfoca el título correspondiente
  const alMostrarCurso = () => {
    const id = destinoPendiente.current ?? idDesdeHash()
    destinoPendiente.current = null
    if (id) {
      abrirYDesplazar(id)
      if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    } else {
      // Sin destino: se entra por la galería de módulos
      setActual('inicio')
      window.scrollTo({ top: 0, behavior: 'auto' })
      requestAnimationFrame(() => document.getElementById('curso-titulo')?.focus({ preventScroll: true }))
    }
  }

  // El curso queda montado (conserva foco y respuestas de Tally); solo se oculta la pantalla inactiva
  useEffect(() => {
    if (vista === 'curso') {
      alMostrarCurso()
      return undefined
    }
    if (!primeraVista.current) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      document.getElementById('portada-titulo')?.focus({ preventScroll: true })
    }
    return undefined
  }, [vista]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { primeraVista.current = false }, [])

  const entrar = (destino = null) => {
    destinoPendiente.current = destino
    setVista('curso')
  }

  const volverPortada = () => {
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo({ top: 0, behavior: 'auto' })
    setVista('portada')
  }

  // "Continuar donde dejaste": la última sección visitada si sigue pendiente; si no, el primer módulo pendiente
  const pendienteUltima = SECCIONES.find(sec => sec.id === ultima && !aprobados[sec.id])
  const siguiente       = pendienteUltima ?? primerPendiente(SECCIONES, aprobados)
  const hayAvance       = seccionesAprobadas > 0 || Boolean(ultima)

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

  const plan         = calcularPlan(encuesta)
  const recomendados = plan?.recomendados ?? []

  const cierreDesbloqueado = Boolean(SECCIONES.every(s => aprobados[s.id]) || forzarCierre)

  // Ítems compartidos por el recorrido (pantallas anchas) y el menú "Módulos" (todas las pantallas)
  const itemsMenu = [
    {
      id: 'inicio', etiqueta: 'Tus módulos', nombre: 'Tus módulos', icono: 'inicio',
      hecho: false, detalle: 'Vista general',
    },
    {
      id: 'encuesta', etiqueta: 'Antes de empezar', nombre: 'Antes de empezar', icono: 'encuesta',
      hecho: Boolean(plan), detalle: plan ? 'Diagnóstico hecho' : 'Diagnóstico · 3 min',
    },
    ...SECCIONES.map((sec, i) => {
      const estado = estadoModulo(SECCIONES, aprobados, i)
      return {
        id: sec.id,
        etiqueta: `${i + 1} · ${sec.corto}`,
        nombre: sec.corto,
        num: i + 1,
        estado,
        hecho: estado === 'aprobado',
        detalle: `Módulo ${i + 1} · ${DETALLE_ESTADO[estado]}`,
        recomendado: recomendados.includes(sec.id),
      }
    }),
    {
      id: 'cierre', etiqueta: 'Cierre y certificado', nombre: 'Cierre y certificado', icono: 'cierre',
      estado: cierreDesbloqueado ? 'cierre-listo' : 'cierre-bloqueado',
      hecho: Boolean(aprobados.final),
      detalle: cierreDesbloqueado ? 'Disponible' : 'Al aprobar los 6 módulos',
    },
  ]

  return (
    <>
      {/* Región aria-live: anuncia aprobaciones a lectores de pantalla */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{anuncio}</div>

      <div className="vista" hidden={vista !== 'portada'}>
        <Portada
            onEntrar={() => entrar()}
            onContinuar={hayAvance ? () => entrar(siguiente ? siguiente.id : 'cierre') : undefined}
            textoContinuar={hayAvance && siguiente ? `Módulo ${SECCIONES.indexOf(siguiente) + 1} · ${siguiente.corto}` : undefined}
            activa={vista === 'portada'}
        />
      </div>

      <div
        className={`vista${barra.minimizada ? ' con-barra-mini' : ''}${barra.desplazada ? ' con-barra-desplazada' : ''}`}
        hidden={vista !== 'curso'}
      >
          <a className="skip-link" href="#contenido">Saltar al contenido</a>

          {/* Borde difuminado donde el contenido pasa por debajo de la barra (scroll edge de iOS 26) */}
          <div className="borde-desplazamiento" aria-hidden="true" />

          {/* ══════════ BARRA SUPERIOR: vidrio que se achica al bajar y vuelve al subir ══════════ */}
          <header ref={headerRef} className={`app-header${barra.minimizada ? ' app-header--mini' : ''}`}>
            <div className="barra">
              <button type="button" className="marca" onClick={volverPortada} aria-label="Organizá tu cursada: volver a la portada">
                <span className="marca-icon" aria-hidden="true">
                  <NotionLogo size={18} color="white" />
                </span>
                <span className="marca-texto">Organizá tu cursada</span>
              </button>

              {/* Título chico: aparece al bajar, cuando el título grande ya no se ve */}
              <p className="barra-ubicacion">
                <span className="sr-only">Estás en: </span>
                {etiquetaDe(actual)}
              </p>

              <BotonTema />
            </div>
          </header>

          <main id="contenido" tabIndex={-1}>
          {/* ══════════ RECORRIDO + ETAPA ACTUAL (una a la vez) ══════════
              En la galería de módulos no hay recorrido lateral: la galería ya es el recorrido */}
          <div className={`wrap curso-layout${actual === 'inicio' ? ' curso-layout--inicio' : ''}`}>
            <Recorrido
              items={itemsMenu}
              actual={actual}
              resumen={`${seccionesAprobadas} de ${totalSecciones}`}
              onIr={irA}
            />

            <div className="escenario">
              {/* ── Galería de módulos: la entrada al curso ── */}
              <InicioCurso
                visible={actual === 'inicio'}
                aprobados={aprobados}
                plan={plan}
                recomendados={recomendados}
                cierreDesbloqueado={cierreDesbloqueado}
                onIr={irA}
              />
              {/* ── Diagnóstico ── */}
              <Etapa
                id="encuesta"
                visible={actual === 'encuesta'}
                icono={<ClipboardList size={28} strokeWidth={1.75} />}
                kicker="Antes de empezar · 3 minutos"
                titulo="¿Dónde se te escapan las cosas hoy?"
                estado={plan && <span className="chip completado"><span aria-hidden="true">✓</span> Hecho</span>}
                {...vecinos('encuesta')}
                onIr={irA}
              >
                <p className="etapa-bajada">
                  Tres preguntas para conocer tu punto de partida. Con tus respuestas armamos un plan
                  que te dice por qué módulo conviene empezar.
                </p>
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
                <PlanPersonalizado plan={plan} onIr={irA} />
              </Etapa>

              {/* ── 6 módulos: cada uno en pasos, en el orden en que se hacen ── */}
              {SECCIONES.map((sec, index) => {
                // Bloqueo suave: todo el contenido está disponible; el cuestionario de un módulo
                // se habilita al aprobar el del módulo anterior.
                const estado     = estadoModulo(SECCIONES, aprobados, index)
                const completado = estado === 'aprobado'
                const bloqueado  = estado === 'bloqueado'
                const esUltimo   = index === SECCIONES.length - 1
                const [claveEtiqueta, claveTexto] = sec.clave

                return (
                  <EtapaModulo
                    key={sec.id}
                    sec={sec}
                    numero={index + 1}
                    total={totalSecciones}
                    icono={PIEZAS_DASHBOARD[index].icono}
                    estado={completado
                      ? <span className="chip completado"><span aria-hidden="true">✓</span> Aprobado</span>
                      : estado === 'en-curso' && <span className="chip ok">En curso</span>}
                    recomendado={recomendados.includes(sec.id)}
                    vecinos={vecinos(sec.id)}
                    visible={actual === sec.id}
                    onIr={irA}
                    pasos={[
                        {
                          id: 'video',
                          etiqueta: 'Video',
                          titulo: `Mirá el video · ${sec.videoDuracion}`,
                          contenido: (
                            <VideoPlaceholder
                              id={`video-${sec.id}`}
                              src={sec.videoSrc}
                              titulo={sec.videoTitulo}
                              duracion={sec.videoDuracion}
                            />
                          ),
                        },
                        {
                          id: 'lectura',
                          etiqueta: 'Paso a paso',
                          titulo: 'Repasá el paso a paso',
                          contenido: (
                            <>
                              <Callout variante="practica" className="paso-clave">
                                <p><strong>{claveEtiqueta}:</strong> {claveTexto}</p>
                              </Callout>
                              <div className="paso-lectura">
                                {(Array.isArray(sec.explicacionDetallada) ? sec.explicacionDetallada : [sec.explicacionDetallada])
                                  .map((parrafo, pIdx) => <p key={pIdx}>{parrafo}</p>)}
                              </div>
                            </>
                          ),
                        },
                        {
                          id: 'guia',
                          etiqueta: 'Guía',
                          titulo: 'Descargá la guía',
                          contenido: (
                            <RecursoPdf
                              id={`pdf-${sec.id}`}
                              titulo={sec.pdf.titulo}
                              url={sec.pdf.url}
                            />
                          ),
                        },
                        {
                          id: 'cuestionario',
                          etiqueta: 'Cuestionario',
                          titulo: 'Hacé el cuestionario',
                          hecho: completado,
                          contenido: (
                            // Cuestionario Tally: 8/10 o más habilita el cuestionario siguiente
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
                          ),
                        },
                      ]}
                  />
                )
              })}

              {/* ── Cierre integrador ── */}
              <Etapa
                id="cierre"
                visible={actual === 'cierre'}
                icono={<Flag size={28} strokeWidth={1.75} />}
                kicker="Cierre integrador · Proyecto final"
                titulo="La prueba de que dominás tu cursada en Notion"
                estado={cierreDesbloqueado
                  ? <span className="chip ok">Disponible</span>
                  : <span className="chip cerrado"><Lock size={12} aria-hidden="true" /> Bloqueado</span>}
                {...vecinos('cierre')}
                onIr={irA}
              >
                <p className="etapa-bajada">
                  Aplicá todo lo visto en los 6 módulos: poné a prueba tu sistema y realizá la evaluación
                  integradora para obtener tu certificado.
                </p>

                {!cierreDesbloqueado ? (
                  <div className="desbloqueo-banner">
                    <div className="desbloqueo-content">
                      <span className="desbloqueo-icon" aria-hidden="true"><Lock size={20} /></span>
                      <div className="desbloqueo-texto">
                        <strong>Cierre y evaluación final bloqueados</strong>
                        <span>Esta etapa se habilita al aprobar los cuestionarios de los 6 módulos.</span>
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
                    />

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
                )}
              </Etapa>
            </div>{/* /escenario */}
          </div>{/* /curso-layout */}
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

          {/* ══════════ BARRA INFERIOR (pantallas angostas): anterior · módulos · siguiente ══════════ */}
          <BarraInferior
            {...vecinos(actual)}
            items={itemsMenu}
            actual={actual}
            resumen={`${seccionesAprobadas}/${totalSecciones}`}
            onIr={irA}
          />
      </div>
    </>
  )
}
