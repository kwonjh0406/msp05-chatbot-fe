import * as React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, Message } from "./chat-message";

interface ChatListProps {
    messages: Message[];
    isLoading?: boolean;
}

/**
 * 채팅 목록 컴포넌트: 대화 메시지들을 리스트 형태로 보여주거나, 대화가 없을 때 초기 화면을 표시합니다.
 */
export function ChatList({ messages, isLoading }: ChatListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // 새 메시지가 추가될 때마다 자동으로 스크롤을 최하단으로 이동합니다.
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // 메시지가 없을 때 보여줄 초기 환영 화면 (Empty State)
    if (messages.length === 0) {
        return (
            <div className="h-full w-full p-4 flex flex-col items-center justify-center md:-mt-20">
                <div className="max-w-2xl w-full px-4 space-y-10">
                    {/* 환영 메시지 */}
                    <div className="text-center space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-3xl font-bold tracking-tight text-stone-900"
                        >
                            반갑습니다!
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                            className="text-lg text-stone-500"
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
                            { title: "오늘 한국 증시", subtitle: "오늘 한국 증시 상황 알려줘" },
                            { title: "내일 서울 날씨", subtitle: "내일 서울 날씨 어때?" },
                            { title: "점심 메뉴 추천", subtitle: "점심 메뉴 추천해줘" },
                            { title: "운동 루틴", subtitle: "운동 루틴 짜줘" }
                        ].map((card, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                className="flex flex-col items-start gap-1 p-5 rounded-3xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-colors text-left"
                            >
                                <span className="text-sm font-semibold text-stone-900">
                                    {card.title}
                                </span>
                                <span className="text-xs text-stone-500">
                                    {card.subtitle}
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        );
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
                        <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full border border-stone-200 bg-white">
                            <Bot className="h-4 w-4 text-stone-600" />
                        </div>
                        <div className="flex max-w-[85%] flex-col gap-1 min-w-0 items-start">
                            <div className="px-0 py-2 text-[15px] leading-relaxed bg-transparent text-stone-400">
                                생각 중...
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    );
}

