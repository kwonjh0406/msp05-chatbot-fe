import * as React from "react";
import { motion } from "framer-motion";
import { Copy, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatMessageProps {
    message: Message;
}

/**
 * 채팅 메시지 컴포넌트: 개별 메시지의 디자인과 레이아웃(사용자/봇 구분)을 담당합니다.
 */
export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "flex w-full gap-3 py-2.5 md:px-0 max-w-3xl mx-auto items-start",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* AVATAR (AI Only) */}
            {!isUser && (
                <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
                    <Sparkles className="h-4 w-4 text-blue-500 fill-blue-500" />
                </div>
            )}

            {/* Message Content Layout */}
            <div className={cn("flex max-w-[85%] flex-col gap-1 min-w-0", isUser ? "items-end" : "items-start")}>

                {/* TEXT BUBBLE */}
                <div
                    className={cn(
                        "px-3.5 py-2 text-[15px] leading-relaxed",
                        isUser
                            ? "bg-zinc-100 text-zinc-900 rounded-2xl rounded-tr-md dark:bg-zinc-800 dark:text-zinc-100"
                            : "bg-transparent text-zinc-800 dark:text-zinc-200 px-0"
                    )}
                >
                    <div className="whitespace-pre-wrap break-words min-w-0 -mt-0.5">
                        {message.content}
                    </div>
                </div>

                {/* ACTION ROW (Below Message) */}
                <div className={cn("flex items-center gap-0.5 opacity-50 hover:opacity-100 transition-opacity duration-200", isUser ? "flex-row-reverse" : "flex-row")}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                        onClick={handleCopy}
                    >
                        <Copy className="h-3 w-3" />
                    </Button>
                </div>

            </div>
        </motion.div>
    );
}
