import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import Redis from 'ioredis'

// Load environment variables
dotenv.config()

// Import middleware
import { errorHandler } from './middleware/error.middleware'
import { notFound } from './middleware/notFound.middleware'

// Import routes
import authRoutes from './routes/auth.routes'
import employeeRoutes from './routes/employee.routes'
import clockRoutes from './routes/clock.routes'
import reportRoutes from './routes/report.routes'

// Create Express app
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})

// Create Redis client
export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

redis.on('error', (err) => {
  console.error('Redis error:', err)
})

redis.on('connect', () => {
  console.log('✅ Redis connected')
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/timeclock')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Make io accessible to routes
app.set('io', io)

// Routes
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/clock', clockRoutes)
app.use('/api/reports', reportRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('join-dashboard', () => {
    socket.join('dashboard')
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Start server
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  httpServer.close(() => {
    mongoose.connection.close()
    redis.disconnect()
    process.exit(0)
  })
})
