import { LazyMotion, domAnimation } from 'motion/react'
import Apertura from './Apertura.jsx'
import Ensamblado from './Ensamblado.jsx'
import MapaCurso from './MapaCurso.jsx'
import Cta from './Cta.jsx'
import '../../styles/intro.css'

/**
 * Intro del curso. Contiene el h1 de la pagina (el h1 del hero debe pasar a h2).
 * Se importa de forma estatica: el h1 es el LCP y no conviene diferirlo.
 */
export default function Intro({ onIrA, destinoProgreso = 'sec1' }) {
  return (
    <section className="intro-curso" aria-labelledby="intro-titulo">
      <a className="intro-saltar" href="#encuesta" onClick={e => onIrA?.('encuesta', e)}>Saltar intro</a>
      <LazyMotion features={domAnimation} strict>
        <div className="intro-wrap">
          <Apertura />
          <Ensamblado />
          <MapaCurso onIrA={onIrA} />
          <div className="intro-cierre">
            <h2 className="intro-cierre-titulo">Empezá con una página en blanco</h2>
            <Cta onIrA={onIrA} destinoProgreso={destinoProgreso} />
          </div>
        </div>
      </LazyMotion>
    </section>
  )
}
