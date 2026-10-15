import { useState } from 'react'

/**
 * Contenedor de video estilo Notion.
 * Renderiza el reproductor o marco de previsualización interactivo con título, duración y archivo.
 *
 * @param {string} titulo - título descriptivo del video
 * @param {string} duracion - duración (ej: "8:40")
 * @param {string} src - archivo de video (ej: "/videos/sec1.mp4")
 */
export default function VideoPlaceholder({ titulo, duracion, src }) {
  const [reproduciendo, setReproduciendo] = useState(false)

  return (
    <div className="video-card-container">
      <div className="video">
        {reproduciendo && src ? (
          <div className="video-player-wrapper">
            <video
              controls
              autoPlay
              src={src}
              className="video-element"
            >
              Tu navegador no soporta el formato de video.
            </video>
          </div>
        ) : (
          <div
            className="marco clickable-video"
            onClick={() => setReproduciendo(true)}
            role="button"
            tabIndex={0}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setReproduciendo(true)}
            aria-label={`Reproducir video: ${titulo}`}
          >
            <div className="play">▶</div>
            {src && (
              <div className="video-watermark">
                <span>{src.split('/').pop()}</span>
              </div>
            )}
          </div>
        )}

        <div className="pie">
          <div className="pie-info">
            <span className="pie-icon">🎬</span>
            <span className="pie-titulo">{titulo}</span>
          </div>
          <span className="pie-duracion">{duracion || 'Video HD'}</span>
        </div>
      </div>
    </div>
  )
}
