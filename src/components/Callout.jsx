/**
 * Vocabulario de callouts compartido con los PDFs:
 * Idea clave · Práctica · Atención · Comprobación.
 * Cada variante combina emoji + palabra: el color nunca es el único significado.
 */
const VARIANTES = {
  idea:         { etiqueta: 'Idea clave',   emoji: '💡' },
  practica:     { etiqueta: 'Práctica',     emoji: '🛠️' },
  atencion:     { etiqueta: 'Atención',     emoji: '⚠️' },
  comprobacion: { etiqueta: 'Comprobación', emoji: '✅' },
}

/**
 * @param {'idea'|'practica'|'atencion'|'comprobacion'} [variante='idea']
 * @param {string} [className] - clases extra (por ejemplo, para márgenes del contexto)
 * @param {React.ReactNode} children
 */
export default function Callout({ variante = 'idea', className = '', children }) {
  const { etiqueta, emoji } = VARIANTES[variante] ?? VARIANTES.idea

  return (
    <div className={`callout callout-${variante}${className ? ` ${className}` : ''}`} role="note">
      <p className="callout-label">
        <span className="callout-emoji" aria-hidden="true">{emoji}</span>
        <span>{etiqueta}</span>
      </p>
      <div className="callout-cuerpo">{children}</div>
    </div>
  )
}
