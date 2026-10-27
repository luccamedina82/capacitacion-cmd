import { useEffect, useState } from 'react'

const UMBRAL_DESPLAZADA = 8   // ya hay contenido pasando por debajo de la barra
const UMBRAL_MINIMIZAR = 160  // cerca del inicio la barra siempre está completa
const UMBRAL_DELTA = 8        // ignora micro desplazamientos (trackpad, rebote)

/**
 * Estado de la barra superior según el scroll, al estilo de iOS 26:
 * - desplazada: el contenido ya pasa por debajo (activa el borde difuminado y el título chico)
 * - minimizada: se está bajando, la barra se achica a una cápsula mínima; al subir vuelve completa
 * No minimiza si el foco está dentro de la barra (teclado o un menú abierto).
 *
 * @param {React.RefObject<HTMLElement>} ref - la barra
 * @param {boolean} activo - solo escucha el scroll mientras la pantalla está visible
 * @returns {{ desplazada: boolean, minimizada: boolean }}
 */
export function useBarraAlDesplazar(ref, activo) {
  const [estado, setEstado] = useState({ desplazada: false, minimizada: false })

  useEffect(() => {
    if (!activo) return undefined
    let ultimaY = window.scrollY
    let cuadro = 0 // rAF pendiente (0 = ninguno)

    const evaluar = () => {
      cuadro = 0
      const y = window.scrollY
      const desplazada = y > UMBRAL_DESPLAZADA
      const delta = y - ultimaY
      if (Math.abs(delta) < UMBRAL_DELTA) {
        setEstado(e => (e.desplazada === desplazada ? e : { ...e, desplazada }))
        return
      }
      const conFoco = ref.current?.contains(document.activeElement)
      const minimizada = delta > 0 && y > UMBRAL_MINIMIZAR && !conFoco
      setEstado(e => (e.desplazada === desplazada && e.minimizada === minimizada ? e : { desplazada, minimizada }))
      ultimaY = y
    }
    const alDesplazar = () => {
      if (cuadro) return
      cuadro = requestAnimationFrame(evaluar)
    }

    evaluar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    return () => {
      window.removeEventListener('scroll', alDesplazar)
      cancelAnimationFrame(cuadro) // que no evalúe después del reinicio
      cuadro = 0
      setEstado({ desplazada: false, minimizada: false })
    }
  }, [activo, ref])

  return estado
}
