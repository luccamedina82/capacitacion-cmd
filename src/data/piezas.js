import { SECCIONES } from './modulos.js'

const EMOJIS = {
  sec1: '🧱',
  sec2: '📝',
  sec3: '🗃️',
  sec4: '📅',
  sec5: '🔎',
  sec6: '🏠',
}

/** Las 6 piezas del dashboard: una por módulo (id = id del módulo que la enciende). */
export const PIEZAS_DASHBOARD = SECCIONES.map(sec => ({
  id: sec.id,
  etiqueta: sec.corto,
  icono: EMOJIS[sec.id],
}))
