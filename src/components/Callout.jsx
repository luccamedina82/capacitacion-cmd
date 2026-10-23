import { Lightbulb, Wrench, TriangleAlert, CircleCheck } from 'lucide-react'

/**
 * Vocabulario de callouts compartido con los PDFs:
 * Idea clave · Práctica · Atención · Comprobación.
 * Cada variante combina ícono + palabra: el color nunca es el único significado.
 */
const VARIANTES = {
  idea:         { etiqueta: 'Idea clave',   Icono: Lightbulb },
  practica:     { etiqueta: 'Práctica',     Icono: Wrench },
  atencion:     { etiqueta: 'Atención',     Icono: TriangleAlert },
  comprobacion: { etiqueta: 'Comprobación', Icono: CircleCheck },
}

/**
 * @param {'idea'|'practica'|'atencion'|'comprobacion'} [variante='idea']
 * @param {string} [className] - clases extra (por ejemplo, para márgenes del contexto)
 * @param {React.ReactNode} children
 */
export default function Callout({ variante = 'idea', className = '', children }) {
  const { etiqueta, Icono } = VARIANTES[variante] ?? VARIANTES.idea

  return (
    <div className={`callout callout-${variante}${className ? ` ${className}` : ''}`} role="note">
      <p className="callout-label">
        <Icono size={16} aria-hidden="true" />
        <span>{etiqueta}</span>
      </p>
      <div className="callout-cuerpo">{children}</div>
    </div>
  )
}
