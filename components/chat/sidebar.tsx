"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Plus, LogOut, Settings, PanelLeftClose } from "lucide-react"
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
        <div className={cn("flex h-full flex-col bg-zinc-50/50 dark:bg-zinc-900 border-r border-zinc-200/50 dark:border-zinc-800", className)}>
            {/* 앱 타이틀 영역 */}
            <div className="px-6 py-8 flex items-center h-14">
                <h1 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">ChatBot</h1>
            </div>

            {/* 새 채팅 버튼 */}
            <div className="px-3 pb-4">
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-3 bg-zinc-100 hover:bg-zinc-200 shadow-none text-zinc-700 hover:text-zinc-900 transition-colors h-10 px-4 rounded-xl dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300"
                >
                    <Plus className="h-4 w-4" />
                    <span className="text-[14px] font-medium">새 채팅</span>
                </Button>
            </div>

            {/* 채팅 목록 */}
            <ScrollArea className="flex-1 px-3">
                <div className="space-y-6">
                    <div>
                        <h2 className="mb-3 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                            최근
                        </h2>
                        <div className="space-y-1">
                            {["새로운 대화", "리액트 도움말", "디버깅", "여행 계획"].map((chat, i) => (
                                <Button
                                    key={i}
                                    variant="ghost"
                                    className="w-full justify-start h-9 px-4 text-[14px] text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                    onClick={onNewChat}
                                >
                                    <span className="truncate">{chat}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <div className="p-4 mt-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-14 px-3 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all">
                            <Avatar className="h-9 w-9 border border-black/5 dark:border-white/10">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-xs bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">게</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-xs text-left">
                                {/* 사용자 이름: semibold 유지하되 색상 조정 */}
                                <span className="font-semibold text-[13px] text-zinc-700 dark:text-zinc-200">게스트</span>
                                <span className="text-zinc-400 font-normal">무료 플랜</span>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-1.5 mb-2 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xl rounded-2xl" align="start" side="top">
                        <Link href="/login" className="w-full block">
                            <Button variant="ghost" className="w-full justify-start gap-2 h-10 px-3 text-[13px] font-medium text-zinc-600 rounded-xl hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                                <Settings className="h-4 w-4 text-zinc-500" />
                                설정
                            </Button>
                        </Link>
                        <Link href="/login" className="w-full block">
                            <Button variant="ghost" className="w-full justify-start gap-2 h-10 px-3 text-[13px] font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl">
                                <LogOut className="h-4 w-4" />
                                로그아웃
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
