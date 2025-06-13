# Employee Time Clock System v2

A modern, scalable employee time tracking system built with Next.js, Express, TypeScript, and MongoDB.

> **🎯 For Recruiters**: This is a full-stack demo application showcasing modern web development practices. [Quick deployment guide](#railway-recommended-for-demo) available below!

## 🚀 Features

- QR code-based clock in/out
- Real-time dashboard with live updates
- Advanced reporting and analytics
- Role-based access control (RBAC)
- PWA support with offline capability
- Mobile-responsive design
- Export to Excel/PDF
- Geolocation tracking
- Break time management

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **UI Components**: Custom components with Framer Motion
- **Forms**: React Hook Form + Zod validation

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Caching**: Redis
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io
- **Queue**: Bull for background jobs
- **Validation**: Zod

### DevOps
- **Container**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry
- **Logging**: Winston

## 📋 Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose
- Git

## 🚀 Quick Start

### Option 1: One-Command Demo (Recommended)
```bash
# Clone and start the demo
git clone https://github.com/yourusername/employee-time-clock-v2.git
cd employee-time-clock-v2
./scripts/demo.sh
```

### Option 2: Manual Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/employee-time-clock-v2.git
   cd employee-time-clock-v2
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp apps/api/env.example apps/api/.env
   cp apps/web/env.local.example apps/web/.env.local
   ```

4. Start Docker services (optional - for MongoDB/Redis):
   ```bash
   docker-compose up -d
   ```

5. Run development servers:
   ```bash
   # Terminal 1 - API
   cd apps/api && pnpm dev
   
   # Terminal 2 - Web
   cd apps/web && pnpm dev
   ```

6. Open your browser:
   - **Frontend**: http://localhost:3000
   - **API**: http://localhost:5000
   - **API Health**: http://localhost:5000/health

🧪 Testing
bash# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Generate coverage report
pnpm test:coverage
📦 Building for Production
bash# Build all packages
pnpm build

# Build specific app
pnpm --filter @timeclock/api build
pnpm --filter @timeclock/web build
🚀 Deployment

### Railway (Recommended for Demo)
The easiest way to deploy for recruiters to see:

```bash
# Prepare for Railway deployment
./scripts/prepare-railway.sh

# Follow the detailed guide
cat RAILWAY_DEPLOYMENT.md
```

**Quick Railway Setup:**
1. Create Railway account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy API service from `apps/api`
4. Deploy Web service from `apps/web`
5. Add MongoDB Atlas and Redis
6. Share your live URLs with recruiters!

📚 **Full Guide**: See `RAILWAY_DEPLOYMENT.md` for complete step-by-step instructions.

### Docker (Alternative)
```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up --build
```

### Manual Deployment
1. Build the applications:
   ```bash
   pnpm build
   ```

2. Set production environment variables

3. Start the applications:
   ```bash
   # API
   cd apps/api && pnpm start
   
   # Web
   cd apps/web && pnpm start
   ```


📚 API Documentation
API documentation is available at http://localhost:5000/api-docs when running in development mode.
🔒 Security

JWT authentication with refresh tokens
Rate limiting on API endpoints
Input validation and sanitization
CORS configuration
Helmet.js for security headers
Environment variable validation

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
👥 Authors

Your Name - Initial work

🙏 Acknowledgments

Thanks to all contributors
Inspired by modern time tracking solutions
