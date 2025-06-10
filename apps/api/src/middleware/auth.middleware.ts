import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.model'
import { AppError } from '../utils/AppError'
import { asyncHandler } from '../utils/asyncHandler'

export interface AuthRequest extends Request {
  user?: any
}

export const authenticate = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(new AppError('Not authorized to access this route', 401))
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err) {
      return next(new AppError('Not authorized to access this route', 401))
    }
  }
)

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}
