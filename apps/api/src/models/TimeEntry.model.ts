import mongoose, { Document, Schema } from 'mongoose'

export interface ITimeEntry extends Document {
  employeeId: string
  clockIn: Date
  clockOut?: Date
  breakStart?: Date
  breakEnd?: Date
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
  notes?: string
  isActive: boolean
  totalHours?: number
  createdAt: Date
  updatedAt: Date
}

const TimeEntrySchema = new Schema<ITimeEntry>(
  {
    employeeId: {
      type: String,
      required: true,
      ref: 'Employee',
    },
    clockIn: {
      type: Date,
      required: true,
    },
    clockOut: {
      type: Date,
    },
    breakStart: {
      type: Date,
    },
    breakEnd: {
      type: Date,
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    notes: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalHours: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes
TimeEntrySchema.index({ employeeId: 1, clockIn: -1 })
TimeEntrySchema.index({ clockIn: 1 })
TimeEntrySchema.index({ isActive: 1 })

// Calculate total hours before saving
TimeEntrySchema.pre('save', function (next) {
  if (this.clockIn && this.clockOut) {
    const hours = (this.clockOut.getTime() - this.clockIn.getTime()) / (1000 * 60 * 60)
    this.totalHours = Math.round(hours * 100) / 100 // Round to 2 decimal places
  }
  next()
})

export const TimeEntry = mongoose.model<ITimeEntry>('TimeEntry', TimeEntrySchema) 