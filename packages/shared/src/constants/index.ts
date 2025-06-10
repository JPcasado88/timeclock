export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  SCANNER: 'scanner',
} as const

export const TIME_RECORD_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  EDITED: 'edited',
} as const

export const BREAK_TYPES = {
  LUNCH: 'lunch',
  SHORT: 'short',
  OTHER: 'other',
} as const

export const CLOCK_ACTIONS = {
  IN: 'IN',
  OUT: 'OUT',
  BREAK_START: 'BREAK_START',
  BREAK_END: 'BREAK_END',
} as const
