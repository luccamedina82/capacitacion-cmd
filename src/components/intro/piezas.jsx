/**
 * Piezas visuales del dashboard final del curso.
 * Son presentacionales y decorativas: el contenedor que las use debe
 * ofrecer la descripcion accesible (aria-hidden aqui no se aplica para
 * poder reutilizarlas en otros contextos).
 *
 * API: cada pieza acepta `className` y props propios opcionales.
 * Estilos en src/styles/intro.css (prefijo `pz-`).
 */
import { ChevronDown, FileText, Funnel, CalendarDays } from 'lucide-react'

const cx = (...c) => c.filter(Boolean).join(' ')

const FILAS = [
  { materia: 'Comunicación I', estado: 'En curso', tono: 'azul', fecha: '12 nov', semana: true },
  { materia: 'Semiótica', estado: 'Pendiente', tono: 'ambar', fecha: '14 nov', semana: true },
  { materia: 'Taller Digital', estado: 'Listo', tono: 'verde', fecha: '25 nov', semana: false },
]

/** Pagina de una materia con bloques basicos. */
export function PiezaPagina({ className }) {
  return (
    <div className={cx('pz', 'pz-pagina', className)}>
      <div className="pz-cab">
        <FileText size={14} aria-hidden="true" />
        <span className="pz-titulo">Semiótica</span>
      </div>
      <p className="pz-h">Parcial 1 · Unidad 2</p>
      <p className="pz-linea">Signo, significante y significado.</p>
      <p className="pz-check"><span className="pz-caja is-on" /> Leer el apunte de cátedra</p>
      <p className="pz-check"><span className="pz-caja" /> Armar el resumen</p>
    </div>
  )
}

/** Toggle con pregunta de Active Recall. */
export function PiezaToggle({ className, abierto = true }) {
  return (
    <div className={cx('pz', 'pz-toggle', className)}>
      <div className="pz-cab">
        <ChevronDown
          size={14}
          aria-hidden="true"
          style={abierto ? undefined : { transform: 'rotate(-90deg)' }}
        />
        <span className="pz-titulo">¿Qué es un signo?</span>
        <span className="pz-tag pz-tag-gris">Active Recall</span>
      </div>
      {abierto && (
        <p className="pz-respuesta">Unión de un significante y un significado.</p>
      )}
    </div>
  )
}

/** Base de datos Materia / Estado / Fecha. `filtro` aplica "Esta semana". */
export function PiezaTabla({ className, filtro = false }) {
  return (
    <div className={cx('pz', 'pz-tabla', className)}>
      <div className="pz-cab">
        <span className="pz-titulo">Entregas</span>
        <span className={cx('pz-tag', 'pz-filtro', filtro && 'is-on')}>
          <Funnel size={11} aria-hidden="true" /> Esta semana
        </span>
      </div>
      <div className="pz-fila pz-fila-cab">
        <span>Materia</span>
        <span>Estado</span>
        <span>Fecha</span>
      </div>
      {FILAS.map(f => (
        <div key={f.materia} className={cx('pz-fila', filtro && !f.semana && 'is-fuera')}>
          <span>{f.materia}</span>
          <span><span className={`pz-tag pz-tag-${f.tono}`}>{f.estado}</span></span>
          <span>{f.fecha}</span>
        </div>
      ))}
    </div>
  )
}

const COLUMNAS = [
  { nombre: 'Por hacer', tarjetas: ['Semiótica'] },
  { nombre: 'En curso', tarjetas: ['Comunicación I'] },
  { nombre: 'Listo', tarjetas: ['Taller Digital'] },
]

/** Tablero Kanban agrupado por Estado. */
export function PiezaKanban({ className }) {
  return (
    <div className={cx('pz', 'pz-kanban', className)}>
      <div className="pz-cab"><span className="pz-titulo">Tablero</span></div>
      <div className="pz-cols">
        {COLUMNAS.map(c => (
          <div key={c.nombre} className="pz-col">
            <span className="pz-col-nombre">{c.nombre}</span>
            {c.tarjetas.map(t => <span key={t} className="pz-tarjeta">{t}</span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MARCAS = { 12: 'azul', 14: 'ambar', 25: 'verde' }

/** Calendario mensual con las fechas de entrega marcadas. */
export function PiezaCalendario({ className }) {
  // Noviembre en miniatura: dias 1..30 desplazados 5 lugares (empieza sabado).
  const celdas = Array.from({ length: 35 }, (_, i) => {
    const d = i - 4
    return d >= 1 && d <= 30 ? d : null
  })
  return (
    <div className={cx('pz', 'pz-calendario', className)}>
      <div className="pz-cab">
        <CalendarDays size={14} aria-hidden="true" />
        <span className="pz-titulo">Noviembre</span>
      </div>
      <div className="pz-dias">
        {DIAS.map((d, i) => <span key={i} className="pz-dia-cab">{d}</span>)}
        {celdas.map((d, i) => (
          <span key={i} className={cx('pz-dia', MARCAS[d] && `pz-marca-${MARCAS[d]}`)}>
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Texto alternativo para quien use las piezas juntas como composicion. */
export const DESCRIPCION_DASHBOARD =
  'Dashboard de cursada compuesto por la página de una materia, un toggle de Active Recall, ' +
  'una tabla de entregas con Materia, Estado y Fecha, un tablero Kanban y un calendario mensual.'
