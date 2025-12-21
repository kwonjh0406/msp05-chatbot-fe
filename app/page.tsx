"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatLayout } from "@/components/chat/chat-layout"
import { ChatList } from "@/components/chat/chat-list"
import { ChatMessage, Message } from "@/components/chat/chat-message"
import { useState } from "react"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "안녕하세요! 무엇을 도와드릴까요?" },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = { role: "assistant", content: "저도 만나서 반갑습니다! 😊" }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleNewChat = () => {
    setMessages([{ role: "assistant", content: "새로운 대화를 시작합니다. 무엇을 도와드릴까요?" }])
  }

  return (
    <ChatLayout onNewChat={handleNewChat}>
      <div className="flex flex-1 flex-col h-full relative">
        <div className="flex-1 overflow-hidden pt-20"> {/* Added pt-20 for Gemini-like generous top spacing */}
          <ChatList messages={messages} />
        </div>
        <div className="w-full">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </ChatLayout>
  )
}
