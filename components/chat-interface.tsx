"use client"

import type React from "react"

import { useState } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  onGetRecommendations: (movies: any[]) => void
}

export function ChatInterface({ onGetRecommendations }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! 👋 Sou sua assistente de cinema. Me conte sobre seus gostos: que tipo de filme você gosta? Ação, drama, comédia? Tem algum filme favorito?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    const newMessages = [...messages, { role: "user", content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Chamar API do Gemini
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        throw new Error("Erro ao comunicar com a API")
      }

      const data = await response.json()

      // Adicionar resposta do assistente
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }])

      // Se houver recomendações, mostrar os filmes
      if (data.recommendations && data.recommendations.length > 0) {
        setTimeout(() => {
          onGetRecommendations(data.recommendations)
        }, 500)
      }
    } catch (error) {
      console.error("Erro:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro. Por favor, tente novamente.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Chat window */}
      <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Messages */}
        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground"
                }`}
              >
                {message.role === "assistant" && <Sparkles className="w-4 h-4 inline-block mr-2 text-primary" />}
                <span className="text-sm md:text-base leading-relaxed">{message.content}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-muted/50 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1 bg-input border border-border rounded-full px-6 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth disabled:opacity-50"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 text-primary-foreground hover:glow-gold transition-smooth disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
