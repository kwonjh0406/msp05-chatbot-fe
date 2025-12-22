import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage, Message } from "./chat-message"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface ChatListProps {
    messages: Message[]
    isLoading?: boolean
}

// 채팅 목록 컴포넌트: 대화 메시지들을 리스트 형태로 보여주거나, 대화가 없을 때 초기 화면을 표시합니다.
export function ChatList({ messages, isLoading }: ChatListProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    // 새 메시지가 추가될 때마다 자동으로 스크롤을 최하단으로 이동합니다.
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isLoading])

    // 메시지가 없을 때 보여줄 초기 환영 화면 (Empty State)
    if (messages.length === 0) {
        return (
            <div className="h-full w-full p-4 flex flex-col items-center justify-center -mt-20"> {/* -mt-20으로 시각적 중심 보정 */}
                <div className="max-w-2xl w-full px-4 space-y-10">
                    {/* 환영 메시지 */}
                    <div className="text-center space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                        >
                            반갑습니다!
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                            className="text-lg text-zinc-500 dark:text-zinc-400"
                        >
                            무엇을 도와드릴까요?
                        </motion.p>
                    </div>

                    {/* 추천 질문 카드 그리드 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {[
                            { title: "Next.js의 장점", subtitle: "Next.js를 사용하면 어떤 점이 좋은가요?" },
                            { title: "Dijkstra 알고리즘 코드", subtitle: "다익스트라 알고리즘 예제를 보여줘" },
                            { title: "실리콘밸리 에세이", subtitle: "실리콘밸리에 대한 에세이를 써줘" },
                            { title: "서울 날씨", subtitle: "오늘 서울 날씨는 어때?" }
                        ].map((card, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex flex-col items-start gap-1 p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-colors text-left dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800"
                            >
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {card.title}
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {card.subtitle}
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <ScrollArea className="h-full w-full p-4">
            <div className="flex flex-col gap-10 pb-20 max-w-3xl mx-auto">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex w-full gap-3 py-2.5 md:px-0 max-w-3xl mx-auto items-start flex-row"
                    >
                        <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
                            <Sparkles className="h-4 w-4 text-blue-500 fill-blue-500" />
                        </div>
                        <div className="flex max-w-[85%] flex-col gap-1 min-w-0 items-start">
                            <div className="px-0 py-2 text-[15px] leading-relaxed bg-transparent text-zinc-400 dark:text-zinc-500">
                                생각 중...
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    )
}
