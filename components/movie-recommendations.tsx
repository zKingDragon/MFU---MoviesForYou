"use client"

import { useState } from "react"
import { Star, Play } from "lucide-react"
import { TrailerModal } from "@/components/trailer-modal"

interface Movie {
  id: number
  title: string
  year: number
  genre: string
  rating: number
  synopsis: string
  poster: string
  trailer: string
}

interface MovieRecommendationsProps {
  movies: Movie[]
}

export function MovieRecommendations({ movies }: MovieRecommendationsProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="glass rounded-2xl overflow-hidden transition-smooth hover:scale-105 hover:glow-gold cursor-pointer">
              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <button
                    onClick={() => setSelectedMovie(movie)}
                    className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-smooth hover:scale-110 glow-gold"
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </button>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-semibold text-foreground">{movie.rating}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg text-balance line-clamp-1">{movie.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.genre}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{movie.synopsis}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trailer Modal */}
      {selectedMovie && <TrailerModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  )
}
