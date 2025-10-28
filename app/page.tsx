"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { MovieRecommendations } from "@/components/movie-recommendations"
import { Logo } from "@/components/logo"
import { Film } from "lucide-react"

export default function Home() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleGetRecommendations = (movies: any[]) => {
    setRecommendations(movies)
    setShowRecommendations(true)
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-background pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <Logo />
        </header>

        {/* Main content */}
        <div className="container mx-auto px-4 py-12">
          {!showRecommendations ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Film className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Powered by AI</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
                  Descubra seu próximo
                  <span className="block text-primary mt-2">filme favorito</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  Converse com nossa IA e receba recomendações personalizadas baseadas no seu gosto cinematográfico
                </p>
              </div>

              <ChatInterface onGetRecommendations={handleGetRecommendations} />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Suas <span className="text-primary">Recomendações</span>
                </h2>
                <p className="text-muted-foreground text-lg">Selecionamos estes filmes especialmente para você</p>
              </div>

              <MovieRecommendations movies={recommendations} />

              <div className="text-center">
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="px-8 py-3 rounded-full glass hover:glow-gold transition-smooth text-foreground hover:text-primary font-medium"
                >
                  Buscar mais recomendações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 mt-24">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2025 MFU - Movies For You. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
