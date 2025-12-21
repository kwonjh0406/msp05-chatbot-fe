import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage, Message } from "./chat-message"
import { useEffect, useRef } from "react"

interface ChatListProps {
    messages: Message[]
}

export function ChatList({ messages }: ChatListProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <ScrollArea className="h-full w-full p-4">
            <div className="flex flex-col gap-10 pb-20 max-w-3xl mx-auto">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    )
}
