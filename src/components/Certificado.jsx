import { useState } from 'react'
import { GraduationCap, Printer } from 'lucide-react'
import DashboardProgreso from './DashboardProgreso.jsx'

const FORMATO_FECHA = { year: 'numeric', month: 'long', day: 'numeric' }

/**
 * Certificado de finalización, generado en el navegador.
 * Se arma alrededor del dashboard completo del alumno y se imprime (o guarda
 * como PDF) con window.print(): la hoja de estilos de impresión deja solo la tarjeta.
 *
 * Debe ser hijo directo del contenedor de cierre: las reglas @media print
 * ocultan a sus hermanos (controles) y conservan únicamente `.certificado-notion-card`.
 *
 * @param {string}   nombre         - nombre del alumno (persistido en App)
 * @param {function} onNombre       - recibe el nuevo nombre
 * @param {string}   [fecha]        - ISO de aprobación; si falta, se usa la fecha de hoy
 * @param {Object}   aprobados      - módulos aprobados (para encender las piezas)
 */
export default function Certificado({ nombre, onNombre, fecha, aprobados }) {
  const [hoy] = useState(() => new Date())
  const fechaTexto = (fecha ? new Date(fecha) : hoy).toLocaleDateString('es-AR', FORMATO_FECHA)
  const nombreLimpio = nombre.trim()

  return (
    <>
      <div className="cert-controles">
        <div className="cert-campo">
          <label htmlFor="cert-nombre">Nombre completo para el certificado</label>
          <input
            id="cert-nombre"
            type="text"
            className="cert-input-name"
            placeholder="Escribí tu nombre completo"
            autoComplete="name"
            value={nombre}
            onChange={e => onNombre(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="corregir cert-imprimir"
          disabled={!nombreLimpio}
          aria-describedby="cert-ayuda"
          onClick={() => window.print()}
        >
          <Printer size={16} aria-hidden="true" /> Descargar o imprimir certificado
        </button>
        <p id="cert-ayuda" className="cert-ayuda">
          {nombreLimpio
            ? 'En el cuadro de impresión elegí “Guardar como PDF” si querés descargarlo.'
            : 'Escribí tu nombre para habilitar la descarga.'}
        </p>
      </div>

      <div className="certificado-notion-card">
        <div className="cert-header">
          <span className="cert-emoji" aria-hidden="true"><GraduationCap size={44} /></span>
          <div>
            <span className="cert-kicker">Capacitación · Comunicación Multimedial · 2026</span>
            <h3>Certificado de finalización</h3>
          </div>
        </div>

        <p className="cert-otorga">Se certifica que</p>
        <p className="cert-nombre">{nombreLimpio || ' '}</p>
        <p className="cert-body">
          completó los 6 módulos del curso <strong>Organizá tu cursada</strong> y aprobó la evaluación
          integradora: armó su sistema académico personal en Notion con páginas, bases de datos,
          vistas, filtros y un dashboard principal.
        </p>

        <DashboardProgreso aprobados={aprobados} variante="certificado" etiqueta="Dashboard completo" />

        <div className="cert-footer">
          <span className="cert-date">Emitido el {fechaTexto}</span>
          <span className="cert-date">Organizá tu cursada · Comunicación Multimedial</span>
        </div>
      </div>
    </>
  )
}
