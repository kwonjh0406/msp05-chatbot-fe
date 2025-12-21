"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Button } from "@/components/ui/button"
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatLayoutProps {
    children: React.ReactNode
    onNewChat?: () => void
}

export function ChatLayout({ children, onNewChat }: ChatLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

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
                        variant="outline" // Changed to outline
                        size="icon"
                        className="hidden md:flex h-9 w-9 bg-background/80 backdrop-blur-sm border-zinc-200 shadow-sm hover:bg-zinc-100 text-zinc-600 rounded-lg" // Added bg, border, shadow
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
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
    )
}
