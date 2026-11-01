# ---------- Build ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
# Falls back to npm install if package-lock.json is out of sync with package.json
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

COPY . .

# REACT_APP_* values are baked into the JS at build time
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_TOKEN_EXPIRES_TIME
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL \
    REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID \
    REACT_APP_TOKEN_EXPIRES_TIME=$REACT_APP_TOKEN_EXPIRES_TIME \
    GENERATE_SOURCEMAP=false \
    NODE_OPTIONS=--max-old-space-size=1536

RUN npm run build

# ---------- Serve ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
