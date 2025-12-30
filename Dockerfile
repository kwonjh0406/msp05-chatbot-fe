# 1. Base image
FROM node:20-alpine AS base

# 2. Dependencies
FROM base AS deps
WORKDIR /app
# 의존성 설치를 위해 필요한 파일만 먼저 복사
COPY package.json pnpm-lock.yaml .npmrc ./
RUN corepack enable && pnpm install --frozen-lockfile

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# 전체 소스 코드 복사 (이때 .dockerignore에 public이 없어야 함)
COPY . .

# Next.js 빌드 수행 (next.config.ts에 output: 'standalone' 설정이 있어야 함)
RUN corepack enable && pnpm run build

# 4. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 보안을 위해 비루트(non-root) 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# [핵심 수정] standalone 결과물을 먼저 복사한 후, public과 static을 수동으로 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# server.js는 standalone 빌드 시 자동으로 생성되는 실행 파일입니다.
CMD ["node", "server.js"]