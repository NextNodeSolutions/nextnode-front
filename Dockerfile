# syntax=docker/dockerfile:1

# Build arguments for customization
ARG NODE_VERSION=22
ARG PNPM_VERSION=10.12.4
ARG APP_PORT=4321

# Stage 1: Base image with runtime dependencies
FROM node:${NODE_VERSION}-alpine AS base

# Install global dependencies and security updates
RUN apk update && apk upgrade && \
    apk add --no-cache \
    dumb-init \
    tini \
    wget \
    && rm -rf /var/cache/apk/*

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S astro && \
    adduser -S astro -u 1001

# Stage 2: Production dependencies
FROM base AS prod-deps

# Copy package files for dependency caching optimization
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only (skip all scripts)
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod --ignore-scripts

# Stage 3: Build dependencies and source
FROM base AS build-deps

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (skip prepare scripts, then rebuild needed packages)
ENV HUSKY=0
ENV CI=true
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts && \
    # Rebuild only essential build tools
    pnpm rebuild esbuild sharp @tailwindcss/oxide || echo "Some rebuilds failed, continuing..."

# Stage 4: Build the application
FROM build-deps AS build

# Copy source code (optimized order for layer caching)
COPY public ./public/
COPY src ./src/
COPY astro.config.mjs \
     tsconfig.json \
     astro-i18next.config.mjs \
     vitest.config.ts \
     eslint.config.mjs \
     ./

# Set build environment variables
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1

# Build the application with optimizations
RUN pnpm run build && \
    # Clean up unnecessary files to reduce image size
    rm -rf node_modules/.cache && \
    rm -rf .astro

# Stage 5: Runtime environment
FROM base AS runtime

# Set runtime environment variables with build arg
ARG APP_PORT
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=${APP_PORT}
ENV ASTRO_TELEMETRY_DISABLED=1

# Security: Use non-root user
USER astro

# Copy production dependencies
COPY --from=prod-deps --chown=astro:astro /app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=build --chown=astro:astro /app/package.json ./package.json

# Create necessary directories with proper permissions
USER root
RUN mkdir -p /tmp && chown astro:astro /tmp
USER astro

# Health check for container monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); const options = { host: '0.0.0.0', port: process.env.PORT || 4321, timeout: 2000 }; const req = http.request(options, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => process.exit(1)); req.end();"

# Expose port
EXPOSE $APP_PORT

# Use tini for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "./dist/server/entry.mjs"]