import { useSyncExternalStore } from 'react'
import { CLAVES, leerProgreso, guardarProgreso } from './progreso.js'

/**
 * Tema de la página: claro, oscuro o noche. La fuente de verdad es el atributo data-tema
 * de <html> (lo fija el script de index.html antes del primer render para evitar el destello).
 * Todas las instancias del hook leen ese atributo, así que el selector del header
 * y el de la portada siempre quedan sincronizados.
 *
 * Sin elección guardada se sigue el esquema del sistema (claro u oscuro), también en vivo.
 * "Noche" solo se activa a mano.
 */

export const TEMAS = ['claro', 'oscuro', 'noche']

const CONSULTA_OSCURO = '(prefers-color-scheme: dark)'
let temporizadorTransicion = null

function delSistema() {
  return window.matchMedia(CONSULTA_OSCURO).matches ? 'oscuro' : 'claro'
}

/** Elección guardada por el usuario, o null si nunca eligió. */
function elegido() {
  const valor = leerProgreso(CLAVES.tema, '')
  return TEMAS.includes(valor) ? valor : null
}

function aplicar(tema) {
  document.documentElement.dataset.tema = tema
}

function leerActual() {
  const tema = document.documentElement.dataset.tema
  return TEMAS.includes(tema) ? tema : 'claro'
}

function suscribir(avisar) {
  const raiz = document.documentElement
  if (!raiz.dataset.tema) aplicar(elegido() ?? delSistema())

  const observador = new MutationObserver(avisar)
  observador.observe(raiz, { attributes: true, attributeFilter: ['data-tema'] })

  // Sin elección propia, el tema acompaña los cambios del sistema
  const mq = window.matchMedia(CONSULTA_OSCURO)
  const alCambiarSistema = () => { if (!elegido()) aplicar(delSistema()) }
  mq.addEventListener('change', alCambiarSistema)

  // Otra pestaña cambió la elección
  const alCambiarAlmacen = (e) => {
    if (e.key === CLAVES.tema || e.key === null) aplicar(elegido() ?? delSistema())
  }
  window.addEventListener('storage', alCambiarAlmacen)

  return () => {
    observador.disconnect()
    mq.removeEventListener('change', alCambiarSistema)
    window.removeEventListener('storage', alCambiarAlmacen)
  }
}

function elegir(tema) {
  if (!TEMAS.includes(tema) || tema === leerActual()) return
  const raiz = document.documentElement
  // Clase temporal: habilita la transición de colores solo durante el cambio
  raiz.classList.add('tema-cambiando')
  clearTimeout(temporizadorTransicion)
  temporizadorTransicion = setTimeout(() => raiz.classList.remove('tema-cambiando'), 300)
  aplicar(tema)
  guardarProgreso(CLAVES.tema, tema)
}

/** @returns {['claro' | 'oscuro' | 'noche', (tema: string) => void]} tema actual y función para elegirlo */
export function useTema() {
  const tema = useSyncExternalStore(suscribir, leerActual, () => 'claro')
  return [tema, elegir]
}
