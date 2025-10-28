import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const SYSTEM_PROMPT = `Você é um assistente especialista em recomendações de filmes. 
Seu objetivo é conversar com o usuário para entender seus gostos cinematográficos e recomendar filmes perfeitos.

Faça perguntas sobre:
- Gêneros favoritos (ação, drama, comédia, terror, etc)
- Filmes que já assistiu e gostou
- Humor atual (algo leve, emocionante, reflexivo)
- Se prefere filmes clássicos ou recentes

Quando tiver informações suficientes (após 2-3 mensagens), você deve:
1. Agradecer as informações
2. Dizer que vai buscar recomendações perfeitas
3. Retornar EXATAMENTE no formato JSON abaixo (sem markdown, sem \`\`\`json):

{"action":"recommend","movies":[{"title":"Nome do Filme","year":2020,"genre":"Gênero","rating":8.5,"synopsis":"Sinopse detalhada do filme","poster":"URL da imagem do poster","trailer":"URL do trailer no YouTube (formato embed)"}]}

IMPORTANTE:
- NÃO use markdown code blocks (\`\`\`json)
- Retorne JSON puro quando for recomendar
- Recomende 4-6 filmes variados
- Use URLs reais de posters (TMDB, IMDb) e trailers do YouTube
- Seja conversacional e amigável até o momento de recomendar`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key não configurada" }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Construir o histórico de conversa
    const chatHistory = messages
      .slice(0, -1)
      .map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }))

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido! Vou ajudar a recomendar filmes perfeitos baseado nas preferências do usuário." }],
        },
        ...chatHistory,
      ],
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(lastMessage)
    const response = result.response.text()

    // Verificar se é uma recomendação (JSON)
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        if (parsed.action === "recommend" && parsed.movies) {
          return NextResponse.json({
            content: "Aqui estão suas recomendações! 🎬",
            recommendations: parsed.movies,
          })
        }
      }
    } catch {
      // Não é JSON, é uma conversa normal
    }

    return NextResponse.json({ content: response })
  } catch (error: any) {
    console.error("Erro na API:", error)
    return NextResponse.json({ error: error.message || "Erro ao processar mensagem" }, { status: 500 })
  }
}
