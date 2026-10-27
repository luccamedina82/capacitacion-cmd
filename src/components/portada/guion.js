import { useEffect, useState, useSyncExternalStore } from 'react'

export const OPCIONES = [
  { id: 'texto',      icono: 'Aa',  nombre: 'Texto',         desc: 'Párrafo simple' },
  { id: 'titulo',     icono: 'H1',  nombre: 'Encabezado',    desc: 'Título de sección' },
  { id: 'toggle',     icono: '▸',   nombre: 'Toggle',        desc: 'Contenido desplegable' },
  { id: 'bd',         icono: '🗃️', nombre: 'Base de datos', desc: 'Tabla con propiedades' },
  { id: 'tablero',    icono: '📋',  nombre: 'Tablero',       desc: 'Vista Kanban' },
  { id: 'calendario', icono: '📅',  nombre: 'Calendario',    desc: 'Vista mensual' },
]

/** Recordatorio que cierra cada vuelta: muestra para qué sirve el bloque recién creado. */
export const AVISOS = {
  bd:         { icono: '📌', titulo: 'TP de Semiótica',        detalle: 'Vence el 19 nov · faltan 2 días' },
  tablero:    { icono: '✅', titulo: 'Parcial 1 pasó a Listo', detalle: 'Te quedan 2 tareas por hacer' },
  calendario: { icono: '🔔', titulo: 'Parcial de Historia',    detalle: 'Mañana, 12 nov · 9:00' },
}

// Resorte del viaje del bloque entre la ventana y su lugar flotante (layoutId compartido)
export const VUELO = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 }

// Índices de las opciones que el guion elige, una por vuelta
const METAS = [3, 4, 5]

const ESTATICO = { fase: 'bloque', idx: 3, aviso: true }

function suscribirVisibilidad(cb) {
  document.addEventListener('visibilitychange', cb)
  return () => document.removeEventListener('visibilitychange', cb)
}

/**
 * Guion de la demo: el cursor escribe "/", se abre el menú, el resalte baja
 * hasta una opción, el bloque se materializa y llega el recordatorio. Se repite con otra opción.
 * Se pausa con la pestaña oculta o la portada inactiva. En modo estático queda el estado final.
 *
 * @param {boolean} estatico - reduced motion: sin guion
 * @param {boolean} activa   - false mientras la portada está oculta
 */
export function useGuion(estatico, activa) {
  const [estado, setEstado] = useState({ fase: 'cursor', idx: 0, aviso: false })
  const docVisible = useSyncExternalStore(
    suscribirVisibilidad,
    () => document.visibilityState === 'visible',
    () => true,
  )
  const corre = !estatico && activa && docVisible

  useEffect(() => {
    if (!corre) return undefined
    let vivo = true
    const timers = []
    const esperar = ms => new Promise(res => { timers.push(setTimeout(res, ms)) })

    const correr = async () => {
      let vuelta = 0
      while (vivo) {
        const meta = METAS[vuelta % METAS.length]
        vuelta += 1
        setEstado({ fase: 'cursor', idx: 0, aviso: false })
        await esperar(1000)
        setEstado({ fase: 'menu', idx: 0, aviso: false })
        await esperar(750)
        for (let i = 1; i <= meta; i += 1) {
          setEstado({ fase: 'menu', idx: i, aviso: false })
          await esperar(430)
        }
        await esperar(380)
        setEstado({ fase: 'bloque', idx: meta, aviso: false })
        await esperar(900)
        setEstado({ fase: 'bloque', idx: meta, aviso: true })
        await esperar(2600)
        setEstado({ fase: 'bloque', idx: meta, aviso: false })
        await esperar(500)
      }
    }
    correr()

    return () => {
      vivo = false
      timers.forEach(clearTimeout)
    }
  }, [corre])

  return estatico ? ESTATICO : estado
}
