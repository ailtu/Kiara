import { verifyToken } from "../../../lib/auth"
import { NextResponse } from "next/server"

export async function POST(request) {

  try {

    const authHeader = request.headers.get("authorization")
    const token = authHeader?.split(" ")[1]
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { text } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content: `Você é um assistente de produtividade. O usuário vai te mandar um texto livre com tarefas misturadas.
Sua função é interpretar esse texto e devolver uma lista de tarefas organizadas em JSON.

Regras:
- Extraia cada tarefa individualmente do texto
- Para cada tarefa defina:
  - "originalText": o texto da tarefa como o usuário escreveu
  - "normalizedText": versão limpa e clara da tarefa
  - "category": categoria da tarefa. Use uma dessas: "estudo", "trabalho", "pessoal", "saude", "financeiro", "outro"
  - "priority": prioridade numérica. 1 = alta, 2 = média, 3 = baixa
  - "estimatedMinutes": tempo estimado em minutos para completar a tarefa (número inteiro)
  - "order": posição sugerida de execução (1 = fazer primeiro)

Responda APENAS com um JSON válido, sem texto extra, sem markdown, sem explicações.
Formato esperado:
[
  {
    "originalText": "...",
    "normalizedText": "...",
    "category": "...",
    "priority": 1,
    "estimatedMinutes": 30,
    "order": 1
  }
]`,
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    })

    const aiData = await response.json()

    const rawText = aiData.choices?.[0]?.message?.content

    if (!rawText) {
      return NextResponse.json({ error: "AI did not return a response" }, { status: 500 })
    }

    const tasks = JSON.parse(rawText)

    return NextResponse.json({ tasks })

  } catch (error) {

    console.error("AI route error:", error)

    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
