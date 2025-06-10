#!/bin/bash

echo "🚀 Setting up Employee Time Clock System..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "pnpm is required but not installed. Installing..."; npm install -g pnpm; }
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting." >&2; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Copy environment files
echo "🔧 Setting up environment files..."
cp apps/api/.env.example apps/api/.env 2>/dev/null || echo "API .env already exists"
cp apps/web/.env.local.example apps/web/.env.local 2>/dev/null || echo "Web .env.local already exists"

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 5

# Build packages
echo "🔨 Building shared packages..."
pnpm --filter @timeclock/shared build

echo "✅ Setup complete!"
echo ""
echo "To start the development servers:"
echo "  API: cd apps/api && pnpm dev"
echo "  Web: cd apps/web && pnpm dev"
echo ""
echo "Or run both with: pnpm dev (after setting up turbo)"
