# 🚀 Railway Deployment Guide

This guide will help you deploy your Employee Time Clock System v2 to Railway for recruiters to see.

## 📋 Prerequisites

- Railway account (sign up at [railway.app](https://railway.app))
- MongoDB Atlas account (free tier available)
- Redis Cloud account (free tier available) or use Railway's Redis addon
- GitHub repository with your code

## 🏗️ Architecture Overview

Your application consists of:
- **Web App** (Next.js frontend) - Port 3000
- **API Server** (Express backend) - Port 5000
- **MongoDB Database** (Atlas or Railway addon)
- **Redis Cache** (Railway addon recommended)

## 🚀 Step-by-Step Deployment

### 1. Setup External Services

#### MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier is sufficient)
3. Create a database user
4. Whitelist Railway IPs (or use 0.0.0.0/0 for simplicity)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/timeclock`

#### Redis (Railway Addon)
You'll add this directly in Railway in step 3.

### 2. Deploy the API Service

1. **Connect GitHub Repository**
   - Go to Railway dashboard
   - Click "New Project"
   - Connect your GitHub repository
   - Select the repository

2. **Configure API Service**
   - Railway will detect the monorepo structure
   - Create a new service and set the root directory to `apps/api`
   - Or manually set build command: `cd apps/api && pnpm install && pnpm build`
   - Set start command: `cd apps/api && pnpm start`

3. **Add Environment Variables for API**
   ```bash
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/timeclock
   
   # JWT (generate a secure random string)
   JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
   JWT_EXPIRE=7d
   
   # CORS (will be updated after web deployment)
   CORS_ORIGIN=https://your-web-app.railway.app
   
   # Environment
   NODE_ENV=production
   
   # Port (Railway will set this automatically)
   PORT=$PORT
   ```

4. **Add Redis Addon**
   - In your API service, go to "Variables" tab
   - Click "Add Service" 
   - Select "Redis"
   - Railway will automatically add `REDIS_URL` environment variable

5. **Deploy API**
   - Click "Deploy"
   - Note your API URL: `https://your-api-service.railway.app`

### 3. Deploy the Web Service

1. **Create Web Service**
   - In the same project, add a new service
   - Set root directory to `apps/web`
   - Or manually set build command: `cd apps/web && pnpm install && pnpm build`
   - Set start command: `cd apps/web && pnpm start`

2. **Add Environment Variables for Web**
   ```bash
   # API URL (use your API service URL from step 2)
   NEXT_PUBLIC_API_URL=https://your-api-service.railway.app
   ```

3. **Deploy Web App**
   - Click "Deploy"
   - Note your Web URL: `https://your-web-app.railway.app`

### 4. Update CORS Configuration

1. Go back to your API service
2. Update the `CORS_ORIGIN` environment variable with your web app URL:
   ```bash
   CORS_ORIGIN=https://your-web-app.railway.app
   ```
3. Redeploy the API service

### 5. Custom Domains (Optional)

You can add custom domains in Railway:
1. Go to service settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔧 Configuration Files Included

- `railway.json` - Root Railway configuration
- `apps/api/railway.json` - API service configuration  
- `apps/web/railway.json` - Web service configuration
- `apps/api/env.example` - API environment variables template
- `apps/web/env.local.example` - Web environment variables template

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that `pnpm` is available (Railway supports it natively)
   - Verify build commands are correct
   - Check for TypeScript errors

2. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` points to correct API URL
   - Check CORS configuration
   - Ensure API service is running

3. **Database Connection**
   - Verify MongoDB connection string
   - Check Atlas IP whitelist
   - Ensure database user has correct permissions

4. **Environment Variables**
   - All environment variables must be set in Railway dashboard
   - Check for typos in variable names
   - Restart services after updating variables

## 📊 Monitoring

Railway provides built-in monitoring:
- **Logs**: View real-time logs for debugging
- **Metrics**: CPU, Memory, and Network usage
- **Deployments**: Track deployment history

## 💰 Cost Estimates

Railway pricing (as of 2024):
- **Hobby Plan**: $5/month per service
- **Usage-based**: Pay for what you use
- **Free tier**: Available with limitations

For a demo deployment:
- 2 services (API + Web): ~$10/month
- MongoDB Atlas: Free tier available
- Redis: Included in Railway service cost

## 🔐 Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Database user with minimal permissions
- [ ] CORS properly configured
- [ ] Environment variables set (not hardcoded)
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled (automatic with Railway)

## 🎯 Demo URLs

After deployment, share these URLs with recruiters:
- **Web Application**: `https://your-web-app.railway.app`
- **API Documentation**: `https://your-api-service.railway.app/api-docs` (if implemented)
- **Health Check**: `https://your-api-service.railway.app/health`

## 📞 Support

If you encounter issues:
1. Check Railway logs in the dashboard
2. Review this deployment guide
3. Check Railway documentation
4. Railway Discord community for help

---

**Ready to impress recruiters!** 🎉 Your modern time tracking system is now live and scalable. 