import { Router } from 'express'

const router = Router()

// GET /api/employees
router.get('/', (_req, res) => {
  res.json({ message: 'Get all employees endpoint - to be implemented' })
})

// POST /api/employees
router.post('/', (_req, res) => {
  res.json({ message: 'Create employee endpoint - to be implemented' })
})

// GET /api/employees/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Get employee ${req.params.id} endpoint - to be implemented` })
})

// PUT /api/employees/:id
router.put('/:id', (req, res) => {
  res.json({ message: `Update employee ${req.params.id} endpoint - to be implemented` })
})

// DELETE /api/employees/:id
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete employee ${req.params.id} endpoint - to be implemented` })
})

export default router 