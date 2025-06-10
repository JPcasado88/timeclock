#!/bin/bash

echo "🎬 Starting Employee Time Clock System v2 Demo"
echo "=============================================="

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "🚀 Starting development servers..."
echo "   API Server: http://localhost:5000"
echo "   Web App: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start both servers concurrently
pnpm --filter @timeclock/api dev &
API_PID=$!

pnpm --filter @timeclock/web dev &
WEB_PID=$!

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $API_PID 2>/dev/null
    kill $WEB_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait 