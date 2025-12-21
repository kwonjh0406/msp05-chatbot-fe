import { cn } from "@/lib/utils"
import { Copy, ThumbsDown, ThumbsUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Message {
    role: "user" | "assistant"
    content: string
}

interface ChatMessageProps {
    message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user"

    return (
        <div
            className={cn(
                "flex w-full gap-4 p-4 md:px-0 max-w-3xl mx-auto text-base",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* AVATAR (AI Only) */}
            {!isUser && (
                <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 mt-1">
                    <Sparkles className="h-4 w-4 text-zinc-600 dark:text-zinc-300 fill-zinc-600 dark:fill-zinc-300" />
                </div>
            )}

            {/* Message Content Layout */}
            <div className={cn("flex max-w-[85%] flex-col gap-2 min-w-0", isUser ? "items-end" : "items-start")}>

                {/* TEXT BUBBLE */}
                <div
                    className={cn(
                        "px-5 py-2 text-[15px] leading-relaxed relative",
                        isUser
                            ? "bg-zinc-800 text-white rounded-[26px] rounded-tr-sm dark:bg-white dark:text-black" // FIXED: Zinc-800 (Softer Black)
                            : "bg-transparent text-zinc-900 dark:text-zinc-100 px-0"
                    )}
                    style={isUser ? { borderRadius: "20px 20px 4px 20px" } : {}}
                >
                    <div className="whitespace-pre-wrap break-words min-w-0">
                        {message.content}
                    </div>
                </div>

                {/* ACTION ROW (Below Message) */}
                <div className={cn("flex items-center gap-2", isUser ? "flex-row-reverse" : "flex-row")}>

                    {/* User Actions: Just Copy */}
                    {isUser && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full">
                            <Copy className="h-4 w-4" />
                        </Button>
                    )}

                    {/* AI Actions: Copy, Like, Dislike */}
                    {!isUser && (
                        <>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full">
                                <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full">
                                <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full">
                                <ThumbsDown className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}
