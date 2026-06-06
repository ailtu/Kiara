import { verifyToken } from "../../../lib/auth"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {

    const authHeader = request.headers.get("authorization")
    const token = authHeader?.split(" ")[1]

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { text } = body

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    console.log(
      "GEMINI KEY EXISTS:",
      !!process.env.GEMINI_API_KEY
    )

    const prompt = `
Você é um assistente de produtividade.

O usuário vai enviar tarefas misturadas em texto livre.

Transforme esse texto em um JSON válido.

Regras:

- Extraia cada tarefa individualmente
- Retorne APENAS JSON
- Não use markdown
- Não use blocos de código
- Não escreva explicações

Formato:

[
  {
    "originalText": "...",
    "normalizedText": "...",
    "category": "estudo",
    "priority": 1,
    "estimatedMinutes": 30,
    "order": 1
  }
]

Categorias permitidas:
- estudo
- trabalho
- pessoal
- saude
- financeiro
- outro

Texto do usuário:

${text}
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    if (response.status === 503) {

      return NextResponse.json(
        {
          error:
            "Gemini está sobrecarregado. Tente novamente em alguns segundos."
        },
        {
          status: 503
        }
      )
    }

    console.log("GEMINI STATUS:", response.status)

    console.log(
      "GEMINI RESPONSE:",
      JSON.stringify(data, null, 2)
    )

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data,
        },
        {
          status: response.status,
        }
      )
    }

    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!rawText) {
      return NextResponse.json(
        {
          error: "Gemini returned empty response",
          data,
        },
        {
          status: 500,
        }
      )
    }

    console.log("RAW TEXT:")
    console.log(rawText)

    const clean = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    let tasks

    try {
      tasks = JSON.parse(clean)
    } catch (error) {

      console.error("JSON PARSE ERROR")
      console.error(clean)

      return NextResponse.json(
        {
          error: "Invalid JSON returned by Gemini",
          rawText: clean,
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      tasks,
    })

  } catch (error) {

    console.error("AI ROUTE ERROR:")
    console.error(error)

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}