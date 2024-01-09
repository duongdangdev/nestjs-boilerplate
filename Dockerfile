# Builder stage
FROM node:20.10.0-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm run build

# NodeModules
FROM node:20.10.0-alpine as moduleInstaller

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit-dev

# Production
FROM node:20.10.0-alpine

USER node

WORKDIR /home/node/app

COPY --from=builder /app/dist ./dist
COPY --from=moduleInstaller /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]