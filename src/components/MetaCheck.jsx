import { useCallback } from 'react'

/**
 * Checkbox estilo Notion con animación de tilde y tachado.
 * - Comienza siempre sin marcar (aria-pressed="false")
 * - Al marcar: aparece el checkmark con spring animation + tachado de texto
 *
 * @param {string}   texto    - texto del item
 * @param {boolean}  marcado  - estado controlado desde el padre
 * @param {function} onChange - callback (newValue: boolean)
 */
export default function MetaCheck({ texto, marcado, onChange }) {
  const toggle = useCallback(() => onChange(!marcado), [marcado, onChange])

  return (
    <button
      className="meta"
      aria-pressed={String(marcado)}
      onClick={toggle}
      type="button"
    >
      {/* Caja del checkbox — el checkmark es CSS puro */}
      <span className="caja" aria-hidden="true" />
      <span className="txt">{texto}</span>
    </button>
  )
}
