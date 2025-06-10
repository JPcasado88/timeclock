import { Router } from 'express'

const router = Router()

// GET /api/reports/timesheet
router.get('/timesheet', (_req, res) => {
  res.json({ message: 'Generate timesheet report - to be implemented' })
})

// GET /api/reports/summary
router.get('/summary', (_req, res) => {
  res.json({ message: 'Generate summary report - to be implemented' })
})

// GET /api/reports/export
router.get('/export', (_req, res) => {
  res.json({ message: 'Export reports - to be implemented' })
})

export default router 