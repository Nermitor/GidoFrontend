# Dependencies
FROM node:18-alpine as node-dependencies
WORKDIR /app
COPY --link package*.json .env ./
RUN npm ci --no-audit

# Builder
FROM node:18-alpine as node-builder
WORKDIR /app
COPY --link --from=node-dependencies /app/node_modules /app/node_modules
COPY --link . .
RUN npm run build

# Server
FROM node:18-alpine as node-runtime
WORKDIR /app
COPY --link --from=node-builder /app/.output /app

ENV PORT 8080
EXPOSE 8080

CMD ["node", "/app/server/index.mjs" ]
