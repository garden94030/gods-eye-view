FROM node:24-bookworm-slim

ENV PUPPETEER_SKIP_DOWNLOAD=1 \
    NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PORT:-8080} --strictPort"]
