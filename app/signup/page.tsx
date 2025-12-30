"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function SignupPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const username = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            await api.post("/auth/signup", { username, password })
            router.push("/login") // Redirect to login on success
        } catch (err) {
            setError("회원가입에 실패했습니다. 다른 아이디를 사용해보세요.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
            <div className="w-full max-w-sm space-y-10">
                {/* 헤더 영역 */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <Link href="/" className="flex items-center text-sm text-stone-400 hover:text-stone-800 transition-colors mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        채팅으로 돌아가기
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-stone-900">
                        회원가입
                    </h1>
                    <p className="text-sm text-stone-500">
                        새 계정을 만드세요
                    </p>
                </div>

                {/* 폼 영역 */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="sr-only">이메일</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="아이디 (Username)"
                                required
                                disabled={isLoading}
                                className="h-12 border-stone-200 bg-stone-50 px-4 text-base placeholder:text-stone-400 focus-visible:ring-1 focus-visible:ring-stone-900 focus-visible:ring-offset-0 rounded-2xl shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="sr-only">비밀번호</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="비밀번호"
                                required
                                disabled={isLoading}
                                className="h-12 border-stone-200 bg-stone-50 px-4 text-base placeholder:text-stone-400 focus-visible:ring-1 focus-visible:ring-stone-900 focus-visible:ring-offset-0 rounded-2xl shadow-sm"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 text-base font-medium bg-stone-900 text-white hover:bg-stone-800 hover:opacity-90 transition-opacity rounded-full shadow-none"
                    >
                        {isLoading ? "가입 중..." : "회원가입"}
                    </Button>
                </form>

                {/* 하단 링크 */}
                <div className="text-center">
                    <p className="text-sm text-stone-500">
                        이미 계정이 있으신가요?{" "}
                        <Link href="/login" className="font-semibold text-stone-900 hover:underline">
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

