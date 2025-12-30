"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatLayout } from "@/components/chat/chat-layout"
import { ChatList } from "@/components/chat/chat-list"
import { Message } from "@/components/chat/chat-message"
import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import api from "@/lib/api"

function ChatContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomIdParam = searchParams.get("roomId")

  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(roomIdParam ? parseInt(roomIdParam) : null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  // 방금 생성한 방인지 추적 (메시지 재로드 방지용)
  const justCreatedRoomRef = useRef<number | null>(null)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/chat/rooms")
        setIsAuthenticated(true)
      } catch (error: any) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          setIsAuthenticated(false)
          router.push("/login")
        }
      }
    }
    checkAuth()
  }, [router])

  // Load messages when room ID changes (단, 방금 생성한 방은 제외)
  useEffect(() => {
    if (currentRoomId && isAuthenticated) {
      // 방금 생성한 방이면 메시지 로드 건너뛰기
      if (justCreatedRoomRef.current === currentRoomId) {
        justCreatedRoomRef.current = null // 플래그 리셋
        return
      }
      loadMessages(currentRoomId)
    } else if (!currentRoomId) {
      setMessages([])
    }
  }, [currentRoomId, isAuthenticated])

  // Sync state if URL param changes externally (e.g. sidebar click)
  useEffect(() => {
    const newRoomId = roomIdParam ? parseInt(roomIdParam) : null

    // 방금 생성한 방의 URL 변경은 무시 (이미 handleSend에서 처리됨)
    if (justCreatedRoomRef.current === newRoomId) {
      return
    }

    if (newRoomId !== currentRoomId) {
      setCurrentRoomId(newRoomId)
      if (!newRoomId) {
        setMessages([])
      }
    }
  }, [roomIdParam])

  const loadMessages = async (roomId: number) => {
    setIsLoading(true)
    try {
      const response = await api.get(`/chat/rooms/${roomId}/messages`)
      const mappedMessages: Message[] = response.data.map((msg: any) => ({
        role: msg.sender === "USER" ? "user" : "assistant",
        content: msg.content
      }))
      setMessages(mappedMessages)
    } catch (error: any) {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        setMessages([]);
        router.push("/login")
      } else {
        console.error("Failed to load messages", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async (content: string) => {
    // Optimistic update - 사용자 메시지 즉시 표시
    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      let roomId = currentRoomId

      // 새 채팅방 생성
      if (!roomId) {
        const createRes = await api.post("/chat/rooms")
        roomId = createRes.data.id

        // 플래그 설정: 이 방은 내가 방금 만들었으니 메시지 재로드하지 마라
        justCreatedRoomRef.current = roomId

        setCurrentRoomId(roomId)
        // URL만 조용히 업데이트
        router.replace(`/?roomId=${roomId}`, { scroll: false })
      }

      // 메시지 전송
      if (roomId) {
        const response = await api.post(`/chat/rooms/${roomId}/send`, { content })
        const botMessage: Message = { role: "assistant", content: response.data.content }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error: any) {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        router.push("/login")
      } else {
        console.error("Failed to send message", error)
        // 에러 시 optimistic update 롤백
        setMessages((prev) => prev.slice(0, -1))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    justCreatedRoomRef.current = null // 플래그 리셋
    setCurrentRoomId(null)
    setMessages([])
    router.push("/")
  }

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (isAuthenticated === false) {
    return null
  }

  return (
    <ChatLayout onNewChat={handleNewChat}>
      <div className="flex flex-1 flex-col h-full relative">
        <div className="flex-1 overflow-hidden pt-20">
          <ChatList key={currentRoomId} messages={messages} isLoading={isLoading} />
        </div>
        <div className="w-full">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </ChatLayout>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  )
}
