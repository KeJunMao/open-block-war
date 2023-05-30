# Setup node
FROM node:18-alpine as base
WORKDIR /app

# Setup packageManager
FROM base as pnpm
RUN corepack enable

# Install deps only when needed
FROM pnpm AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# Rebuild source code
FROM pnpm as builder
COPY . ./
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build && pnpm install --prefer-offline --prod --ignore-scripts

# Runner
FROM base as runner
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["sh", "-c", "cd /app && node ./build/server.mjs"]
