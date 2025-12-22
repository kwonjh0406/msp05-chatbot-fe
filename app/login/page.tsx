"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 p-4">
            <div className="w-full max-w-sm space-y-10"> {/* 간격 넓게 */}
                {/* 헤더 영역 */}
                <div className="flex flex-col items-center text-center space-y-2">
                    {/* 뒤로가기 링크 - 상단에 배치 */}
                    <Link href="/" className="flex items-center text-sm text-zinc-400 hover:text-zinc-800 transition-colors mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        채팅으로 돌아가기
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        로그인
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        계정에 로그인하세요
                    </p>
                </div>

                {/* 폼 영역 */}
                <form className="space-y-5"> {/* 입력 필드 간 간격 조정 */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="sr-only">이메일</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="이메일 주소"
                                required
                                // 스타일: 채팅창 입력바와 유사하게. 배경색 살짝 주고, 테두리 연하게, 라운딩 넉넉하게.
                                className="h-12 border-zinc-200 bg-zinc-50 px-4 text-base placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-0 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:ring-zinc-400 rounded-2xl shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="sr-only">비밀번호</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="비밀번호"
                                required
                                className="h-12 border-zinc-200 bg-zinc-50 px-4 text-base placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-0 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:ring-zinc-400 rounded-2xl shadow-sm"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity rounded-full shadow-none"
                    >
                        로그인
                    </Button>
                </form>

                {/* 하단 링크 */}
                <div className="text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        계정이 없으신가요?{" "}
                        <Link href="/signup" className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
