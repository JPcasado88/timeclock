export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user' | 'scanner'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Employee {
  id: string
  name: string
  email?: string
  barcode: string
  department?: string
  position?: string
  avatar?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface TimeRecord {
  id: string
  employeeId: string
  employee?: Employee
  date: string
  clockIn: string
  clockOut?: string
  breaks: Break[]
  totalHours: number
  totalMinutes: number
  overtime: number
  status: 'active' | 'completed' | 'edited'
  location?: Location
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Break {
  id: string
  start: string
  end?: string
  type: 'lunch' | 'short' | 'other'
  duration?: number
}

export interface Location {
  clockIn?: Coordinates
  clockOut?: Coordinates
}

export interface Coordinates {
  lat: number
  lng: number
  accuracy?: number
}

export interface ClockAction {
  action: 'IN' | 'OUT' | 'BREAK_START' | 'BREAK_END'
  timestamp: string
  employee: Employee
  timeRecord: TimeRecord
}
