# Dockerfile
FROM node:22-alpine as build

WORKDIR /app

COPY ../../package*.json ./
RUN npm install

COPY . .
RUN npx nx run evs-test:build:production --skip-nx-cache

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/evs-test/browser ./

RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]