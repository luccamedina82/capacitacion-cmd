import { useState } from 'react'
import { Play } from 'lucide-react'

function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/)
  return match ? match[1] : null
}

/**
 * Contenedor de video estilo Notion.
 * Reproduce videos incrustados de YouTube o muestra una tarjeta de previsualización interactiva.
 *
 * @param {string} titulo - título descriptivo del video
 * @param {string} duracion - duración (ej: "2:09")
 * @param {string} src - URL de YouTube (ej: "https://youtu.be/...")
 * @param {string} [id] - ancla para navegar al video (ej: desde el modal de repaso)
 */
export default function VideoPlaceholder({ titulo, duracion, src, id }) {
  const [reproduciendo, setReproduciendo] = useState(false)
  const youtubeId = getYouTubeId(src)
  const tieneVideo = Boolean(youtubeId)

  return (
    <div className="video-card-container" id={id} tabIndex={id ? -1 : undefined}>
      <div className="video">
        {reproduciendo && youtubeId ? (
          <div className="video-player-wrapper">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={titulo}
              className="video-element"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 0 }}
            />
          </div>
        ) : (
          <div
            className={`marco ${tieneVideo ? 'clickable-video' : ''}`}
            onClick={() => {
              if (tieneVideo) setReproduciendo(true)
            }}
            role={tieneVideo ? 'button' : undefined}
            tabIndex={tieneVideo ? 0 : undefined}
            onKeyDown={e => {
              if (tieneVideo && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault() // evita que Espacio haga scroll de la página
                setReproduciendo(true)
              }
            }}
            aria-label={tieneVideo ? `Reproducir video: ${titulo}` : `Video: ${titulo}`}
            style={
              youtubeId
                ? {
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          >
            <div className="play" aria-hidden="true"><Play size={20} fill="currentColor" /></div>
            {youtubeId ? (
              <div className="video-watermark">
                <span>YouTube</span>
              </div>
            ) : (
              <div className="video-watermark">
                <span>Próximamente</span>
              </div>
            )}
          </div>
        )}

        <div className="pie">
          <div className="pie-info">
            <span className="pie-icon" aria-hidden="true">
              {youtubeId ? '▶️' : '🎬'}
            </span>
            <span className="pie-titulo">{titulo}</span>
          </div>
          <span className="pie-duracion">{duracion || 'HD'}</span>
        </div>
      </div>
    </div>
  )
}

