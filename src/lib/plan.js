/**
 * Plan personalizado a partir del diagnóstico inicial.
 * Función pura: no lee ni escribe estado, solo devuelve el plan para una encuesta.
 */

const MAX_RECOMENDADOS = 3

const ATRASADO = ['Varias veces', 'Perdí la cuenta']

/** Perfil de nivel según la experiencia previa con Notion (e3). */
function porNivel(e3) {
  if (e3 === 'Nunca' || e3 === 'La abrí y me abrumó') {
    return {
      inicio: 'sec1',
      resumen: e3 === 'Nunca' ? 'Estás empezando desde cero con Notion' : 'Ya probaste Notion, pero te abrumó',
      items: [
        ['sec1', 'Arrancá por lo básico: los bloques y el atajo / son la base de todo lo demás.'],
        ['sec2', 'Con los bloques claros, vas a armar apuntes con Toggles y Active Recall.'],
      ],
    }
  }
  if (e3 === 'La uso para notas simples') {
    return {
      inicio: 'sec2',
      resumen: 'Usás Notion para notas simples',
      items: [
        ['sec2', 'Ya tomás notas: llevalas al siguiente nivel con Toggles y Active Recall.'],
        ['sec3', 'Pasá de notas sueltas a una base de datos con propiedades.'],
      ],
    }
  }
  return {
    inicio: 'sec3',
    resumen: 'Ya tenés nivel intermedio en Notion, así que podés repasar rápido los módulos 1 y 2',
    items: [
      ['sec5', 'Sumá filtros y orden para ver solo lo urgente de tu cursada.'],
      ['sec6', 'Cerrá el circuito armando tu Dashboard con bases de datos vinculadas.'],
    ],
  }
}

/** Recomendaciones según la gestión actual de fechas (e1) y los atrasos (e2). */
function porDolor(e1, e2) {
  const items = []
  if (ATRASADO.includes(e2) || e1 === 'No las anoto') {
    items.push(
      ['sec3', 'Con una base de datos y una propiedad Fecha, ninguna entrega queda sin registrar.'],
      ['sec5', 'El filtro "Esta semana" te muestra solo lo que vence pronto, para no enterarte tarde.'],
    )
  }
  if (e1 === 'Papel o agenda') {
    items.push(['sec4', 'La vista Calendario reemplaza la agenda de papel con tus fechas en un mes.'])
  }
  if (e1 === 'Calendario del celular') {
    items.push(
      ['sec4', 'La vista Calendario te da la misma lógica del celular, conectada a tus tareas.'],
      ['sec6', 'El Dashboard junta todo en un solo lugar, sin saltar entre apps.'],
    )
  }
  return items
}

/**
 * @param {{e1: string|null, e2: string|null, e3: string|null}} encuesta
 * @returns {{inicio: string, recomendados: string[], motivos: Record<string,string>, resumen: string} | null}
 *   null si faltan respuestas.
 */
export function calcularPlan(encuesta) {
  const { e1, e2, e3 } = encuesta ?? {}
  if (!e1 || !e2 || !e3) return null

  const nivel = porNivel(e3)
  const candidatos = [
    [nivel.inicio, null],
    ...nivel.items,
    ...porDolor(e1, e2),
  ]

  const motivos = {}
  const recomendados = []
  for (const [id, motivo] of candidatos) {
    if (recomendados.length >= MAX_RECOMENDADOS && !recomendados.includes(id)) continue
    if (!recomendados.includes(id)) recomendados.push(id)
    if (motivo && !motivos[id]) motivos[id] = motivo
  }
  if (!motivos[nivel.inicio]) motivos[nivel.inicio] = 'Es el mejor punto de partida según tu nivel actual.'

  const detalle = []
  if (e1 === 'No las anoto') detalle.push('no anotás tus fechas')
  else if (e1 === 'Otra app') detalle.push('anotás tus fechas en otra app')
  else if (e1 === 'Papel o agenda') detalle.push('anotás tus fechas en papel o agenda')
  else if (e1 === 'Calendario del celular') detalle.push('anotás tus fechas en el calendario del celular')
  if (e2 === 'Ninguna') detalle.push('no te enteraste tarde de nada el último mes')
  else detalle.push(`te enteraste tarde de una entrega o examen (${e2.toLowerCase()})`)

  return {
    inicio: nivel.inicio,
    recomendados,
    motivos,
    resumen: `${nivel.resumen}; ${detalle.join(' y ')}.`,
  }
}
