"use client";
import * as React from "react";
import { useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";

interface ChatLayoutProps {
    children: React.ReactNode;
    onNewChat?: () => void;
}

/**
 * 채팅 레이아웃 컴포넌트: 사이드바와 메인 콘텐츠 영역을 구성하며, 반응형 동작을 처리합니다.
 */
export function ChatLayout({ children, onNewChat }: ChatLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Sidebar for Desktop */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                className="hidden md:flex"
                onNewChat={onNewChat}
            />

            {/* Sidebar for Mobile */}
            <Sidebar
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
                isMobile
                onNewChat={onNewChat}
            />

            {/* Main Content */}
            <main className="flex flex-1 flex-col overflow-hidden relative transition-all duration-300 ease-in-out">
                {/* Toggle Button Area */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    {/* Desktop Toggle: Distinct Button Style */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden md:flex h-9 w-9 bg-background/80 backdrop-blur-sm border-zinc-200 shadow-sm hover:bg-zinc-100 text-zinc-600 rounded-lg"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        title={isSidebarOpen ? "사이드바 닫기" : "사이드바 열기"}
                    >
                        {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                    </Button>

                    {/* Mobile Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-muted-foreground h-9 w-9"
                        onClick={() => setIsMobileSidebarOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {children}
            </main>
        </div>
    );
}
