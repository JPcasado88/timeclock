import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  console.error(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = new AppError(message, 404)
  }

  // Mongoose duplicate key
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    const message = 'Duplicate field value entered'
    error = new AppError(message, 400)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors)
      .map((val: any) => val.message)
      .join(', ')
    error = new AppError(message, 400)
  }

  res.status((error as any).statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Server Error',
    },
  })
}
