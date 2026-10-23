/**
 * Persistencia del progreso del curso en localStorage.
 * Todas las lecturas y escrituras son seguras: si el almacenamiento no está
 * disponible o el JSON está dañado, se usa el valor por defecto.
 */

// La clave de aprobados se mantiene igual para no perder el avance existente.
export const CLAVES = {
  aprobados:   'capacitacion-cmd:aprobados',
  encuesta:    'capacitacion-cmd:encuesta',
  nombre:      'capacitacion-cmd:nombre',
  ultima:      'capacitacion-cmd:ultima',
  certificado: 'capacitacion-cmd:certificado',
  vista:       'capacitacion-cmd:vista',
}

export function leerProgreso(clave, porDefecto) {
  try {
    const crudo = localStorage.getItem(clave)
    if (crudo === null) return porDefecto
    const valor = JSON.parse(crudo)
    // Si el tipo guardado no coincide con el esperado (objeto vs. cadena), se descarta
    if (valor === null || typeof valor !== typeof porDefecto) return porDefecto
    return valor
  } catch {
    return porDefecto
  }
}

export function guardarProgreso(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // Almacenamiento lleno o bloqueado: el curso sigue funcionando sin persistir
  }
}

/**
 * Estado de un módulo según el avance:
 * - 'aprobado': su cuestionario fue aprobado.
 * - 'en-curso': su cuestionario está habilitado y todavía no se aprobó.
 * - 'bloqueado': falta aprobar el cuestionario del módulo anterior.
 * El contenido del módulo siempre está disponible (bloqueo suave).
 */
export function estadoModulo(secciones, aprobados, indice) {
  const sec = secciones[indice]
  if (aprobados[sec.id]) return 'aprobado'
  if (indice === 0 || aprobados[secciones[indice - 1].id]) return 'en-curso'
  return 'bloqueado'
}

/** Primer módulo cuyo cuestionario todavía no fue aprobado (o null si están todos). */
export function primerPendiente(secciones, aprobados) {
  return secciones.find(s => !aprobados[s.id]) ?? null
}
