"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950 p-4">
            <Card className="w-full max-w-md border-none shadow-none bg-transparent">
                <CardHeader className="space-y-1 px-0">
                    <Link href="/" className="flex items-center text-sm text-zinc-400 hover:text-zinc-800 transition-colors mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Chat
                    </Link>
                    <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-600 font-normal">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            className="bg-zinc-50 border-zinc-100 focus-visible:ring-zinc-200 focus-visible:ring-offset-0 h-11"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-600 font-normal">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="bg-zinc-50 border-zinc-100 focus-visible:ring-zinc-200 focus-visible:ring-offset-0 h-11"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-600 font-normal">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            className="bg-zinc-50 border-zinc-100 focus-visible:ring-zinc-200 focus-visible:ring-offset-0 h-11"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 px-0">
                    <Button className="w-full h-11 bg-black hover:bg-zinc-800 text-white font-normal text-base shadow-none">Create account</Button>
                    <div className="text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link href="/login" className="underline hover:text-zinc-800">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
