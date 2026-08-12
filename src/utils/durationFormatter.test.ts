import { describe, it, expect } from 'vitest'
import { formatDuration } from './durationFormatter'

describe('durationFormatter', () => {
  it('should format milliseconds to MM:SS', () => {
    expect(formatDuration(840000)).toBe('14:00')
    expect(formatDuration(903000)).toBe('15:03')
    expect(formatDuration(738000)).toBe('12:18')
  })

  it('should format hours correctly to H:MM:SS', () => {
    expect(formatDuration(4530000)).toBe('1:15:30')
    expect(formatDuration(12387000)).toBe('3:26:27')
  })

  it('should return "00:00" for 0 or negative values', () => {
    expect(formatDuration(0)).toBe('00:00')
    expect(formatDuration(-100)).toBe('00:00')
  })
})
