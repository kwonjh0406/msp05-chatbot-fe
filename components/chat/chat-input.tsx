import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp } from "lucide-react"
import * as React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
    onSend: (message: string) => void
    disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [input, setInput] = React.useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [input])

    const handleSend = () => {
        if (input.trim()) {
            onSend(input)
            setInput("")
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const isEmpty = !input.trim();

    return (
        <div className="relative flex w-full flex-col items-center gap-5 p-6 pb-10">
            {/* 
               Precision Alignment:
               Button: h-9 (36px).
               Textarea: text-[15px] + leading-[20px] + py-[8px] (8+8=16). Total 36px.
               Result: Equal Height. Center aligned.
            */}
            <div className="relative flex w-full max-w-3xl items-end gap-2 rounded-[32px] bg-zinc-50 border border-zinc-300 px-4 py-3 shadow-sm transition-all focus-within:shadow-md focus-within:ring-1 focus-within:ring-zinc-900/10 dark:bg-zinc-800/50 dark:border-zinc-700 dark:focus-within:ring-zinc-700">
                <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Chatbot..."
                    className="flex-1 min-h-[36px] max-h-[200px] border-none bg-transparent shadow-none focus-visible:ring-0 text-[15px] leading-[20px] py-[8px] px-2 resize-none overflow-y-auto placeholder:text-zinc-400 font-medium tracking-tight"
                    disabled={disabled}
                    rows={1}
                />
                <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={isEmpty || disabled}
                    className={cn(
                        "h-9 w-9 rounded-full transition-all duration-300 shrink-0 mb-0.5", // Fine tune margin if needed, 0.5px might be visual correction
                        isEmpty
                            ? "bg-zinc-200 text-zinc-400 hover:bg-zinc-300 disabled:opacity-100" // Gray when empty
                            : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black" // Black when active
                    )}
                >
                    <ArrowUp className="h-5 w-5" />
                </Button>
            </div>
            <div className="text-[11px] text-zinc-400 font-medium tracking-wide">
                Gemini 2.5 Flash Lite can make mistakes.
            </div>
        </div>
    )
}
