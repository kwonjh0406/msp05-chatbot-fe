"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Plus, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import * as React from "react"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    isMobile?: boolean
    className?: string
    onNewChat?: () => void
}

export function Sidebar({ isOpen, onClose, isMobile, className, onNewChat }: SidebarProps) {
    const SidebarContent = (
        <div className={cn("flex h-full flex-col bg-zinc-50 dark:bg-zinc-900", className)}>
            {/* App Title */}
            <div className="px-5 py-6"> {/* Increased vertical padding */}
                <h1 className="text-xl font-bold tracking-tight px-2 text-zinc-900 dark:text-zinc-100">Chatbot</h1> {/* text-xl font-bold */}
            </div>

            {/* Header / New Chat */}
            <div className="px-4 pb-2">
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-transparent border-0 hover:bg-zinc-200 shadow-none text-muted-foreground hover:text-foreground transition-colors h-11 rounded-xl" /* h-11 for better touch target */
                    onClick={onNewChat}
                >
                    <Plus className="h-5 w-5" />
                    <span className="font-medium text-base">New chat</span>
                </Button>
            </div>

            {/* Chat History */}
            <ScrollArea className="flex-1 px-4 py-2">
                <div className="space-y-6">
                    <div className="px-1">
                        <h2 className="mb-3 px-2 text-[11px] font-medium text-muted-foreground/60 w-full uppercase tracking-wider">
                            Today
                        </h2>
                        <div className="space-y-1">
                            {["New conversation", "React Help", "Debugging"].map((chat, i) => (
                                <Button
                                    key={i}
                                    variant="ghost"
                                    className="w-full justify-start gap-2 h-10 px-2 font-normal text-sm text-foreground/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl"
                                    onClick={onNewChat}
                                >
                                    <span className="truncate">{chat}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* User Profile */}
            <div className="p-4 mt-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-14 px-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-2xl transition-all">
                            <Avatar className="h-9 w-9 border border-black/5 dark:border-white/10">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-xs bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">U</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-xs text-left">
                                <span className="font-semibold text-zinc-900 dark:text-zinc-100">Guest User</span>
                                <span className="text-zinc-400 font-normal">Free Plan</span>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-1.5 mb-2 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xl rounded-2xl" align="start" side="top">
                        <Link href="/login" className="w-full block">
                            <Button variant="ghost" className="w-full justify-start gap-2 h-10 px-3 text-sm font-normal rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                <Settings className="h-4 w-4 text-zinc-500" />
                                Settings
                            </Button>
                        </Link>
                        <Link href="/login" className="w-full block">
                            <Button variant="ghost" className="w-full justify-start gap-2 h-10 px-3 text-sm font-normal text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl">
                                <LogOut className="h-4 w-4" />
                                Log out
                            </Button>
                        </Link>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-0 w-[280px] border-r-0">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="h-full">
                        {SidebarContent}
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div
            className={cn(
                "hidden bg-zinc-50 dark:bg-zinc-900 md:block w-[280px] flex-shrink-0 transition-all duration-300 ease-in-out",
                !isOpen && "w-0 overflow-hidden"
            )}
        >
            <div className="w-[280px] h-full">
                {SidebarContent}
            </div>
        </div>
    )
}
