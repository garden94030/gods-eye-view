FROM node:24-bookworm-slim

ENV PUPPETEER_SKIP_DOWNLOAD=1 \
    NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 8080

# Build at container start so Cloudflare secrets can supply the optional
# client-visible provider keys without baking them into the image layers.
CMD ["sh", "-c", "npm run build && npm run preview -- --host 0.0.0.0 --port 8080 --strictPort"]
