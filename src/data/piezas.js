import { Blocks, NotebookPen, Database, Kanban, Filter, LayoutDashboard } from 'lucide-react'
import { SECCIONES } from './modulos.js'

const ICONOS = {
  sec1: Blocks,
  sec2: NotebookPen,
  sec3: Database,
  sec4: Kanban,
  sec5: Filter,
  sec6: LayoutDashboard,
}

/** Las 6 piezas del dashboard: una por módulo (id = id del módulo que la enciende). */
export const PIEZAS_DASHBOARD = SECCIONES.map(sec => ({
  id: sec.id,
  etiqueta: sec.corto,
  Icono: ICONOS[sec.id],
}))
