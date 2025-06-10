import { Router } from 'express'

const router = Router()

// POST /api/auth/login
router.post('/login', (_req, res) => {
  res.json({ message: 'Login endpoint - to be implemented' })
})

// POST /api/auth/register
router.post('/register', (_req, res) => {
  res.json({ message: 'Register endpoint - to be implemented' })
})

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  res.json({ message: 'Logout endpoint - to be implemented' })
})

// POST /api/auth/refresh
router.post('/refresh', (_req, res) => {
  res.json({ message: 'Refresh token endpoint - to be implemented' })
})

export default router 