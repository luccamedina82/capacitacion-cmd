import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { SECCIONES } from '../data/modulos.js'

/**
 * Tarjeta "Tu plan personalizado": se muestra cuando el diagnóstico está completo.
 *
 * @param {object}   plan - resultado de calcularPlan()
 * @param {function} onIr - (id, evento) navega al módulo
 */
export default function PlanPersonalizado({ plan, onIr }) {
  const sinMovimiento = Boolean(useReducedMotion())
  const numero = id => SECCIONES.findIndex(s => s.id === id) + 1
  const titulo = id => SECCIONES.find(s => s.id === id)?.titulo ?? ''

  return (
    <div>
      <p className="sr-only" role="status" aria-live="polite">
        {plan ? 'Tu plan personalizado está listo.' : ''}
      </p>
      {plan && (
        <motion.section
          className="plan glass glass--content"
          aria-labelledby="plan-titulo"
          initial={sinMovimiento ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 id="plan-titulo">
            <span aria-hidden="true">🧭</span> Tu plan personalizado
          </h3>
          <p className="plan-resumen">{plan.resumen}</p>

          <div className="plan-inicio">
            <p>
              <strong>Empezá por:</strong> Módulo {numero(plan.inicio)} — {titulo(plan.inicio)}
            </p>
            <button type="button" className="corregir" onClick={e => onIr(plan.inicio, e)}>
              Ir al módulo {numero(plan.inicio)}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>

          <h4>Módulos recomendados para vos</h4>
          <ul className="plan-lista">
            {plan.recomendados.map(id => (
              <li key={id}>
                <span className="plan-modulo">Módulo {numero(id)} · {SECCIONES.find(s => s.id === id)?.corto}</span>
                <span className="plan-motivo">{plan.motivos[id]}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </div>
  )
}
