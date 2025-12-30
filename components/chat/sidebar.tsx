
"use client";
import * as React from "react";
import Link from "next/link";
import { Plus, LogOut, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isMobile?: boolean;
    className?: string;
    onNewChat?: () => void;
}

interface ChatRoom {
    id: number;
    title: string;
}

export function Sidebar({ isOpen, onClose, isMobile, className, onNewChat }: SidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentRoomId = searchParams.get("roomId");

    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

    const fetchChatRooms = async () => {
        try {
            const response = await api.get("/chat/rooms");
            setChatRooms(response.data);
        } catch (error: any) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                setChatRooms([]);
            } else {
                console.error("Failed to fetch chat rooms", error);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchChatRooms();
        }
    }, [isOpen]);

    const handleChatClick = (roomId: number) => {
        router.push(`/?roomId=${roomId}`);
        if (isMobile) onClose();
    }

    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const handleDeleteRoom = async (roomId: number) => {
        // e.stopPropagation() is handled in the trigger

        try {
            await api.delete(`/chat/rooms/${roomId}`);
            // 목록에서 제거
            setChatRooms((prev) => prev.filter((room) => room.id !== roomId));

            // 현재 보고 있는 방을 삭제한 경우 홈으로 이동
            if (currentRoomId && parseInt(currentRoomId) === roomId) {
                router.push("/");
            }
            setDeleteConfirmId(null);
        } catch (error) {
            console.error("Failed to delete room", error);
        }
    }

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

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
                            {chatRooms.map((room) => {
                                const isActive = currentRoomId && parseInt(currentRoomId) === room.id;

                                return (
                                    <div
                                        key={room.id}
                                        className={cn(
                                            "group flex items-center justify-between rounded-lg transition-colors",
                                            isActive
                                                ? "bg-stone-200/70"
                                                : "hover:bg-stone-200/50"
                                        )}
                                    >
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "flex-1 justify-start h-9 px-3 text-[13px] hover:bg-transparent rounded-lg transition-colors",
                                                isActive
                                                    ? "text-stone-900 font-medium"
                                                    : "text-stone-600 hover:text-stone-900"
                                            )}
                                            onClick={() => handleChatClick(room.id)}
                                        >
                                            <span className="truncate">{room.title}</span>
                                        </Button>
                                        <Popover
                                            open={deleteConfirmId === room.id}
                                            onOpenChange={(isOpen) => {
                                                if (isOpen) setDeleteConfirmId(room.id);
                                                else setDeleteConfirmId(null);
                                            }}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 mr-1 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-red-500 hover:bg-red-50"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteConfirmId(room.id);
                                                    }}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                side="right"
                                                align="start"
                                                className="w-48 p-1.5 bg-white border-stone-100 shadow-xl rounded-lg"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <div className="px-2 py-1.5 text-[13px] font-medium text-stone-700 text-center">
                                                        삭제하시겠습니까?
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            className="flex-1 h-8 text-[12px] text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md"
                                                            onClick={() => setDeleteConfirmId(null)}
                                                        >
                                                            취소
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            className="flex-1 h-8 text-[12px] text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md font-medium"
                                                            onClick={() => handleDeleteRoom(room.id)}
                                                        >
                                                            삭제
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                );
                            })}
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
                                <AvatarFallback className="text-xs font-bold bg-white/80 text-stone-700">ME</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-xs text-left">
                                <span className="font-bold text-[14px] text-stone-700 group-hover:text-stone-900 transition-colors">내 계정</span>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-1.5 mb-2 bg-white border-stone-100 shadow-xl rounded-lg" align="start" side="top">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 h-10 px-3 text-[13px] font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            로그아웃
                        </Button>
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

