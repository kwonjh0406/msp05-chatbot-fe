import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind CSS 클래스 병합 함수: clsx로 조건부 클래스를 결합하고, tailwind-merge로 충돌을 해결합니다.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
