# 🎬 MFU - Movies For You

Aplicação de recomendação de filmes com IA usando Google Gemini.

## 🚀 Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar a API do Google Gemini

1. Acesse: **https://aistudio.google.com/app/apikey**
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### 3. Adicionar a chave no projeto

Abra o arquivo `.env.local` e substitua:

```env
GEMINI_API_KEY=sua-chave-copiada-aqui
```

### 4. Rodar o projeto

```bash
npm run dev
```

Acesse: **http://localhost:3000** (ou 3001 se a porta estiver ocupada)

## 💬 Como usar

1. Digite suas preferências de filmes no chat
2. Responda as perguntas da IA sobre seus gostos
3. Após 2-3 mensagens, a IA irá recomendar filmes personalizados
4. Clique nos filmes para ver trailers e detalhes

## 🛠️ Tecnologias

- **Next.js 16** - Framework React
- **Google Gemini AI** - Inteligência Artificial para recomendações
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis

## 📝 Estrutura do Projeto

```
app/
  ├── api/chat/route.ts    # API do Gemini
  ├── layout.tsx           # Layout principal
  └── page.tsx             # Página inicial

components/
  ├── chat-interface.tsx         # Interface do chat
  ├── movie-recommendations.tsx  # Cards dos filmes
  └── ui/                        # Componentes UI
```

## 🔑 Variáveis de Ambiente

- `GEMINI_API_KEY` - Chave da API do Google Gemini (obrigatória)

## 📄 Licença

© 2025 MFU - Movies For You. Todos os direitos reservados.
