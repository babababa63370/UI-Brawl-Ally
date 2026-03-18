# ─── Stage 1 : Builder ────────────────────────────────────────────────────────
FROM node:24-slim AS builder

RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Copier les manifestes du workspace en premier (cache de couches)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.base.json tsconfig.json ./

# Copier les package.json de chaque package pour la résolution du workspace
COPY lib/db/package.json               lib/db/
COPY lib/api-spec/package.json         lib/api-spec/
COPY lib/api-zod/package.json          lib/api-zod/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY artifacts/api-server/package.json artifacts/api-server/
COPY artifacts/my-website/package.json artifacts/my-website/

# Installer toutes les dépendances
RUN pnpm install --frozen-lockfile

# Copier les sources
COPY lib/                  lib/
COPY artifacts/api-server/ artifacts/api-server/
COPY artifacts/my-website/ artifacts/my-website/

# Build du frontend (React + Vite → fichiers statiques)
RUN PORT=3000 BASE_PATH=/ pnpm --filter @workspace/my-website run build

# Typecheck + build du backend (esbuild → bundle CJS)
RUN pnpm run typecheck && pnpm --filter @workspace/api-server run build


# ─── Stage 2 : Production ─────────────────────────────────────────────────────
FROM node:24-slim AS production

RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Copier les manifestes pour l'installation des dépendances de production
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY lib/db/package.json               lib/db/
COPY lib/api-spec/package.json         lib/api-spec/
COPY lib/api-zod/package.json          lib/api-zod/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY artifacts/api-server/package.json artifacts/api-server/

# Installer uniquement les dépendances de production du serveur
RUN pnpm install --frozen-lockfile --filter @workspace/api-server --prod

# Copier le bundle du backend compilé
COPY --from=builder /app/artifacts/api-server/dist/index.cjs ./server.cjs

# Copier les fichiers statiques du frontend
COPY --from=builder /app/artifacts/my-website/dist/public/ ./public/

ENV NODE_ENV=production
ENV PORT=8080
ENV STATIC_DIR=/app/public

EXPOSE 8080

CMD ["node", "server.cjs"]
