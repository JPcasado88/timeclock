import mongoose, { Document, Schema } from 'mongoose'

export interface IEmployee extends Document {
  employeeId: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  hourlyRate?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    hourlyRate: {
      type: Number,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes
EmployeeSchema.index({ employeeId: 1 })
EmployeeSchema.index({ email: 1 })
EmployeeSchema.index({ department: 1 })

export const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema) 