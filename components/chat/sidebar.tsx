"use client";
import * as React from "react";
import Link from "next/link";
import { Plus, LogOut, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isMobile?: boolean;
    className?: string;
    onNewChat?: () => void;
}

/**
 * 사이드바 컴포넌트: 대화 목록 및 사용자 프로필 관리 기능을 제공합니다.
 */
export function Sidebar({ isOpen, onClose, isMobile, className, onNewChat }: SidebarProps) {
    const SidebarContent = (
        <div className={cn("flex h-full flex-col bg-stone-50 border-r border-stone-200/50", className)}>
            {/* 앱 타이틀 영역 */}
            <div className="px-5 pt-6 pb-4 flex items-center">
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight">ChatBot</h1>
            </div>

            {/* 새 채팅 버튼 */}
            <div className="px-4 pb-4">
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-2 hover:bg-stone-200/50 text-stone-900 shadow-none border-none h-10 px-4 rounded-lg transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    <span className="text-[14px] font-medium">새 채팅</span>
                </Button>
            </div>

            {/* 채팅 목록 */}
            <ScrollArea className="flex-1 px-4">
                <div className="space-y-4">
                    <div>
                        <h2 className="mb-2 px-2 text-[11px] font-medium text-stone-500 uppercase tracking-wide">
                            최근
                        </h2>
                        <div className="space-y-0.5">
                            {["오늘 한국 증시 상황 알려줘", "내일 서울 날씨 어때?", "점심 메뉴 추천해줘", "운동 루틴 짜줘"].map((chat, i) => (
                                <Button
                                    key={i}
                                    variant="ghost"
                                    className="w-full justify-start h-9 px-3 text-[13px] text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors"
                                    onClick={onNewChat}
                                >
                                    <span className="truncate">{chat}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <div className="p-3 mt-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-14 px-3 bg-stone-700/5 hover:bg-stone-700/10 border-none transition-all shadow-none group rounded-lg">
                            <Avatar className="h-9 w-9 border-none ring-0">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-xs font-bold bg-white/80 text-stone-700">게</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-xs text-left">
                                <span className="font-bold text-[14px] text-stone-700 group-hover:text-stone-900 transition-colors">게스트</span>
                                <span className="text-stone-500 font-medium">무료 플랜</span>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-1.5 mb-2 bg-white border-stone-100 shadow-xl rounded-lg" align="start" side="top">
                        <Link href="/login" className="w-full block">
                            <Button variant="ghost" className="w-full justify-start gap-2 h-10 px-3 text-[13px] font-medium text-stone-600 rounded-lg hover:bg-stone-100">
                                <Settings className="h-4 w-4 text-stone-500" />
                                설정
                            </Button>
                        </Link>
                        <Link href="/login" className="w-full block">
                            <Button variant="ghost" className="w-full justify-start gap-2 h-10 px-3 text-[13px] font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                <LogOut className="h-4 w-4" />
                                로그아웃
                            </Button>
                        </Link>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-0 w-[280px] border-r-0 bg-stone-50">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="h-full bg-stone-50">
                        {SidebarContent}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            className={cn(
                "hidden bg-stone-50 md:block w-[280px] flex-shrink-0 transition-all duration-300 ease-in-out",
                !isOpen && "w-0 overflow-hidden"
            )}
        >
            <div className="w-[280px] h-full">
                {SidebarContent}
            </div>
        </div>
    );
}

