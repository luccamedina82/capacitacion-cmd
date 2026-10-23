import { Clock } from 'lucide-react'
import Callout from './Callout.jsx'

/**
 * Bloque Hands-on (callout "Práctica") con lista numerada y checkpoints opcionales.
 * @param {string}   titulo
 * @param {string}   tiempo
 * @param {string[]} pasos
 * @param {React.ReactNode} children - checkpoints (MetaCheck)
 */
export default function HandsOn({ titulo, tiempo, pasos, children }) {
  return (
    <Callout variante="practica" className="hands">
      <h3>{titulo}</h3>
      <p className="tiempo">
        <Clock size={14} className="ico" aria-hidden="true" /> {tiempo}
      </p>
      <ol>
        {pasos.map((paso, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: paso }} />
        ))}
      </ol>
      {children && (
        <div className="check">
          <p className="rot">Checkpoint</p>
          {children}
        </div>
      )}
    </Callout>
  )
}
