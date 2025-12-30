
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

export function ChatList({ messages, isLoading }: ChatListProps) {
    const lastUserMessageRef = useRef<HTMLDivElement>(null);
    const prevLastUserRef = useRef<{ index: number; content: string } | null>(null);

    // 메시지가 변경될 때마다 마지막 사용자 메시지 추적 및 스크롤
    useEffect(() => {
        if (messages.length === 0) {
            prevLastUserRef.current = null;
            return;
        }

        // 마지막 사용자 메시지 인덱스 찾기
        let lastUserIndex = -1;
        for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].role === "user") {
                lastUserIndex = i;
                break;
            }
        }

        if (lastUserIndex !== -1) {
            const lastUserMessage = messages[lastUserIndex];
            const prev = prevLastUserRef.current;

            // 새로운 사용자 메시지이거나 내용이 변경된 경우에만 스크롤 (스트리밍 중 중복 스크롤 방지)
            const shouldScroll = !prev || prev.index !== lastUserIndex || prev.content !== lastUserMessage.content;

            if (shouldScroll) {
                // 이전에 기록된 메시지가 없으면(첫 로드 등) 'auto', 있으면 'smooth'
                const behavior = prev ? "smooth" : "auto";
                prevLastUserRef.current = { index: lastUserIndex, content: lastUserMessage.content };

                // 렌더링 후 위치를 확실히 잡기 위해 딜레이 부여
                const timeoutId = setTimeout(() => {
                    if (lastUserMessageRef.current) {
                        lastUserMessageRef.current.scrollIntoView({
                            behavior: behavior,
                            block: "start"
                        });
                    }
                }, 100);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [messages]);

    if (messages.length === 0 && !isLoading) {
        return (
            <div className="h-full w-full p-4 flex flex-col items-center justify-center md:-mt-20">
                <div className="max-w-2xl w-full px-4 space-y-10">
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
                                <span className="text-sm font-semibold text-stone-900">{card.title}</span>
                                <span className="text-xs text-stone-500">{card.subtitle}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-10 pb-[calc(100vh-150px)] max-w-3xl mx-auto px-4">
                {messages.map((message, index) => {
                    // 현재 메시지가 전체 메시지 중 "마지막 사용자 메시지"인지 확인
                    const isLastUser = message.role === "user" &&
                        !messages.slice(index + 1).some(m => m.role === "user");

                    return (
                        <motion.div
                            key={index}
                            ref={isLastUser ? lastUserMessageRef : null}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="scroll-mt-10"
                        >
                            <ChatMessage message={message} />
                        </motion.div>
                    );
                })}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex w-full gap-3 py-2.5 md:px-0 max-w-3xl mx-auto items-start flex-row"
                    >
                        <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full border border-stone-200 bg-white">
                            <Bot className="h-4 w-4 text-stone-600 animate-pulse" />
                        </div>
                        <div className="flex max-w-[85%] flex-col gap-1 min-w-0 items-start">
                            <div className="px-0 py-2 text-[15px] leading-relaxed bg-transparent text-stone-400">
                                생각 중...
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ScrollArea>
    );
}

