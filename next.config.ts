import type { NextConfig } from "next";

// Next.js 설정 파일: 웹팩, 이미지, 환경 변수 등 프로젝트의 빌드 및 런타임 구성을 정의합니다.
const nextConfig: NextConfig = {
  // Docker 빌드 시에만 standalone 모드 사용 (Windows 심볼릭 링크 권한 문제 회피)
  output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,
};

export default nextConfig;
