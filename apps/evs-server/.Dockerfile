FROM node:22-alpine as build
WORKDIR /app

COPY ../../package*.json ./
RUN npm install

COPY . .
RUN npx nx build evs-server --prod -- --output-path ./dist --skip-nx-cache

FROM node:22-alpine as production
WORKDIR /app

COPY ../../package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]