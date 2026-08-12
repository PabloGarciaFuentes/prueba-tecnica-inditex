import { describe, it, expect } from 'vitest'
import { formatDate } from './dateFormatter'

describe('dateFormatter', () => {
  it('should format a valid ISO string to D/M/YYYY', () => {
    expect(formatDate('2016-03-01T00:00:00Z')).toBe('1/3/2016')
    expect(formatDate('2026-08-12T18:30:00.000Z')).toBe('12/8/2026')
  })

  it('should return "-" for invalid date inputs', () => {
    expect(formatDate('invalid-date')).toBe('-')
    expect(formatDate('')).toBe('-')
  })
})
