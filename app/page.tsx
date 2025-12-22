"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatLayout } from "@/components/chat/chat-layout"
import { ChatList } from "@/components/chat/chat-list"
import { ChatMessage, Message } from "@/components/chat/chat-message"
import { useState } from "react"

export default function Home() {
  // 메시지 상태 관리: 사용자와 봇의 대화 내용을 저장합니다.
  const [messages, setMessages] = useState<Message[]>([]) // 초기 상태를 빈 배열로 변경
  // 로딩 상태 관리: 응답 대기 중일 때 UI 처리를 위해 사용합니다.
  const [isLoading, setIsLoading] = useState(false)

  // 메시지 전송 처리: 사용자가 입력을 완료했을 때 호출됩니다.
  const handleSend = async (content: string) => {
    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // AI 응답 시뮬레이션: 실제 API 연동 전 테스트를 위한 코드입니다.
    setTimeout(() => {
      const botMessage: Message = { role: "assistant", content: "저도 만나서 반갑습니다! 😊" }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  // 새 채팅 시작: 대화 내용을 완전히 초기화하여 빈 화면(Empty State)을 보여줍니다.
  const handleNewChat = () => {
    setMessages([])
  }

  return (
    <ChatLayout onNewChat={handleNewChat}>
      <div className="flex flex-1 flex-col h-full relative">
        <div className="flex-1 overflow-hidden pt-20"> {/* Added pt-20 for Gemini-like generous top spacing */}
          <ChatList messages={messages} isLoading={isLoading} />
        </div>
        <div className="w-full">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </ChatLayout>
  )
}
