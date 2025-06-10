#!/bin/bash

echo "🚀 Preparing Employee Time Clock System v2 for Railway Deployment"
echo "================================================================="

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

echo "✅ pnpm is installed"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build both applications to check for errors
echo "🔨 Building applications..."
echo "  Building API..."
cd apps/api && pnpm build
if [ $? -eq 0 ]; then
    echo "✅ API build successful"
else
    echo "❌ API build failed. Please fix TypeScript errors."
    exit 1
fi

cd ../..

echo "  Building Web App..."
cd apps/web && pnpm build
if [ $? -eq 0 ]; then
    echo "✅ Web app build successful"
else
    echo "❌ Web app build failed. Please fix build errors."
    exit 1
fi

cd ../..

# Check for required files
echo "📋 Checking deployment files..."

required_files=(
    "railway.json"
    "apps/api/railway.json"
    "apps/web/railway.json"
    "apps/api/env.example"
    "apps/web/env.local.example"
    "RAILWAY_DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

echo ""
echo "🎯 Next Steps for Railway Deployment:"
echo "1. Push your code to GitHub"
echo "2. Create a Railway account at https://railway.app"
echo "3. Set up MongoDB Atlas (free tier)"
echo "4. Follow the detailed guide in RAILWAY_DEPLOYMENT.md"
echo ""
echo "💡 Estimated monthly cost: ~$10 (2 Railway services)"
echo "📚 Full deployment guide: ./RAILWAY_DEPLOYMENT.md"
echo ""
echo "🎉 Your application is ready for deployment!" 