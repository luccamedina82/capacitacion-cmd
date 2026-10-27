import { ArrowRight, Check, ClipboardList, Flag, Lock, PlayCircle, Star } from 'lucide-react'
import ProgresoPiezas from './ProgresoPiezas.jsx'
import { SECCIONES } from '../data/modulos.js'
import { PIEZAS_DASHBOARD } from '../data/piezas.js'
import { CLAVES, leerProgreso, estadoModulo } from '../lib/progreso.js'

// Tono de la portada de cada tarjeta (como las portadas de color de Notion)
const TONOS = [212, 268, 152, 28, 340, 190]
const TOTAL_PASOS = 4

const ESTADO = {
  aprobado: { texto: 'Aprobado', Icono: Check },
  'en-curso': { texto: 'En curso', Icono: null },
  bloqueado: { texto: 'Más adelante', Icono: null },
}

/**
 * Pantalla de entrada al curso: tu progreso y los módulos en una galería estilo Notion.
 * Cada tarjeta lleva a la portada de su módulo. Si falta el diagnóstico, lo sugiere primero.
 *
 * @param {boolean} visible
 * @param {Record<string, boolean>} aprobados
 * @param {object|null} plan          - resultado de calcularPlan (null si falta el diagnóstico)
 * @param {string[]} recomendados
 * @param {boolean} cierreDesbloqueado
 * @param {function} onIr             - (id, evento) navega a una etapa
 */
export default function InicioCurso({ visible, aprobados, plan, recomendados, cierreDesbloqueado, onIr }) {
  // Pasos recorridos por módulo (se lee en cada render: al volver acá siempre está al día)
  const pasos = leerProgreso(CLAVES.pasos, {})
  const inicio = plan && SECCIONES.findIndex(sec => sec.id === plan.inicio)

  return (
    <section id="inicio" className="inicio" hidden={!visible} aria-labelledby="curso-titulo">
      <header className="inicio-cab">
        <p className="inicio-kicker">Comunicación Multimedial · Capacitación Notion</p>
        <h1 id="curso-titulo" className="inicio-titulo" tabIndex={-1}>Tus módulos</h1>
        <p className="inicio-sub">
          Elegí un módulo para empezar. Cada uno que aprobás enciende una pieza de tu dashboard.
        </p>
      </header>

      <div className="inicio-progreso">
        <ProgresoPiezas aprobados={aprobados} onIr={onIr} />
      </div>

      {plan ? (
        <p className="inicio-plan">
          <Star size={15} aria-hidden="true" />
          Según tu diagnóstico, te conviene empezar por el{' '}
          <a href={`#${plan.inicio}`} onClick={e => onIr(plan.inicio, e)}>
            módulo {inicio + 1} · {SECCIONES[inicio].corto}
          </a>.
        </p>
      ) : (
        <a href="#encuesta" className="inicio-diagnostico" onClick={e => onIr('encuesta', e)}>
          <span className="inicio-diagnostico-icono" aria-hidden="true"><ClipboardList size={22} /></span>
          <span className="inicio-diagnostico-texto">
            <strong>Antes de empezar: hacé el diagnóstico</strong>
            <span>3 preguntas · 3 minutos. Te dice por qué módulo conviene arrancar.</span>
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      )}

      <ul className="galeria">
        {SECCIONES.map((sec, i) => {
          const estado = estadoModulo(SECCIONES, aprobados, i)
          const { texto, Icono } = ESTADO[estado]
          const hechos = estado === 'aprobado'
            ? TOTAL_PASOS
            : Math.min((pasos[sec.id] ?? []).filter(p => p !== 'cuestionario').length, TOTAL_PASOS - 1)
          return (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className={`tarjeta tarjeta--${estado}`}
                style={{ '--tono': TONOS[i] }}
                onClick={e => onIr(sec.id, e)}
              >
                <span className="tarjeta-cubierta" aria-hidden="true">
                  <span className="tarjeta-icono">{PIEZAS_DASHBOARD[i].icono}</span>
                </span>
                <span className="tarjeta-cuerpo">
                  <span className="tarjeta-num">Módulo {i + 1}</span>
                  <span className="tarjeta-titulo">{sec.corto}</span>
                  <span className="tarjeta-desc">{sec.titulo}</span>
                  <span className="tarjeta-props">
                    <span className={`tarjeta-estado tarjeta-estado--${estado}`}>
                      {Icono && <Icono size={13} strokeWidth={3} aria-hidden="true" />}
                      {texto}
                    </span>
                    <span className="tarjeta-prop">
                      <PlayCircle size={14} aria-hidden="true" /> {sec.videoDuracion}
                    </span>
                    {recomendados.includes(sec.id) && (
                      <span className="tarjeta-prop tarjeta-prop--reco">
                        <Star size={13} aria-hidden="true" /> Para vos
                      </span>
                    )}
                  </span>
                  <span className="tarjeta-pasos">
                    <span className="tarjeta-pasos-barra" aria-hidden="true">
                      <span style={{ width: `${(hechos / TOTAL_PASOS) * 100}%` }} />
                    </span>
                    {hechos} de {TOTAL_PASOS} pasos
                  </span>
                </span>
              </a>
            </li>
          )
        })}

        <li>
          <a
            href="#cierre"
            className={`tarjeta tarjeta--cierre${cierreDesbloqueado ? '' : ' tarjeta--bloqueada'}`}
            style={{ '--tono': 45 }}
            onClick={e => onIr('cierre', e)}
          >
            <span className="tarjeta-cubierta" aria-hidden="true">
              <span className="tarjeta-icono tarjeta-icono--svg"><Flag size={30} strokeWidth={1.75} /></span>
            </span>
            <span className="tarjeta-cuerpo">
              <span className="tarjeta-num">Cierre</span>
              <span className="tarjeta-titulo">Proyecto final y certificado</span>
              <span className="tarjeta-desc">Aplicá todo en tu sistema y obtené tu certificado.</span>
              <span className="tarjeta-props">
                <span className="tarjeta-estado">
                  {cierreDesbloqueado
                    ? 'Disponible'
                    : <><Lock size={12} aria-hidden="true" /> Al aprobar los 6 módulos</>}
                </span>
              </span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  )
}
