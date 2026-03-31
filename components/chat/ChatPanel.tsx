'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import type { ChatMessage } from '@/types/chat'

interface ChatPanelProps {
  categoryId: string
  patternId: string
  patternContext: {
    name: string
    description: string
    keyInsight: string
  }
}

export default function ChatPanel({ categoryId, patternId, patternContext }: ChatPanelProps) {
  const supabase = useMemo(() => createClient(), [])
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [chatHeight, setChatHeight] = useState(320)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startHeight = useRef(0)

  const userMessageCount = messages.filter((m) => m.role === 'user').length

  // Load chat history
  useEffect(() => {
    if (!user || !isOpen || historyLoaded) return
    supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .eq('category_id', categoryId)
      .eq('pattern_id', patternId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as ChatMessage[])
        setHistoryLoaded(true)
      })
  }, [user, categoryId, patternId, isOpen, historyLoaded, supabase])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingContent])

  const saveMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    if (!user) return null
    const { data } = await supabase
      .from('chat_messages')
      .insert({
        user_id: user.id,
        category_id: categoryId,
        pattern_id: patternId,
        role,
        content,
      })
      .select()
      .single()
    return data as ChatMessage | null
  }, [user, categoryId, patternId, supabase])

  const handleSend = async () => {
    if (!input.trim() || isLoading || !user) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    setStreamingContent('')

    // Save user message
    const savedUserMsg = await saveMessage('user', userMessage)
    if (savedUserMsg) {
      setMessages((prev) => [...prev, savedUserMsg])
    }

    // Build conversation for API
    const conversationMessages = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: userMessage },
    ]

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationMessages,
          patternContext,
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                fullContent += parsed.text
                setStreamingContent(fullContent)
              }
            } catch {
              // Skip
            }
          }
        }
      }

      // Save assistant message
      if (fullContent) {
        const savedAssistantMsg = await saveMessage('assistant', fullContent)
        if (savedAssistantMsg) {
          setMessages((prev) => [...prev, savedAssistantMsg])
        }
      }
    } catch {
      const errorMsg = await saveMessage('assistant', '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.')
      if (errorMsg) {
        setMessages((prev) => [...prev, errorMsg])
      }
    } finally {
      setStreamingContent('')
      setIsLoading(false)
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleDeleteSelected = async () => {
    if (!user || selectedIds.size === 0) return

    // Find paired assistant messages for selected user messages
    const idsToDelete = new Set(selectedIds)
    const msgArray = [...messages]
    for (let i = 0; i < msgArray.length; i++) {
      if (selectedIds.has(msgArray[i].id) && msgArray[i].role === 'user') {
        // Also select the next assistant message if it exists
        if (i + 1 < msgArray.length && msgArray[i + 1].role === 'assistant') {
          idsToDelete.add(msgArray[i + 1].id)
        }
      }
    }

    await supabase
      .from('chat_messages')
      .delete()
      .in('id', [...idsToDelete])

    setMessages((prev) => prev.filter((m) => !idsToDelete.has(m.id)))
    setSelectedIds(new Set())
    setIsSelectMode(false)
  }

  const handleClearHistory = async () => {
    if (!user) return
    await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', user.id)
      .eq('category_id', categoryId)
      .eq('pattern_id', patternId)
    setMessages([])
    setSelectedIds(new Set())
    setIsSelectMode(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startY.current = e.clientY
    startHeight.current = chatHeight
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'

    const handleDragMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const delta = e.clientY - startY.current
      setChatHeight(Math.min(600, Math.max(200, startHeight.current + delta)))
    }

    const handleDragEnd = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
    }

    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
  }, [chatHeight])

  const markdownClasses = "prose prose-sm prose-gray max-w-none [&_pre]:bg-gray-800 [&_pre]:text-gray-100 [&_pre]:rounded-md [&_pre]:p-3 [&_pre]:text-xs [&_pre]:overflow-x-auto [&_code]:bg-gray-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_p]:my-1.5 [&_ul]:my-1.5 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:my-1.5 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-semibold [&_h3]:font-medium [&_h1]:mt-3 [&_h2]:mt-2 [&_h3]:mt-2 [&_h1]:mb-1 [&_h2]:mb-1 [&_h3]:mb-1"

  return (
    <section className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 hover:border-violet-300 rounded-lg px-4 py-3 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">💬</span>
          <span className="text-sm font-semibold text-violet-800">AI에게 질문하기</span>
          {userMessageCount > 0 && (
            <span className="text-xs bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">
              {userMessageCount}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-violet-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 border border-gray-200 rounded-lg bg-white overflow-hidden">
          {/* Messages */}
          <div className="overflow-y-auto p-4 space-y-3" style={{ height: chatHeight }}>
            {messages.length === 0 && !streamingContent && (
              <div className="text-center text-gray-400 text-sm py-8">
                <p>{patternContext.name}에 대해 궁금한 것을 질문해보세요!</p>
                <p className="text-xs mt-1">예: &ldquo;이 알고리즘의 시간복잡도가 왜 그런가요?&rdquo;</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Checkbox for user messages in select mode */}
                {isSelectMode && msg.role === 'user' && (
                  <label className="flex items-start pt-2 shrink-0 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(msg.id)}
                      onChange={() => toggleSelect(msg.id)}
                      className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                    />
                  </label>
                )}
                {msg.role === 'assistant' && (
                  <span className="text-sm mt-1 shrink-0">🤖</span>
                )}
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-violet-100 text-violet-900 whitespace-pre-wrap'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className={markdownClasses}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {streamingContent && (
              <div className="flex gap-2 justify-start">
                <span className="text-sm mt-1 shrink-0">🤖</span>
                <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-800">
                  <div className={markdownClasses}>
                    <ReactMarkdown>{streamingContent}</ReactMarkdown>
                  </div>
                  <span className="inline-block w-1.5 h-4 bg-violet-400 animate-pulse ml-0.5 align-middle" />
                </div>
              </div>
            )}

            {isLoading && !streamingContent && (
              <div className="flex gap-2 justify-start">
                <span className="text-sm mt-1">🤖</span>
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500">
                  생각 중...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Resize handle */}
          <div
            onMouseDown={handleDragStart}
            className="h-1.5 cursor-row-resize bg-gray-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
          >
            <div className="w-8 h-0.5 bg-gray-300 rounded-full" />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="질문을 입력하세요... (Enter로 전송)"
                rows={1}
                disabled={isLoading}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-violet-300 resize-none disabled:bg-gray-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 shrink-0"
              >
                전송
              </button>
            </div>
            {messages.length > 0 && (
              <div className="flex items-center justify-end gap-3 mt-2">
                {isSelectMode ? (
                  <>
                    <span className="text-xs text-gray-400">
                      {selectedIds.size}개 선택됨
                    </span>
                    <button
                      onClick={handleDeleteSelected}
                      disabled={selectedIds.size === 0}
                      className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors disabled:opacity-40"
                    >
                      선택 삭제
                    </button>
                    <button
                      onClick={() => { setIsSelectMode(false); setSelectedIds(new Set()) }}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsSelectMode(true)}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      선택 삭제
                    </button>
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      전체 삭제
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
