import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

/**
 * 채팅 입력 컴포넌트: 사용자가 메시지를 입력하고 전송하는 영역입니다.
 */
export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 입력창 높이 자동 조절 기능
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    // 메시지 전송 처리: 입력된 메시지가 있을 경우 전송하고 입력창을 초기화합니다.
    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    // 엔터키 처리: Shift 없이 엔터만 눌렀을 때 메시지를 전송합니다.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const isEmpty = !input.trim();

    return (
        <div className="relative flex w-full flex-col items-center gap-3 p-4 pb-6">
            <div className="relative flex w-full max-w-3xl items-center gap-3 rounded-3xl bg-white border border-zinc-200/60 px-4 py-2.5 transition-colors focus-within:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700/60 dark:focus-within:border-zinc-600">
                <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지를 입력하세요"
                    className="flex-1 min-h-[36px] max-h-[160px] border-none bg-transparent shadow-none focus-visible:ring-0 text-[15px] leading-[22px] py-2 px-2 resize-none overflow-y-auto placeholder:text-zinc-400 font-normal"
                    disabled={disabled}
                    rows={1}
                />
                <motion.div
                    whileHover={!isEmpty ? { scale: 1.08 } : {}}
                    whileTap={!isEmpty ? { scale: 0.92 } : {}}
                >
                    <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={isEmpty || disabled}
                        className={cn(
                            "h-9 w-9 rounded-full transition-colors shrink-0",
                            isEmpty
                                ? "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 disabled:opacity-100 dark:bg-zinc-800 dark:text-zinc-600"
                                : "bg-black text-white hover:bg-zinc-700 dark:bg-white dark:text-black"
                        )}
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
            <div className="text-[10px] text-center text-zinc-400">
                Gemini는 실수를 할 수 있습니다. 중요한 정보를 확인하세요.
            </div>
        </div>
    );
}
