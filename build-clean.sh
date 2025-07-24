#!/bin/bash
set -e

# Build script that mimics docker-compose but with clean legacy builder
echo "🔨 Building nextnode-front with legacy Docker builder..."

# Read environment variables
source .env 2>/dev/null || true

# Set defaults
NODE_VERSION=${NODE_VERSION:-22}
PNPM_VERSION=${PNPM_VERSION:-10.12.4}
APP_PORT=${APP_PORT:-4321}

# Force legacy builder
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0

# Build with legacy docker build (no buildx, no bake, no intermediate images)
docker build \
  --rm \
  --force-rm \
  -t nextnode-front:latest \
  --target runtime \
  --build-arg NODE_VERSION="$NODE_VERSION" \
  --build-arg PNPM_VERSION="$PNPM_VERSION" \
  --build-arg APP_PORT="$APP_PORT" \
  .

echo "✅ Build completed successfully!"
echo "📊 Final images:"
docker images | grep -E "(REPOSITORY|nextnode-front)"

echo ""
echo "🚀 To start: docker compose up -d"
echo "🧹 To clean: docker image prune -f"