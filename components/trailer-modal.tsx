"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface Movie {
  id: number
  title: string
  year: number
  trailer: string
}

interface TrailerModalProps {
  movie: Movie
  onClose: () => void
}

export function TrailerModal({ movie, onClose }: TrailerModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-5xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full glass hover:glow-gold transition-smooth flex items-center justify-center text-foreground hover:text-primary"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video container */}
        <div className="glass rounded-2xl overflow-hidden border-2 border-primary/30 glow-gold">
          <div className="aspect-video">
            <iframe
              src={movie.trailer}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Movie info */}
          <div className="p-6 border-t border-border">
            <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
            <p className="text-muted-foreground">{movie.year}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
