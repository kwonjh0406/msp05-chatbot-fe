import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 한글 폰트를 부드럽게 표시하기 위해 Noto Sans KR을 사용합니다.
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

// 메타데이터 설정: 애플리케이션의 제목과 설명을 정의합니다.
export const metadata: Metadata = {
  title: "Chatbot",
  description: "AI Chatbot Application",
};

// 최상위 레이아웃 컴포넌트: 모든 페이지에 공통적으로 적용되는 레이아웃을 정의합니다.
// HTML 및 Body 태그를 포함하며, 폰트 설정을 전역적으로 적용합니다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
