import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface RequestBody {
  messages: { role: 'user' | 'assistant'; content: string }[]
  patternContext: { name: string; description: string; keyInsight: string }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
  }

  const body: RequestBody = await request.json()
  const { messages, patternContext } = body

  const systemInstruction = `너는 알고리즘과 자료구조를 가르치는 학습 도우미야. 사용자가 현재 학습 중인 패턴에 대해 질문하면 친절하고 명확하게 설명해줘.

현재 학습 중인 패턴:
- 이름: ${patternContext.name}
- 설명: ${patternContext.description}
- 핵심 아이디어: ${patternContext.keyInsight}

답변 규칙:
- 한국어로 답변해
- 코드 예시는 Python으로 작성해
- 간결하지만 이해하기 쉽게 설명해
- 시간/공간 복잡도를 포함해서 설명해`

  const geminiMessages = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  const geminiBody = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: geminiMessages,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: `Gemini API error: ${errorText}` }, { status: response.status })
    }

    const reader = response.body?.getReader()
    if (!reader) {
      return NextResponse.json({ error: 'No response body' }, { status: 500 })
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim()
                if (!data || data === '[DONE]') continue
                try {
                  const parsed = JSON.parse(data)
                  const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
                  if (text) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
                  }
                } catch {
                  // Skip unparseable chunks
                }
              }
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
