/**
 * Maquetas decorativas de bloques de Notion (tabla, tablero, calendario, toggle).
 * Son solo ilustración: el contenedor que las usa va con aria-hidden.
 */

export function MiniTabla() {
  const filas = [
    ['Parcial de Historia', 'Pendiente', '12 nov', 'rojo'],
    ['TP de Semiótica', 'En curso', '19 nov', 'azul'],
    ['Entrega de Diseño', 'Listo', '24 nov', 'verde'],
  ]
  return (
    <div className="mb-tabla">
      <div className="mb-tabla-fila mb-tabla-cab">
        <span>Tarea</span><span>Estado</span><span>Fecha</span>
      </div>
      {filas.map(([tarea, estado, fecha, color]) => (
        <div className="mb-tabla-fila" key={tarea}>
          <span>{tarea}</span>
          <span><i className={`mb-tag mb-tag-${color}`}>{estado}</i></span>
          <span>{fecha}</span>
        </div>
      ))}
    </div>
  )
}

export function MiniTablero() {
  const columnas = [
    ['Por hacer', ['Leer cap. 4', 'TP final']],
    ['En curso', ['Resumen']],
    ['Listo', ['Parcial 1', 'Mapa']],
  ]
  return (
    <div className="mb-tablero">
      {columnas.map(([titulo, tarjetas]) => (
        <div className="mb-col" key={titulo}>
          <span className="mb-col-titulo">{titulo}</span>
          {tarjetas.map(t => <span className="mb-card" key={t}>{t}</span>)}
        </div>
      ))}
    </div>
  )
}

export function MiniCalendario() {
  const marcas = { 5: 'azul', 12: 'rojo', 19: 'azul', 24: 'verde' }
  const dias = Array.from({ length: 28 }, (_, i) => i + 1)
  return (
    <div className="mb-cal">
      <div className="mb-cal-cab"><strong>Noviembre</strong><span>2026</span></div>
      <div className="mb-cal-grilla">
        {dias.map(d => (
          <span key={d} className={marcas[d] ? `mb-dia mb-dia-${marcas[d]}` : 'mb-dia'}>{d}</span>
        ))}
      </div>
    </div>
  )
}

export function MiniToggle() {
  return (
    <div className="mb-toggle">
      <div className="mb-toggle-cab"><span className="mb-toggle-flecha">▾</span> Apuntes · Semiótica</div>
      <div className="mb-toggle-cuerpo">
        <span /><span /><span className="corta" />
      </div>
    </div>
  )
}
